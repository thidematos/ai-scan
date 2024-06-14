import axios from "axios";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import ImageUploader from "./components/ImageUploader";
import { AIProvider, useAI } from "./context/AIProvider";
import TablePrompt from "./components/TablePrompt";
import Modal from "./Utils/Modal";
import TextPrompt from "./components/TextPrompt";
import ListPrompt from "./components/ListPrompt";
import CreateTablePrompt from "./components/CreateTablePrompt";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import TableAnswer from "./components/TableAnswer";
import ListAnswer from "./components/ListAnswer";
import VerifyAnswer from "./Utils/VerifyAnswer";
import TextAnswer from "./components/TextAnswer";
import CreateTableAnswer from "./components/CreateTableAnswer";

function App() {
  const { isOpenCropper } = useAI();

  return (
    <main
      className={`relative flex w-screen flex-col items-center justify-center bg-gray-100 ${isOpenCropper ? "h-[100svh]" : "min-h-[100svh] py-20"}`}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tabelas" element={<TablePrompt />}>
          <Route
            path="export"
            element={
              <VerifyAnswer>
                <TableAnswer />
              </VerifyAnswer>
            }
          />
        </Route>
        <Route path="/listas" element={<ListPrompt />}>
          <Route
            path="export"
            element={
              <VerifyAnswer>
                <ListAnswer />
              </VerifyAnswer>
            }
          />
        </Route>
        <Route path="/textos" element={<TextPrompt />}>
          <Route
            path="export"
            element={
              <VerifyAnswer>
                <TextAnswer />
              </VerifyAnswer>
            }
          />
        </Route>
        <Route path="/criar-tabela" element={<CreateTablePrompt />}>
          <Route
            path="export"
            element={
              <VerifyAnswer>
                <CreateTableAnswer />
              </VerifyAnswer>
            }
          />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
