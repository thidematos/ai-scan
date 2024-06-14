function InteractionButton({ action, children }) {
  return (
    <button
      className="flex w-[40%] flex-row items-center justify-center rounded-lg border border-gray-100 bg-orange-500 p-4 font-montserrat text-xl text-gray-50 shadow"
      onClick={() => action()}
    >
      {children}
    </button>
  );
}

export default InteractionButton;
