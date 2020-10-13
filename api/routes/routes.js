'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/controller.js');
  
    app.route('/posts')
      .get(todoList.list_all_posts)
      .post(todoList.create_a_post);
  
  
    app.route('/posts/:postId')
      .get(todoList.read_a_post)
      //.put(todoList.update_a_post)
      .delete(todoList.delete_a_post);
  };