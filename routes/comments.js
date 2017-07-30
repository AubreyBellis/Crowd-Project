const express = require('express');

const Place = require('../models/place');
const Comment = require('../models/comment');

const router = express.Router({mergeParams: true});

// GET COMMENT INDEX
router.get('/', (req, res) => {
    const placeIdToFind = req.params.placeId;

    Place.findById(placeIdToFind)
        .then((place) => {
            // res.send('COMMENTS HERE!');
            console.log('comment index test');
            res.render(
                'comment/index',
                {
                placeId: place._id,
                placeName: place.name,
                comments: place.comments
                },
            );
        }).catch((err) => {
        console.log('Failed to find comment index');
        console.log(err);
    });
});

// GET NEW COMMENT FORM
router.get('/new', (req, res) => {
    const placeId = req.params.placeId;
    const placeName = req.params.placeName;

    console.log('new comment form');
    res.render(
        'comment/new',
        {
          placeId,
          placeName
        },
    );
});

// CREATE (POST) NEW COMMENT
router.post('/', (req, res) => {
    console.log("You tried to create a new item!");
    const placeId = req.params.placeId;
    const newCommentInfo = req.body;

    Place.findById(placeId).then((place) => {
        console.log(newCommentInfo)
        const newComment = new Comment(newCommentInfo);

        place.comments.unshift(newComment);
        return place.save();                // RETURN the promise from place.save() so we can chain .then() blocks
                                            // and only end up with one .catch() block at the very end
    }).then((place) => {
        console.log('Saved new place');
        // res.send('new. fucking finally');
        res.render(
            'comment/index',
            { 
            placeId,
            placeName: place.name,
            comments: place.comments
            },
        );
    }).catch((err) => {
        console.log(err);
    });
});

// // SHOW COMMENT
router.get('/:commentId', (req, res) => {
    const placeId = req.params.placeId;
    const commentId = req.params.commentId;

    Place.findById(placeId).then((place) => {

        const foundComment = place.comments.find((comment) => {
        return comment.id === commentId;
        });

        res.render(
            'comment/show',
            {
            placeId,
            placeName: place.name,
            // commentId: foundComment._id,
            commentTitle: foundComment.title,
            commentUserName: foundComment.userName,
            commentCreatedAt: foundComment.created_at,
            commentRating: foundComment.rating,
            commentText: foundComment.text
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
    console.log('get edit form');

    Place.findById(placeId).then((place) => {
        const foundComment = place.comments.find((comment) => {
        return comment.id === commentId;
        });
        // res.send('comment edit page')
        res.render('comment/edit', {
        placeId,
        comments: foundComment,
        });
    });
});

// UPDATE (PUT) A COMMENT
router.put('/:commentId', (req, res) => {
    const placeId = req.params.placeId;
    const commentId = req.params.commentId;
    console.log('added new edit form');

    Place.findById(placeId).then((place) => {
        const foundComment = place.comments.find((comment) => {
        return comment.id === commentId;
        });

        foundComment.name = req.body.name;

        return place.save();                            // then save the place and return the promise so we can chain
                                                        // another .then() block and only use one .catch() block
    }).then((place) => {
        console.log('updated place');
        res.send('updated index page')
        // res.render(
        //     'comment/index',
        //     {
        //     placeId: place._id,
        //     placeName: place.name,
        //     comments: place.comments,
        //     },
        // );
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
        place.comments.id(commentId).remove();       //use Mongoose to remove the comment from the place
        console.log('deleted comment');
            return place.save();                    // then save the place and return the promise so we can chain
                                                // another .then() block and only use one .catch() block
    }).then((place) => {
        // res.send('deleted comment');
        res.render(
            'comment/index',
            {
            placeId: place._id,
            placeName: place.name,
            comments: place.comments,
            },
        );
    }).catch((err) => {
        console.log('Failed to delete comment');
        console.log(err);
    });
});

module.exports = router;