import { Request, Response } from 'express'
import Client from './../models/Client'
import validarCpf from 'validar-cpf'

class ClientController {
  /**
   * Register a new customer
   * @param req
   * @param res
   * @returns created: true or false
   */
  public async register (req: Request, res: Response): Promise<Response> {
    try {
      if (validarCpf(req.body.cpf) === true) {
        const client = await Client.findOrCreate({
          where: { cpf: req.body.cpf },
          defaults: req.body
        })
        return res.json({ created: client.slice(1, 2).toString() })
      } else {
        return res.json({ created: 'false', error: 'inválid CPF' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Auth the customer
   * @param req
   * @param res
   * @returns status 200 or 401
   */
  public async auth (req: Request, res:Response): Promise<Response> {
    try {
      let id = 0
      await Client.findOne({
        where: {
          name: req.body.name,
          cpf: req.body.cpf
        }
      }).then((result) => {
        if (result) {
          id = result.id
          req.session.user = id
          req.session.clientName = result.name
        }
      })

      if (req.session.user === id) {
        return res.sendStatus(200)
      } else {
        return res.sendStatus(401)
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Check if the customer is logged in
   * @param req
   * @param res
   * @returns status 401 or object with the customer's name
   */
  public async panel (req: Request, res:Response): Promise<Response> {
    try {
      if (!req.session.user) {
        return res.sendStatus(401)
      }

      return res.json({ name: req.session.clientName })
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ClientController()
