function Instructions({ exampleSrc }) {
  return (
    <div className="flex w-[80%] flex-col items-center justify-center gap-3">
      <h2 className="font-noto text-xl text-gray-800 drop-shadow-sm">
        INSTRUÇÕES
      </h2>
      <ol className="flex list-inside list-decimal flex-col items-start gap-3 font-montserrat text-gray-600">
        <li>Certifique-se que a imagem tem boa definição</li>
        <li>Recorte a imagem para que ela fique igual ao exemplo</li>
        <li>
          Clique em <span>SCAN</span> e aguarde o resultado.
        </li>
        <li>Clique na fotografia para reiniciar o processo.</li>
      </ol>
      <div className="flex flex-col items-center justify-center gap-3">
        <h3 className="font-noto text-xl text-gray-800 drop-shadow-sm">
          EXEMPLO:
        </h3>
        <img
          src={exampleSrc}
          className="rounded-lg border border-orange-500 shadow-lg"
        />
      </div>
    </div>
  );
}

export default Instructions;
