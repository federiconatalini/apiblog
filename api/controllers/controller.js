var mongoose = require('mongoose'),
  Post = mongoose.model('Post');

exports.list_all_posts = function(req, res) {
  Post.find({}, function(err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};

exports.create_a_post = function(req, res) {
    var new_post = new Post(req.body);
    new_post.save(function(err, post) {
      if (err)
        res.send(err);
      res.json(post);
    });
  };

  exports.read_a_post = function(req, res) {
    Post.findById(req.params.postId, function(err, post) {
      if (err)
        res.send(err);
      res.json(post);
    });
  };
  
  exports.delete_a_post = function(req, res) {
    Post.remove({
      _id: req.params.postId
    }, function(err, post) {
      if (err)
        res.send(err);
      res.json({ message: 'Post successfully deleted' });
    });
  };
  