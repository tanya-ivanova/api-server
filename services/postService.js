const Post = require('../models/Post');

async function getAll() {
    return Post.find({});
}

async function getByUserId(userId) {
    return Post.find({_ownerId: userId});
}

async function getById(id) {
    return Post.findById(id);
}

async function create(item) {
    return Post.create(item);
}

async function update(id, item) {
    const existing = await Post.findById(id);

    existing.make = item.make;
    existing.model = item.model;
    existing.year = item.year;
    existing.description = item.description;
    existing.price = item.price;
    existing.img = item.img;
    existing.material = item.material;

    return existing.save();
}

async function deleteById(id) {
    return Post.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getByUserId,
}