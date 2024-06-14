import { Link } from "react-router-dom";
import { useAI } from "../context/AIProvider";

function Button({ children, action, to }) {
  const { dispatch } = useAI();

  return (
    <Link
      to={to}
      className="w-[50%] rounded-lg border border-orange-300 bg-orange-400 p-4 text-center font-montserrat text-xl text-gray-50 shadow drop-shadow"
      onClick={() => (action ? action() : dispatch({ type: "choosePrompt" }))}
    >
      {children}
    </Link>
  );
}

export default Button;
