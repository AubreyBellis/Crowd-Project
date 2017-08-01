const express = require('express');

const User = require('../models/user');
const Favorites = require('../models/favorites');

const router = express.Router({mergeParams: true});

// INDEX
router.get('/', (request, response) => {
  const userIdToFind = request.params.userId;

  User.findById(userIdToFind).then((user) => {
    response.render(
        'favorites/index',
        {
          userId: user._id,
          userName: user.first_name,
          favorites: user.favorites,
        },
    );
  });
});

// RENDER THE NEW FORM
router.get('/new', (request, response) => {
  const userId = request.params.userId;

  response.render(
      'favorites/new',
      {userId}
  );
});

// CREATE ROUTE
router.post('/', (request, response) => {
  const userId = request.params.userId;
  const newFavoritesInfo = request.body;

  User.findById(userId).then((user) => {
    const newFavorites = new Favorites(newFavoritesInfo);

    user.favorites.push(newFavorites);

    // RETURN the promise from user.save() so we can chain .then() blocks
    // and only end up with one .catch() block at the very end
    return user.save();

  }).then((user) => {
    console.log(`Saved new favorite`);

    response.render(
        'favorites/show',
        {
          userId,
          userName: user.first_name,
          favoritesId: newFavorites._id,
          favoritesName: newFavorites.name,
        },
    );
  }).catch((error) => {
    console.log(error);
  });
});

// SHOW
router.get('/:favoritesId', (request, response) => {
  const userId = request.params.userId;
  const favoritesId = request.params.favoritesId;

  User.findById(userId).then((user) => {

    const foundFavorites = user.favorites.find((favorites) => {
      return favorites.id === favoritesId;
    });

    response.render(
        'favorites/show',
        {
          userId,
          userName: user.first_name,
          favoritesId: foundFavorites._id,
          favoritesName: foundFavorites.name,
        }
    );
  }).catch((error) => {
    console.log(`Failed to find favorites`);
    console.log(error);
  });
});

// RENDER THE EDIT FORM
router.get('/:favoritesId/edit', (request, response) => {
  const userId = request.params.userId;
  const favoritesId = request.params.favoritesId;

  User.findById(userId).then((user) => {
    const foundFavorites = user.favorites.find((favorites) => {
      return favorites.id === favoritesId;
    });

    response.render('favorites/edit', {
      userId,
      favorites: foundFavorites,
    });
  });
});

// UPDATE AN ITEM
router.put('/:favoritesId', (request, response) => {
  const userId = request.params.userId;
  const favoritesId = request.params.favoritesId;

  User.findById(userId).then((user) => {
    const foundFavorites = user.favorites.find((favorites) => {
      return favorites.id === favoritesId;
    });

    foundFavorites.name = request.body.name;

    // then save the user and return the promise so we can chain
    // another .then() block and only use one .catch() block
    return user.save();

  }).then((user) => {
    console.log(`updated favorites`);

    response.render(
        'favorites/index',
        {
          userId: user._id,
          userName: user.first_name,
          favorites: user.favorites,
        }
    );
  }).catch((error) => {
    console.log(`Failed to update favorites`);
    console.log(error);
  });
});

// DELETE 
router.get('/:favoritesId/delete', (request, response) => {
  const userId = request.params.userId;
  const favoritesId = request.params.favoritesId;

  User.findById(userId).then((user) => {
    //use Mongoose to remove the item from the user
    user.favorites.id(favoritesId).remove();

    // then save the user and return the promise so we can chain
    // another .then() block and only use one .catch() block
    return user.save();

  }).then((user) => {
    response.render(
        'favorites/index',
        {
          userId: user._id,
          userName: user.first_name,
          favorites: user.favorites,
        }
    );
  }).catch((error) => {
    console.log(`Failed to delete favorites`);
    console.log(error);
  });
});

module.exports = router;