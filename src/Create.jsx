import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  const [Details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const navigate = useNavigate();

  const submitbutton = (event) => {
    event.preventDefault();
    axios
      .post("https://675b0b6d9ce247eb193578e3.mockapi.io/users", Details) 
      .then((response) => {
        console.log("Data added successfully:", response.data);
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a Player</h1>

        <form onSubmit={submitbutton}>
          <div className="mb-2">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setDetails({ ...Details, name: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setDetails({ ...Details, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              onChange={(e) => setDetails({ ...Details, phone: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="website">Website :</label>
            <input
              type="text"
              name="website"
              className="form-control"
              placeholder="Enter Player's Website"
              onChange={(e) =>
                setDetails({ ...Details, website: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>

          <Link to="/" className="btn btn-outline-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
