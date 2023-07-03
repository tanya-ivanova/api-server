const Post = require('../models/Post');
const Comment = require('../models/Comment');

async function getAll() {
    return Post.find({}).populate('_ownerId', 'email _id');
}

async function getByUserId(userId) {
    return Post.find({_ownerId: userId}).populate('_ownerId', 'email _id');
}

async function getById(id) {
    return Post.findById(id).populate('_ownerId').populate('comments');
}

async function create(item) {
    return Post.create(item);
}

async function update(id, item) {
    const existing = await Post.findById(id);

    existing.name = item.name;
    existing.mountain = item.mountain;
    existing.country = item.country;
    existing.duration = item.duration;
    existing.description = item.description;
    existing.latitude = item.latitude;
    existing.longitude = item.longitude;

    return existing.save();
}

async function deleteById(id) {
    return Post.findByIdAndDelete(id);
}

async function postLike(postId, userId) {    
    return Post.updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true });
}

async function postComment(content, _postId, _ownerId) {
    return Comment.create({ content, _postId, _ownerId })
        .then(comment => {
            return Post.findByIdAndUpdate({ _id: _postId }, { $push: { comments: comment._id } }, { new: true })          
        })
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getByUserId,
    postLike,
    postComment
}