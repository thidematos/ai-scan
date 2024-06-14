import { Outlet } from "react-router-dom";
import AlertParagraph from "../Utils/AlertParagraph";
import Button from "../Utils/Button";
import Description from "../Utils/Description";
import Instructions from "../Utils/Instructions";
import Loader from "../Utils/Loader";
import Logo from "../Utils/Logo";
import PromptContainer from "../Utils/PromptContainer";
import ImageUploader from "./ImageUploader";
import Header from "../Utils/Header";
import { useAI } from "../context/AIProvider";

function TextPrompt() {
  const { answer, getOCR, image, status } = useAI();

  return (
    <PromptContainer>
      <Header title={"Scanner de texto"} />

      {status === "loading" && <Loader />}
      {status === "ready" && !answer && (
        <>
          <Description>
            Use o scanner de textos para extrair textos de fotografias e
            exportá-las para um arquivo Docx (docx).
          </Description>
          <Instructions exampleSrc={"/example-text.png"} />
          <ImageUploader />
          {image && <Button action={() => getOCR("text")}>SCAN</Button>}
          {!image && (
            <AlertParagraph>
              Escolha uma foto para ser scanneada!
            </AlertParagraph>
          )}
        </>
      )}

      {status === "ready" && answer && <Outlet />}
    </PromptContainer>
  );
}

export default TextPrompt;
