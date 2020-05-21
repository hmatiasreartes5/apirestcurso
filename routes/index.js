const express = require('express');
const router = express.Router();
const books = require('./book.routes');
const authors = require('./authors.routes');


router.use('/api',books);
router.use('/api',authors);

module.exports = router