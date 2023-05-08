import dayjs from 'dayjs'

export async function pollValidation(req, res, next) {
  const poll = req.body
  let { expireAt } = req.body
  const { title } = req.body

  try {
    if (!title || title.lenght === 0) return res.sendStatus(422)
    if (!expireAt) {
      expireAt = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
      const newPoll = { title, expireAt }
      res.locals.poll = newPoll
      return next()
    }
    res.locals.poll = poll
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
