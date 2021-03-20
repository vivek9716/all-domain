const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('connected.');
});

db.run(
    `CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER,
        name TEXT,
        email TEXT,
        body TEXT)`, function (err) {
            if (err) {
                console.log(err);
            }
        }
);

//db.all("select * from comments");

// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
// });

module.exports = { db };