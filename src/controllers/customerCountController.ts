import CustomerCount from '../models/customerCount'
import { formatDate, getHMS, MINUTES_PER_HOUR, msToMin, msToSec, SECONDS_PER_HOUR, SECONDS_PER_MINUTE, SERVICE_INTERVAL } from '../utils/functions'
import { BarberController } from './barberController'

export class CustomerCountController {
    async addCustomer(count: number) {
        const customerCount = await this.findOrCreate()
        customerCount.$inc('waiting', count)
        await customerCount.save()
        return customerCount
    }

    async findOrCreate() {
        const day = formatDate()
        let customerCount = await CustomerCount.findOne({day})
        if (!customerCount) {
            customerCount = await CustomerCount.create({day})
        }
        return customerCount
    }

    async resetCustomerCount() {
        const customerCount = await this.findOrCreate()
        customerCount.waiting = 0
        customerCount.ongoing = 0
        customerCount.done = 0

        await customerCount.save()
        return customerCount
    }

    async startHaircut() {
        const customerCount = await this.findOrCreate()
        customerCount.waiting -= 1
        customerCount.ongoing += 1

        await customerCount.save()
        return customerCount
    }

    async finishHaircut() {
        const customerCount = await this.findOrCreate()
        customerCount.ongoing -= 1
        customerCount.done += 1

        await customerCount.save()
        return customerCount
    }

    async calculateWaitingTime() {
        const barberController = new BarberController()
        const activeBarbers = await barberController.getAllSortedActiveBarbers()
        const customerCount = await this.findOrCreate()
        const customerWaiting = customerCount.waiting
        const queueOverBarbers = Math.floor(customerWaiting / activeBarbers.length)
        let remainder = customerWaiting % activeBarbers.length
        console.log(queueOverBarbers, remainder)
        let lastToFinishTimestamp = 0
        const now = Date.now()

        for (let i = 0; i < activeBarbers.length; i++) {
            const activeBarber = activeBarbers[i]
            const remaining = activeBarber.endTimestamp - now
            console.log({
                id: activeBarber.id,
                name: activeBarber.name,
                ...getHMS(remaining > 0 ? remaining : 0)
            })
            let estimatedTimeDone = activeBarber.endTimestamp + (SERVICE_INTERVAL * queueOverBarbers)
            if (remainder > 0) {
                estimatedTimeDone += SERVICE_INTERVAL
                remainder--
            }
            if (lastToFinishTimestamp < estimatedTimeDone) {
                lastToFinishTimestamp = estimatedTimeDone
            }
        }

        const timeRemainingInMs = lastToFinishTimestamp - Date.now()
        return getHMS(timeRemainingInMs > 0 ? timeRemainingInMs : 0)
    }
}
