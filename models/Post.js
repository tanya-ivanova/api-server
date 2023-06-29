const {Schema, model, Types: {ObjectId}} = require('mongoose');

const postSchema = new Schema({
    name: {type: String, required: true, minLength: [3, 'Name must be at least 3 characters long']},
    mountain: {type: String, required: true, minLength: [3, 'Mountain must be at least 3 characters long']},
    country: {type: String, required: true, minLength: [3, 'Country must be at least 3 characters long']},
    duration: {type: String, required: true, minLength: [2, 'Duration must be at least 2 characters long']},
    description: {type: String, required: true, minLength: [10, 'Description must be at least 10 characters long']},
    photos: {type: [String], required: [true, 'At least one photo is required']},    
    _ownerId: {type: ObjectId, ref: 'User', required: true}
});

const Post = model('Post', postSchema);

module.exports = Post;