const dotenv = require("dotenv");
dotenv.config();

// ------------------------------
const mongoose = require("mongoose");

// Db connection..



  mongoose.connect("mongodb+srv://adarshrajimpetrosys:EL9Afs7YSaN5pzwR@cluster0.tfuqgvc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => {
    console.log("DB Connected  Successful");
  })
  .catch((e) => {
    console.log(e);
  });


