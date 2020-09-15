import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

//Modal.setAppElement("#root");

export default function AppCheckDialog(props) {
  const passAge = 18;

  const [isOpen, setIsOpen] = useState(true);
  const [err, setErr] = useState("");
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
  function onSubmit() {
    // current date
    const today = new Date();

    // check if input is in valid range
    const yearInt = parseInt(year);
    const monthInt = parseInt(month);
    const dateInt = parseInt(date);
    if (
      !year ||
      !month ||
      !date ||
      yearInt < 1900 ||
      yearInt > today.getFullYear() ||
      monthInt < 1 ||
      monthInt > 13 ||
      dateInt < 1 ||
      dateInt > 31
    ) {
      setErr("Please enter your correct date of birth.");
      return;
    }

    // calc age
    const birthday = new Date(yearInt, monthInt, dateInt);
    var age = today.getFullYear() - birthday.getFullYear();
    var m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }

    if (age >= passAge) {
      // if age >= 18 close dialog
      setErr("");
      toggleModal();
      return;
    } else {
      // if age < 18 show error
      setErr("This service is not available to anyone under the age of 18.");
      return;
    }
  }

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
        <button onClick={onSubmit}>OK</button>
        <Link to="/login" className="text-link">
          <button>Cancel</button>
        </Link>
        {err ? <div>{err}</div> : <div />}
      </Modal>
    </div>
  );
}
