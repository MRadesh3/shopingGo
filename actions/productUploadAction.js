"use server";

import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

async function saveProductPhotosToLocal(formData) {
  const files = formData.getAll("files");

  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];

      const tempDir = os.tmpdir();

      const uploadProductDir = path.join(tempDir, `/${name}.${ext}`);
      fs.writeFile(uploadProductDir, buffer);

      return { filepath: uploadProductDir, filename: file.name };
    })
  );

  return await Promise.all(multipleBuffersPromise);
}

async function uploadProductPhotosToCloudinary(newFiles) {
  const multipleProductPhotosPromise = newFiles.map((newFile) =>
    cloudinary.v2.uploader.upload(newFile.filepath, {
      folder: "ShopingGo_products",
    })
  );

  return await Promise.all(multipleProductPhotosPromise);
}

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const uploadProductPhotos = async (formData) => {
  try {
    const newFiles = await saveProductPhotosToLocal(formData);

    const photos = await uploadProductPhotosToCloudinary(newFiles);

    newFiles.map((file) => fs.unlink(file.filepath));

    await delay(2000);

    return photos;
  } catch (error) {
    return { errorMsg: error.message };
  }
};

export default uploadProductPhotos;

// Delete product photos

export const deleteProductPhotos = async (publicId) => {
  try {
    const deleteProductPhotosPromise = cloudinary.v2.uploader.destroy(publicId);

    return await deleteProductPhotosPromise;
  } catch (error) {
    return { errorMsg: error.message };
  }
};
