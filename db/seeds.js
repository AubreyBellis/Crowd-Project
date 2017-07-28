var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crowd');

var Place = require('../models/place');
var Comment = require('../models/comment');

// Use native promises
mongoose.Promise = global.Promise;

// First we clear the database of existing users and items.
Comment.remove({}, function(err){
    console.log(err);
});

Place.remove({}, function(err){
    console.log(err);
});

// create new places
var pcm = new Place({
    name: 'Ponce City Market',
    address: '675 Ponce De Leon Avenue NE Atlanta, Ga 30308',
    hours:'MONDAY-SATURDAY 10AM-9PM, SUNDAY 12PM-6PM',
    description:'fhadjfdsjkgdhgjkfghfjgkhfjkghhsdgsjkfagdksjgfklghdsjkghjjgdkgfhj',
    // averageRating: ,
    // updatedAt: Date,
    // createdAt: Date,
    comment:[{         }]
});

var clairmontLounge = new Place({
    name: 'Historic Clairmont Lounge',
    address: '789 Ponce De Leon Ave NE, Atlanta, GA 30306',
    hours:'Monday – Saturday 1PM – 3AM',
    description:'fhadjfdsjkgdhgjkfghfjgkhfjkghhsdgsjkfagdksjgfklghdsjkghjjgdkgfhj',
    // averageRating: ,
    // updatedAt: Date,
    // createdAt: Date,
    comment:[{         }]
});

var victory = new Place({
    name: 'Victory Sandwich Bar',
    address: '913 Bernina Ave NE, Atlanta, GA 30307', 
    hours:'Monday – Saturday 11AM - 2AM',
    description:'fhadjfdsjkgdhgjkfghfjgkhfjkghhsdgsjkfagdksjgfklghdsjkghjjgdkgfhj',
    // averageRating: ,
    // updatedAt: Date,
    // createdAt: Date,
    comment:[{         }]
});

// save the places
pcm.save(function(err) {
    if (err) console.log(err);

    console.log('PCM');
});

clairmontLounge.save(function(err) {
    if (err) console.log(err);

    console.log('Clairmont Lounge');
});

victory.save(function(err) {
    if (err) console.log(err);
    
    console.log('Victory!');
});

mongoose.connection.close();