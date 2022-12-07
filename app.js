const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const startUp = require('./utils/startUp')
const loginRouter = require('./server/routes/user')

dotenv.config();

startUp()

const app = express();

app.use(cors());

app.use(express.json())

app.use('/api/user', loginRouter)

app.get('/', (req, res) => {
  res.send({ message: 'hello world!' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on ${port}`));
