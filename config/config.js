const dotenv = require("dotenv");
dotenv.config();

// ------------------------------
const mongoose = require("mongoose");
// Db conn

mongoose
  .connect(`mongodb://localhost:27017/shopkartdb`)
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  });
