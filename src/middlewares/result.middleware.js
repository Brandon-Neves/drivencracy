import { ObjectId } from 'mongodb'
import db from '../database/db.js'

export async function validatonResult(req, res, next) {
  const id = req.params.id

  try {
    const getPoll = await db
      .collection('polls')
      .findOne({ _id: new ObjectId(id) })
    if (!getPoll) return res.sendStatus(404)
    res.locals.result = getPoll
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
