const { Schema, model } = require('mongoose')

const recipesSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  imageurl: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    required: true,
  },
  allergens: {
    type: Array,
  },
  preparation: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  vegetarian: {
    type: Boolean
  }
})

module.exports = model('Recipe', recipesSchema)