var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

var imageUUId = null;
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
      console.log(file)
      imageUUId = uuidv4();
      var fileSaveName = `${imageUUId}.png`; //file.originalname.replace(/\s/g, '');
      cb(null, fileSaveName);
      // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    console.log(file)
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        console.log(file.originalname);
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

router.post('/upload-image', function (req, res, next) {
  // res.render('annotate', { title: 'Load image and annotate' });
    // let upload = multer({ storage: storage, fileFilter: imageFilter }).single('image-upload');
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('file');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        console.log(req.file, imageUUId);

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        console.log(imageUUId);

        // Display uploaded image for user validation
        // res.send(`You have uploaded this image: <hr/><img src="uploads/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);
        // res.send(`You have uploaded this image: <hr/><img src="uploads/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);
        res.send(`${imageUUId}`);
    });
});

module.exports = router;
