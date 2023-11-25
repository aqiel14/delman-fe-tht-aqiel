import Image from "next/image";
import Link from "next/link";
import React from "react";

const FourOhFour = () => {
  return (
    <div className="h-[80vh] bg-gray-50 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div
            data-testid="test-404-404"
            className="text-7xl text-gray-500 font-dark font-extrabold mb-8"
          >
            {" "}
            404
          </div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Sorry we couldn't find the page you're looking for
          </p>

          <Link
            data-testid="test-404-backbutton"
            href="/"
            className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-gray-600 active:bg-red-600 hover:bg-red-700"
          >
            Back to Homepage
          </Link>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <Image
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            width={1200}
            height={700}
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
};

export default FourOhFour;
