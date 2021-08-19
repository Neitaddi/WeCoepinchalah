//require mongoose
const mongoose = require("mongoose");

//connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("mongoDB connected");
  } catch (error) {
    console.log("error white connect DB");
  }
};
module.exports = connectDB;
