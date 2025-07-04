const mongoose = require("mongoose")
require("dotenv").config();


module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB CONNECTION successful");
  } catch (error) {
    console.error("Error occurred during DB connection:");
    console.error(error);
  }
};
