import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoCaretBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

function Read() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the ID from the URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to navigate to the Update page
  const gotoUpdate = () => {
    navigate(`/update/${id}`); // Navigate to the update route with the current ID
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    if (id) {
      axios
        .get(`https://675b0b6d9ce247eb193578e3.mockapi.io/users/${id}`)
        .then((response) => {
          setData(response.data); // Set the fetched data to the state
        })
        .catch((error) => {
          setError("User not found or other error occurred."); // Handle errors
        });
    }
  }, [id]); // Run the effect when `id` changes

  // Handle error state
  if (error) {
    return (
      <div className="text-center">
        <h1>Error</h1>
        <p>{error}</p>
        <Link to="/Crud-Operation" className="btn btn-outline-info">
          <IoCaretBack /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="fw-bold">Player Details</h1>
      {data ? (
        <div className="d-flex flex-column mb-3 d-inline-flex p-2">
          <p className="badge text-bg-info">
            <strong>ID:</strong> {data.id}
          </p>
          <p className="badge rounded-pill text-bg-warning">
            <strong>Name:</strong> {data.name}
          </p>
          <p className="badge rounded-pill text-bg-warning">
            <strong>Email:</strong> {data.email}
          </p>
          <p className="badge rounded-pill text-bg-warning">
            <strong>Phone:</strong> {data.phone}
          </p>
          <p className="badge rounded-pill text-bg-warning">
            <strong>Website:</strong> {data.website}
          </p>

          <Link to="/" className="btn btn-outline-info text-decoration-none">
            <IoCaretBack /> Back to Home
          </Link>

          <button
            className="btn btn-outline-warning mt-2"
            onClick={gotoUpdate} // Correctly invoke gotoUpdate
          >
            <FiEdit /> Edit
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Read;
