import express from 'express'
import cors from 'cors'
import routes from './app/routes/routes'
import session from 'express-session'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()
      this.middlewares()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors({
        origin: 'http://localhost',
        credentials: true
      }))
      this.express.use(session({
        secret: 'naotemnadaaqui',
        resave: true,
        saveUninitialized: true
      }))
    }

    private routes (): void {
      this.express.use(routes)
    }
}

export default new App().express
