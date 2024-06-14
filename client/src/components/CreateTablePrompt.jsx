import axios from "axios";
import Button from "../Utils/Button";
import Loader from "../Utils/Loader";
import Logo from "../Utils/Logo";
import { useAI } from "../context/AIProvider";
import ImageUploader from "./ImageUploader";
import { useState } from "react";
import PromptContainer from "../Utils/PromptContainer";
import Header from "../Utils/Header";
import Description from "../Utils/Description";
import Instructions from "../Utils/Instructions";
import AlertParagraph from "../Utils/AlertParagraph";
import { Outlet } from "react-router-dom";

function CreateTablePrompt() {
  const { status, answer, getOCR, image } = useAI();

  return (
    <PromptContainer>
      <Header title={"Scanner para criar tabelas"} />

      {status === "loading" && <Loader />}
      {status === "ready" && !answer && (
        <>
          <Description>
            Use o scanner criador de tabelas para extrair tabelas de textos de
            fotografias e exportá-las para um arquivo Excel (xlsx).
          </Description>
          <Instructions exampleSrc={"/example-createTable.png"} />
          <ImageUploader />
          {image && <Button action={() => getOCR("createTable")}>SCAN</Button>}
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

export default CreateTablePrompt;
