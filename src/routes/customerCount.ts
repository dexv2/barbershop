import { Router } from 'express'
import { CustomerCountController } from '../controllers/customerCountController'

export class CustomerCountRouter {
    static basePath = '/api/customer-count'
    router: Router

    constructor(private customerCountController: CustomerCountController) {
        this.router = Router()
        this.addCustomer()
        this.getCustomerCountToday()
        this.resetCustomerCount()
        this.calculateWaitingTime()
    }

    private getCustomerCountToday() {
        this.router.post('/', async (req, res) => {
            res.send(await this.customerCountController.findOrCreate())
        })
    }

    private addCustomer() {
        this.router.post('/add', async (req, res) => {
            const { count } = req.body
            res.send(await this.customerCountController.addCustomer(count))
        })
    }

    private resetCustomerCount() {
        this.router.post('/reset', async (req, res) => {
            res.send(await this.customerCountController.resetCustomerCount())
        })
    }

    private calculateWaitingTime() {
        this.router.get('/waiting-time', async (req, res) => {
            res.send(await this.customerCountController.calculateWaitingTime())
        })
    }
}
