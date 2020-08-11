import { Request, Response } from 'express'
import Treatment from './../models/Treatment'
import Schedule from '../models/Schedule'
import Vet from '../models/Vet'
import Pet from '../models/Pet'

class TreatmentController {
  /**
   * Register a new treatment
   * @param req
   * @param res
   * @returns {Treatment}
   */
  public async register (req: Request, res: Response): Promise<Response> {
    const treatment = await Treatment.findOrCreate({
      where: {
        schedule: req.body.schedule
      },
      defaults: {
        diagnosis: req.body.diagnosis
      }
    })

    return res.json(treatment)
  }

  /**
   * Takes the entire history of treatments for the clinic
   * @param req
   * @param res
   * @returns {Treatment}
   */
  public async getTreatmentClinic (req: Request, res: Response): Promise<Response> {
    const treatment = await Treatment.findAll({
      attributes: ['id', 'diagnosis', 'schedule']
    })

    return res.json(treatment)
  }

  /**
   * Takes the entire history of treatments for the customer
   * @param req
   * @param res
   * @returns {Treatment}
   */
  public async getTreatmentClient (req: Request, res: Response): Promise<Response> {
    if (!req.session.user) {
      return res.sendStatus(401)
    }
    const treatment = await Treatment.findAll({
      attributes: ['diagnosis'],
      include: [
        {
          model: Schedule,
          as: 'scheduleData',
          attributes: ['schedulingDate'],
          where: {
            client: req.session.user
          },
          include: [
            {
              model: Vet,
              as: 'vetData',
              attributes: ['name']
            },
            {
              model: Pet,
              as: 'petData',
              attributes: ['name']
            }
          ]
        }
      ]
    })
    return res.json(treatment)
  }
}

export default new TreatmentController()
