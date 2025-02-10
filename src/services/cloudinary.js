import axios from 'axios';
import { cloudinary } from './creds';
import { apiGet } from './api-service';
import { checkIfImgAlreadyExistConst } from './api-constants';

// Generate SHA-1 hash for a file
const generateFileHash = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-1', arrayBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

// Check Already the Image is Link is Exists or Not
const checkIfImageLinkAlreadyExists = async (fileHash) => {
  const url = `${checkIfImgAlreadyExistConst}/${fileHash}`
  console.log("url = ", url)
  const response = await apiGet(url);
  console.log('red =', response.secure_url)
  return response.secure_url
}

// Cloudinary upload service
const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinary.appPreset); // Replace with your Cloudinary preset
  formData.append('cloud_name', cloudinary.appName); // Replace with your Cloudinary cloud name
  
  const fileHash = await generateFileHash(file);
  const isImgExists = await checkIfImageLinkAlreadyExists(fileHash);
  if(isImgExists) {
    return isImgExists
  }

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinary.appName}/image/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("URL = ", response.data.secure_url)
    return response.data.secure_url; // Return the image URL
  } catch (error) {
    console.error('Error uploading image to Cloudinary', error);
    return null;
  }
};

export { uploadImageToCloudinary };
