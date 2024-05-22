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

/**
 * @Param the function wait a request from json body type with UserModel informations
 * @Return a message and status from the request
 */
app.post('/api/user/register', async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'Invalid request body' })
  if (await UserModel.findOne({ email: req.body.email })) return res.status(401).json({ message: 'User already registered' })

  if (!req.body.cellphone) req.body.cellphone = null

  try {
    const user = new UserModel({
      _id: generateUniqueId(),
      name: req.body.name.toUpperCase(),
      email: req.body.email,
      password: req.body.password,
      cellphone: req.body.cellphone,
      isAdmin: req.body.isAdmin
    });
  
    void await user.save()
  
    return res.status(200).json({
      message: 'OK'
    })
  } catch {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
})

app.post('/api/user/login', async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'Invalid request body' })

  if (
    !req.body.email ||
    !req.body.password
  ) return res.status(400).json({ message: 'email or password is required' })

  const data = {
    email: req.body.email,
    password:  req.body.password
  }

  const userData = await UserModel.findOne(data)
  if(!userData) return res.status(404).json({ message: 'This user dosent exists' })

  const tokens = [
    generateUniqueId(),
    generateUniqueId(),
    generateUniqueId()
  ]

  return res.status(200).json({ tokens: tokens, isAdmin: userData.isAdmin, name: userData.name })
})

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port)
})