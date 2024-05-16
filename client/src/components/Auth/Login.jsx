import React from "react";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://turbotweetsf1.onrender.com/api/v1/users/login",
        { email, password }
      );
      console.log(response.data);
      localStorage.setItem("accessToken", response.data.accessToken);

      window.location.href = "/";
    } catch (err) {
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
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
