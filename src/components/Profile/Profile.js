import { useNavigate } from "react-router-dom";
import "./Profile.scss";
export default function Profile({ userInfo, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/home");
  };

  return (
    <div className="profile">
      <h1 className="profile__name">{userInfo?.name}</h1>
      <p className="profile__email">Email: {userInfo?.email}</p>

      <button className="profile__logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
