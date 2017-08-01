var express = require('express');
var router = express.Router();

var Place = require('../models/place');
var Comment = require('../models/comment');

// PLACE INDEX ROUTE
router.get('/', (req, res) => {
  Place.find({}).then((place) => {
    // res.send('PLACES GO HERE!');
    console.log('places index text');
    res.render(
        'places/index',
        { place },
        );
  }).catch((err) => {
    console.log('Error retrieving places from database!');
    console.log(err);
  });
});

// RENDER PLACE CREATE 'NEW' FORM
router.get('/new', (req, res) => {
  // res.send('new form');
  console.log('new place form');
  res.render('places/new');
});

// PLACE CREATE POST ROUTE
router.post('/', (req, res) => {
console.log('posting new place');
  const newPlaceInfoFromForm = req.body;

   Place.create(newPlaceInfoFromForm).then((place) => {
    //  res.send('new place')
    res.render(
         'places/show',
         {place}
           );
   }).catch((err) => {
     console.log('Error saving new user to database!');
     console.log(err);
   });
});


//  PLACE SHOW ROUTE
router.get('/:id', (req, res) => {
  const placeIdToSearchDbFor = req.params.id;

  Place.findById(placeIdToSearchDbFor).then((place) => {
    console.log(place.name);
    // res.send()
    res.render(
        'places/show',
        {
          place,
          placeAddress: place.address
        }
    );
  }).catch((err) => {
    console.log('Error retrieving place');
    console.log(err);
  });
});

// RENDER EDIT FORM FOR PLACE
router.get('/:id/edit', (req, res) => {

  const placeIdToFind = req.params.id;

  Place.findById(placeIdToFind).then((place) => {
    // res.send('edit form');
    res.render(
        'places/edit',
        {place,
        placeDescription: place.description},
    );
  }).catch((err) => {
    console.log(`Error rendering edit form`);
  });
});


// PLACE UPDATE ROUTE
router.put('/:id', (req, res) => {

  const placeIdToUpdate = req.params.id;
  const updatedPlaceInfo = req.body;

  Place.findByIdAndUpdate(
      placeIdToUpdate,
      updatedPlaceInfo,
      
      {new: true} 
  ).then((place) => {
    console.log(`Place updated!`);

    res.render(
        'places/show',
        {place,
        placeDescription: place.description
        },
    );
  }).catch((err) => {
    console.log(`Place failed to update!`);
    console.log(err);
  });

});

// PLACE DESTROY ROUTE
router.get('/:id/delete', (req, res) => {

  const placeIdToDelete = req.params.id;

  Place.findByIdAndRemove(placeIdToDelete).then(() => {
    console.log(`Successfully deleted place!`);

    res.redirect('/places');
  });
});


module.exports = router;