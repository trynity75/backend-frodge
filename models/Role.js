const { Schema, model } = require('mongoose')

const roleSchema = Schema({
  name: {
    type: String,
    required: true,
  }
})

module.exports = model('Role', roleSchema)