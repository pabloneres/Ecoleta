const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const port = 3333

app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(port, console.log(`Serve is running in port localhost:${port}`))

