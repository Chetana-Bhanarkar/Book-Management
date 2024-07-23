const express = require('express');
const { insertAuthor, getAllAuthor, updateAuthor, deleteAuthor, getAuthorById } = require('../controller/author.controller');
const router = express.Router();

router.post('/add',insertAuthor);
router.get('/list',getAllAuthor);
router.put('/edit/:id',updateAuthor);
router.delete('/:id',deleteAuthor);
router.get('/:id',getAuthorById);



module.exports = router;