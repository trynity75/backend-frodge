const express = require('express')
const router = express.Router()
const { createUser, userLogIn, addIngredientById, deleteIngredientById, getUserById } = require('./../controllers/userController')
const {users} = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')

router.post('/register', users, validateFields, createUser)
router.post('/login', userLogIn)
router.put('/add-ingredient/:id', addIngredientById)
router.put('/remove-ingredient/:id', deleteIngredientById)
router.get('/get-user-by-id/:id', getUserById)


module.exports = router