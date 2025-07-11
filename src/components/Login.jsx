import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../LibrarySlice"; // ✅ Import corretto
import "./styles/login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (isAdmin) => {
    dispatch(setAdmin(isAdmin));
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>📚 Welcome to Book Advisor</h2>
        <p>Select your role to continue:</p>
        <div className="login-buttons">
          <button 
            className="login-btn user-btn" 
            onClick={() => handleLogin(false)}
          >
            👤 Login as User
          </button>
          <button 
            className="login-btn admin-btn" 
            onClick={() => handleLogin(true)}
          >
            👑 Login as Admin
          </button>
        </div>
        <div className="login-info">
          <p><strong>User:</strong> Can search books, add to favorites and cart</p>
          <p><strong>Admin:</strong> Can modify book descriptions and manage reviews</p>
        </div>
      </div>
    </div>
  );
}

export default Login;