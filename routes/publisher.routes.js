const express = require('express');
const { insertPublisher, getAll, updatePublisher, deletePublisher } = require('../controller/publisher.controller');
const router = express.Router() ; 

router.post('/add', insertPublisher) ; 
router.get('/list',getAll) ; 
router.put('/update/:id', updatePublisher);
router.delete('/:id', deletePublisher);


module.exports = router ; 