var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  public: {
    type: Boolean,
   default: false
  },
  featured: {
    type: Boolean,
   default: false
  }
});

module.exports = mongoose.model('Post', PostSchema);