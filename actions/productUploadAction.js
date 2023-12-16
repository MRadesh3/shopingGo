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

  const multipeBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];
      const tempDir = os.tmpdir();

      const uploadDir = path.join(tempDir, `/${name}.${ext}`);
      fs.writeFile(uploadDir, buffer);

      return { filepath: uploadDir, filename: file.name };
    })
  );

  return await Promise.all(multipeBuffersPromise);
}

async function saveProductPhotosToCloudinary(newFiles) {
  const uploadMultiplePhotosPromise = newFiles.map((newFile) =>
    cloudinary.v2.uploader.upload(newFile.filepath, {
      folder: "ShopingGo_products",
    })
  );

  return await Promise.all(uploadMultiplePhotosPromise);
}

const uploadProductPhotos = async (formData) => {
  try {
    const newFiles = await saveProductPhotosToLocal(formData);
    console.log(newFiles);

    const photos = await saveProductPhotosToCloudinary(newFiles);

    newFiles.forEach((file) => fs.unlink(file.filepath));

    return photos;
  } catch (error) {
    return { errorMsg: error.message };
  }
};

export default uploadProductPhotos;

// Delete product photos

export async function deleteProductPhotoFromCloudinary(public_id) {
  try {
    const deleteProductPhotoPromise = cloudinary.v2.uploader.destroy(public_id);

    return await deleteProductPhotoPromise;
  } catch (error) {
    return { errorMsg: error.message };
  }
}
