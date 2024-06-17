const author = require('../controller/author.controller');

const authorService = async (firstname, lastname, email, birth_date, bio) => {
    return await author.insertAuthor(firstname, lastname, email, birth_date, bio)
}



module.exports = {
    authorService,
}