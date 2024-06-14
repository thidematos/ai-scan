import { Link } from "react-router-dom";
import { useAI } from "../context/AIProvider";

function Logo({ width }) {
  const { dispatch } = useAI();
  return (
    <Link
      onClick={() => dispatch({ type: "choosePrompt" })}
      to={"/"}
      className="flex w-full flex-row items-center justify-center"
    >
      <img src="/logo.png" className={`${width} drop-shadow`} />
    </Link>
  );
}

export default Logo;
