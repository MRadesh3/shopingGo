"use server";

import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

async function savePhotoToLocal(formData) {
  const file = formData.get("file");

  const singleBufferPromise = file.arrayBuffer().then((data) => {
    const buffer = Buffer.from(data);
    const name = uuidv4();
    const ext = file.type.split("/")[1];

    const tempDir = os.tmpdir();
    const uploadDir = path.join(tempDir, `/${name}.${ext}`);
    fs.writeFile(uploadDir, buffer);

    return { filepath: uploadDir, filename: file.name };
  });

  return await singleBufferPromise;
}

async function uploadPhotosToCloudinary(newFile) {
  const singlePhotoPromise = cloudinary.v2.uploader.upload(newFile.filepath, {
    folder: "ShopingGo_customers",
  });

  return await singlePhotoPromise;
}

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const uploadPhoto = async (formData) => {
  try {
    const newFile = await savePhotoToLocal(formData);
    console.log(newFile);
    const photo = await uploadPhotosToCloudinary(newFile);

    await delay(2000);

    return photo;
  } catch (error) {
    return { errorMsg: error.message };
  }
};

export default uploadPhoto;

// Delete photo

export async function deletePhotoFromCloudinary(public_id) {
  try {
    const deletePhotoPromise = cloudinary.v2.uploader.destroy(public_id);

    return await deletePhotoPromise;
  } catch (error) {
    return { errorMsg: error.message };
  }
}
