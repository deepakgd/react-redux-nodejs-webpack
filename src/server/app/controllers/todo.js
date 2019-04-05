// importing required npm packages
const to = require('await-to-js').to,
    only = require('only');

// import script files
const config = require('../../config'),
    models = require('../models');

module.exports = {
    /**
     * createTodo - create todo item in database
     * @param {OBJECT} body - contains title, description, priority and status of todo item 
     */
    createTodo: function(body){
        return new Promise(async (resolve, reject) => {
            let todo = new models.todos(only(body, "title description priority status"));
            let [error, response] = await to(todo.save());
            if(error) return reject({ status: 500, error });
            resolve({ message: "Todo created successfully", response })
        })
    },
    /**
     * getAllTodos - return all todo list 
     */
    getAllTodos: function(){
        return new Promise(async (resolve, reject) => {
            let [error, response] = await to(models.todos.find({}));
            if(error) return reject({ status: 500, error });
            resolve(response)
        }) 
    } 
}