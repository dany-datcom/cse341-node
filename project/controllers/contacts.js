const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all
const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

// GET single
const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });

  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

// POST
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .insertOne(contact);

  if (response.acknowledged) {
    res.status(201).json(response.insertedId);
  } else {
    res.status(500).json(response.error || 'Error creating contact');
  }
};

// PUT
const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error updating contact');
  }
};

// DELETE
const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .deleteOne({ _id: userId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error deleting contact');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};