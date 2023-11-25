"use client";
import { UserType } from "@/lib/types";
// import type { UserType } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface FetchedUserProviderProps {
  children: React.ReactNode;
}

interface FetchedUserContextType {
  fetchedUser: UserType | null;
  setFetchedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const FetchedUserContext = createContext<FetchedUserContextType | undefined>(
  undefined
);

const FetchedUserProvider = ({ children }: FetchedUserProviderProps) => {
  const [fetchedUser, setFetchedUser] = useState<UserType | null>(null);

  //Save User details in storage, so modal stays open during refresh
  useEffect(() => {
    if (fetchedUser && !Boolean(window.localStorage.getItem("fetchedUser"))) {
      window.localStorage.setItem("fetchedUser", JSON.stringify(fetchedUser));
    }
  }, [fetchedUser, setFetchedUser]);

  // Save User details in storage, so modal stays open during refresh
  useEffect(() => {
    const storedUser = window.localStorage.getItem("fetchedUser");

    if (storedUser) {
      setFetchedUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <FetchedUserContext.Provider
      value={{
        fetchedUser,
        setFetchedUser,
      }}
    >
      {children}
    </FetchedUserContext.Provider>
  );
};

export default FetchedUserProvider;

//Custom hook to destructure object
export const useFetchedUser = () => {
  const context = useContext(FetchedUserContext);

  if (!context) {
    throw new Error(
      "useFetchedUserContext must be used within an FetchedUserProvider"
    );
  }
  return context;
};
