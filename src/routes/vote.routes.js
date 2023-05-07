import express from 'express'
import { validationVoteId } from '../middlewares/vote.middlewares.js'
import { registrationVote } from '../controllers/vote.controller.js'

const voteRouter = express.Router()

voteRouter.post('/choice/:id/vote', validationVoteId, registrationVote)

export default voteRouter
