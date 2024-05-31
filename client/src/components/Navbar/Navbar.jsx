import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    try {
      const response = await axios.post(
        "https://turbotweetsf1.onrender.com/api/v1/users/logout",
        { user },
        { withCredentials: true }
      );
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
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setUser(null);
      navigate("/");
    } catch (err) {
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
      console.log(err);
    }
  };

  return (
    <nav className="w-full bg-black text-[#FF0000] h-auto flex justify-between px-4 py-4 md:px-4 items-center">
      <div className="text-2xl font-bold font-mono underline">
        <NavLink to="/">TurboTweetsF1</NavLink>
      </div>
      <div>
        <ul className="md:flex hidden font-bold text-xl">
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/threads">Threads</NavLink>
          </li>
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/inbox">Inbox</NavLink>
          </li>
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/f1stats">F1 Stats</NavLink>
          </li>
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </div>
      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogoutClick}
            className="md:block px-2 py-1 cursor-pointer bg-[#FF0000] text-black font-bold rounded hover:bg-[#FF0000] hover:text-white flex-end"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/auth/login"
            className="md:block px-2 py-1 cursor-pointer bg-[#FF0000] text-black font-bold rounded hover:bg-[#FF0000] hover:text-white flex-end"
          >
            Login
          </NavLink>
        )}
      </div>
      <div className="md:hidden">
        <ul className="font-bold text-xl">
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/threads">Threads</NavLink>
          </li>
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/inbox">Inbox</NavLink>
          </li>
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/f1stats">F1 Stats</NavLink>
          </li>
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
        <NavLink className="text-4xl" to="/">{`\u2261`}</NavLink>
      </div>
      <ToastContainer />
    </nav>
  );
}

export default Navbar;
