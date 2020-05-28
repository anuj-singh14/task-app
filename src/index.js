const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Database cmd: /Users/anuja/mongodb/bin/mongod.exe --dbpath=/Users/anuja/mongodb-data

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up at ' + port)
})

const main = async () => {
    // const task = await Task.findById('5ed00910bb783629d8b91d3a')
    // await task.populate('owner').execPopulate()

    const user = await User.findById('5ed007fa612eb9407c918880')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()