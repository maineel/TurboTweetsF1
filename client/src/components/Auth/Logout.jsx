import React from "react";
import { useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Logout() {
  const navigate = useNavigate();

  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://turbotweetsf1.onrender.com/api/v1/users/logout"
      );
      console.log(response);
      if (response.status != 200) {
        toast.error("Error in logging out user", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setIsAuthenticated(false);
      setUser(null);
      navigate("/");
    } catch (err) {
      toast.error("Error in logging in user", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(err);
    }
  };

  return (
    <>
        <button onClick={handleSubmit}>
            Logout
        </button>
      <ToastContainer />
    </>
  );
}

export default Logout;
