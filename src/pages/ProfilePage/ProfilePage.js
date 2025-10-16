import { useEffect, useState } from "react";
import { getUserProfile, logoutUser, token } from "../../utils/api"; // Adjust the path if needed
import { useNavigate } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
export default function Profile(isLoggedIn) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const getUserProfile = async () => {
    try {
      const resp = await getUserProfile();
      setUser(resp);
      console.log(resp);

      setError("Success");
    } catch (error) {
      console.log(
        `Failed to get user profile from API with error message: ${error}`
      );
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserProfile();
    }
  }, []);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (user) return <div>Loading or not logged in.</div>;

  return (
    <>
      <Profile user={user} />
    </>
  );
}
