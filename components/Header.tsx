import React from "react";

const Header = ({ headerTitle }: { headerTitle: string }) => {
  return (
    <header className="bg-slate-50 z-50 fixed w-full border-b-2 border-black p-4">
      <p className="text-start ml-16">{headerTitle}</p>
    </header>
  );
};

export default Header;
