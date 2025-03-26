import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoReader } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  
  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete this player?");
    if (confirm) {
      axios
        .delete(`https://675b0b6d9ce247eb193578e3.mockapi.io/users/${id}`)
        .then(() => {
          
          setData((prevData) => prevData.filter((player) => player.id !== id));
        })
        .catch((err) => console.error("Error deleting data:", err));
    }
  };

  
  useEffect(() => {
    axios
      .get("https://675b0b6d9ce247eb193578e3.mockapi.io/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  
  const gotoRead = (id) => {
    navigate(`/read/${id}`);
  };

 
  const gotoUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-info vh-100 text-white">
      <h1>Players List</h1>
      <div className="">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-outline-success">
            Add <IoAddCircle />
          </Link>
        </div>
        <table className="table table-bordered table-striped text-white tablecss">
          <thead>
            <tr className="table-warning">
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((player) => (
                <tr className="table-info" key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td>{player.email}</td>
                  <td>{player.phone}</td>
                  <td>{player.website}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => gotoRead(player.id)}
                    >
                      <IoReader /> Read
                    </button>
                    <button
                      className="btn btn-outline-warning ms-2"
                      onClick={() => gotoUpdate(player.id)}
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      className="btn btn-outline-danger ms-2"
                      onClick={() => handleDelete(player.id)}
                    >
                      <RiDeleteBin6Line /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
