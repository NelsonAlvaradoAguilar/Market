import { useNavigate } from "react-router-dom";
import "./Profile.scss";
export default function Profile({ user, onLogout }) {
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  return (
    <div className="profile">
      <h1 className="profile__title">Profile</h1>
      <p className="profile__role">Role: {user.role}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {onLogout && (
        <button className="profile__logout" onClick={onLogout}>
          Logout
        </button>
      )}
    </div>
  );
}
