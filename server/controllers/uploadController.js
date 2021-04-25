const cloudinary = require('cloudinary');
const fs = require('fs');

// configure cloudinary resources
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// upload image to cloudinary
const uploadController = {
    uploadAvatar: (req, res) => {
        try {
            const file = req.files.file;

            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'avatar', crop: "fill"
            }, async(err, result) => {
                if(err) throw err;
                removeTmp(file.tempFilePath);

                res.json({ url: result.secure_url });
            });
        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    });
};

module.exports = uploadController;