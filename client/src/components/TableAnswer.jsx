import { useAI } from "../context/AIProvider";
import InteractionButton from "../Utils/InteractionButton";
import Loader from "../Utils/Loader";
import SendMail from "../Utils/SendMail";
import ReferenceImage from "./../Utils/ReferenceImage";

function TableAnswer() {
  const { answer, status, exportAnswer, sendToMail } = useAI();

  const split = answer.split("|");

  const rows = split.at(1).trim().split(":").at(1);
  const cols = split.at(0).trim().split(":").at(1);

  const data = split.slice(2).map((tableItem) => {
    const [id, tableData] = tableItem.split("-");
    return {
      id,
      data: tableData,
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
        {data.map((item) => (
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
        <>
          <SendMail />
          {sendToMail.send ? (
            sendToMail.valid && (
              <InteractionButton action={() => exportAnswer("xlsx", data)}>
                <img src="/xlsx.png" className="w-[50%] drop-shadow" />
              </InteractionButton>
            )
          ) : (
            <InteractionButton action={() => exportAnswer("xlsx", data)}>
              <img src="/xlsx.png" className="w-[50%] drop-shadow" />
            </InteractionButton>
          )}
        </>
      )}
    </>
  );
}

export default TableAnswer;
