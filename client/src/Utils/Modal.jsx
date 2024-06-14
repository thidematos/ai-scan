import { useEffect, useState } from "react";
import { useAI } from "../context/AIProvider";
import Cropper from "cropperjs";
import InteractionButton from "./InteractionButton";

function Modal() {
  const { dispatch } = useAI();
  const [cropper, setCropper] = useState(null);

  return (
    <>
      <Shadow />
      <ModalContainer>
        <CropperContainer setCropper={setCropper} />
        <Interations cropper={cropper} />
      </ModalContainer>
    </>
  );
}

function Shadow() {
  return <div className="absolute z-30 h-[100svh] w-full bg-gray-900/70"></div>;
}

function ModalContainer({ children }) {
  return (
    <div className="centerAbsolute absolute z-40 flex min-h-[60%] w-[90%] flex-col items-center justify-start gap-6 rounded-lg rounded-t-none bg-gray-50 pb-10">
      {children}
    </div>
  );
}

function CropperContainer({ setCropper }) {
  const { imageBlob } = useAI();

  return (
    <div className="w-full">
      <img
        src={imageBlob}
        onLoad={(e) => setCropper(new Cropper(e.target))}
        className="max-h-[50%] w-full"
      />
    </div>
  );
}

function Interations({ cropper }) {
  const { dispatch } = useAI();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <div className="flex w-full flex-row justify-center">
        <img
          src="/rotate-icon.png"
          className="size-[40px]"
          onClick={() => cropper.rotate(90)}
        />
      </div>
      <button
        className="font-montserrat text-xl text-blue-500 underline underline-offset-2"
        onClick={() => cropper.reset()}
      >
        Resetar
      </button>
      <InteractionButton
        action={() =>
          cropper.getCroppedCanvas().toBlob((blob) => {
            dispatch({
              type: "crop/closeModal",
              payload: {
                blob: blob,
                blobURL: window.URL.createObjectURL(blob),
              },
            });
          })
        }
      >
        Recortar
      </InteractionButton>
    </div>
  );
}

export default Modal;
