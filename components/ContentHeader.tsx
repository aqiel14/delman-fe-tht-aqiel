import React from "react";

interface ContentHeaderType {
  title: string;
  subTitle: string;
}

const ContentHeader = ({ title, subTitle }: ContentHeaderType) => {
  return (
    <div className="w-full border-b-2 p-4 border-slate-400">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-sky-600 font-semibold">{subTitle}</p>
    </div>
  );
};

export default ContentHeader;
