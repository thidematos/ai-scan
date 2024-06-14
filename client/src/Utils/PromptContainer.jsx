import { useAI } from "../context/AIProvider";

function PromptContainer({ children }) {
  const { isOpenCropper } = useAI();

  return (
    <div
      className={`${isOpenCropper ? "h-[100svh] overflow-hidden" : ""} relative flex grow flex-col items-center justify-evenly gap-12`}
    >
      {children}
    </div>
  );
}

export default PromptContainer;
