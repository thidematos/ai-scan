import { useNavigate } from "react-router-dom";
import { useAI } from "../context/AIProvider";
import { useEffect } from "react";

function VerifyAnswer({ children }) {
  const { answer } = useAI();
  const navigate = useNavigate();

  useEffect(() => {
    if (!answer) navigate("/");
  }, [answer, navigate]);

  return answer ? children : null;
}

export default VerifyAnswer;
