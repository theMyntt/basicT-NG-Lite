const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/basict')
.then(() => {
  console.log('Connected to MongoDB')
})
.catch(() => {
  console.log('Error connecting to MongoDB')
})