const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const isVideo = file.mimetype.startsWith('video');
        return {
            folder: 'kspace_memories',
            resource_type: isVideo ? 'video' : 'image',
            format: isVideo ? 'mp4' : undefined, // Cloudinary can auto-format images
            public_id: `note_${Date.now()}`
        };
    }
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
