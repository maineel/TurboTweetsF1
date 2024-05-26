import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

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
      <div className="w-full flex flex-row h-svh p-3">
        <div className="w-1/4 bg-white mx-3 text-center">
          <img src="https://b.thumbs.redditmedia.com/uUkSuTDpTWhU4mW5-OXzca_pVR0RQKHkEq-x_eCQC9I.png" className="rounded-full"></img>
        </div>
        <div className="w-3/4 bg-white"></div>
      </div>
      <div className="text-white">Username: {user.userName}</div>
      <div className="text-white">Email: {user.email}</div>
      <div className="text-white">FullName: {user.fullName}</div>
      <div className="text-white">Wallet: {user.wallet}</div>
      <div className="text-white">
        Created: {createDateString} | {createTimeString}
      </div>
      <div className="text-white">
        Last Login: {updateDateString} | {updateTimeString}
      </div>
    </>
  );
}

export default Profile;
