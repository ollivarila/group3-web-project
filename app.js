const express = require('express')
const cors = require('cors')
const path = require('path')
const startUp = require('./utils/startUp')
const loginRouter = require('./server/routes/user')
const shoppingListRouter = require('./server/routes/shoppingList')
const config = require('./config')

startUp()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.options('*', cors())
  app.use(cors({ origin: 'http://localhost:3000', preflightContinue: true })) // https://shopping-list-app.fly.dev
} else {
  app.use(cors())
}

app.get('/health', (req, res) => {
  res.send('ok')
})

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

app.use('/api/user', loginRouter)
app.use('/api/shoppingLists', shoppingListRouter)

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile('index.html', {
      root: path.join(__dirname, 'build/'),
    })
  })
}

const port = config.PORT

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server listening on ${port}`))
}

module.exports = app
