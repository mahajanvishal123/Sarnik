import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { SingleUser } from '../../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";

function Profile() {
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const { UserSingle } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(SingleUser());
  }, [dispatch]);

  const createdDate = UserSingle?.createdAt
    ? new Date(UserSingle.createdAt).toLocaleDateString('en-GB')
    : '';

  const updatedDate = UserSingle?.updatedAt
    ? new Date(UserSingle.updatedAt).toLocaleDateString('en-GB')
    : '';

  return (
    <div className="container py-2">
      <div className="row justify-content-center g-4">

        {/* Profile summary */}
        <div className="col-lg-4 mb-4">
          <div
            className="card border-0 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
              borderRadius: '1.5rem',
            }}
          >
            <div className="card-body text-center p-4 d-flex flex-column align-items-center justify-content-between h-100">
              <Link to={"/employee/UpdateProfile"}>
                <div className="position-relative d-inline-block mb-3">
                  <img
                    src={
                      UserSingle?.profileImage?.length > 0
                        ? UserSingle?.profileImage[0]
                        : '/default-profile.png'
                    }
                    alt="avatar"
                    className="rounded-circle border border-3 border-primary shadow"
                    style={{
                      width: '140px',
                      height: '140px',
                      objectFit: 'cover',
                      background: '#fff',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-light btn-sm rounded-circle position-absolute bottom-0 end-0 border shadow"
                    style={{
                      transform: 'translate(25%, 25%)',
                      color: '#0052CC',
                    }}
                    title="Change profile picture"
                  >
                    <FaUserEdit />
                  </button>
                </div>
              </Link>
              <h4 className="fw-bold mb-1 mt-2">
                {UserSingle?.firstName} {UserSingle?.lastName}
              </h4>
              <div className="mb-2">
                <i className="bi bi-envelope-at me-1"></i>
                <span className="fw-semibold">{UserSingle?.email}</span>
              </div>
              <div className="mb-2">
                <i className="bi bi-telephone me-1"></i>
                <span className="fw-semibold">{UserSingle?.phone}</span>
              </div>
              <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
                <span className="small text-secondary">
                  <i className="bi bi-clock-history me-1"></i>
                  Last Updated: {updatedDate}
                </span>
                {/* <span className="small text-secondary">
                  <i className="bi bi-hash me-1"></i>User ID: {UserSingle?._id}
                </span> */}
              </div>
            </div>
          </div>
        </div>

        {/* Profile details */}
        <div className="col-lg-8">
          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
              borderRadius: '1.5rem',
            }}
          >
            <div className="card-body p-4">
              <h5 className="mb-4 fw-bold d-flex align-items-center">
                <i className="bi bi-pencil-square me-2"></i>Profile Details
              </h5>

              <div className="row mb-3 g-3">
                <div className="col-md-6">
                  <div className="mb-2">
                    <i className="bi bi-geo-alt me-2 text-primary"></i>
                    <span className="fw-semibold">Country:</span>{' '}
                    {UserSingle?.country}
                  </div>
                  <div className="mb-2">
                    <span className="fw-semibold">Role:</span>{' '}
                    <span className="badge bg-info text-dark me-1 text-capitalize">
                      {UserSingle?.role}
                    </span>
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-diagram-3-fill me-2 text-primary"></i>
                    <span className="fw-semibold">Department:</span>{' '}
                    {UserSingle?.assign}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-2">
                    <i className="bi bi-check-circle-fill me-2 text-primary"></i>
                    <span className="fw-semibold">Status:</span>{' '}
                    <span className="badge ms-2 bg-success">Active</span>
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-calendar-event me-2 text-primary"></i>
                    <span className="fw-semibold">Date of Joining:</span>{' '}
                    {createdDate}
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-google me-2 text-primary"></i>
                    <span className="fw-semibold">Google Sign In:</span>{' '}
                    <span
                      className={`badge ms-2 ${
                        UserSingle?.googleSignIn
                          ? 'bg-success'
                          : 'bg-secondary'
                      }`}
                    >
                      {UserSingle?.googleSignIn ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-0">
                <div className="card-body p-0">
                  <h5 className="fw-bold mb-2 d-flex align-items-center">
                    <i className="bi bi-info-circle me-2"></i>About
                  </h5>
                  <p className="text-muted mb-0">
                    This is a placeholder for user bio or additional
                    information. You can add more details about the employee
                    here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
