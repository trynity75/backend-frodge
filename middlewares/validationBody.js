const { body } = require('express-validator')
const users = [
  body('email', 'Email field is required.').notEmpty(),
  body('email', 'Email address not valid.').normalizeEmail().isEmail(),
  body('password', 'Password must contain uppercase, lowercase, numbers and special characters.').isStrongPassword()
]

const products = [
  body('name', 'El nombre del producto es requerido!').notEmpty(),
  body('type', 'El tipo del producto es requerido!').notEmpty(),
  body('description', 'La descripcion del producto es requerida!').notEmpty(),
]

const recipes = [
  body('name', 'El nombre de la receta es requerido!').notEmpty(),
  body('ingredients', 'Los ingredientes de la receta son requeridos!').notEmpty(),
  body('preparation', 'Las instrucciones de preparacion son requeridas!').notEmpty(),
]


module.exports = {
  users,
  products,
  recipes
}