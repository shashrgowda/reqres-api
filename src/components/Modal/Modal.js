import React from "react";
import "./Modal.css";
import Modal from "react-modal";
import Loader from "../Loader/Loader";

Modal.setAppElement("#root");

const ModalWindow = ({ onRequestClose, singleUserData, loading }) => {
  const customStyles = {
    content: {
      position: "absolute",
      display: "flex",
      flexWrap: "wrap",
      margin: 0,
      top: "90px",
      left: "100px",
      right: "100px",
      bottom: "250px",
      border: "1px solid #ccc",
      background: "rgb(54, 46, 46)",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
    overlay: {
      backgroundColor: "grey",
    },
  };

  let loader = (
    <React.Fragment>
      <h1 style={{ color: "white" }}>
        {singleUserData[0].first_name + " " + singleUserData[0].last_name}
      </h1>
      <p style={{ color: "white" }}>{singleUserData[0].email}</p>
      <img
        style={{
          top: "8px",
          right: "16px",
          backgroundColor: "gray",
          height: "150px",
          borderRadius: "50%",
        }}
        src={singleUserData[0].avatar}
        alt="user"
      />
    </React.Fragment>
  );

  if (loading) {
    loader = <Loader />;
  }

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      style={customStyles}
      closeTimeoutMS={500}
    >
      {loader}
    </Modal>
  );
};

export default ModalWindow;
