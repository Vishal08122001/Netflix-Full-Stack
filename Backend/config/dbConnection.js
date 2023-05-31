const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://Vishal258000:Vishal%40258000@cluster0.i5cdbuz.mongodb.net/Netflix?retryWrites=true&w=majority");
    console.log(
      "dbConnected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
