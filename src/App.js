import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  min-width: 80px;
  height: 30px;
  margin: 5px 10px;
  padding: 0;
  border: 1px solid rgb(51, 51, 51);
  background-color: ${(props) =>
    props.secondary ? "white" : "rgb(51, 51, 51)"};
  color: ${(props) => (props.secondary ? "rgb(51, 51, 51)" : "white")};
  cursor: pointer;
`;
const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-content {
    background-color: #fefefe;
    border: 1px solid #888;
    width: 750px;
    height: 350px;
    border: 1px solid rgb(51, 51, 51);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .header {
      background-color: rgb(242, 242, 242);
      p {
        margin: 0;
        padding: 5px 10px;
      }
    }
    .main {
      height: 100%;
      padding: 10px 15px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(5, 1fr);
      p {
        margin: 5px;
        padding: 5px;
        align-self: center;
      }
      input,
      select {
        //form
        height: 30px;
        margin: 0;
        padding: 0 5px;
        align-self: center;
      }
      .grid-item-right {
        grid-column-start: 2;
        grid-column-end: 6;
      }
      .radio-group {
        display: flex;
        align-items: center;
        label {
          margin-right: 20px;
        }
        input {
          //radio
          margin-right: 5px;
          padding: 0;
        }
      }
    }
    .controlls {
      border-top: 1px solid rgb(51, 51, 51);
      padding: 10px 15px;
      .button-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
`;
function App() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [format, setFormat] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [schedule, setSchedule] = useState("");
  const sendAll = () => {
    fetch("https://postman-echo.com/post", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({ name, format, email, schedule, date, hour }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const conditionallyRenderComponent = (name) => {
    if (name === "specdate") {
      return (
        <>
          <p>Date </p>
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            style={{ gridColumnStart: 2, gridColumnEnd: 4 }}
          ></input>
          <p style={{ textAlign: "center" }}>at</p>
          <input onChange={(e) => setHour(e.target.value)} type="time"></input>
        </>
      );
    }
    if (name === "daily") {
      return (
        <>
          <p>Everyday at</p>
          <input onChange={(e) => setHour(e.target.value)} type="time"></input>
        </>
      );
    }
    if (name === "weekly") {
      return (
        <>
          <p>Every</p>
          <select
            onChange={(e) => setDate(e.target.value)}
            style={{ height: "34px" }}
            id="days"
            name="days"
          >
            <option value="mon">Monday</option>
            <option value="tue">Tuesday</option>
            <option value="wed">Wednesday</option>
            <option value="thu">Thursday</option>
            <option value="fri">Friday</option>
            <option value="sat">Saturday</option>
            <option value="sun">Sunday</option>
          </select>
          <p style={{ textAlign: "center" }}>at</p>
          <input onChange={(e) => setHour(e.target.value)} type="time"></input>
        </>
      );
    }
    return "";
  };
  return (
    <Wrapper>
      {isModalOpen && (
        <Modal>
          <div className="modal-content">
            <div className="header">
              <p>Export Report</p>
            </div>
            <div className="main">
              <p>Report name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Shareablee Report"
                type="text"
                className="grid-item-right"
              ></input>
              <p>Format</p>
              <div
                onChange={(e) => setFormat(e.target.value)}
                className="grid-item-right radio-group"
              >
                <input
                  name="radio1"
                  id="excel"
                  type="radio"
                  value="excel"
                ></input>
                <label htmlFor="excel">Excel</label>
                <input name="radio1" id="CSV" type="radio" value="csv"></input>
                <label htmlFor="CSV">CSV</label>
              </div>
              <p>E-mail to</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com"
                type="email"
                className="grid-item-right"
              ></input>
              <p>Schedule</p>
              <div
                onChange={(e) => setSchedule(e.target.value)}
                className="grid-item-right radio-group"
              >
                <input
                  name="radio2"
                  id="norep"
                  type="radio"
                  value="norep"
                ></input>
                <label htmlFor="norep">No Repeat</label>
                <input
                  name="radio2"
                  id="specdate"
                  type="radio"
                  value="specdate"
                ></input>
                <label htmlFor="specdate">Specific Date</label>
                <input
                  name="radio2"
                  id="daily"
                  type="radio"
                  value="daily"
                ></input>
                <label htmlFor="daily">Daily</label>
                <input
                  name="radio2"
                  id="weekly"
                  type="radio"
                  value="weekly"
                ></input>
                <label htmlFor="weekly">Weekly</label>
              </div>
              {conditionallyRenderComponent(schedule)}
            </div>
            <div className="controlls">
              <div className="button-wrapper">
                <Button secondary onClick={() => setisModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => sendAll()}>OK</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <Button onClick={() => setisModalOpen(true)}>Open Modal</Button>
    </Wrapper>
  );
}

export default App;
