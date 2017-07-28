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

// RENDER THE PLACE CREATE 'NEW' FORM
        // router.get('/new', (req, res) => {
        //   res.render('places/new');
        // });

// PLACE CREATE ROUTE
// REMEMBER: if you set the `name=""` attribute of your form
// inputs to match the schema for your object, you can simply
// pass the request body into the constructor for your Mongoose
// object
        // router.post('/', (req, res) => {

        //   const newPlaceInfoFromForm = req.body;

        //   // If the form body already contains everything you need for your user
        //   // you can just do this:
        //   Place.create(newPlaceInfoFromForm).then((place) => {
        //     res.render(
        //         'places/show',
        //         {place},
        //     );
        //   }).catch((err) => {
        //     console.log('Error saving new user to database!');
        //     console.log(err);
        //   });

  // OR If you want to add more information to the user before
  // you save, you can use the commented-out code below:

  // const newUser = new User(request.body);

  // newUser.save()
  //     .then((newUser) => {
  //         console.log(`New user created with ID of: ${newUser._id}`);

  //         response.render(
  //             'users/show',
  //             { user: newUser }
  //         );
  //     })
  //     .catch((error) => {
  //         console.log('Error saving new user to database!');
  //         console.log(error);
  //     });
// });


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
          placeAdress: place.address
        }
    );
  }).catch((err) => {
    console.log('Error retrieving place');
    console.log(err);
  });
});

// RENDER EDIT FORM FOR PLACE
        // router.get('/:id/edit', (req, res) => {

        //   const placeIdToFind = req.params.id;

        //   Place.findById(placeIdToFind).then((place) => {
        //     res.render(
        //         'place/edit',
        //         {place},
        //     );
        //   }).catch((err) => {
        //     console.log(`Error rendering edit form for place with ID of ${placeIdToFind}`);
        //   });
        // });


// PLACE UPDATE ROUTE
            // router.put('/:id', (req, res) => {

            //   const placeIdToUpdate = req.params.id;
            //   const updatedPlaceInfo = req.body;

            //   Place.findByIdAndUpdate(
            //       placeIdToUpdate,
            //       updatedPlacerInfo,
            //       {new: true} // <-- DON'T FORGET THIS!!!
            //   ).then((place) => {
            //     console.log(`Place with ID of ${place._id} updated!`);

            //     res.render(
            //         'places/show',
            //         {place},
            //     );
            //   }).catch((err) => {
            //     console.log(`Place with ID of ${place._id} failed to update!`);
            //     console.log(err);
            //   });

            // });

// PLACE DESTROY ROUTE
router.get('/:id/delete', (req, res) => {

  const placeIdToDelete = req.params.id;

  Place.findByIdAndRemove(placeIdToDelete).then(() => {
    console.log(`Successfully deleted place with ID ${placeIdToDelete}!`);

    res.redirect('/places');
  });
});


module.exports = router;