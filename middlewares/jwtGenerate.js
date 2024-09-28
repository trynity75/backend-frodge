const jwt = require('jsonwebtoken')

const generateToken = (userData = {}) => {
  try {
    const payload = { userData }
    const tokenKey = process.env.TOKEN_KEY
    const token = jwt.sign(payload, tokenKey, {
      expiresIn: '2h'
    })

    return token
  } catch(error) {
    console.log(error)

    return false
  }
}

module.exports = {
  generateToken
}