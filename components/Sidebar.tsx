import { menuConstants } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-60 bg-slate-100 h-full border-r border-zinc-200 flex flex-col gap-4 mt-2">
      {menuConstants.map((menu, i) => (
        <Link key={i} href={menu.path}>
          <div className="flex items-center p-4 gap-4 flex-row hover:bg-slate-200 hover:text-blue-800 hover:outline-1 border-blue-800">
            {menu.icon}
            <p>{menu.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
