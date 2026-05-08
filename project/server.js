const express = require('express');
const mongodb = require('./data/database');

const app = express();

const port = process.env.PORT || 3000;

const contactsRoutes = require('./routes/contacts');

app.use(express.json());

app.use('/contacts', contactsRoutes);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});