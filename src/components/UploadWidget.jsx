import React, { useEffect, useState } from "react";

export default function UploadWidget() {
  const [images, setImages] = useState([]);
  const [cloudinaryUploadWidget, setcloudinaryUploadWidget] =
    useState(undefined);

  const activateWidget = async () => {
    const widgetOptions = {
      cloudName: "dgkxdy80k",
      tags: ["cl-upload"],
      folder: "uploads-test",
      validateMaxWidthHeight: true,
      maxImageWidth: 750,
      maxImageHeight: 750,
      uploadPreset: "ijgewvgg",
    };

    const processResults = (error, result) => {
      if (!error && result && result.event === "success") {
        const image = result.info;
        //console.log({ image });
        const imgArr = [...images, image];
         //console.log({ imgArr });
        setImages(imgArr);
      } else {
        console.log(error);
      }
    };

    await setcloudinaryUploadWidget(
      window.cloudinary.createUploadWidget(widgetOptions, processResults)
    );
  };
    
  const fetchData =React.useCallback( async () => {


    activateWidget();
    
  },[images]);

  useEffect(() => {
    fetchData();
  }, []);
  console.log(images);
  const buttonStyle = {
    fontWeight: "700",
    cursor: "pointer",
    padding: "15px 32px",
    textDecoration: "none",
    fontSize: "16px",
  };

  return (
    <div>
      <h1>Cloudinary Upload Tool</h1>
      <h2>Upload Files to Cloudinary Using the Upload Widget</h2>
      <p>Perform a signed upload using the upload widget.</p>
      <p>Click "Upload Files" to open the upload widget.</p>
      <div>
        <button
          style={buttonStyle}
          id="upload_widget"
          onClick={() => cloudinaryUploadWidget.open()}
        >
          Upload Files
        </button>
      </div>
      <h1>Uploaded Images</h1>
      <div>{images.map((image) => <p>{image.secure_url}</p>)}</div>
    </div>
  );
}
