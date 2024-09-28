const express = require('express')
const app = express()
const dotenv = require('dotenv')
const api = require('./routes/api.routes')
const cors = require('cors')
const path = require('path')

dotenv.config();
const port = process.env.PORT
const databaseConnect = require('./db/config')
databaseConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// app.use('/', express.static(__dirname + '/dist/frontend-frodge/browser'))
// app.get('/*', (req,res, next) => {
//   res.sendFile(path.resolve(__dirname + '/dist/frontend-frodge/browser/index.html'))
// })
app.use('/', api)

// app.listen(8080, () => {
//   console.log(`Servidor conectado en el puerto ${port}!`)
// })

module.exports = app