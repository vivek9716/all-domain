const { db } = require('./db');
const { fetchData } = require('./fetch-data');

const startProcessingData = async () => {
    try {
        const data = await fetchData();
        insertData(data);
    } catch(e) {
        console.log("Some exception occured", e.message);
    }
}

function insertData(data) {
    const query = "INSERT INTO comments(postId, name, email, body) values (?, ?, ?, ?)";
    data.forEach((comments) => {
        const { postId, name, email, body } =  comments;
        db.run(query, [ postId, name, email, body ], function (err) {
            if(err){
                console.log("error", err);
            }
        });
    });
}

function getData(page) {
    return new Promise((resolve, reject) => {
        const offset = page * 10;
        const query = `SELECT * from comments LIMIT ${offset}, 20`;
        db.all(query, function (err, rows) {
            if(err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}



module.exports = { startProcessingData, getData };