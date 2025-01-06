import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const CustomModal = ({
  modalVisible,
  setModalVisible,
  title,
  btnText,
  btn2Text,
  onPress2,
  icon,
  btn2,
}) => {
  return (
    <Modal
      isOpen={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
      className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md mx-auto"
    >
      {icon && (
        <img
          src="/path-to-alert-icon.png"
          alt="Alert"
          className="w-12 h-12 mb-4 mx-auto"
        />
      )}
      <h3 className="text-center text-xl font-semibold mb-4">{title}</h3>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        {btn2 && (
          <button
            className="w-full md:w-1/2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
            onClick={() => setModalVisible(false)}
          >
            Close
          </button>
        )}
        <button
          className={`w-full ${
            btn2Text ? "md:w-1/2" : "md:w-2/3"
          } bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition`}
        >
          {btnText}
        </button>
        {btn2Text && (
          <button
            className="w-full md:w-1/2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            onClick={onPress2}
          >
            {btn2Text}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;
