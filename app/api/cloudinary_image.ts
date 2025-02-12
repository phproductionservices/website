import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = (imageFile: { path: string }, publicId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imageFile.path, { public_id: publicId })
            .then(result => resolve(result.secure_url))
            .catch(error => reject(error));
    });
};

export const getOptimizedUrl = (publicId: string): string => {
    return cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto'
    });
};

export const getAutoCropUrl = (publicId: string): string => {
    return cloudinary.url(publicId, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
};
