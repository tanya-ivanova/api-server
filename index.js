require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const cors = require('./middlewares/cors');
const cors = require('cors');

const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const weatherController = require('./controllers/weatherController');
const searchController = require('./controllers/searchController');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');

const PORT = process.env.PORT || 3030;

const connectionString = process.env.CONNECTION_STRING;

start();

async function start() {
    await mongoose.connect(connectionString);
    
    console.log('Database connected');

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());
    
    app.get('/', (req, res) => {
        res.json({message: 'REST service operational'});
    });

    app.use('/users', authController);
    app.use('/data/posts', dataController);
    app.use('/weather', weatherController);
    app.use('/search', searchController);
    
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}