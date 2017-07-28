var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var CommentSchema = new Schema({
    userName: String,
    textArea: String,
    createdAt: Date,
    rating: Number
});

// CommentSchema.pre('save', function(next){
//     now = new Date();
//     this.updatedAt = now;
//     if ( !this.createdAt ) {
//         this.createdAt = now;
//     }
//     next();
// });

var PlaceSchema = new Schema({
    name: String,
    address: String,
    hours: String,
    description: String,
    averageRating: Number,
    createdAt: Date,
    updatedAt: Date,
    comments: [CommentSchema],
    img: String,
});

// PlaceSchema.pre('save', function(next){
//     now = new Date();
//     this.updatedAt = now;
//     if ( !this.createdAt ) {
//         this.createdAt = now;
//     }
//     next();
// });

// var UserSchema = new Schema({
    //   name: String,
    //   email: { type: String, required: true, unique: true },
    //   password: { type: String, required: true, unique: true },
    //   createdAt: Date,
    //   updatedAt: Date,
    //   comment: [CommentSchema]
// });


// UserSchema.pre('save', function(next){
//     now = new Date();
//     this.updated_at = now;
//     if ( !this.created_at ) {
//         this.created_at = now;
//     }
//     next();
// });


// var UserModel = mongoose.model("User", UserSchema);
var PlaceModel = mongoose.model("Place", PlaceSchema);
var CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = {
    // User: UserModel,
    Place: PlaceModel,
    Comment: CommentModel
};
