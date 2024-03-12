const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = 3030;

const app = express();

// Import Route

const authorsRoute = require('./routes/authors');


// Middleware

app.use(express.json());

app.use((req, res, next) => {
    console.log('Request Type:', req.method);
    console.log('Content Type:', req.headers['content-type']);
    console.log('Body:', req.body);
    next();
});

app.use('/', authorsRoute);





// Database Connection

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error!'));
db.once('open', () => {
    console.log('Database successfully connected!');
});



app.listen(PORT, () => console.log(`Server connected and listening on port: ${PORT}`));

