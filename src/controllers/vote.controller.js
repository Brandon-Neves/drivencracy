import dayjs from 'dayjs'
import db from '../database/db.js'

export async function registrationVote(req, res) {
  const now = dayjs().format('YYYY-MM-DD HH:mm')
  const { _id } = res.locals.choice
  try {
    await db.collection('vote').insertOne({ createdAt: now, choiceId: _id })
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(500)
  }
}
