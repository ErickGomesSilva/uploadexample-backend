require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const uri = process.env.IMAGE_DB_URI;

/**
 * 
 * Database Setup
 * 
 */

    mongoose.connect(uri, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

app.use("/files", 
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require('./routes'));

app.listen(3000);