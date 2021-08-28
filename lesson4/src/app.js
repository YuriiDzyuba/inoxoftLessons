const express = require('express');
const mongoose = require('mongoose');

const errHandler = require('./middlewares/error.middleware');

const initApi = require('./initApi');
const { PORT, DB_PATH } = require('../config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initApi(app);

app.use(errHandler);

const startApp = async () => {
    try {
        await mongoose.connect(DB_PATH);
        app.listen(PORT, () => {console.log(`Server started on PORT: ${PORT}`); });

    } catch (e) {
        console.log(e);
    }
};

startApp();
