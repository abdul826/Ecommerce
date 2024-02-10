const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:"abdul5000",
    api_key:"992788232926258",
    api_secret:"4RnUY4aUKuYSonooPgr1p08R4cc"
});

module.exports = cloudinary;