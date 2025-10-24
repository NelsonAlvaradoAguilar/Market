import { useEffect, useState } from "react";
import { getUserProfile, logoutUser, token } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/Profile/Profile";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [signUpStatus, setSignUpStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setError("No token found. Please log in.");
      return;
    }
    const fetchProfile = async () => {
      try {
        const resp = await getUserProfile();
        setUser(resp);
        setSignUpStatus("Success");
        setError("");
      } catch (error) {
        setError(`Failed to get user profile: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return <Profile user={user} />;
}
