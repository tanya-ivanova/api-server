const { getAll, create, getById, update, deleteById, getByUserId, postLike, postComment } = require('../services/postService');
const { hasUser } = require('../middlewares/guards');
const { parseError } = require('../util/parser');
const { count } = require('../models/Post');

const dataController = require('express').Router();

dataController.get('/', async (req, res) => {
    let items = [];
    if (req.query.where) {
        const userId = JSON.parse(req.query.where.split('=')[1]);
        items = await getByUserId(userId);
    } else {
        ({posts, count}) = await getAll(req.query.page);
    }
    res.json(items);
});

dataController.post('/', hasUser(), async (req, res) => {
    try {
        const data = Object.assign({ _ownerId: req.user._id }, req.body);
        const item = await create(data);
        res.json(item);

    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

dataController.get('/:id', async (req, res) => {
    const item = await getById(req.params.id);
    res.json(item);
});

dataController.put('/:id', hasUser(), async (req, res) => {
    const item = await getById(req.params.id);
    if (req.user._id != item._ownerId._id) {
        return res.status(403).json({ message: 'You can\'t modify this record' });
    }

    try {
        const result = await update(req.params.id, req.body);
        res.json(result);

    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

dataController.delete('/:id', hasUser(), async (req, res) => {
    const item = await getById(req.params.id);
    if (req.user._id != item._ownerId._id) {
        return res.status(403).json({ message: 'You can\'t modify this record' });
    }

    try {
        await deleteById(req.params.id);
        res.status(204).end();

    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

dataController.post('/:id/likes', hasUser(), async (req, res) => {
    const item = await getById(req.params.id);
    if (req.user._id == item._ownerId._id) {
        return res.status(403).json({ message: 'You can\'t like your own post' });
    }
    
    if(item.likes.includes(req.user._id)) {
        return res.status(403).json({ message: 'You can\'t like a post twice' });
    }

    await postLike(req.params.id, req.user._id);
    res.status(200).json({ message: 'Liked successful!' });
});

dataController.post('/:id/comments', hasUser(), async (req, res) => {
    try {
        const comment = await postComment(req.body.content, req.params.id, req.user._id);
        res.json(comment);

    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = dataController;
