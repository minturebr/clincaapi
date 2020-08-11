import { Router } from 'express'
import ClientController from '../controllers/ClientController'
import PetController from '../controllers/PetController'
import VetController from './../controllers/VetController'
import ScheduleController from '../controllers/ScheduleController'
import TreatmentController from '../controllers/TreatmentController'

const routes = Router()

/*
 * Client routes that do not require authentication
 */
routes.post('/client', ClientController.register)
routes.post('/client/auth', ClientController.auth)
/*
 * These routes require authentication
 * Client authentication
 */
routes.get('/client/panel', ClientController.panel)
routes.post('/client/panel/animal', PetController.register)
routes.get('/client/panel/animal', PetController.get)
routes.get('/client/panel/vet', VetController.get)
routes.get('/client/panel/schedule', ScheduleController.listAvailableTimes)
routes.post('/client/panel/schedule', ScheduleController.register)
routes.get('/client/panel/treatment', TreatmentController.getTreatmentClient)
/*
 * Routes for clinic management
 */
routes.get('/clinic/schedules', ScheduleController.get)
routes.post('/clinic/treatment', TreatmentController.register)
routes.get('/clinic/treatment', TreatmentController.getTreatmentClinic)

export default routes
