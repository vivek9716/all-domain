const request = require('request');
const fetchData = () => {
    return new Promise((resolve, reject) => {
        request('https://jsonplaceholder.typicode.com/comments', { json: true }, (err, res, body) => {
            if (err) { reject(err); }
            resolve(body);
        });
    });
}

module.exports = { fetchData };