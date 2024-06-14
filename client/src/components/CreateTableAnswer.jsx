import { useAI } from "../context/AIProvider";
import ReferenceImage from "../Utils/ReferenceImage";
import Loader from "../Utils/Loader";
import InteractionButton from "../Utils/InteractionButton";

function CreateTableAnswer() {
  const { answer, status, exportAnswer } = useAI();

  const rawData = answer.split("|");

  const cols = rawData.at(0).split(":").at(1);
  const rows = rawData.at(1).split(":").at(1);

  const tableItens = rawData.slice(2);

  const tableData = tableItens.map((item) => {
    const arr = item.split("-");
    return {
      id: arr.at(0),
      data: arr.at(1),
    };
  });

  return (
    <>
      <ReferenceImage />
      <div
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
        className="grid w-[90%] rounded-lg border border-orange-500 text-center shadow"
      >
        {tableData.map((item) => (
          <p
            key={item.id}
            className="flex flex-col items-center justify-center border border-gray-200 p-3 text-center font-noto text-sm"
          >
            <span>{item.data}</span>
          </p>
        ))}
      </div>
      {status === "loading" ? (
        <Loader />
      ) : (
        <InteractionButton action={() => exportAnswer("xlsx", tableData)}>
          <img src="/xlsx.png" className="w-[50%] drop-shadow" />
        </InteractionButton>
      )}
    </>
  );
}

export default CreateTableAnswer;
