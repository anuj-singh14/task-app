require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5eae9be42f6ea60460b4ef65').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteandCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteandCount('5eaea125d7c7d63ba801d55a').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})