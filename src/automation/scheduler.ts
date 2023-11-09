import { CronJob } from 'cron'
import { BarberController } from '../controllers/barberController'
import { CustomerCountController } from '../controllers/customerCountController'

export class Scheduler {
    constructor(
        private barberController: BarberController,
        private customerCountController: CustomerCountController
    ) {
        this.run()
    }

    run() {
        new CronJob(
            // '*/5 * 8-19 * * *' => every 5 seconds between shop hours (8:00am - 7:59pm)
            // '*/5 * * * * *' => every 5 seconds (for testing)
            '*/5 * * * * *',
            () => {
                this.checkBarberEndTimestamp()
            },
            null,
            true
        )
    }

    async checkBarberEndTimestamp() {
        const activeBarbers = await this.barberController.getAllActiveBarbers()
        const customerCount = await this.customerCountController.findOrCreate()

        for (let i = 0; i < activeBarbers.length; i++) {
            const activeBarber = activeBarbers[i]
            const done = activeBarber.endTimestamp <= Date.now()
            const hasQueue = customerCount.waiting > 0
            if (done && hasQueue) {
                await this.customerCountController.finishHaircut()
                await this.barberController.startNewHaircut(activeBarber.id)
            }
            console.log(done, hasQueue)
        }
        const date = new Date()
        console.log(`cron running at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    }
}
