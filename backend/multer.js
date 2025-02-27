const multer=require("multer");


// const storage=multer.memoryStorage({
//     destination:function(req,file,cb){
//         cb(null, "uploads/");
//     },
//     filename:function(req,file,cb){
//         const uniqueSuffix=Date.now() + "-" + Math.round(Math.random()*1e9);
//         const filename=file.originalname.split(".")[0];
//         cb(null,filename +"-"+ uniqueSuffix+ ".png");
//     },
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
    },
});

exports.upload = multer({ storage: storage });


exports.upload=multer({storage:storage});

