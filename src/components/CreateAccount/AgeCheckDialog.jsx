import React, { useState } from "react";
import Modal from "react-modal";

//Modal.setAppElement("#root");

export default function AppCheckDialog() {
  const [isOpen, setIsOpen] = useState(true);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="App">
      <Modal isOpen={isOpen} contentLabel="age check dialog">
        <div>Enter your date of birth</div>
        <button onClick={toggleModal}>OK</button>
        <button onClick={toggleModal}>Cancel</button>
      </Modal>
    </div>
  );
}
