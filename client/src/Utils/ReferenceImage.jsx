import { useAI } from "../context/AIProvider";

function ReferenceImage() {
  const { imageBlob } = useAI();

  return (
    <div className="flex w-[90%] flex-col items-center justify-center gap-3">
      <h2 className="font-noto text-lg text-gray-800 drop-shadow">
        Imagem de referência:
      </h2>
      <img
        src={imageBlob}
        className="rounded-lg border border-orange-500 drop-shadow"
      />
    </div>
  );
}

export default ReferenceImage;
