const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
  token = req.header('Authorization')?.split(' ')[1]
  try {
    if (!token) return res.status(401).json({
      ok: false,
      msg: `Token is required.`
    })
    const secret = process.env.TOKEN_KEY
    const decoded = jwt.verify(token, secret)
    req.user = decoded
    next()
  } catch(error) {
    console.log(`Error with token validation ${error}`)
    return res.status(500).json({
      ok: false,
      msg: `Fatal server error, please contact support Error: ${error}`
    })
  }
}

module.exports = { validateToken }