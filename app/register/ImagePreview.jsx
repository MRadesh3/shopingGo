import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ImagePreview({ file }) {
  const { user } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState(
    user && user.user.avatar ? user.user.avatar.url : "/assets/icons/user.png"
  );

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
          toast.error("Invalid file type. Please select a valid image file.");
          return;
        }

        const maxSize = 2000000;
        if (file.size > maxSize) {
          toast.error("File size is too large. Max size is 2MB");
          return;
        }

        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="h-[100px] w-[100px] rounded-full">
      {preview && (
        <Image
          src={preview}
          width={60}
          height={60}
          alt="profile"
          className="object-cover h-[100px] w-full rounded-full"
        />
      )}
    </div>
  );
}
