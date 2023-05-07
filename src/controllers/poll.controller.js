import db from '../database/db.js'

export async function createdPoll(req, res) {
  const { title, expireAt } = res.locals.newPoll
  console.log(title, expireAt)

  try {
    await db.collection('polls').insertOne({
      title: title,
      expireAt: expireAt
    })
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function getPolls(req, res) {
  try {
    const polls = await db.collection('polls').find().toArray()
    res.send(polls)
  } catch (err) {
    res.sendStatus(500)
  }
}
