import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

//Modal.setAppElement("#root");

export default function AppCheckDialog(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function handleMonthChange(event) {
    setMonth(event.target.value);
  }

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  // TODO
  function onSubmit() {}

  return (
    <div className="App">
      <Modal isOpen={isOpen} contentLabel="age check dialog">
        <div>Enter your date of birth</div>
        <form>
          <input
            type="number"
            name="year"
            placeholder="2000"
            onChange={handleYearChange}
          />
          <input
            type="number"
            name="month"
            placeholder="1"
            onChange={handleMonthChange}
          />
          <input
            type="number"
            name="date"
            placeholder="31"
            onChange={handleDateChange}
          />
        </form>
        <button onClick={toggleModal}>OK</button>
        <Link to="/login" className="text-link">
          <button>Cancel</button>
        </Link>
      </Modal>
    </div>
  );
}
