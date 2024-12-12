import { useState } from "react";

export function usePickedImage(setValues) {
  const [pickedImage, setPickedImage] = useState(null);
  const handleUploadImageChange = (e) => {
    const file = e.target.files[0];
    setValues((prevValue) => ({
      ...prevValue,
      file,
    }));

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return { pickedImage, handleUploadImageChange };
}
