import Barber from '../models/barbers'
import { SERVICE_INTERVAL } from '../utils/functions'
import { CustomerCountController } from './customerCountController'

export class BarberController {
    async getAllBarbers() {
        const barbers = await Barber.find()
        return barbers
    }

    async getAllActiveBarbers() {
        const barbers = await Barber.find({isActive: true})
        return barbers
    }

    async getAllSortedActiveBarbers() {
        const barbers = await Barber.find({isActive: true}).sort('endTimestamp')
        return barbers
    }

    async recruitBarber(name: string, id: number) {
        const barber = new Barber({
            name,
            id
        })
        await barber.save()
        return {
            status: 'OK',
            message: 'Barber details saved',
            name,
            id
        }
    }

    async logIn(id: number) {
        const barber = await Barber.findOneAndUpdate({id}, {isActive: true});
        if (barber) {
            return {
                status: 'OK',
                message: `${barber.name} logged in`
            }
        }
        return {
            status: 'Not OK',
            message: 'Barber not found'
        }
    }

    async logOut(id: number) {
        const barber = await Barber.findOneAndUpdate({id}, {
            isActive: false,
            startTimestamp: 0,
            endTimestamp: 0
        });
        if (barber) {
            return {
                status: 'OK',
                message: `${barber.name} logged out`
            }
        }
        return {
            status: 'Not OK',
            message: 'Barber not found'
        }
    }

    async startNewHaircut(id: number) {
        const barber = await Barber.findOne({id})
        const now = Date.now()

        if (!barber) return this.errorStatus('Barber not found')
        if (barber.endTimestamp > now) return this.errorStatus(`${barber.name} is still working on a customer`)

        barber.isActive = true
        barber.startTimestamp = now
        barber.endTimestamp = now + SERVICE_INTERVAL
        await barber.save()

        const customerCountController = new CustomerCountController()
        customerCountController.startHaircut()

        return {
            status: 'OK',
            message: `${barber.name} started`,
            startTimestamp: barber.startTimestamp,
            endTimestamp: barber.endTimestamp
        }
    }

    private errorStatus(message: string) {
        return {
            status: 'Not OK',
            message
        }
    }
}
