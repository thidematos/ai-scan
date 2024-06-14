function AlertParagraph({ children }) {
  return (
    <p className="w-[80%] text-center font-montserrat text-lg text-red-400 drop-shadow-sm">
      {children}
    </p>
  );
}

export default AlertParagraph;
