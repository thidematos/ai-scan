import Button from "../Utils/Button";
import Logo from "../Utils/Logo";
import { useAI } from "../context/AIProvider";
import ImageUploader from "./ImageUploader";
import Loader from "./../Utils/Loader";
import { Outlet } from "react-router-dom";
import Instructions from "../Utils/Instructions";
import PromptContainer from "../Utils/PromptContainer";
import AlertParagraph from "../Utils/AlertParagraph";
import { useEffect } from "react";
import Description from "../Utils/Description";
import Header from "./../Utils/Header";

function TablePrompt() {
  const { status, getOCR, image, answer, dispatch } = useAI();

  return (
    <PromptContainer>
      <Header title={"Scanner de Tabelas"} />

      {status === "loading" && <Loader />}
      {status === "ready" && !answer && (
        <>
          <Description>
            Use o scanner de tabelas para extrair tabelas diagramadas de
            fotografias e exportá-las para um arquivo Excel (xlsx).
          </Description>
          <Instructions exampleSrc={"/example.jpeg"} />
          <ImageUploader />
          {image && <Button action={() => getOCR("table")}>SCAN</Button>}
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

export default TablePrompt;
