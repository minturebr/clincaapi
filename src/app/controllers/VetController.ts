import { Request, Response } from 'express'
import Vet from '../models/Vet'

class VetController {
  /**
   * Filter veterinarians to separate specialist from non-specialist.
   * @param type
   * @param age
   * @returns {Vet[]}
   */
  public static async checkVet (type: string, age: number): Promise<Vet[]> {
    if ((type === '1' || type === '2') && age > 7) {
      const vets = await Vet.findAll({
        where: {
          specialist: true
        }
      })
      return vets
    } else if (type === '3' && age > 2) {
      const vets = await Vet.findAll({
        where: {
          specialist: true
        }
      })
      return vets
    } else {
      const vets = await Vet.findAll()
      return vets
    }
  }

  /**
   * Search veterinarians according to what the pets needs using checkVet()
   * @param req
   * @param res
   * @returns {Vet[]}
   */
  public async get (req: Request, res: Response): Promise<Response> {
    if (!req.session.user) {
      return res.sendStatus(401)
    }
    const age = parseInt(req.query.age.toString())
    const type = req.query.type.toString()

    return res.json(await VetController.checkVet(type, age))
  }
}

export { VetController }
export default new VetController()
