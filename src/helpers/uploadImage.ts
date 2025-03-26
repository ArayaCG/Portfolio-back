import cloudinaryV2 from '../config/cloudinary.config';
import fs from 'fs';

interface CloudinaryUploadOptions {
    width?: number;
    height?: number;
    quality?: string;
    crop?: string;
    gravity?: string;
    fetchFormat?: string;
}

export const uploadToCloudinary = async (
    imagePath: string, 
    options: CloudinaryUploadOptions = {}
): Promise<string> => {
    try {
        const defaultOptions = {
            fetch_format: 'auto',
            quality: 'auto',
            crop: 'scale',
            gravity: 'center',
            width: 1000,
            height: 1000,
            ...options
        };

        const result = await cloudinaryV2.uploader.upload(imagePath, defaultOptions);
        
        fs.unlinkSync(imagePath);

        return result.secure_url;
    } catch (error) {
        console.error('Detailed Cloudinary Upload Error:', error);

        try {
            fs.unlinkSync(imagePath);
        } catch (unlinkError) {
            console.error('Error deleting temporary file:', unlinkError);
        }

        throw error;
    }
};