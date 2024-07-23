const db = require('../config/config') ; 

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

const narratorTable = async() => {
    const Table = `CREATE TABLE IF NOT EXISTS narrator(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    bio TEXT NOT NULL
    )`;

    try {
        const qry = await query(Table) ; 

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


const insertNarrator = async(req,res) => {
    const {firstname, lastname, bio} = req.body ; 

    await db.query(`insert into narrator(first_name, last_name, bio) values ('${firstname}', '${lastname}', '${bio}')`, (err,result)=> {
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result});
    })
}
// narratorTable()

const getNarrator = async(req,res) => {
    await db.query(`select * from narrator`, (err,result) => {
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result});    
    })
}


const updateNarrator = async(req,res) => {
    const {id} = req.params
    const {firstname, lastname , bio} = req.body ; 

    await db.query(`update narrator set first_name = '${firstname}', last_name = '${lastname}', bio = '${bio}' where id = ${id}`, (err,result)=> {
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result}); 
    })
}

const deleteNarrator = async(req,res) =>{
    const {id} = req.params;

    await db.query(`delete from narrator where id = ${id}`,(err,result)=>{
        if(err){
            res.status(400).json({message : err});
            return err ;
        }
        res.status(200).json({message : result});
    })
}


module.exports =  {
    insertNarrator,
    getNarrator,
    updateNarrator,
    deleteNarrator
}