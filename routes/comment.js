const express = require('express');

// const Place = require('../models/place');
const Comment = require('../models/comment');

const router = express.Router({mergeParams: true});

// GET COMMENT INDEX
router.get('/', (req, resp) => {
    const placeIdToFind = req.params.placeId;

    Places.findById(placeIdToFind).then((place) => {
        res.send('COMMENTS HERE!');
        console.log('comment index test');
        // res.render(
        //     'comment/index',
        //     {
        //     placeId: place._id,
        //     placeName: place.name,
        //     comment: place.comment,
        //     },
        // );
    });
});

// GET NEW COMMENT FORM
router.get('/new', (req, res) => {
    const placeId = req.params.placeId;

    res.render(
        'comment/new',
        {
          placeId
        },
    );
});

// CREATE (POST) NEW COMMENT
router.post('/', (req, res) => {
    const placeId = req.params.placeId;
    const newCommentInfo = req.body;

    Place.findById(placeId).then((place) => {
        const newComment = new Comment(newCommentInfo);

        place.comment.push(newComment);
        return place.save();                // RETURN the promise from place.save() so we can chain .then() blocks
                                            // and only end up with one .catch() block at the very end
    }).then((place) => {
        console.log('Saved new place');

        res.render(
            'comment/show',
            {
            placeId,
            placeName: place.name,
            commentId: newComment._id,
            commentName: newComment.name,
            },
        );
    }).catch((err) => {
        console.log(err);
    });
});

// SHOW COMMENT
router.get('/:commentId', (req, res) => {
    const placeId = req.params.placeId;
    const commentId = req.params.commentId;

    Place.findById(placeId).then((place) => {

        const foundComment = place.items.find((comment) => {
        return comment.id === commentId;
        });

        res.render(
            'items/show',
            {
            placeId,
            placeName: place.name,
            commentId: foundComment._id,
            commentName: foundComment.name,
            },
        );
    }).catch((err) => {
        console.log('Failed to find comment');
        console.log(err);
    });
});

// GET COMMENT EDIT 
router.get('/:commentId/edit', (req, res) => {
    const placeId = req.params.placeId;
    const commentId = req.params.commentId;

    Place.findById(placeId).then((place) => {
        const foundComment = place.comment.find((comment) => {
        return comment.id === commentId;
        });

        res.render('comment/edit', {
        placeId,
        comment: foundComment,
        });
    });
});

// UPDATE (PUT) A COMMENT
router.put('/:commentId', (req, res) => {
  const placeId = req.params.placeId;
  const commentId = req.params.commentId;

  Place.findById(placeId).then((place) => {
    const foundComment = place.comment.find((comment) => {
      return comment.id === commentId;
    });

    foundComment.name = req.body.name;

    return place.save();                            // then save the place and return the promise so we can chain
                                                    // another .then() block and only use one .catch() block
  }).then((place) => {
    console.log('updated place');

    res.render(
        'comment/index',
        {
          placeId: place._id,
          placeName: place.name,
          comment: place.comment,
        },
    );
  }).catch((err) => {
    console.log('Failed to update comment');
    console.log(err);
  });
});

// DELETE COMMENT
router.get('/:commentId/delete', (req, res) => {
    const placeId = req.params.placeId;
    const commentId = req.params.commentId;

    Place.findById(placeId).then((place) => {
        place.comment.id(commentId).remove();       //use Mongoose to remove the comment from the place
            return place.save();                    // then save the place and return the promise so we can chain
                                                // another .then() block and only use one .catch() block
    }).then((place) => {
        res.render(
            'comment/index',
            {
            placeId: place._id,
            placeName: place.name,
            comment: place.comment,
            },
        );
    }).catch((err) => {
        console.log('Failed to delete comment');
        console.log(err);
    });
});

module.exports = router;