const db = require('../config/config');

const bookTable = async() => {
    const Table = `CREATE TABLE IF NOT EXISTS books(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    publication_date DATE NOT NULL,
    isbn TEXT NOT NULL,
    pages INT NOT NULL,
    genre TEXT NOT NULL,
    author_id INT NOT NULL,
    publisher_id INT NOT NULL,
    FOREIGN KEY(author_id) REFERENCES author(id),
    FOREIGN KEY(publisher_id) REFERENCES publisher(id),
    ON UPDATE CASCADE
    ON DELETE CASCADE
    )`;

    try {
        const qry = await db.query(Table) ; 

        if (qry) {
            console.log('Table created');
        } else {
            console.log('Table not created');
        }
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        db.end((err) => {
            if (err) {
                console.error('Error ending the database connection:', err);
            }
            console.log('Database connection closed.');
        });
    }
}

const insertBook = async(req,res) => {
    const {title, publication_date, isbn ,pages, genre, author_id , publisher_id} = req.body ; 

    await db.query(`insert into books (title, publication_date, isbn ,pages, genre, author_id , publisher_id ) values ('${title}', '${publication_date}', '${isbn}','${pages}', '${genre}', '${author_id}', '${publisher_id}')`, (err,result) => {
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result}) ; 
    });
}

const getBooks = async(req,res) => {
    await db.query(`select * from books` , (err,result) => {
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result}) ; 
    })
}


const updateBooks = async(req,res) => {
    const {title, publication_date, isbn ,pages, genre, author_id , publisher_id} = req.body ; 
    const {id} = req.params ; 

    await db.query(`update books set title = '${title}', publication_date = '${publication_date}' , isbn = '${isbn}', pages = '${pages}' , genre = '${genre}' , author_id = '${author_id}' , publisher_id = '${publisher_id}' where id= '${id}'` , (err,result) => {
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result})
    })
} ; 



const deleteBooks = async(req,res) => {
    const {id} = req.params ; 
    await db.query(`delete from books where id = '${id}'`, (err,result) => {
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result});
    })
}


// search books 

const getBooksBySearch = async(req,res) => {
    const {title, genre,publication_date} = req.query ; 

    let sql = 'SELECT * FROM books WHERE 1=1';
    
    if (title) {
        sql += ` AND title LIKE '%${title}%'`;
    }
    if (genre) {
        sql += ` AND genre LIKE '%${genre}%'`;
    }
    if (publication_date) {
        sql += ` AND publication_date = '${publication_date}'`;
    }

    await db.query(sql, (err,result)=>{
        if(err){

            res.status(400).json({message : err});
            return err;
        }
        res.status(200).json({message : result});
    })
}
module.exports = {
    insertBook,
    getBooks,
    updateBooks,
    deleteBooks,
    getBooksBySearch
}