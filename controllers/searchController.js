const { hasUser } = require('../middlewares/guards');
const {searchPosts} = require('../services/searchService');

const searchController = require('express').Router();

searchController.get('/', hasUser(), async (req, res) => {   
    const search = req.query.search; 
    const decodedSearch = decodeURIComponent(search);  
    const page = req.query.page;   

    let searchResults = [];
    if(search) {
        searchResults = await searchPosts(decodedSearch, page);
    }
    
    res.json({posts: searchResults.posts, count: searchResults.count});   
});

module.exports = searchController;