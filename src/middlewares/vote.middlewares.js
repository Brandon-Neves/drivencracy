import { ObjectId } from 'mongodb'
import db from '../database/db.js'
import dayjs from 'dayjs'

export async function validationVoteId(req, res, next) {
  const id = req.params.id
  const now = dayjs()

  try {
    const choiceIsValid = await db
      .collection('choices')
      .findOne({ _id: new ObjectId(id) })
    if (!choiceIsValid) return res.sendStatus(404)

    const pollIsValid = await db
      .collection('polls')
      .findOne({ _id: choiceIsValid.pollId })
    const { expireAt } = pollIsValid
    if (now.diff(expireAt) > 0) return res.sendStatus(403)

    res.locals.choice = choiceIsValid
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
