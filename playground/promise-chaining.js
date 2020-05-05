require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5eaeaddf1529775d88be50d7', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeandCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeandCount('5eaeaddf1529775d88be50d7', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})