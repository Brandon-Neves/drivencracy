import express from 'express'
import {
  validationChoice,
  validationChoiceId
} from '../middlewares/choice.middleware.js'
import {
  getChoiceId,
  registerChoice
} from '../controllers/choice.controller.js'

const choiceRouter = express.Router()

choiceRouter.post('/choice', validationChoice, registerChoice)
choiceRouter.get('/poll/:id/choice', validationChoiceId, getChoiceId)

export default choiceRouter
