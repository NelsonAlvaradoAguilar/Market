import { useEffect, useState } from "react";
import { getUserProfile, logoutUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/home");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await getUserProfile();
        setUser(resp);
      } catch (error) {
        setError(error.message || "Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return <div>Not logged in.</div>;

  return (
    <>
      <div>
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
      <button onClick={logout}>Logout</button>
    </>
  );
}
