import cors from 'cors'
import express from 'express'
import pollRouter from './routes/poll.routes.js'
import choiceRouter from './routes/choice.routes.js'
import voteRouter from './routes/vote.routes.js'
import resultVoteRouter from './routes/results.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use([pollRouter, choiceRouter, voteRouter, resultVoteRouter])

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Servidor funcionando na porta ${port}`)
})
