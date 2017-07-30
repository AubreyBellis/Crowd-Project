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
    description:'Ponce City Market breathes new life into the historic Sears, Roebuck & Co. building in Atlanta. The classic structure, which is the area’s largest adaptive reuse project, has been reinvented as a vibrant community hub housing the Central Food Hall, various shops, flats and offices, all while pointing back to the roots of its inception. The market infuses vigor and excitement into this historically-signiﬁcant structure, located in one of Atlanta’s most cherished neighborhoods.',
    image: url("http://i.imgur.com/6l74LVX.jpg"),
    // averageRating: ,
    // updatedAt: Date,
    // createdAt: Date,
    comments:[
        {
        userName: 'Dude',
        title: 'too many people!',
        text: 'Swag you probably haven\'t heard of them bitters knausgaard shabby chic pabst. Williamsburg iPhone occupy bitters, photo booth tattooed raw denim.',
        rating: 5,
        },
        {
        userName: 'Jason',
        title: 'great place, really quiet',
        text: 'Typewriter pork belly 8-bit synth cray taxidermy poke kickstarter adaptogen authentic chartreuse, gluten-free church-key trust fund.',
        rating: 1,
        },
        {
        userName: 'drugzNot-hugz1',
        title: 'Alright',
        text: 'Pitchfork heirloom austin everyday carry air plant deep v williamsburg pabst kale chips photo booth you probably haven\'t heard of them raclette.',
        rating: 3,
        },
    ],
});

var clermontLounge = new Place({
    name: 'Historic Clermont Lounge',
    address: '789 Ponce De Leon Ave NE, Atlanta, GA 30306',
    hours:'Monday – Saturday 1PM – 3AM',
    description:'THE WORLD FAMOUS CLERMONT LOUNGE IS THE GREATEST SHOW ON EARTH! A CAN’T MISS ATLANTA ATTRACTION, THE CLERMONT IS ATLANTA’S OLDEST STRIP CLUB AND CONSISTENTLY RANKED AS ONE OF THE COOLEST DIVE BARS IN THE WORLD!',
    // averageRating: ,
    // updatedAt: Date,
    // createdAt: Date,
    comments:[
        {
        userName: 'Dude',
        title: 'too many people!',
        text: 'Swag you probably haven\'t heard of them bitters knausgaard shabby chic pabst. Williamsburg iPhone occupy bitters, photo booth tattooed raw denim.',
        rating: 5,
        },
        {
        userName: 'Jason',
        title: 'great place, really quiet',
        text: 'Typewriter pork belly 8-bit synth cray taxidermy poke kickstarter adaptogen authentic chartreuse, gluten-free church-key trust fund.',
        rating: 1,
        },
        {
        userName: 'drugzNot-hugz1',
        title: 'Alright',
        text: 'Pitchfork heirloom austin everyday carry air plant deep v williamsburg pabst kale chips photo booth you probably haven\'t heard of them raclette.',
        rating: 3,
        },
    ],
    image:  

var victory = new Place({
    name: 'Victory Sandwich Bar',
    address: '913 Bernina Ave NE, Atlanta, GA 30307', 
    hours:'Monday – Saturday 11AM - 2AM',
    description:'fhadjfdsjkgdhgjkfghfjgkhfjkghhsdgsjkfagdksjgfklghdsjkghjjgdkgfhj',
    // averageRating: ,
    // updatedAt: Date,
    // createdAt: Date,
    comments:[
        {
        userName: 'Dude',
        title: 'too many people!',
        text: 'Swag you probably haven\'t heard of them bitters knausgaard shabby chic pabst. Williamsburg iPhone occupy bitters, photo booth tattooed raw denim.',
        rating: 5,
        },
        {
        userName: 'Jason',
        title: 'great place, really quiet',
        text: 'Typewriter pork belly 8-bit synth cray taxidermy poke kickstarter adaptogen authentic chartreuse, gluten-free church-key trust fund.',
        rating: 1,
        },
        {
        userName: 'drugzNot-hugz1',
        title: 'Alright',
        text: 'Pitchfork heirloom austin everyday carry air plant deep v williamsburg pabst kale chips photo booth you probably haven\'t heard of them raclette.',
        rating: 3,
        },
    ],
    image: 'http://i.imgur.com/zdXXXMot.jpg'
});

// save the places
pcm.save(function(err) {
    if (err) console.log(err);

    console.log('PCM');
});

clermontLounge.save(function(err) {
    if (err) console.log(err);

    console.log('Clermont Lounge');
});

victory.save(function(err) {
    if (err) console.log(err);
    
    console.log('Victory!');
});

mongoose.connection.close();