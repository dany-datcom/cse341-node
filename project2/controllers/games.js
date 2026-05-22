const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('games').find();
        const games = await result.toArray();

        res.status(200).json(games);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {

        const gameId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDb()
            .collection('games')
            .find({ _id: gameId });

        const game = await result.toArray();

        res.status(200).json(game[0]);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createGame = async (req, res) => {

    const game = {
        title: req.body.title,
        genre: req.body.genre,
        platform: req.body.platform,
        developer: req.body.developer,
        releaseYear: req.body.releaseYear,
        rating: req.body.rating,
        multiplayer: req.body.multiplayer
    };

    if (!game.title || !game.genre || !game.platform) {
        return res.status(400).json({
            message: 'Title, genre and platform are required'
        });
    }

    try {

        const response = await mongodb
            .getDb()
            .collection('games')
            .insertOne(game);

        res.status(201).json(response);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateGame = async (req, res) => {

    try {

        const gameId = new ObjectId(req.params.id);

        const game = {
            title: req.body.title,
            genre: req.body.genre,
            platform: req.body.platform,
            developer: req.body.developer,
            releaseYear: req.body.releaseYear,
            rating: req.body.rating,
            multiplayer: req.body.multiplayer
        };

        if (!game.title || !game.genre || !game.platform) {
            return res.status(400).json({
                message: 'Title, genre and platform are required'
            });
        }

        const response = await mongodb
            .getDb()
            .collection('games')
            .replaceOne({ _id: gameId }, game);

        res.status(204).send();

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteGame = async (req, res) => {

    try {

        const gameId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDb()
            .collection('games')
            .deleteOne({ _id: gameId });

        res.status(200).send();

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createGame,
    updateGame,
    deleteGame
};