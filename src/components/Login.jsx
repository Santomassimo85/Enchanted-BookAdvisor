import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../LibrarySlice";
import "./styles/login.css";

/**
 * Login component for selecting user role (User or Admin).
 * Dispatches role to Redux and navigates to home page.
 *
 * @component
 * @returns {JSX.Element} Login page UI
 */
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Handles login by setting admin status and navigating to home.
     * @param {boolean} isAdmin - True if admin, false if regular user.
     */
    const handleLogin = (isAdmin) => {
        dispatch(setAdmin(isAdmin)); // Set role in Redux store
        navigate("/home"); // Redirect to home page
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome to the Enchanted BookAdvisor</h2>
                <p>Select your role to continue:</p>
                <div className="login-buttons">
                    {/* Button for regular user */}
                    <button
                        className="login-btn user-btn"
                        onClick={() => handleLogin(false)}
                    >
                        👤 Adventurer
                    </button>
                    {/* Button for admin user */}
                    <button
                        className="login-btn admin-btn"
                        onClick={() => handleLogin(true)}
                    >
                        👑 Master of books
                    </button>
                </div>
                <div className="login-info">
                    <p>
                        <strong>User:</strong> Can search books, add to favorites and cart
                    </p>
                    <p>
                        <strong>Admin:</strong> Can modify book descriptions and manage reviews
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;