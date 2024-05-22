const express = require('express')
const path = require('path')
const hbs = require('hbs')
const cors = require('cors')

const app = express()
const port = 1023

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// HBS Templates
app.get('/', (req, res) => {
  res.render('login')
})

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port)
})