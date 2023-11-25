"use client";
import ContentHeader from "@/components/ContentHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useFetchedUser } from "@/context/FetchedUserContext";
import { getAllUsers } from "@/lib/api";
import { ApiType, UserType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useQuery } from "react-query";

const useSearchDebounce = (delay = 350) => {
  const [search, setSearch] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    const delayFn = setTimeout(() => setSearch(searchQuery), delay);
    return () => clearTimeout(delayFn);
  }, [searchQuery, delay]);

  return [search, setSearchQuery];
};

const Search = () => {
  const { fetchedUser, setFetchedUser } = useFetchedUser();

  const [search, setSearch] = useState(fetchedUser ? fetchedUser.email : "");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const { data, isLoading, isPreviousData } = useQuery<ApiType>({
    queryFn: () => getAllUsers(),
    queryKey: ["users"],
  });

  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    if (!isLoading && data?.data) {
      setUsers(data?.data);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const user = users.find((user) => user.email === search);

    if (user) {
      setFetchedUser(user);
    }
  };

  return (
    <>
      <section>
        <ContentHeader
          title={"Search User"}
          subTitle={"Search existing user"}
        />
        <div className="p-4">
          <div className="w-[600px] flex flex-col gap-8">
            <form
              className="flex flex-col gap-8"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>

                <input
                  data-testid="test-search-form-email"
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search E-mail"
                  required
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <IoIosCloseCircle className="absolute cursor-pointer right-4 top-[18px] text-xl text-gray-400" />
              </div>

              <div className="flex py-8 flex-col items-center justify-center border-2">
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="font-bold text-2xl">
                    {fetchedUser?.name ?? ""}
                  </h1>
                  <p className="font-semibold text-gray-500">
                    {fetchedUser?.email ?? ""}
                  </p>
                </div>
                <hr className="w-64 h-px mx-auto bg-gray-400 border-0 rounded my-5 "></hr>
                <button
                  data-testid="test-search-form-submit"
                  type="submit"
                  className={`bg-blue-800 ring-4 text-white rounded-md py-2 px-4 w-fit font-semibold`}
                >
                  View User Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* <SidePanel /> */}
    </>
  );
};

export default Search;
