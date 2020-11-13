const mongoose = require('mongoose');
const { User } = require('./User');
const Schema = mongoose.Schema

// timestamps는 생성된 시간을 자동으로 처리해준다.

const favoriteSchema = mongoose.Schema({
    userFrom : {
        type : Schema.Types.ObjectId,
        ref : User
    },
    movieId : {
        type : String
    },
    movieTitle : {
        type : String
    },
    moviePost : {
        type : String 
    },
    movieRunTime : {
        type : String
    }
}, { timestamps : true })

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite };