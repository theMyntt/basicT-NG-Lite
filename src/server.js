const express = require('express')
const path = require('path')
const hbs = require('hbs')
const cors = require('cors')

const { generateUniqueId } = require('./utils/')
const { ProductModel, PurchaseModel, UserModel } = require('./data/connection')

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

// Api Routes
app.post('/api/user/register', async (req, res) => {
  if (!req) return res.status(400).json(null)

  if (UserModel.find(req.body.email)) return res.status(401).json(null)

  const user = new UserModel({
    _id: generateUniqueId(),
    email: req.body.email,
    password: req.body.password,
    cellphone: req.body.cellphone,
    isAdmin: req.body.isAdmin
  });

  void await user.save()

  return res.status(200).json({
    message: 'OK'
  })
})

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port)
})