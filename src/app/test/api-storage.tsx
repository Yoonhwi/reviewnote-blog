"use client";
import { useState } from "react";
import { addImage } from "../request/storage";
import Image from "next/image";

const ApiStorage = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      addImage(formData).then((res) => {
        console.log("upload success,get url:", res);
        setImgSrc(res.data);
      });
    } catch (err) {
      console.log("upload err", err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imgSrc && <Image src={imgSrc} width={200} height={200} alt="img" />}
    </div>
  );
};

export default ApiStorage;
