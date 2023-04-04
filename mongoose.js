// require lib 
const mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');;

// acquire the connection 
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connectin db'));

// up and running print the message
db.once('open', function(){
    console.log('Successfully Connected MongoDB');
})