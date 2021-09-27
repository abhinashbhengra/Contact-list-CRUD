const mongoose = require('mongoose'); //require mongoose

mongoose.connect('mongodb://localhost/contacts_list_db'); //connecting to database

const db = mongoose.connection; // acquire connection (to check if the connection is successful)

db.on('error', console.error.bind(console, 'failed to connect DB')); //error

db.once('open', ()=> console.log('Successfully connected to the database')); //if connection successful 