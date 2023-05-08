import { ObjectId } from 'mongodb'
import dayjs from 'dayjs'
import db from '../database/db.js'

export async function validationChoice(req, res, next) {
  const choice = req.body
  const { title, id } = req.body
  const now = dayjs()
  const poll = await db.collection('polls').findOne({ _id: new ObjectId(id) })
  const getChoice = await db
    .collection('choices')
    .findOne({ title, pollId: new ObjectId(id) })
  try {
    if (!poll) return res.sendStatus(404)
    if (!title || title.lenght === 0) return res.sendStatus(422)
    if (getChoice) return res.sendStatus(409)
    if (now.diff(poll.expireAt) > 0) return res.sendStatus(403)
    res.locals.choice = choice
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function validationChoiceId(req, res, next) {
  const id = req.params.id
  const poll = await db
    .collection('choices')
    .find({ pollId: new ObjectId(id) })
    .toArray()
  try {
    if (!poll || poll.length === 0) return res.sendStatus(404)
    res.locals.poll = poll
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
