import express from 'express'
import { getResults } from '../controllers/result.controller.js'
import { validatonResult } from '../middlewares/result.middleware.js'

const resultVoteRouter = express.Router()

resultVoteRouter.get('/poll/:id/result', validatonResult, getResults)

export default resultVoteRouter
