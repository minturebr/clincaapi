import { Request, Response } from 'express'
import Pet from '../models/Pet'

class AnimalController {
  /**
   * Register a new pet
   * @param req
   * @param res
   * @returns status: 201 or 401
   */
  public async register (req: Request, res: Response): Promise<Response> {
    if (req.session.user) {
      await Pet.create({
        name: req.body.name,
        age: req.body.age,
        type: req.body.type,
        owner: req.session.user
      })
      return res.sendStatus(201)
    }
    return res.sendStatus(401)
  }

  /**
   * List all pets or a specific pet
   * @param req
   * @param res
   * @returns {Pet}
   */
  public async get (req: Request, res: Response): Promise<Response> {
    if (!req.session.user) {
      return res.sendStatus(401)
    }

    /* Check if ?id is null and list all pets */
    if (!req.query.id) {
      await Pet.findAll({
        where: {
          owner: req.session.user
        }
      }).then((pets) => {
        return res.json(pets)
      })
    }

    /* Check if ?id is valid and list one pet */
    if (req.query.id) {
      Pet.findOne({
        where: {
          id: req.query.id,
          owner: req.session.user
        }
      }).then((pet) => {
        if (!pet) {
          return res.sendStatus(401)
        }
        return res.json(pet)
      })
    }
  }
}

export default new AnimalController()
