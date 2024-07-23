const db = require('../config/config');

const query = async (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql,(err,result)=>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })

}


const audioTable = async () => {
    const Table = `CREATE TABLE IF NOT EXISTS audio(
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    narrator_id INT NOT NULL,
    audio_length INT NOT NULL,
    audio_format VARCHAR(10) NOT NULL,
    FOREIGN KEY(book_id) REFERENCES books(id) ,
    FOREIGN KEY(narrator_id) REFERENCES narrator(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    )`;

    try {
        const qry = await query(Table);

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

// audioTable()

const insertAudioBooks = async(req,res)=>{
    const {book_id, narrator_id, audio_length, audio_format} = req.body ; 

    await db.query(`insert into audio (book_id, narrator_id, audio_length, audio_format) values ('${book_id}', '${narrator_id}', '${audio_length}', '${audio_format}')`, (err,result)=>{
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result});
    })
}

const getAudioBooks = async(req,res) => {
    await db.query(`select * from audio`, (err,result) => {
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result}) ; 
    })
}


const updateAudioBooks = async(req,res) => {
    const {book_id, narrator_id, audio_length, audio_format} = req.body ; 
    const {id} = req.params ; 

    await db.query(`update audio set book_id = '${book_id}', narrator_id = '${narrator_id}', audio_length = '${audio_length}', audio_format = '${audio_format}' where id = ${id}`, (err,result)=>{
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result});
    })
}


const deleteAudioBooks = async(req,res) => {
    const {id} = req.params ; 

    await db.query(`delete from audio where id = ${id}`,(err,result)=>{
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result}) ; 
    })
}


module.exports = {
    insertAudioBooks,
    getAudioBooks,
    updateAudioBooks,
    deleteAudioBooks
}