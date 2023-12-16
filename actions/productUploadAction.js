import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

async function uploadProductPhotosToCloudinary(allImages) {
  const multipleProductPhotosPromise = allImages.map((image) =>
    cloudinary.v2.uploader.upload(
      image,
      {
        upload_preset: "hghia8m3",
        allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
      },
      {
        function(error, result) {
          console.log(result, error);
          return result;
        },
      }
    )
  );

  return await Promise.all(multipleProductPhotosPromise);
}

const uploadProductPhotos = async (allImages) => {
  try {
    const photos = await uploadProductPhotosToCloudinary(allImages);

    await delay(2000);

    return photos;
  } catch (error) {
    return { errorMsg: error.message };
  }
};

export default uploadProductPhotos;

// import path from "path";
// import fs from "fs/promises";
// import { v4 as uuidv4 } from "uuid";
// import os from "os";
// import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
// });

// async function uploadProductPhotosToCloudinary(allImages) {
//   const multipleProductPhotosPromise = allImages.map((image) =>
//     cloudinary.v2.uploader.upload(
//       image,
//       {
//         upload_preset: "hghia8m3",
//         public_id: `avatar`,
//         allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
//       },
//       {
//         function(error, result) {
//           console.log(result, error);
//         },
//       }
//     )
//   );

//   return await Promise.all(multipleProductPhotosPromise);
// }

// const delay = (delayInms) => {
//   return new Promise((resolve) => setTimeout(resolve, delayInms));
// };

// const uploadProductPhotos = async (allImages) => {
//   try {
//     const photos = await uploadProductPhotosToCloudinary(allImages);

//     await delay(2000);

//     return photos;
//   } catch (error) {
//     return { errorMsg: error.message };
//   }
// };

// export default uploadProductPhotos;

// // Delete product photos

// export const deleteProductPhotos = async (publicId) => {
//   try {
//     const deleteProductPhotosPromise = cloudinary.v2.uploader.destroy(publicId);

//     return await deleteProductPhotosPromise;
//   } catch (error) {
//     return { errorMsg: error.message };
//   }
// };
