const express = require('express');
const router = express.Router();
const author = require('../service/author.service');
const CustomError = require('../utils/errors/error');


router.post('/add', async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const birth_date = req.body.birth_date;
    const bio = req.body.bio;


    try {
        const result = await author.authorService(firstname, lastname, email, birth_date, bio);

        let successMsg = new CustomError.Success("Data inserted successfully.");
        let errorMsg = new CustomError.BadRequestError('something went wrong');

        if (result) {
            res.status(200).json({
                status: 'Success',
                message: successMsg
            })
        }
        else {
            res.status(400).json({
                status: 'fail',
                message: errorMsg
            })
        }
    }catch (error) {
        let serverMsg = new CustomError.InternalServerError('Internal server error')
        res.status(400).json({
            status: 'fail',
            message: serverMsg
        })
    }
})


module.exports = router ; 