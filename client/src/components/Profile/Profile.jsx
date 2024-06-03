import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);

  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const [newFullName, setNewFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      if (newAvatar) {
        const formData = new FormData();
        formData.append("avatar", newAvatar);
        formData.append("userid",user._id);
        await axios.post(
          "https://turbotweetsf1.onrender.com/api/v1/users/uploadAvatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(response => {
          setUser(response.data.data);
          localStorage.setItem('user', JSON.stringify(response.data.data));
        })
        .catch( error => {
          console.error(error);
        })
      }

      if(newFullName!=="" || newPassword!==""){
        const response = await axios.post(
          "https://turbotweetsf1.onrender.com/api/v1/users/updateProfile",
          {
            user,
            userid: user._id,
            newFullName,
            newPassword,
          }
        );
        setUser(response.data.data);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
    } catch (e) {
      console.error(e);
    }
    setIsUpdating(false);
  };
  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        className="text-3xl font-bold font-mono text-[#FF0000]"
      >
        <Link to="/auth/login" className="mx-2 underline underline-offset-2">
          LogIn
        </Link>{" "}
        <span> to view your profile</span>
      </div>
    );
  }

  const createTimestamp = user.createdAt;
  const updateTimestamp = user.updatedAt;

  const createDate = new Date(createTimestamp);
  const updateDate = new Date(updateTimestamp);

  const createDateString = createDate.toLocaleDateString();
  const createTimeString = createDate.toLocaleTimeString();

  const updateDateString = updateDate.toLocaleDateString();
  const updateTimeString = updateDate.toLocaleTimeString();

  return (
    <>
      <div className="w-full flex flex-row h-screen px-10 text-2xl font-mono font-bold text-[#FF0000]">
        {isUpdating && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <form
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                onSubmit={handleUpdate}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <input
                    className="w-full px-3 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none"
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={(e) => {
                      setNewFullName(e.target.value);
                    }}
                  />
                  <input
                    className="w-full px-3 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none"
                    type="password"
                    name="wallet"
                    placeholder="Password"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                  <input
                    className="w-full px-3 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => {
                      setNewAvatar(e.target.files[0]);
                    }}
                  />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsUpdating(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="w-1/4  mx-5 text-center flex flex-col items-center">
          <div className="border-b-4 border-[#ff0000]">
            <img
              src={user.avatar}
              className="rounded-full mx-auto py-4 w-80 h-80"
            ></img>
          </div>
          <h1 className="p-2">Username: {user.userName}</h1>
          <button
            className="bg-[#ff0000] text-white rounded-md w-3/4 m-2 hover:bg-gray-700"
            onClick={() => {
              setIsUpdating(true);
            }}
          >
            Edit Profile{" "}
          </button>
        </div>
        <div className="border-r-2 border-[#ff0000]"></div>
        <div className="w-3/4 p-5 ">
          <div className="p-4">Email: {user.email}</div>
          <div className="p-4">FullName: {user.fullName}</div>
          <div className="p-4">Wallet: {user.wallet}</div>
          <div className="p-4">Account Created Date: {createDateString}</div>
          <div className="p-4">Account Created Time: {createTimeString}</div>
          <div className="p-4">Last Login Date: {updateDateString}</div>
          <div className="p-4">Last Login Time: {updateTimeString}</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
