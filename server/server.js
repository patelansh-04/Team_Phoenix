const connectToMongo = require('./db.js');
const express = require('express')
const app = express()
const port = 5000
const cors=require('cors')

connectToMongo();

app.use(express.json())
app.use(cors({origin:'*'})) // Allow all origins, you can specify a specific origin if needed;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})