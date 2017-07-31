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
    Place.findById(placeId)
        .then((place) => {
            // res.send('COMMENTS HERE!');
            console.log('comment new test');
            res.render(
                'comment/new',
                {
                placeId: place._id,
                placeName: place.name,
                // comments: place.comments
                },
            );
        }).catch((err) => {
        console.log('Failed to find comment index');
        console.log(err);
    });
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
        return place.save();               

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
            commentId: foundComment._id,
            commentTitle: foundComment.title,
            commentUserName: foundComment.userName,
            commentCreatedAt: foundComment.created_at,
            commentUpdatedAt: foundComment.updated_at,
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
        console.log('finding comment by ID EDIT route')
        return comment.id === commentId;
        });
        // res.send('comment edit page')
        res.render('comment/edit', {
        placeId,
        placeName: place.name,
        commentId: foundComment._id,
        commentTitle: foundComment.title,
        commentUserName: foundComment.userName,
        commentCreatedAt: foundComment.created_at,
        commentRating: foundComment.rating,
        commentText: foundComment.text
        });
    });
});

// UPDATE (PUT) A COMMENT
router.put('/:commentId', (req, res) => {
    const placeId = req.params.placeId;
    const commentId = req.params.commentId;
    var foundComment;
    console.log(`You want to update comment: ${commentId}`)

    Place.findById(placeId).then((place) => {
        foundComment = place.comments.find((comment) => {
        console.log('finding comment by ID PUT route')
            return comment.id === commentId;
        });

        foundComment._id = req.body._id;
        foundComment.title = req.body.title;
        foundComment.userName = req.body.userName;
        foundComment.text = req.body.text;
        foundComment.rating = req.body.rating;
        

        return place.save();                           

    }).then((place) => {
        console.log('updated comment');
        // res.send('updated show page')
        res.render(
            'comment/show',
            {
            placeId,
            placeName: place.name,
            commentId: foundComment._id,
            commentTitle: foundComment.title,
            commentUserName: foundComment.userName,
            commentCreatedAt: foundComment.created_at,
            commentRating: foundComment.rating,
            commentText: foundComment.text
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
        place.comments.id(commentId).remove();       
        console.log('deleted comment');
            return place.save();                    
                                                
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