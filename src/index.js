const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     return res.status(503).send('Site is under maintainence')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up at ' + port)
})


// const jwt = require('jsonwebtoken')

// const func = async () => {
//     const token = jwt.sign({ _id: 'abcd' }, 'ashjdoasjdoi')
//     console.log(token)
// }

// func()