"use client";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";
import { Plus, Smiley } from "@phosphor-icons/react";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState(value);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        onUpload={(result: any) => {
          onChange(result.info.secure_url);
          setImage(result.info.secure_url);
        }}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="wkjbgls3"
      >
        {image ? (
          <Image
            as={NextImage}
            src={image || "/chatbot.png"}
            alt="Companion Image"
            width={200}
            height={200}
            className="rounded-lg"
          />
        ) : (
          <div className="p-4 border-2 border-dashed border-content3 bg-content2 w-48 h-48 rounded-3xl">
            <div className="flex justify-center items-center w-full h-full flex-col gap-y-2 text-content2-foreground">
              <Plus width={25} height={25} weight="bold" />
              <p className="font-medium">Upload Image</p>
            </div>
          </div>
        )}
      </CldUploadButton>
    </div>
  );
}

export default ImageUpload;
