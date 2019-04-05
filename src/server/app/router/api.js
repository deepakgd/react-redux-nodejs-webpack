// importing required npm packages
const express = require('express'),
    to = require('await-to-js').to,
    os = require('os');

// local handlers
const todoController = require('../controllers/todo'),
    utils = require('../utils');

//express router
const router = express.Router()

// return current user name of server system
router.get('/username', (req, res, next) => {
    return res.json({ username: os.userInfo().username || "" })
})

// create todo item in database
router.post('/todo', async (req, res, next) => {
    let [error, todo] = await to(todoController.createTodo(req.body));
    if(error) return utils.helper.handleError(res, error.status, error);
    return res.json({ data: todo });
})

//  return todo object from database
router.get('/todos', async (req, res, next) => {
    let [error, todos] = await to(todoController.getAllTodos());
    if(error) return utils.helper.handleError(res, error.status, error);
    return res.json({ data: todos });
})

// exporting all routes
module.exports = router