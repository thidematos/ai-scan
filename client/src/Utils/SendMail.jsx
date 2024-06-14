import { useState } from "react";
import validator from "validator";
import { useAI } from "../context/AIProvider";

function SendMail() {
  const { sendToMail, dispatch } = useAI();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <p className="w-[60%] text-center font-montserrat text-lg text-gray-800">
          Enviar o arquivo exportado por email?
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <label
            htmlFor="check"
            className={`size-[20px] rounded-full border border-green-600 p-4 ${sendToMail.send ? "bg-green-400" : "bg-gray-100"} duration-100`}
          ></label>
          <span
            className={`font-montserrat text-lg font-bold ${sendToMail.send ? "text-green-500" : "text-gray-800"}`}
          >
            {sendToMail.send ? "SIM" : "NÃO"}
          </span>
        </div>

        <input
          type="checkbox"
          id="check"
          value={sendToMail.send}
          className="hidden"
          onChange={() => dispatch({ type: "toggleSendMail" })}
        />
      </div>
      {sendToMail.send && (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="flex flex-row items-center justify-start gap-4 font-montserrat">
            <label className="text-lg text-gray-500">Email:</label>
            <input
              type="text"
              placeholder="primor@gmail.com"
              value={sendToMail.email}
              onChange={(e) =>
                dispatch({ type: "changedEmail", payload: e.target.value })
              }
              className={`rounded-lg border p-3 text-gray-800 shadow placeholder:text-gray-300 focus:outline-none ${sendToMail.valid ? "border-green-500" : "border-red-300"}`}
            />
          </div>
          {sendToMail.valid || (
            <p className="font-montserrat text-lg text-red-500">
              Insira um email válido!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SendMail;
