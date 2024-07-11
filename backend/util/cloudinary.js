const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// global configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

exports.cloudinaryFileUploader = async (file) => {
  try {
    if (!file) {
      console.log('file not found');
    } else {
      const res = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      });
      return res.url;
    }
  } catch (error) {
    // fs.unlinkSync(file);
    return error;
  }
};
