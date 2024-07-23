const db = require('../config/config');

const query = async(sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql,(err,result)=>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

const publisherTable = async() => {
    const Table = `CREATE TABLE IF NOT EXISTS publisher(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    website TEXT NOT NULL,
    bio TEXT NOT NULL
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

// publisherTable()

const insertPublisher = async(req,res) => {
    const {firstname, lastname, address, website, bio} = req.body ; 

    await db.query(`insert into publisher(first_name, last_name, address, website, bio) values ('${firstname}', '${lastname}', '${address}', '${website}', '${bio}')`,(err,result)=>{
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result});
    })
}

const getAll = async(req,res) => {
    await db.query(`select * from publisher`, (err,result)=>{
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result}) ; 
    })
}

const updatePublisher = async(req,res) => {
    const {id} = req.params ; 
    const {first_name, last_name, address, website, bio} = req.body ; 

    await db.query(`update publisher set first_name = '${first_name}', last_name = '${last_name}', address = '${address}', website = '${website}', bio = '${bio}' where id = '${id}' `, (err,result) => {
        if(err){
            res.status(400).json({message : err});
            return err ; 
        }
        res.status(200).json({message : result})
    })
}

const deletePublisher = async(req,res) => {
    const {id} = req.params ; 

    await db.query(`delete from publisher where id = ${id}` , (err,result) =>{
        if(err){
            res.status(400).json({message : err});
            return err ; 
        };
        res.status(200).json({message : result}) ; 
    })
}

module.exports = {
    insertPublisher,
    getAll,
    updatePublisher,
    deletePublisher
}

