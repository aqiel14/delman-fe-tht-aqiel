import React from "react";

interface ModalPropsType {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subTitle: string;
  onConfirm: () => void;
}

const Modal = ({
  isOpenModal,
  setIsOpenModal,
  title,
  subTitle,
  onConfirm,
}: ModalPropsType) => {
  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return isOpenModal ? (
    <div
      data-testid="test-modal-container"
      className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster bg-gray-100 opacity-80"
    >
      <div className="border border-teal-500 modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{title}</p>
            <div
              onClick={() => setIsOpenModal(false)}
              className="modal-close cursor-pointer z-50"
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="my-5">
            <p>{subTitle}</p>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleCancel()}
              className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              data-testid="test-modal-confirmbutton"
              onClick={() => handleConfirm()}
              className="focus:outline-none px-4 bg-red-500 p-3 ml-3 rounded-lg text-white hover:bg-red-400"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
