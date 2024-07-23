const express = require('express');
const { insertNarrator, getNarrator, updateNarrator, deleteNarrator } = require('../controller/narrator.controller');
const router = express.Router();

router.post('/create', insertNarrator) ; 
router.get('/list', getNarrator);
router.put('/update/:id', updateNarrator);
router.delete('/delete/:id', deleteNarrator)



module.exports = router ; 