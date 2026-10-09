import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(FilePath) => {
    try {
        if(!FilePath) {
            console.error('File path is required for uploading to Cloudinary.');
            return null;
        }

        const response = await cloudinary.uploader.upload(FilePath, {resource_type: "auto" })
        return response.url;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        fs.unlinkSync(FilePath); 
        throw error;
    } finally {
        if (fs.existsSync(FilePath)) {
            fs.unlinkSync(FilePath);
        }
    }
}

export default uploadOnCloudinary;