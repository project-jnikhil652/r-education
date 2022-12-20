require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const mongoConnection = require('./mongo-connection');
const path = require('path');
const fs = require('fs');
let server;

if (!fs.existsSync(path.join(__dirname, './public'))) {
    fs.mkdir(path.join(__dirname, './public'), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}

if (!fs.existsSync(path.join(__dirname, './public/images'))) {
    fs.mkdir(path.join(__dirname, './public/images'), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}


mongoConnection();
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./src/routes'))

app.use((req, res, next) => {
    console.log(req.path)
    return res.status(404).json({
        error: 'route not found'
    })
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.log(err);
    return res.status(status).json({ error: err.message })
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

// process.on('SIGINT', () => {
//     server.close();
// })