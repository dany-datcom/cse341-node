const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

    try {

        const result = await mongodb
            .getDb()
            .collection('reviews')
            .find();

        const reviews = await result.toArray();

        res.status(200).json(reviews);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};

const getSingle = async (req, res) => {

    try {

        const reviewId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDb()
            .collection('reviews')
            .find({ _id: reviewId });

        const review = await result.toArray();

        res.status(200).json(review[0]);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};

const createReview = async (req, res) => {

    try {

        const review = {
            username: req.body.username,
            gameTitle: req.body.gameTitle,
            score: req.body.score,
            comment: req.body.comment
        };

        if (!review.username || !review.gameTitle) {

            return res.status(400).json({
                message: 'Username and gameTitle are required'
            });
        }

        const response = await mongodb
            .getDb()
            .collection('reviews')
            .insertOne(review);

        res.status(201).json(response);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};

const updateReview = async (req, res) => {

    try {

        const reviewId = new ObjectId(req.params.id);

        const review = {
            username: req.body.username,
            gameTitle: req.body.gameTitle,
            score: req.body.score,
            comment: req.body.comment
        };

        if (!review.username || !review.gameTitle) {

            return res.status(400).json({
                message: 'Username and gameTitle are required'
            });
        }

        const response = await mongodb
            .getDb()
            .collection('reviews')
            .replaceOne({ _id: reviewId }, review);

        res.status(204).send();

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};

const deleteReview = async (req, res) => {

    try {

        const reviewId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDb()
            .collection('reviews')
            .deleteOne({ _id: reviewId });

        res.status(200).send();

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createReview,
    updateReview,
    deleteReview
};