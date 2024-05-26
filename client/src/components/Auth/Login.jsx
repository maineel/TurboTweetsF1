import React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://turbotweetsf1.onrender.com/api/v1/users/login",
        {
          email,
          password,
        }
      );
      if (response.status != 200) {
        toast.error("Error in registering user", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        throw new Error("Error in registering user");
      }
      localStorage.setItem("accessToken", response.data.data.accessToken);
      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => {
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          setUser(response.data.data.user);
          setIsAuthenticated(true);
          navigate("/");
        },
      });
    } catch (err) {
      toast.error("Error in logging in user", {
        position: "top-right",
        autoClose: 2000,
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
      <div className="flex flex-row w-full h-screen justify-between bg-white">
        <div className="w-1/2 flex items-center justify-center">
          <img
            className="max-w-full h-auto"
            src="https://i.pinimg.com/564x/b3/2f/98/b32f982d80e6e08cc0d1504bc34a6566.jpg"
          ></img>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center p-10">
          <h1 className="text-3xl text-[#FF0000] font-bold p-2">Login</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <div>
              <h1>
                Don't have an account?{" "}
                <Link to="/auth/register" className="text-blue-600 underline">
                  Signup
                </Link>
              </h1>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
