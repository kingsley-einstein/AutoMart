import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import { environment } from '../environment';

const { cloud_name, api_key, api_secret } = environment;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
});

const storage = cloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png', 'jpeg']
});

export const upload = () => multer({ storage });
