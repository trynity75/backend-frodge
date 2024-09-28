const User = require('./../models/User')
const bcrypt = require('bcrypt')
const { generateToken } = require('./../middlewares/jwtGenerate')

const createUser = async (req, res) => {
  const { email, password, } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (user) return res.status(400).json({
      ok: false,
      msg: `${email} is already in use!`
    })
    const salt = bcrypt.genSaltSync()
    const dbUser = new User({
      email: email,
      password: password
    })
    dbUser.password = bcrypt.hashSync(password, salt)
    await dbUser.save()
    return res.status(201).json({
      ok: true,
      msg: `${email} has been registered successfully!`
    })
  } catch(error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Please contact support.'
    })
  }
}

const userLogIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const dbUser = await User.findOne({ email })
    if (!dbUser) return res.status(400).json({
      ok: false,
      msg: `User doesn't exist.`
    })
    const validatePassword = bcrypt.compareSync(password, dbUser.password)
    if (!validatePassword) return res.status(400).json({
      ok: false,
      msg: `Password incorrect.`
    })
    const token = await generateToken(dbUser._id, dbUser.email)
    const id = dbUser._id

    return res.status(200).json({
      ok: true,
      msg: `${dbUser.email} Bienvenido a Frodge!`,
      token: token,
      id: id
    })
  } catch(error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Please contact support.'
    })
  }
}

const addIngredientById = async (req, res) => {
  const productName = req.body.name
  const id = req.params.id
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg:'El Usuario no existe en base de datos!'
      })
    }
    user.ingredients.push(productName)
    await user.save()
    return res.status(200).json({
      ok: true,
      msg: `${productName} agregado a la Despensa!`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error del servidor, contactar a soporte.'
    })
  }
}

const deleteIngredientById = async (req, res) => {
  const productName = req.body.name
  const id = req.params.id
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'El Usuario no existe en base de datos!'
      })
    }
    const resultado = user.ingredients.filter(ingredient => ingredient != `${productName}`)
    user.ingredients = resultado
    await user.save()
    return res.status(200).json({
      ok: true,
      msg: `${productName} eliminado de la Despensa!`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error del servidor, contactar a soporte.'
    })
  }
}

const getUserById = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const user = await User.findOne({ _id: id }).select('-password');
    console.log(user)
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario no encontrado'
      })
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte a soporte'
    })
  }
}



module.exports = {
  createUser,
  userLogIn,
  addIngredientById,
  deleteIngredientById,
  getUserById
}