import Logo from "./Logo";

function Header({ title }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Logo width={"w-[50%]"} />
      <h1 className="font-montserrat text-2xl text-gray-800 drop-shadow-sm">
        {title}
      </h1>
    </div>
  );
}

export default Header;
