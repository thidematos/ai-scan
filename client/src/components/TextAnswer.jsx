import InteractionButton from "../Utils/InteractionButton";
import Loader from "../Utils/Loader";
import ReferenceImage from "../Utils/ReferenceImage";
import SendMail from "../Utils/SendMail";
import { useAI } from "../context/AIProvider";

function TextAnswer() {
  const { answer, exportAnswer, status, sendToMail } = useAI();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-16">
      <ReferenceImage />
      <p className="w-[80%] text-justify indent-6 font-noto tracking-wide text-gray-800">
        {answer}
      </p>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <SendMail />
          {sendToMail.send ? (
            sendToMail.valid && (
              <InteractionButton action={() => exportAnswer("docx", [answer])}>
                <img src="/docx.png" className="w-[50%]" />
              </InteractionButton>
            )
          ) : (
            <InteractionButton action={() => exportAnswer("docx", [answer])}>
              <img src="/docx.png" className="w-[50%]" />
            </InteractionButton>
          )}
        </>
      )}
    </div>
  );
}

export default TextAnswer;
