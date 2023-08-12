const Post = require('../models/Post');

const pageSize = 3;

async function searchPosts(search, page) {   
    const skipRecords = (page - 1) * pageSize;

    const posts = await Post
        .find({
            name: { $regex: search, $options: 'i' },
        })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(skipRecords)
        .populate('_ownerId', 'email _id');

    const count = await Post
        .find({
            name: { $regex: search, $options: 'i' },
        })
        .count();

    return {
        posts,
        count
    };
}

module.exports = {
    searchPosts
}