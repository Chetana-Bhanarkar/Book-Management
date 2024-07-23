const express = require('express');
const { insertAudioBooks, getAudioBooks, updateAudioBooks, deleteAudioBooks } = require('../controller/audioBook.controller');
const router = express.Router() ; 

router.post('/create', insertAudioBooks);
router.get('/list', getAudioBooks);
router.put('/update/:id', updateAudioBooks);
router.delete('/delete/:id', deleteAudioBooks);



module.exports = router ; 