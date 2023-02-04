
const mongoose = require("mongoose");

async function connect() {
  
    mongoose.Promise = global.Promise;
    await mongoose.connect("mongodb://localhost:27017/dbTest12", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit();
    });
}

module.exports = { connect };
