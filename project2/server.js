const express = require('express');
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const session = require('express-session');
const passport = require('passport');

require('dotenv').config();
require('./config/passport');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/auth'));

app.use('/games', require('./routes/games'));
app.use('/reviews', require('./routes/reviews'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {

    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});