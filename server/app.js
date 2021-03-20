const express = require('express')
const app = express();
const port = 5000;
const cors = require('cors');
const { startProcessingData, getData } = require('./processing-data');
require('./db');

var whitelist = ['http://127.0.0.1:3001', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(cors(corsOptions));

app.get('/comments', async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const comments = await getData(page);
        res.status(200).json({status: 'success', comments});
    } catch (e) {
        console.log("error", e.message);
        res.status(500).json({status: 'error', comments: []});
    }
    
})

app.listen(port, () => {
  startProcessingData();
  console.log(`Exposed port ${port}`);
});



