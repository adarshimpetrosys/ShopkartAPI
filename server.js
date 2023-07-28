const express                   = require('express')
const app                       = express()
require("./config/config")
const port                      = process.env.PORT
const sliderRouter              = require("./routes/sliderRoutes");
const categoryRouter            = require('./routes/categoryRoutes');
const path                      = require("path");
const subcategoryRouter         = require('./routes/subcategoryRoutes');
const childcategoryRouter       = require('./routes/childcategoryRoutes');
const productRouter             = require('./routes/productRoutes');

const cors = require("cors");
const userRouter = require('./routes/userRoutes');

global.appRoot = path.resolve(__dirname);

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());
// Routers 
app.use(sliderRouter);
app.use(categoryRouter);
app.use(subcategoryRouter);
app.use(childcategoryRouter);
app.use(productRouter);
app.use(userRouter);
app.get("/",(req,res)=>{
  res.send("hello  AWS")
})




// server 
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})