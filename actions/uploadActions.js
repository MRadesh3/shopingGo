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

async function savePhotoToLocal(formData) {
  const file = formData.get("file");
  console.log(file);

  const singleBufferPromise = await file.arrayBuffer().then((data) => {
    const buffer = Buffer.from(data);
    console.log(buffer);
    const name = uuidv4();
    const ext = file.type.split("/")[1];
    console.log({ name, ext });

    const tempDir = os.tmpdir();

    const uploadDir = path.join(tempDir, `/${name}.${ext}`);
    fs.writeFile(uploadDir, buffer);

    return { filepath: uploadDir, filename: file.name };
  });

  return await singleBufferPromise;
}

async function savePhotoToCloudinary(newFile) {
  const uploadSinglePhotoPromise = await cloudinary.v2.uploader.upload(
    newFile.filepath,
    {
      folder: "ShopingGo_customers",
    }
  );

  return await uploadSinglePhotoPromise;
}

const uploadPhoto = async (formData) => {
  try {
    const newFile = await savePhotoToLocal(formData);

    const photo = await savePhotoToCloudinary(newFile);

    fs.unlink(newFile.filepath);

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
