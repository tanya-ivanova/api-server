const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');

const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');


//const connectionString = 'mongodb://127.0.0.1:27017/furniture';
const connectionString = 'mongodb+srv://ivanovaitanya:C8TYvhbrrJ5k1ueQ@cluster0.ck23ylh.mongodb.net/furnitureretryWrites=true&w=majority'

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
    app.use('/data/catalog', dataController);
    
    app.listen(3030, () => console.log('REST service started'));
}