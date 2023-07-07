const express                   = require('express')
const app                       = express()
require("./config/config")
const port                      = process.env.PORT
const sliderRouter              = require("./routes/sliderRoutes");
const categoryRouter            = require('./routes/categoryRoutes');
const path                      = require("path");
const subcategoryRouter         = require('./routes/subcategoryRoutes');
const childcategoryRouter       = require('./routes/childcategoryRoutes');

                 global.appRoot = path.resolve(__dirname);

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(sliderRouter);
app.use(categoryRouter);
app.use(subcategoryRouter);
app.use(childcategoryRouter);




// server 
app.listen(port,"192.168.29.80", () => {
  console.log(`app listening on port ${port}`)
})