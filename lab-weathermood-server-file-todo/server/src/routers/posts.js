const express = require('express');
const bodyParser = require('body-parser');
 
const postModel = require('../model/posts.js');
const voteModel = require('../model/votes.js');
const todoModel = require('../model/todos.js');
 
const router = express.Router();
 
router.use(bodyParser.json());
 
// List
router.get('/posts', function(req, res, next) {
    postModel.list(req.query.searchText).then(posts => {
        res.json(posts);
    }).catch(next);
});
 
// Create
router.post('/posts', function(req, res, next) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.create(mood, text).then(post => {
        res.json(post);
    }).catch(next);
});
 
// Vote
router.post('/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res, next) {
    const {id, mood} = req.params;
    if (!id || !mood) {
        const err = new Error('Post ID and mood are required');
        err.status = 400;
        throw err;
    }
    voteModel.create(id, mood).then(post => {
        res.json(post);
    }).catch(next);
});
 
////////////////todos
 
// List todos
router.get('/todos', function(req, res, next) {
    let unaccomplishedOnly;
    if (req.query.unaccomplishedOnly === 'false')
        unaccomplishedOnly = false;
    else
        unaccomplishedOnly = true;
    todoModel.list(unaccomplishedOnly, req.query.searchText).then(todos => {
        res.json(todos);
    }).catch(next);
});
 
// Create todos
router.post('/todos', function(req, res, next) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.create(mood, text).then(todos => {
        res.json(todos);
    }).catch(next);
});
 
// acconplish todos
router.post('/todos/:id', function(req, res, next) {
    const {id} = req.params;
    if (!id) {
        const err = new Error('Post ID and mood are required');
        err.status = 400;
        throw err;
    }
    todoModel.accomplishTodo(id).then(todos => {
        res.json(todos);
    }).catch(next);
});
 
module.exports = router;
 