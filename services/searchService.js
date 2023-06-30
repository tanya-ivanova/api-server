const Post = require('../models/Post');

async function searchPosts(search) {  
    return Post.find({
        name: {$regex: search, $options: 'i'},
    });
}

module.exports = {    
    searchPosts
}