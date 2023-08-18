const mongoose = require('mongoose');

const dbConnect =  () => {
  try {
     mongoose.connect(process.env.DB);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database error:", error);
  }
};

module.exports = dbConnect;

