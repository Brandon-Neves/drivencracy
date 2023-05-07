import express from 'express'
import { createdPoll, getPolls } from '../controllers/poll.controller.js'
import { pollValidation } from '../middlewares/poll.validation.js'

const pollRouter = express.Router()

pollRouter.post('/poll', pollValidation, createdPoll)
pollRouter.get('/poll', getPolls)

export default pollRouter
