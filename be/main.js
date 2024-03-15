const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connectToDatabase = require('./db')

const PORT = 3030;

const app = express();

// Import Route

const authorsRoute = require('./routes/authors');
const blogPostRoute = require('./routes/blogPost');


// Middleware
app.use(cors());
app.use(express.json());
app.use('/', authorsRoute);
app.use('/', blogPostRoute);





// Database Connection

connectToDatabase();



app.listen(PORT, () => console.log(`Server connected and listening on port: ${PORT}`));

