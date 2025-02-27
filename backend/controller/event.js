const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const {upload} =require("../multer");


// मल्टर स्टोरेज सेट करें


cloudinary.config({
  cloud_name: 'dadft0a4y',
  api_key: '766753287556716',
  api_secret: 'yjOLUZo8FC0bOLqNLmn0e0IZvGI',
});

// create event
router.post(
  "/create-event",
  upload.array("images", 5),
  catchAsyncErrors(async (req, res, next) => {
    console.log("Uploaded Files: ", req.files) 
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } 

      const images = req.files;

      console.log("Received Images:", images);

      if (!images || images.length === 0) {
        return next(new ErrorHandler("No images uploaded!", 400));  // If no images uploaded
      }

        const imagesLinks = [];

        // Upload images to Cloudinary
              for (let i = 0; i < images.length; i++) {
                try {
                   console.log("File Type: ", images[i].mimetype); // <-- Here
                  // Upload each image buffer to Cloudinary
                  const result = await cloudinary.uploader.upload(req.files[i].path, {
                    folder: "products",
                  });
                  console.log("Cloudinary Response:", result);
        
        
                  imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                  });
                } catch (error) {
                  console.error("Error uploading to Cloudinary:", error);
                  // return next(new ErrorHandler("Error uploading image to Cloudinary!", 500));
                }
              }


        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;

        const event = await Event.create(productData);

        res.status(201).json({
          success: true,
          event,
        });
      }
  ))

// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete event of a shop
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!event) {
        return next(new ErrorHandler("Event is not found with this id", 404));
      }    

      for (let i = 0; 1 < event.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          event.images[i].public_id
        );
      }
    
      await Event.deleteOne({ _id: req.params.id });

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all events --- for admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;