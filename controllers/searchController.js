const { hasUser } = require('../middlewares/guards');
const {searchPosts} = require('../services/searchService');

const searchController = require('express').Router();

searchController.get('/', async (req, res) => {   
    const search = req.query.search;      

    let searchResults = [];
    if(search) {
        searchResults = await searchPosts(search);
    }
    
    res.json(searchResults);   
});

module.exports = searchController;