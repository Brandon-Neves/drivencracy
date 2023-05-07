import { ObjectId } from 'mongodb'
import db from '../database/db.js'

export async function validatonResult(req, res, next) {
  const id = req.params.id
  const getPoll = await db
    .collection('polls')
    .findOne({ _id: new ObjectId(id) })
  if (!getPoll) return res.sendStatus(404)
  const idPoll = getPoll._id

  try {
    const getChoice = await db.collection('choices').findOne({ pollId: idPoll })
    const idChoice = getChoice._id
    const getVote = await db
      .collection('vote')
      .find({ choiceId: idChoice })
      .toArray()
    const votes = getVote.length
    const pollResult = {
      _id: getPoll._id,
      title: getPoll.title,
      expireAt: getPoll.expireAt,
      result: {
        title: getChoice.title,
        votes
      }
    }
    res.locals.result = pollResult
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
