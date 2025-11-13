import { useEffect, useState } from "react";
import { getAuthorized, logOut, token } from "../../utils/api";
import Profile from "../../components/Profile/Profile";
import Home from "../Home/Home";

import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const [signUpStatus, setSignUpStatus] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    logOut();
    navigate("/home");
    logOut();
  };
  useEffect(() => {
    // Debug: Check token in localStorage at mount

    console.log("Token at ProfilePage mount:", token);

    const getProfile = async () => {
      // Debug: Check token right before API call
      console.log("Token before profile fetch:", localStorage.getItem("token"));
      setIsLoading(false);
      const response = await getAuthorized();
      console.log(response.data);
      setUserInfo(response.data);
    };
    getProfile();
  }, [token]);
  console.log(userInfo);

  return !userInfo ? (
    <div>No user data found.</div>
  ) : (
    <div className="profile">
      <h1 className="profile__name">{userInfo?.name}</h1>
      <p className="profile__email">Email: {userInfo?.email}</p>

      <button className="profile__logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
