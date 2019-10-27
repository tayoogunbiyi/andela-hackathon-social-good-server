/* eslint-disable linebreak-style */
const express = require('express');
// const itemHandlers = require('../../controllers/requests/request_handler')
const mongoose = require('mongoose');

const Item = mongoose.model('Item');

const passport = require('passport');

const auth = require('../auth/index');


const createItem = async (req, res) => {
  try {
    const data = await Item.create(req.body);
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: err.message,
    });
  }
};

// modify filter parameters
const prepareFilter = (query) => {
  const filter = query;

  if (filter.category) {
  // convert price to number and range
    filter.category = filter.category.toLowerCase();
  }
  if (filter.type) {
    filter.type = filter.type.toLowerCase();
  }
  if (filter.name) {
    filter.name = filter.first_name.toLowerCase();
  }
  if (filter.date) {
  // split date range
    const dateRange = filter.date.split('|');

    // prepare date filter query
    const dateFilter = { $gte: new Date(dateRange[0]), $lte: new Date(dateRange[1]) };

    // set date filter
    filter.date = dateFilter;
  }
  return filter;
};
const getItems = async (req, res) => {
  try {
    const filter = prepareFilter(req.query);
    const { page } = filter;
    delete filter.page;
    const resultsPerPage = 10;
    const data = await Item.find(filter).sort({ $natural: -1 }).skip((resultsPerPage * page) - resultsPerPage).limit(50);
    const total = await Item.find(filter).countDocuments();
    res.json({
      success: true,
      data,
      total,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: err.message,
    });
  }
};


const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Item.findById(id);
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: err.message,
    });
  }
};


const getUserItems = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { userID } = req.params;
    const filter = prepareFilter(req.query);
    filter.userID = userID;
    const { page } = filter;
    delete filter.page;
    const resultsPerPage = 50;
    const data = await Item.find(filter).sort({ $natural: -1 }).skip((resultsPerPage * page) - resultsPerPage).limit(50);
    const total = await Item.find(filter).countDocuments();
    res.json({
      success: true,
      data,
      total,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: err.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const data = await Item.findByIdAndUpdate(id, { $set: update }, { new: true });
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: err.message,
    });
  }
};


const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Item.findByIdAndDelete(id);
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: err.message,
    });
  }
};

const countItems = async (req, res) => {
  try {
    const filter = prepareFilter(req.query);
    const data = await Item.find(filter).countDocuments();
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: err.message,
    });
  }
};

const router = express.Router();

// C
router.post('/', createItem);

// R
router.get('/users/:user_id', passport.authenticate('jwt', { session: false }), getUserItems);
router.get('/:id', passport.authenticate('jwt', { session: false }), getItem);
router.get('/', getItems);
router.get('/count', passport.authenticate('jwt', { session: false }), countItems);


// U
router.put('/:id', passport.authenticate('jwt', { session: false }), updateItem);

// D
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteItem);


module.exports = router;
