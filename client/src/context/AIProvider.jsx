import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const AIContext = createContext();

const initials = {
  status: "ready",
  //loading | ready |
  image: null,
  imageBlob: null,
  answer: "",
  sendToMail: {
    send: false,
    email: "",
    valid: true,
  },
  isOpenCropper: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading",
      };

    case "choosePrompt":
      return {
        ...state,
        image: null,
        imageBlob: null,
        answer: null,
        status: "ready",
        sendToMail: {
          send: false,
          email: "",
          valid: true,
        },
      };

    case "upload":
      console.log("Image uploaded!");
      window.URL.revokeObjectURL(state.imageBlob);
      return {
        ...state,
        image: action.payload.image,
        imageBlob: action.payload.blob,
        isOpenCropper: true,
      };

    case "crop/closeModal":
      window.URL.revokeObjectURL(state.imageBlob);
      return {
        ...state,
        image: action.payload.blob,
        imageBlob: action.payload.blobURL,
        isOpenCropper: false,
      };

    case "question/loading":
      return {
        ...state,
        status: "loading",
      };

    case "export/loaded":
      return {
        ...state,
        status: "ready",
      };

    case "answered/loaded":
      return {
        ...state,
        status: "ready",
        answer: action.payload,
      };

    case "toggleSendMail":
      return {
        ...state,
        sendToMail: {
          ...state.sendToMail,
          email: "",
          valid: false,
          send: !state.sendToMail.send,
        },
      };

    case "changedEmail":
      return {
        ...state,
        sendToMail: {
          ...state.sendToMail,
          email: action.payload,
          valid: validator.isEmail(action.payload),
        },
      };

    default:
      throw new Error("Unknow action");
  }
}

function AIProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initials);

  const navigate = useNavigate();

  async function getOCR(prompt) {
    const route = {
      table: "tabelas",
      list: "listas",
      text: "textos",
      createTable: "criar-tabela",
    };

    dispatch({
      type: "question/loading",
    });

    const form = new FormData();

    form.append("image", state.image);

    const res = await axios.post(`/api/v1/gemini/${prompt}`, form);

    dispatch({ type: "answered/loaded", payload: res.data.data.text });

    navigate(`/${route[prompt]}/export`);
  }

  async function exportAnswer(type, data) {
    dispatch({ type: "loading" });

    const res = await axios.post(
      `/api/v1/gemini/export/${type}${state.sendToMail.send ? `?sendToMail=${state.sendToMail.email}` : ""}`,
      {
        data: JSON.stringify(data),
      },
      {
        responseType: "blob",
      },
    );

    downloadHref(res.data);

    dispatch({
      type: "export/loaded",
    });

    navigate("/");
  }

  function downloadHref(resData) {
    const url = window.URL.createObjectURL(resData);

    const anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    anchor.download = `export-${Date.now()}`;
    anchor.click();

    window.URL.revokeObjectURL(url);
  }

  return (
    <AIContext.Provider
      value={{
        dispatch,
        image: state.image,
        imageBlob: state.imageBlob,
        status: state.status,
        answer: state.answer,
        isOpenCropper: state.isOpenCropper,
        sendToMail: state.sendToMail,
        getOCR,
        exportAnswer,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

function useAI() {
  const context = useContext(AIContext);

  if (context === undefined) throw new Error("Invalid Context");

  return context;
}

export { AIProvider, useAI };
