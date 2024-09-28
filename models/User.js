const { Schema, model } = require('mongoose')

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isadmin: {
    type: Boolean,
    default: false
  },
  ingredients: {
    type: Array
  },
  recipes: {
    type: Array
  }
})

module.exports = model('Users', userSchema)