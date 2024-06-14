import { useState } from "react";
import { useAI } from "../context/AIProvider";
import Modal from "../Utils/Modal";
import { useNavigate } from "react-router-dom";

function ImageUploader() {
  const { dispatch, imageBlob, isOpenCropper, prompt } = useAI();

  const title = {
    table: "Tabela",
    text: "Texto",
    list: "Lista",
  };

  function createBlob(file) {
    const blob = window.URL.createObjectURL(file);

    dispatch({
      type: "upload",
      payload: {
        image: file,
        blob,
      },
    });
  }

  return (
    <>
      {isOpenCropper && <Modal />}
      <div className="roudend-lg flex w-full flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <h3 className="font-noto text-xl text-gray-800 drop-shadow-sm">
            {title[prompt]?.toUpperCase()}
          </h3>
          <label
            htmlFor="input"
            className={`relative flex ${imageBlob ? "border-2" : "min-h-[250px] border"} w-[80%] flex-col items-center justify-center overflow-hidden rounded-lg border-dashed border-orange-500 bg-gray-200 shadow-lg`}
          >
            {imageBlob && <img src={imageBlob} className="w-full" />}
            {!imageBlob && (
              <p className="text-center font-montserrat text-lg text-gray-800">
                Clique para adicionar uma imagem.
              </p>
            )}
          </label>
          <input
            type="file"
            id="input"
            className="hidden"
            onChange={(e) => createBlob(e.target.files[0])}
          />
        </div>
      </div>
    </>
  );
}

export default ImageUploader;
