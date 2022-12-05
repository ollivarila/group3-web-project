const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send({ message: 'hello world!' })
})

const port = process.env.PORT | 3000

app.listen(port, () => console.log(`Server listening on ${port}`))
