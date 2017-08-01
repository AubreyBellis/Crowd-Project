var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crowd');

var Place = require('../models/place');
var Comment = require('../models/comment');
var User = require('../models/user');
var Favorites = require('../models/favorites');

// Use native promises
mongoose.Promise = global.Promise;

// First we clear the database of existing users and items.
Comment.remove({}, function(err){
    console.log(err);
});

Place.remove({}, function(err){
    console.log(err);
});

User.remove({}, function(err){
    console.log(err);
});
Favorites.remove({}, function(err){
  console.log(err);
});
// create new places
var pcm = new Place({
    name: 'Ponce City Market',
    address: '675 Ponce De Leon Avenue NE Atlanta, Ga 30308',
    hours:'Monday-Saturday 10AM-9PM, Sunday 12PM-6PM',
    description:'Ponce City Market breathes new life into the historic Sears, Roebuck & Co. building in Atlanta. The classic structure, which is the area’s largest adaptive reuse project, has been reinvented as a vibrant community hub housing the Central Food Hall, various shops, flats and offices, all while pointing back to the roots of its inception. The market infuses vigor and excitement into this historically-signiﬁcant structure, located in one of Atlanta’s most cherished neighborhoods.',

    // averageRating: ,
    // updatedAt: Date,
    // createdAt: Date,
    comments:[
        {
        userName: 'Carl',
        title: 'too many people!',
        text: ' it\s such a happening spot, it\'s pretty crowded on weekends. Expect there to be lines to every restaurant, and even the restrooms.',
        rating: 4,
        },
        {
        userName: 'Joe',
        title: 'cool',
        text: 'PCM is trendy and lively. If you have mirrored lens sunglasses, gel-slicked hair, loafers, a Whole Foods Market obsession, and a mangy dog. You\'ll fit in. ',
        rating: 1,
        },
        {
        userName: 'Heather M',
        title: 'Alright',
        text: 'this would be the kind of place posers go to and pretend they\'re hipsters. & alot of them.',
        rating: 3,
        },
       {
        userName: 'Lauren L',
        title: 'Great!',
         text: 'The parking was a little difficult and the place was pretty crowded (but granted, it was a Friday night) but the variety of stores and restaurants was fantastic!',
        rating: 3,
        },
    ],
     image:'http://i.imgur.com/YnpbXtR.jpg',
});

var clermontLounge = new Place({
    name: 'Historic Clermont Lounge',
    address: '789 Ponce De Leon Ave NE, Atlanta, GA 30306',
    hours:'Monday – Saturday 1PM – 3AM',
    description:'The world famous Clermont Lounge is the greatest show on earth! A can\'t miss Atlanta attraction, the Clermont Lounge is Atlanta\'s oldest strip club!',
    // averageRating: ,
    // updatedAt: Date,
    // createdAt: Date,
    comments:[
        {
        userName: 'Brad',
        title: 'New Years Eve!',
        text: 'The place was packed and we thought we were going to be the only crazy people going to an strip club in New Years, but ohhh boy if we were wrong.',
        rating: 5,
        },
        {
        userName: 'Elvis',
        title: 'great place, really quiet',
        text: 'Don\'t wear heavy clothing, it is tight and hot! very hot. You will need to jump in a shower with all clothes on after leaving here...nasty and sweaty. But you will have a memory that will last forever. Come with a open mind.',        
        rating: 1,
        },
        {
        userName: 'drugzNot-hugz1',
        title: 'Alright',
       text: 'Yes, as good as it gets.',
        rating: 3,
        },
       {
        userName: 'StripperDaze',
        title: 'yeahhhhh',
         text: 'Such a great place to see some talent! Btw ask for Barbie, blonde super hot milf great tattoos! Tell her the captain sent you!',
        rating: 3,
        },
    ],
    image:'http://i.imgur.com/6l74LVXm.jpg',
});

