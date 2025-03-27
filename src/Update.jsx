import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });
  const [error, setError] = useState(null);
  

  useEffect(() => {
    console.log("Fetched ID from useParams:", id);
    if (id) {
      axios
        .get(`https://675b0b6d9ce247eb193578e3.mockapi.io/users/${id}`)
        .then((response) => {
          if (response.data) {
            setDetails(response.data);
          } else {
            setError("User not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
          setError("User not found or other error occurred.");
        });
    }
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`https://675b0b6d9ce247eb193578e3.mockapi.io/users/${id}`, {
        name: Details.name,
        email: Details.email,
        phone: Details.phone,
        website: Details.website,
      })
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error updating data:", error.message);
      });
  };

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
        <Link to="/" className="btn btn-primary">Go Back</Link>
      </div>
    );
  }

  if (!Details.name && !Details.email && !Details.phone && !Details.website) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center updateitem">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className='badge text-bg-info'>Update the Player's List</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2 ">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={Details.name}
              onChange={(e) =>
                setDetails({ ...Details, name: e.target.value })
              }
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={Details.email}
              onChange={(e) =>
                setDetails({ ...Details, email: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              value={Details.phone}
              onChange={(e) =>
                setDetails({ ...Details, phone: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="website">Website:</label>
            <input
              type="text"
              name="website"
              className="form-control"
              placeholder="Enter Player's Website"
              value={Details.website}
              onChange={(e) =>
                setDetails({ ...Details, website: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn btn-outline-success">
            Update
          </button>

          <Link to="/Crud-Operation" className="btn btn-outline-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
