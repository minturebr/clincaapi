import { Request, Response } from 'express'
import Schedule from './../models/Schedule'
import { Op } from 'sequelize'
import Vet from '../models/Vet'
import { VetController } from './VetController'
import Pet from '../models/Pet'
import Client from '../models/Client'

const hours: Array<string> = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
  '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30'
]
/**
   * Remap array for hours array
   * @param array
   * @returns {Array<string>}
   */
function formatArray (array: Array<string>): Array<string> {
  return array.map((x) => {
    switch (x) {
      case '9:0':
        x = hours[0]
        break
      case '9:30':
        x = hours[1]
        break
      case '10:0':
        x = hours[2]
        break
      case '11:0':
        x = hours[4]
        break
      case '12:0':
        x = hours[6]
        break
      case '13:0':
        x = hours[8]
        break
      case '14:0':
        x = hours[10]
        break
      case '15:0':
        x = hours[12]
        break
      case '16:0':
        x = hours[14]
        break
      case '17:0':
        x = hours[16]
        break
    }
    return x
  })
}

class ScheduleController {
  /**
   * Lists all available times, comparing busy times and non-busy times
   * @param req
   * @param res
   * @returns {Array<string>}
   */
  public async listAvailableTimes (req: Request, res: Response): Promise<Response> {
    const scheduledTime: Array<string> = []
    const vetsPermited: Array<number> = []

    if (req.query.vet && parseInt(req.query.vet.toString()) > 0) {
      Schedule.findAll({
        where: {
          vet: req.query.vet,
          schedulingDate: {
            [Op.startsWith]: req.query.day
          }
        }
      }).then((schedules) => {
        const scheduledTime: Array<string> = []
        for (const hour of schedules) {
          const completeHour = hour.schedulingDate
          scheduledTime.push(`${completeHour.getHours()}:${completeHour.getMinutes()}`)
        }
        const difference = hours.filter(x => !formatArray(scheduledTime).includes(x))

        return res.json({ hours: difference })
      })
    }

    if (req.query.pet) {
      const pet = await Pet.findOne({
        where: {
          id: req.query.pet
        }
      })
      const vetsExperts = await VetController.checkVet(pet.type.toString(), pet.age)
      for (const vets of vetsExperts) {
        vetsPermited.push(vets.id)
      }
      const count = await Schedule.findAndCountAll({
        where: {
          vet: {
            [Op.in]: vetsPermited
          },
          schedulingDate: {
            [Op.startsWith]: req.query.day
          }
        }
      })
      if (count.count === vetsPermited.length) {
        const schedules = await Schedule.findAll({
          where: {
            vet: {
              [Op.in]: vetsPermited
            },
            schedulingDate: {
              [Op.startsWith]: req.query.day
            }
          }
        })
        for (const schedule of schedules) {
          const completeHour = schedule.schedulingDate
          scheduledTime.push(`${completeHour.getHours()}:${completeHour.getMinutes()}`)
        }
        const difference = hours.filter(x => !formatArray(scheduledTime).includes(x))
        return res.json({ hours: difference })
      } else {
        const schedules = await Schedule.findAll({
          where: {
            vet: {
              [Op.notIn]: vetsPermited
            },
            schedulingDate: {
              [Op.startsWith]: req.query.day
            }
          }
        })
        for (const schedule of schedules) {
          const completeHour = schedule.schedulingDate
          scheduledTime.push(`${completeHour.getHours()}:${completeHour.getMinutes()}`)
        }
        const difference = hours.filter(x => !formatArray(scheduledTime).includes(x))
        return res.json({ hours: difference })
      }
    }
  }

  /**
   * Register a new schedule, with some rules :
   * 1. Only register if it is not a weekend
   * 2. Check if the consumer has no preference for a veterinarian
   * 3. Check if the client's pet needs a specialist for recommendation
   * 4. Check available veterinarians for recommendation
   * 5. Check if the clinic is at its maximum capacity (3 pets)
   * 6. Only create if the vet is free on that date
   * @param req
   * @param res
   * @returns {Array<string>}
   */
  public async register (req: Request, res: Response): Promise<Response> {
    if (!req.session.user) {
      return res.sendStatus(401)
    }

    const date = new Date(req.body.schedulingDate + `T${req.body.hour}`)
    let vet: number = parseInt(req.body.vet)
    const vetsExcluded: Array<number> = []
    const vetsPermited: Array<number> = []

    /* Only register if it is not a weekend */
    if (date.getDay() === 6 || date.getDay() === 0) {
      return res.json({ error: 'Não trabalhamos no fim de semana!' })
    }

    /* Check if the consumer has no preference for a veterinarian */
    if (vet === 0) {
      const pet = await Pet.findOne({
        where: {
          id: req.body.pet,
          owner: req.session.user
        }
      })

      /* Check if the client's pet needs a specialist for recommendation */
      const vetsExperts = await VetController.checkVet(pet.type.toString(), pet.age)
      for (const vets of vetsExperts) {
        vetsPermited.push(vets.id)
      }

      /* Check available veterinarians for recommendation */
      const schedules = await Schedule.findAll({
        where: {
          schedulingDate: date
        }
      })
      for (const vets of schedules) {
        vetsExcluded.push(vets.vet)
      }
      const vetFree = await Vet.findOne({
        where: {
          id: {
            [Op.notIn]: vetsExcluded,
            [Op.in]: vetsPermited
          }
        }
      })
      if (vetFree == null) {
        return res.json({ error: 'Não temos veterinários disponíveis.' })
      }
      vet = vetFree.id
    }

    /* Check if the clinic is at its maximum capacity (3 pets) */
    const schedulesCount = await Schedule.findAndCountAll({
      where: {
        schedulingDate: date
      }
    })
    if (schedulesCount.count > 2) {
      return res.json({ error: 'A Clinica só pode atender até 3 pets simultaneamente.' })
    }

    /* Only create if the vet is free on that date */
    Schedule.findOrCreate({
      where: {
        schedulingDate: date,
        vet: vet
      },
      defaults: {
        client: req.session.user,
        pet: req.body.pet
      }
    }).then((response) => {
      // return res.json(response)
      return res.json({ created: response.slice(1, 2).toString() })
    })
  }

  /**
   * Get all the history of schedules
   * @param req
   * @param res
   * @returns {Schedule[]}
   */
  public async get (req: Request, res: Response): Promise<Response> {
    const schedules = await Schedule.findAll({
      attributes: ['id', 'schedulingDate'],
      include: [
        {
          model: Vet,
          as: 'vetData',
          attributes: ['name']
        },
        {
          model: Client,
          as: 'clientData',
          attributes: ['name']
        },
        {
          model: Pet,
          as: 'petData',
          attributes: ['name']
        }
      ]
    })

    return res.json(schedules)
  }
}

export default new ScheduleController()
