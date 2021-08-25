const express = require('express');
const expressHbs = require('express-handlebars');

const initApi = require('./initApi');
const { PORT, STATIC_PATH } = require('../config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(STATIC_PATH));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', STATIC_PATH);

initApi(app);

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
