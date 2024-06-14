import Button from "../Utils/Button";
import InteractionButton from "../Utils/InteractionButton";
import Loader from "../Utils/Loader";
import ReferenceImage from "../Utils/ReferenceImage";
import SendMail from "../Utils/SendMail";
import { useAI } from "../context/AIProvider";

function ListAnswer() {
  const { exportAnswer, answer, status, sendToMail } = useAI();

  const rawItens = answer.split("|");

  const totalItens = Number(rawItens.at(0).split(":").at(1));

  const itens = rawItens.slice(1);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <ReferenceImage />
      <AnswerList totalItens={totalItens} itens={itens} />
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <SendMail />
          {sendToMail.send ? (
            sendToMail.valid && (
              <InteractionButton action={() => exportAnswer("docx", itens)}>
                <img src="/docx.png" className="w-[50%] drop-shadow" />
              </InteractionButton>
            )
          ) : (
            <InteractionButton action={() => exportAnswer("docx", itens)}>
              <img src="/docx.png" className="w-[50%] drop-shadow" />
            </InteractionButton>
          )}
        </>
      )}
    </div>
  );
}

function AnswerList({ totalItens, itens }) {
  return (
    <div className="flex w-[80%] flex-col items-center justify-center">
      <h2 className="my-6 font-noto text-lg text-gray-800">
        Total de produtos:{" "}
        <span className="text-xl font-bold text-red-500">{totalItens}</span>
      </h2>
      <ul className="flex list-inside list-disc flex-col items-start justify-center gap-2 font-montserrat text-gray-800">
        {itens.map((item) => (
          <li className="" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListAnswer;
