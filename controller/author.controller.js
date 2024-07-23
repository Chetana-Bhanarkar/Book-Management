const db = require('../config/config');


const createAuthorTable = async () => {
    const qr = `
    CREATE TABLE IF NOT EXISTS author (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        birth_date DATE NOT NULL,
        bio TEXT NOT NULL,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
    )
    `;
    try {
        const table = await db.query(qr);

        if (table) {
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
};

// createAuthorTable();


const insertAuthor = async(req,res)=>{
    const {firstname,lastname,email,birth_date,bio} = req.body
    db.query(`insert into author (firstname,lastname,email,birth_date,bio) values ('${firstname}','${lastname}','${email}','${birth_date}','${bio}')`,(err,result)=>{
        if (err) {
            return err;
        }   
        res.status(200).json({message:result})
    });

}
// add author 



// insertAuthor('abc','xyz','ax@gmail.com', '27-06-2000', 'jjfidfdies')


// get all author 

const getAllAuthor = async(req,res) => {
    db.query(`select * from author` , (err,result)=>{
        if(err){
            return err 
        }
        res.status(200).json({message : result}) ; 
    })
}


const updateAuthor = async(req,res) => {
    const {id} = req.params ; 
    const {firstname , lastname, email, birth_date, bio} = req.body ; 

    await db.query(`update author set firstname = '${firstname}', lastname = '${lastname}', email = '${email}', birth_date = '${birth_date}', bio = '${bio}' where id = ${id}`, (err,result) => {
        if(err) { 
            res.status(400).json({message : err})
            return err ; 
        }
        res.status(200).json({message : result})
    })
}

const deleteAuthor = async(req,res) => {
    const {id} = req.params ; 
    await db.query(`delete from author where id = '${id}'`,(err,result) => {
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result}) ; 
    });
}


const getAuthorById = async(req,res) => {
    const {id} = req.params ; 
    await db.query(`select * from author where id=${id}`, (err,result)=>{
        if(err){
            res.status(400).json({message : err});
            return err;
        }
        res.status(200).json({message :result});
    })
}


module.exports = {
    insertAuthor,
    getAllAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthorById
}
