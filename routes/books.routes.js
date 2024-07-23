const express = require('express');
const { insertBook, getBooks, updateBooks, deleteBooks, getBooksBySearch } = require('../controller/book.controller');
const router = express.Router() ; 

router.post('/create', insertBook); 
router.get('/list', getBooks);
router.put('/update/:id', updateBooks);
router.delete('/:id', deleteBooks);
router.get('/search', getBooksBySearch);


module.exports = router ; 