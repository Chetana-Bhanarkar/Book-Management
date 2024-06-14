const db = require('../config/config');

const query = async (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
};

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
        const table = await query(qr);

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

createAuthorTable();
