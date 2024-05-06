const mongoose = require('mongoose');

// Set up default mongoose connection
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }).then(con => {
        console.log(`MongoDB is connected to host: ${con.connection.host}`);
    }).catch((err) => {
        console.log(err);
    });
};

module.exports = connectDatabase;
