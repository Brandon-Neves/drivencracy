import { ObjectId } from 'mongodb'
import db from '../database/db.js'

export async function getResults(req, res) {
  const { expireAt } = res.locals.result
  const pollTitle = res.locals.result.title
  const pollId = res.locals.result._id
  const getChoices = await db
    .collection('choices')
    .find({ pollId: pollId })
    .toArray()
  const getVotes = await db.collection('vote').find().toArray()

  let forNum = 0
  let forTitle
  for (let i = 0; i < getChoices.length; i++) {
    let cont = 0
    for (let j = 0; j < getVotes.length; j++) {
      if (getChoices[i]._id == new ObjectId(getVotes[j].choiceId).toString()) {
        cont++
      }
      if (cont > forNum) {
        forNum = cont
        forTitle = getChoices[i].title
      }
    }
  }

  try {
    const pollResult = {
      _id: pollId,
      title: pollTitle,
      expireAt: expireAt,
      result: {
        title: forTitle,
        votes: forNum
      }
    }
    res.send(pollResult)
  } catch (err) {
    res.sendStatus(500)
  }
}
