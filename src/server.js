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
  if (!req.body) return res.status(400).json({ message: 'Invalid request body' })
  if (await UserModel.findOne({ email: req.body.email })) return res.status(401).json(null)

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

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port)
})