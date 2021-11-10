const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/retos-db-app',{})
.then(db => console.log('DB is conected'))
.catch(err => console.error(err))