const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'BlogPostImgs',
        public_id: (req, file) => file.name
    }
});


const cloudUpload = multer({storage: cloudStorage});


module.exports = cloudUpload;
