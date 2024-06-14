import { Outlet } from "react-router-dom";
import AlertParagraph from "../Utils/AlertParagraph";
import Button from "../Utils/Button";
import Description from "../Utils/Description";
import Instructions from "../Utils/Instructions";
import Loader from "../Utils/Loader";
import Logo from "../Utils/Logo";
import PromptContainer from "../Utils/PromptContainer";
import { useAI } from "../context/AIProvider";
import ImageUploader from "./ImageUploader";
import Header from "../Utils/Header";

function ListPrompt() {
  const { getOCR, image, answer, status } = useAI();

  return (
    <PromptContainer>
      <Header title={"Scanner de Listas"} />
      {status === "loading" && <Loader />}
      {status === "ready" && !answer && (
        <>
          <Description>
            Use o scanner de listas para extrair uma lista de itens de uma
            fotografia e exportá-la em um documento Word (docx).
          </Description>
          <Instructions exampleSrc={"example-list.png"} />
          <ImageUploader />
          {image && <Button action={() => getOCR("list")}>SCAN</Button>}
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

export default ListPrompt;
