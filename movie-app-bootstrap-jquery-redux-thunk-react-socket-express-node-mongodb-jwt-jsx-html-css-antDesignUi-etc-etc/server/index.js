const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config()

const config = require("./config/key")

const connect = mongoose.connect(config.mongoURI, {  useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/users', require('./routes/users'))
app.use('/api/comment', require('./routes/comment'))
app.use('/api/like', require('./routes/like'))
app.use('/api/favorite', require('./routes/favorite'))

app.use('/uploads', express.static('uploads'))

if (process.env.NODE_ENV === "prod") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")))
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server Running At Port: ${port}`))