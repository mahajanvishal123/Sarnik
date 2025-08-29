import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { decryptToken } from '../../Protecuted/decode';
import "./Navbar.css";
import logo from "../../assets/logo.png"
import { SingleUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch()
  const [roledata, setRoleData] = useState("")
  useEffect(() => {
    const Role = localStorage.getItem("userRole")
    if (Role) {
      setRoleData(Role)
    } else {
      setRoleData()
    }
  }, [])

  const handleLogout = () => {
    // Clear entire localStorage
    localStorage.clear();
    // Optionally redirect to login page
    window.location.href = "/"; // ya "/login"
  };
  // Get profile link based on role
  const getProfileLink = () => {
    if (roledata === "admin") return "/admin/profile";
    if (roledata === "employee") return "/employee/profile";
    if (roledata === "client") return "/client/profile";
    return "/";
  };

  //   ChangePassword url 
  const ChangePassword = () => {
    if (roledata === "admin") return "/admin/ChangePassword";
    if (roledata === "employee") return "/employee/ChangePassword";
    if (roledata === "client") return "/client/ChangePassword";
    return "/";
  };
  // UpdateProfile
  const UpdateProfile = () => {
    if (roledata === "admin") return "/admin/UpdateProfile";
    if (roledata === "employee") return "/employee/UpdateProfile";
    if (roledata === "client") return "/client/UpdateProfile";
    return "/";
  };

  // decodeTokenAndLog.js SingleUser
  const { UserSingle, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(SingleUser());
  }, [dispatch]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          {/* Logo - Always visible */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
           
                   <div className="logo" style={{
                     display: 'flex',
                     alignItems: 'center',
                     height: '30px',
                     paddingLeft: '10px'
                   }}>
                     <img
                       src={logo}
                       alt="Logo"
                       style={{
                         height: '50px',
                         display: 'block',
                         objectFit: 'contain'
                       }}
                     />
                   </div>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleSidebar}
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Profile dropdown - aligned to the right */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="dropdown profile-dropdown">
              <div 
                className="profile-trigger d-flex align-items-center" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <div className="profile-info me-2 d-none d-md-block">
                  <span className="profile-name d-block">
                    {UserSingle?.firstName} {UserSingle?.lastName}
                  </span>
                  <span className="profile-role d-block text-muted small">
                    {UserSingle?.email}
                  </span>
                </div>
                <div className="profile-avatar">
                  <img
                    src={UserSingle?.profileImage && UserSingle?.profileImage.length > 0 
                      ? UserSingle?.profileImage[0] 
                      : '/default-profile.png'}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                </div>
              </div>
              
              <ul className="dropdown-menu dropdown-menu-end profile-menu">
                <li>
                  <Link to={getProfileLink()} className="dropdown-item">
                    <i className="fas fa-user me-2"></i>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to={UpdateProfile()} className="dropdown-item">
                    <i className="fas fa-edit me-2"></i>
                    <span>Update Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to={ChangePassword()} className="dropdown-item">
                    <i className="fas fa-lock me-2"></i>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li onClick={handleLogout}>
                  <Link to="/" className="dropdown-item text-danger">
                    <i className="fas fa-sign-out-alt me-2"></i>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;