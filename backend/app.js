const express=require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const app=express();
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
const cors=require("cors");
// const fileUpload=require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true}));
// app.use(fileUpload({useTempFiles:true}));




//CONFIG

if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })
}


//import routes
const user=require("./controller/user");
const shop=require("./controller/shop");
const product=require("./controller/product");
const event=require("./controller/event");
const coupon=require("./controller/couponCode");
// const payment=require("./controller/payment");
const order=require("./controller/order");
const conversation=require("./controller/conversation");
const message=require("./controller/message");



app.use("/api/v2/user", user)
app.use("/api/v2/shop", shop)
app.use("/api/v2/product", product)
app.use("/api/v2/event", event)
app.use("/api/v2/coupon", coupon)
// app.use("/api/v2/payment", payment)
app.use("/api/v2/order", order)
app.use("/api/v2/conversation", conversation)
app.use("/api/v2/message", message)


// it's for ErrorHandling
app.use(ErrorHandler);

module.exports=app;
