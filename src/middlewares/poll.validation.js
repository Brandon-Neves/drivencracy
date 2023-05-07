import db from '../database/db.js'

export async function pollValidation(req, res, next) {
  const poll = req.body
  let { expireAt } = req.body
  const { title } = req.body
  if (!title || title.lenght === 0) return res.sendStatus(422)
  if (!expireAt) {
    expireAt = new Date()
    expireAt.setDate(expireAt.getDate() + 30)
    const newPoll = { title, expireAt }
    res.locals.newPoll = newPoll
    return next()
  }
  res.locals.poll = poll
  next()
}
