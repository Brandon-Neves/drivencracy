import { ObjectId } from 'mongodb'
import db from '../database/db.js'

export async function registerChoice(req, res) {
  const { title, id } = res.locals.choice
  try {
    await db
      .collection('choices')
      .insertOne({ title: title, pollId: new ObjectId(id) })
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function getChoiceId(req, res) {
  const poll = res.locals.poll
  try {
    res.send(poll)
  } catch (err) {
    res.sendStatus(500)
  }
}
