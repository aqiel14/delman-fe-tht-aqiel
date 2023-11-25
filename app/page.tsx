import Link from "next/link";
import { menuConstants } from "@/lib/constants";

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-4 bg-slate-300 items-center justify-center p-2">
      <h1 className="font-bold text-4xl">
        Delman Data Lab - Frontend Engineer THT
      </h1>
      <h2 data-testid="test-name" className="font-light text-3xl">
        Aqiel Ilhamy
      </h2>
      <div className="flex gap-4 gap-y-4 max-w-4xl lg:max-w-6xl text-white">
        {menuConstants.map((menu, i) => (
          <Link
            key={i}
            className="flex flex-col items-center justify-center bg-slate-700 rounded-xl h-36 w-36 lg:h-80 lg:w-80 hover:bg-green-600 active:bg-green-700 "
            href={menu.path}
          >
            <div className="text-[100px] rounded-t-xl max-h-20 lg:max-h-44">
              {menu.icon}
            </div>

            <p className="text-xl lg:text-3xl text-gray-50 pt-5 pl-3 ">
              {menu.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
