const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userLikesSchema = new Schema({
    socialID: {
        type: Number,
    },
    likes: {
        type: Array,
    }
});

module.exports = mongoose.model('UserLikes', userLikesSchema);