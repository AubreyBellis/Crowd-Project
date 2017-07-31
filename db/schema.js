var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var CommentSchema = new Schema({
    userName: String,
    title: String,
    text: String,
    created_at: Date,
    rating: Number
});

var PlaceSchema = new Schema({
    name: String,
    address: String,
    hours: String,
    description: String,
    averageRating: Number,
    created_at: Date,
    updated_at: Date,
    comments: [CommentSchema],
    img: String,
});

var ItemSchema = new Schema({
  name: String
});

var UserSchema = new Schema({
      first_name: String,
      last_name: String,
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true, unique: true },
      created_at: Date,
      updated_at: Date,
      // comment: [CommentSchema]
});



CommentSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

PlaceSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});


var UserModel = mongoose.model("User", UserSchema);
var PlaceModel = mongoose.model("Place", PlaceSchema);
var CommentModel = mongoose.model("Comment", CommentSchema);
var ItemModel = mongoose.model("Item", ItemSchema);

module.exports = {
    User: UserModel,
    Place: PlaceModel,
    Comment: CommentModel,
    Item: ItemModel
};