var highMuseumOfArt = new Place({
    name: 'High Museum of Art',
    address: '1280 Peachtree St. NE Atlanta, GA 30309',
    hours:'Tuesday-Saturday 10am-5pm & Sunday 12pm-5pm',
    description:'With more than 15,000 works of art in its permanent collection, the High has an extensive anthology of 19th- and 20th-century American and decorative art; significant holdings of European paintings; a growing collection of African American art; and burgeoning collections of modern and contemporary art, photography, folk art and African art. The High is also dedicated to supporting and collecting works by Southern artists.',
    // averageRating: ,
    // updatedAt: Date,
    // createdAt: Date,
    comments:[
        {
        userName: 'Jenn L',
        title: 'Highly Recommend!',
        text: 'Love this! Very open and bright atmosphere. Museum staff were ready with recommendations.  Beautiful collections and parking was really easy. I went on a Sunday and it wasnt over crowded either. I\'ve lived in Atlanta for a while but hasnt gone because I thought it would be expensive but it is actually very affordable. Highly recommend!',
        rating: 5,
        },
        {
        userName: 'Jason',
        title: 'great place, really quiet',
        text: 'This place gets packed quickly, so I recommend going early.  It has a nice rotation of exhibits as other reviewers have noted.  Parking is a nightmare (from what Ive seen).  I live nearby, so I walk over to the Museum and don\'t have that issue.  Id recommend going to a nearby parking deck depending on the day, hour, and exhibits. Anyway, its well worth supporting and experiencing.',
        rating: 4,
    },
        {
        userName: 'Mark H',
        title: 'Yas',
        text: 'Yes, as good as it gets. Great programming.',
        rating: 5,
    },
        {
        userName: 'Stephanie',
        title: 'Yas',
        text: 'Overall, took about 2 hours, just glancing at most of the exhibits and taking time to study the ones I really liked',
        rating: 3,
        },   
    ],
    image:'http://i.imgur.com/q6T6cM2m.jpg',
});

var victory = new Place({
    name: 'Victory Sandwich Bar',
    address: '913 Bernina Ave NE, Atlanta, GA 30307', 
    hours:'Monday – Saturday 11AM - 2AM',
    description:'Minimalist decor, creative sandwiches sized as bar snacks, late hours, and a sleek, inviting patio.',
    // averageRating: ,
    // updatedAt: Date,
    // createdAt: Date,
    comments:[
        {
        userName: 'Yooo',
        title: 'ok!',
        text: '“They have a game room with a ping pong table in back, so a fun spot to chill after dinner and hang out for a bit with a drink. Gets taken quick though so be sure to call your place in line',
        rating: 5,
        },
        {
        userName: 'Heather',
        title: 'seating',
        text: 'The indoor seating is limited (bar, some high top tables, and some low-top tables), but there is additional patio seating out front (not covered) and in the back (covered, walled-off).',
        rating: 3,
        },
        {
        userName: 'James T',
        title: 'Alright',
        text: 'Cool hipster feel. Laid back. Crowd can get a bit rowdy on the weekends, so if you are not about that, check this place out at an earlier time during the weekdays.',
        rating: 3,
        },
    ],
    image: 'http://i.imgur.com/qQekeqsm.jpg'
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

// create new users
// var kris = new User({
//   first_name: 'Kris',
//   email: 'kris@gmail.com',
//   items: [{ name: "Code some code" }]
// });

// var jessica = new User({
//   first_name: 'Jessica',
//   email: 'Jessica@gmail.com',
//   items: [{ name: "Get dry cleaning" }]
// });

// var aubrey = new User({
//   first_name: 'Aubrey',
//   email: 'Aubrey@gmail.com',
//   items: [{ name: "Go to the dog park" }, { name: "Go to the cat park" }]
// });

// save the users
// kris.save(function(err) {
//   if (err) console.log(err);

//   console.log('Kris created!');
// });

// jessica.save(function(err) {
//   if (err) console.log(err);

//   console.log('Jessica created!');
// });

// aubrey.save(function(err) {
//   if (err) console.log(err);
  
//   console.log('Aubrey created!');
// });


highMuseumOfArt.save(function(err) {
    if (err) console.log(err);
    
    console.log('High!');
});

mongoose.connection.close();