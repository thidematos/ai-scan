import { Link } from "react-router-dom";
import Button from "../Utils/Button";
import Logo from "../Utils/Logo";
import { useAI } from "../context/AIProvider";

function Home() {
  return (
    <div className="flex w-full grow flex-col items-center justify-evenly gap-16">
      <div className="flex flex-col items-center justify-center gap-6">
        <Logo width={"w-[50%]"} />
        <Header />
      </div>
      <Prompts />
    </div>
  );
}

function Header() {
  return (
    <h1 className="w-[80%] text-center font-montserrat text-2xl text-gray-800 drop-shadow-sm">
      Reconhecimento Óptico de Rótulos
    </h1>
  );
}

function Prompts() {
  const { dispatch } = useAI();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <p className="font-montserrat text-xl text-gray-600">
        Escolha um scanner:
      </p>
      <Button to={"/tabelas"}>TABELAS</Button>

      <Button to={"/listas"}>LISTAS</Button>
      <Button to={"/textos"}>TEXTOS</Button>
      <Button to={"/criar-tabela"}>CRIAR TABELA</Button>
    </div>
  );
}

export default Home;
