// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   // State for email, password, and selected role
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");

//   const roleCredentials = {
//     admin: { email: "admin@example.com", password: "admin123" },
//     productionManager: { email: "manager@example.com", password: "manager123" },
//     employee: { email: "employee@example.com", password: "employee123" },
//     client: { email: "client@example.com", password: "client123" },
//   };

//   const handleRoleSelect = (role) => {
//     const credentials = roleCredentials[role];
//     setEmail(credentials.email);
//     setPassword(credentials.password);
//     setSelectedRole(role);
//   };

//  const handleLogin = (e) => {
//   e.preventDefault();
//   if (selectedRole) {
//     localStorage.setItem("userRole", selectedRole);
//     alert(`Logged in as ${selectedRole}`);
//     switch (selectedRole) {
//       case "admin":
//         navigate("/admin/dashboard");
//         break;
//       case "productionManager":
//         navigate("/production/dashboard");
//         break;
//       case "employee":
//         navigate("/employee/dashboard");
//         break;
//       case "client":
//         navigate("/client/dashboard");
//         break;
//       default:
//         navigate("/");
//     }
//   } else {
//     alert("Please select a role before logging in.");
//   }
// };


//   return (
//     <div className="auth-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <main className="w-100" style={{ maxWidth: "450px" }}>
//         <div className="login-container bg-white p-4 rounded shadow-sm">
//           <h4 className="text-center mb-4">Welcome Back</h4>

//           <div className="divider position-relative text-center my-4">
//             <hr />
//             <span
//               className="position-absolute bg-white px-2"
//               style={{
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//               }}
//             >
//               or
//             </span>
//           </div>


//           <form onSubmit={handleLogin}>
//             <div className="form-floating mb-3">
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="name@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <label htmlFor="email">Email address</label>
//             </div>
//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <label htmlFor="password">Password</label>
//             </div>
//             <div className="d-flex justify-content-between mb-4">
//               <div className="form-check">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id="remember"
//                 />
//                 <label
//                   className="form-check-label text-secondary"
//                   htmlFor="remember"
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <a href="#" className="text-decoration-none text-secondary">
//                 Forgot password?
//               </a>
//             </div>
//             <button
//               type="submit"
//               className="btn w-100 text-white"
//               id="All_btn"
//               style={{
//                 padding: "10px",
//                 borderRadius: "5px",
//               }}
//             >
//               Log In
//             </button>
//             <p className="text-center mt-3 mb-0">
//               <span className="text-secondary">Don't have an account?</span>
//               <Link
//                 to="/admin/signup"
//                 className="text-decoration-none ms-1"
//               >
//                 Sign up
//               </Link>
//             </p>

//             <div className="row g-2 mt-3">
//               <div className="col-6">
//                 <button
//                   type="button"
//                   className={`btn w-100 text-white ${selectedRole === "admin"
//                       ? "border border-2 border-dark"
//                       : ""
//                     }`}
//                   id="All_btn"
//                   onClick={() => handleRoleSelect("admin")}
//                 >
//                   Admin
//                 </button>
//               </div>
//               <div className="col-6">
//                 <button
//                   type="button"
//                   className={`btn w-100 text-white ${selectedRole === "productionManager"
//                       ? "border border-2 border-dark"
//                       : ""
//                     }`}
//                   id="All_btn"
//                   onClick={() => handleRoleSelect("productionManager")}
//                 >
//                   Production
//                 </button>
//               </div>


//               <div className="col-6">
//                 <button
//                   type="button"
//                   className={`btn w-100 text-white ${selectedRole === "employee"
//                       ? "border border-2 border-dark"
//                       : ""
//                     }`}
//                   id="All_btn" onClick={() => handleRoleSelect("employee")}
//                 >
//                   Employee
//                 </button>
//               </div>
//               <div className="col-6">
//                 <button
//                   type="button"
//                   className={`btn w-100 text-white ${selectedRole === "client"
//                       ? "border border-2 border-dark"
//                       : ""
//                     }`}
//                   id="All_btn" onClick={() => handleRoleSelect("client")}
//                 >
//                   Client
//                 </button>
//               </div>
//             </div>
//               <button
//             className="social-signup btn w-100 mb-3 d-flex align-items-center justify-content-center"
//             style={{
//               backgroundColor: "#ffffff",
//               color: "#5F6368",
//               border: "1px solid #dadce0",
//               fontSize: "14px",
//               fontWeight: "500",
//               padding: "10px 0",
//               borderRadius: "4px",
//               transition: "all 0.3s ease",
//               marginTop:"20px"
//             }}
//           >
//             <i
//               className="fab fa-google me-2"
//               style={{
//                 fontSize: "18px",
//                 color: "#4285F4",
//               }}
//             />
//             Continue with Google
//           </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Login;





// Api complete code api working rol ok 
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { usersLogin } from "../../redux/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from '../../redux/utils/config';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const { email, password } = formData;

  //   try {
  //     setLoading(true);
  //     const res = await axios.post("https://xt2cpwt7-8000.inc1.devtunnels.ms/api/user/login", { email, password });
  //     console.log("API Response:", res.data);

  //     const { role, token,user } = res.data.user;
  //     // if (!role) {
  //     //   alert("Role is undefined in the response.");
  //     //   return;
  //     // }
  //     localStorage.setItem("authToken", token);
  //     localStorage.setItem("userRole", role);
  //        localStorage.setItem("user", JSON.stringify(user));
  //     toast.success("Project created successfully!");
  //     if (role === "admin") {
  //       navigate("/admin/dashboard");
  //     } else if (role === "productionManager") {
  //       navigate("/production/dashboard");
  //     } else if (role === "employee") {
  //       navigate("/employee/tasks");
  //     } else if (role === "client") {
  //       navigate("/client/overview");
  //     } else {
  //       navigate("/dashboard");
  //     }
  //   } catch (error) {
  //     toast.error(res.data.message || "Error Login");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleLogin = async (e) => {
  e.preventDefault();
  const { email, password } = formData;

  try {
    setLoading(true);
    const res = await axios.post(`${apiUrl}/user/login`, { email, password });
    console.log("API Response:", res.data);

    // localStorage.setItem("authResponse", JSON.stringify(res.data));

    const { role, token } = res.data.user;
    localStorage.setItem("encode", res.data.token.token);
    localStorage.setItem("iv", res.data.token.iv);
    localStorage.setItem("userRole", role);

    toast.success("Logged in successfully!");
    
    // Redirect based on role
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "productionManager") {
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
    <div id="login-bg" className="auth-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <main className="w-100" style={{ maxWidth: "550px" }}>
        <div className="login-container bg-white p-4 rounded shadow-sm">
          <h4 className="text-center mb-4">Welcome Back</h4>

          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="d-flex justify-content-between mb-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label text-secondary" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <Link to={"/forgotPassword"}  className="text-decoration-none text-secondary">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn w-100 text-white"
              id="All_btn"
              style={{ padding: "10px", borderRadius: "5px" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            {/* <p className="text-center mt-3 mb-0">
              <span className="text-secondary">Don't have an account?</span>
              <Link to="/signup" className="text-decoration-none ms-1">
                Sign up
              </Link>
            </p> */}

            <button
              className="social-signup btn w-100 mb-3 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#ffffff",
                color: "#5F6368",
                border: "1px solid #dadce0",
                fontSize: "14px",
                fontWeight: "500",
                padding: "10px 0",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                marginTop: "20px",
              }}
              type="button"
            >
              <i className="fab fa-google me-2" style={{ fontSize: "18px", color: "#4285F4" }} />
              Continue with Google
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;