const {Schema, model, Types: {ObjectId}} = require('mongoose');

const commentSchema = new Schema({    
    content: {type: String, required: true, minLength: [5, 'Comment must be at least 5 characters long']},
    _ownerId: {type: ObjectId, ref: 'User'},
    _postId: {type: ObjectId, ref: 'Post'},
}, {timestamps: true});

const Comment = model('Comment', commentSchema);

module.exports = Comment;