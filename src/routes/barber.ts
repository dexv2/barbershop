import { Router } from 'express'
import { BarberController } from '../controllers/barberController'

export class BarberRouter {
    static basePath = '/api/barber'
    router: Router

    constructor(private barberController: BarberController) {
        this.router = Router()
        this.recruitBarber()
        this.getAllBarbers()
        this.getAllActiveBarbers()
        this.logIn()
        this.logOut()
        this.startNewHaircut()
    }

    private recruitBarber() {
        this.router.post('/create', async (req, res) => {
            const { name, id } = req.body
            res.send(await this.barberController.recruitBarber(name, id))
        })
    }

    private getAllBarbers() {
        this.router.get('/', async (req, res) => {
            res.send(await this.barberController.getAllBarbers())
        })
    }

    private getAllActiveBarbers() {
        this.router.get('/active', async (req, res) => {
            res.send(await this.barberController.getAllActiveBarbers())
        })
    }

    private logIn() {
        this.router.post('/login', async (req, res) => {
            const { id } = req.body
            res.send(await this.barberController.logIn(id))
        })
    }

    private logOut() {
        this.router.post('/logout', async (req, res) => {
            const { id } = req.body
            res.send(await this.barberController.logOut(id))
        })
    }

    private startNewHaircut() {
        this.router.post('/start', async (req, res) => {
            const { id } = req.body
            res.send(await this.barberController.startNewHaircut(id))
        })
    }
}
