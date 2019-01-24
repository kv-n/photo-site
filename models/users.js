const mongoose = require('mongoose');
Photo = require('./photos')


const userSchema = mongoose.Schema({
    user: {type: String, required:true},
    password: {type: String, required:true},
    photo: [Photo.schema]
})

const User = mongoose.model('User', userSchema)

module.exports = User;