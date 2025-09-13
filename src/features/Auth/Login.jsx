




// // Api complete code api working rol ok 
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { usersLogin } from "../../redux/slices/userSlice";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { apiUrl } from '../../redux/utils/config';

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     try {
//       setLoading(true);
//       const res = await axios.post(`${apiUrl}/user/login`, { email, password });
//       console.log("API Response:", res.data);

//       // localStorage.setItem("authResponse", JSON.stringify(res.data));

//       const { role, token } = res.data.user;
//       localStorage.setItem("encode", res.data.token.token);
//       localStorage.setItem("iv", res.data.token.iv);
//       localStorage.setItem("userRole", role);
//       localStorage.setItem("_id", res.data.user._id);

//       toast.success("Logged in successfully!");

//       // Redirect based on role
//       if (role == "admin" || role == "Admin") {
//         navigate("/admin/dashboard");
//       } else if (role === "production") {
//         navigate("/production/dashboard");
//       } else if (role === "employee") {
//         navigate("/employee/dashboard");
//       } else if (role === "client") {
//         navigate("/client/dashboard");
//       } else {
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       toast.error("Error logging in. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div id="login-bg" className="auth-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <main className="w-100" style={{ maxWidth: "550px" }}>
//         <div className="login-container bg-white p-4 rounded shadow-sm">
//           <h4 className="text-center mb-4">Welcome Back</h4>

//           <form onSubmit={handleLogin}>
//             <div className="form-floating mb-3">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <label htmlFor="email">Email address</label>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 id="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 required
//               />
//               <label htmlFor="password">Password</label>
//             </div>

//             <div className="d-flex justify-content-between mb-4">
//               <div className="form-check">
//                 <input className="form-check-input" type="checkbox" id="remember" />
//                 <label className="form-check-label text-secondary" htmlFor="remember">
//                   Remember me
//                 </label>
//               </div>
//               <Link to={"/forgotPassword"} className="text-decoration-none text-secondary">
//                 Forgot password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="btn w-100 text-white"
//               id="All_btn"
//               style={{ padding: "10px", borderRadius: "5px" }}
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Log In"}
//             </button>

//             {/* <p className="text-center mt-3 mb-0">
//               <span className="text-secondary">Don't have an account?</span>
//               <Link to="/signup" className="text-decoration-none ms-1">
//                 Sign up
//               </Link>
//             </p> */}

//             <button
//               className="social-signup btn w-100 mb-3 d-flex align-items-center justify-content-center"
//               style={{
//                 backgroundColor: "#ffffff",
//                 color: "#5F6368",
//                 border: "1px solid #dadce0",
//                 fontSize: "14px",
//                 fontWeight: "500",
//                 padding: "10px 0",
//                 borderRadius: "4px",
//                 transition: "all 0.3s ease",
//                 marginTop: "20px",
//               }}
//               type="button"
//             >
//               <i className="fab fa-google me-2" style={{ fontSize: "18px", color: "#4285F4" }} />
//               Continue with Google
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { usersLogin } from "../../redux/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from "../../redux/utils/config";
import "./Login.css"; // import the new CSS file

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/user/login`, { email, password });
      console.log("API Response:", res.data);

      const { role } = res.data.user;
      localStorage.setItem("encode", res.data.token.token);
      localStorage.setItem("iv", res.data.token.iv);
      localStorage.setItem("userRole", role);
      localStorage.setItem("_id", res.data.user._id);

      toast.success("Logged in successfully!");

      // Redirect based on role
      if (role === "admin" || role === "Admin") {
        navigate("/admin/dashboard");
      } else if (role === "production") {
        navigate("/production/dashboard");
      } else if (role === "employee") {
        navigate("/employee/dashboard");
      } else if (role === "client") {
        navigate("/client/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Error logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Hero section */}
      <div className="hero-section">
        <h1>Project Management</h1>
        <p>
          Organize tasks, track progress, and collaborate effectively with Gantt charts,
          3D graphics, and more.
        </p>
      </div>

      {/* Login card */}
      <div className="login-card">
        <h4 className="login-title">User Login</h4>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">USER</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Name"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">PASSWORD</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
          </div>

          {/* Remember and forgot row (still functional) */}
          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <Link to={"/forgotPassword"} className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Social login button (Google) */}
          <button
            className="social-signup"
            style={{
              marginTop: "20px",
            }}
            type="button"
          >
            <i
              className="fab fa-google me-2"
              style={{ fontSize: "18px", color: "#4285F4" }}
            />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
