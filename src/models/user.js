const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('user', {
    name: {
        type: String
    }, 
    email: {
        type: String,
        requried: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email!')
            }
        }       
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age cannot be negative')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password is weak')
            }
        }
    }
})

module.exports = User