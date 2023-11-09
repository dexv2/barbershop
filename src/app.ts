import './config/mongo'
import express from 'express'
import { BarberController } from './controllers/barberController'
import { BarberRouter } from './routes/barber'
import { CustomerCountController } from './controllers/customerCountController'
import { CustomerCountRouter } from './routes/customerCount'
import { Scheduler } from './automation/scheduler'

const app = express()

app.use(express.json())

const barberController = new BarberController()
const barberRouter = new BarberRouter(barberController)
const customerCountController = new CustomerCountController()
const customerCountRouter = new CustomerCountRouter(customerCountController)
new Scheduler(barberController, customerCountController)

app.use(BarberRouter.basePath, barberRouter.router)
app.use(CustomerCountRouter.basePath, customerCountRouter.router)

const port = 3005

app.listen(port, () => {
    console.log(`Barbershop server listening at http://localhost:${port}`)
})
