import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/dcthtlmm0/image/upload/v1717084604/kr9o4wuzt8l82j3avuwv.png"
  );

  useEffect(async () => {
    const response = await axios.post(
      "https://turbotweetsf1.onrender.com/api/v1/users/getAvatar",
      {
        userid: user._id,
      }
    );
    console.log(response);
    // setAvatar(response.data.data);
  }, []);

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
        <div className="w-1/4  mx-5 text-center flex flex-col">
          <div className="border-b-4 border-[#ff0000]">
            <img src={user.avatar} className="rounded-full mx-auto py-4"></img>
          </div>
          <h1 className="p-2">Username: {user.userName}</h1>
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
