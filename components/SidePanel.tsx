"use client";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useFetchedUser } from "@/context/FetchedUserContext";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "@/lib/api";
import toast from "react-hot-toast";

const SidePanel = () => {
  const { fetchedUser, setFetchedUser } = useFetchedUser();

  const [isOpenPanel, setIsOpenPanel] = useState(Boolean(fetchedUser));
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (fetchedUser) {
      setIsOpenPanel(true);
    } else {
      setIsOpenPanel(false);
    }
  }, [fetchedUser]);

  const confirmDelete = async () => {
    if (fetchedUser) {
      mutation.mutate(fetchedUser.id);
    }
    setIsOpenModal(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted");
      setFetchedUser(null);
      queryClient.invalidateQueries(["users"]);
    },
    onError: (response: any) => {
      toast.error(response.response.data.message);
    },
  });

  const handleDeleteButton = () => {
    setIsOpenModal(true);
  };

  const handleCloseAndCancelButton = () => {
    setIsOpenPanel(false);
    setFetchedUser(null);
    window.localStorage.removeItem("fetchedUser");
  };

  const renderUserDetails = () => {
    if (fetchedUser) {
      return Object.entries(fetchedUser).map(([key, value]) => (
        <p
          data-testid={`test-sidepanel-userdetails-${key}`}
          key={key}
        >{`${key}: ${value}`}</p>
      ));
    }
  };

  return isOpenPanel && fetchedUser ? (
    <>
      <section
        data-testid="test-sidepanel-container"
        className="flex items-start justify-end px-4 absolute right-0 top-1/4 "
      >
        <div className="max-w-lg w-full rounded-lg shadow-lg p-4 h-fit bg-gray-200 relative">
          <IoIosClose
            onClick={() => handleCloseAndCancelButton()}
            className="cursor-pointer text-3xl absolute right-4"
          />

          <div className="flex h-full justify-between flex-col">
            <div className="w-full border-b-[1px] p-4 border-black">
              <h1 className="text-2xl font-bold">User Details</h1>
              <p className="text-sm  font-semibold">
                This is inquiry about user with email: {fetchedUser.email}
              </p>
            </div>

            <div className="flex flex-col overflow-y-scroll overflow-x-hidden h-[700px]">
              {renderUserDetails()}
            </div>

            <div className="flex justify-between p-4 ">
              <button
                onClick={() => handleCloseAndCancelButton()}
                className="hover:border-2 p-2 border-gray-500 rounded-xl"
              >
                Cancel
              </button>
              <button
                data-testid="test-sidepanel-deletebutton"
                onClick={() => handleDeleteButton()}
                className="bg-red-500 text-white rounded-md p-2 w-32"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        title={"Delete User Confirmation"}
        subTitle={`Are you sure you want to delete the user with email ${fetchedUser.email} `}
        onConfirm={confirmDelete}
      />
    </>
  ) : (
    <></>
  );
};

export default SidePanel;
