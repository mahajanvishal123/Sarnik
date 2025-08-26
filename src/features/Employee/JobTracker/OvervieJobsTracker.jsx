import React, { useRef, useState } from "react";
import { Card, Row, Col, Button, Table, OverlayTrigger, Tooltip, Modal, Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaUpload, FaFileExcel, FaTimes, FaBarcode, FaUser, FaClock, FaCalendarAlt, FaInfoCircle, FaPlus, FaBox } from "react-icons/fa";

import { useDispatch } from "react-redux";

const OvervieJobsTracker = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Selected file: ${file.name}`);
    }
  };

  const handleShowDetails = (title) => {
    setModalContent(title);
    setShowModal(true);
  };

  const assignments = [
    {
      date: "25/03/2025",
      title: "Design Brief",
      assignedTo: "Designer",
      timeSpent: "3:00",
    },
    {
      date: "25/03/2025",
      title: "Color Palette Selection",
      assignedTo: "Designer",
      timeSpent: "3:00",
    },
    {
      date: "25/03/2025",
      title: "Client Review",
      assignedTo: "Designer",
      timeSpent: "3:00",
    },
  ];

  // Sample job data
  const jobs = {
    JobNo: "0006",
    status: "In Progress",
    dueDate: "April 25, 2025",
    instructions:
      "Create a visually appealing banner for the Spring Sale. Use pastel color palette and add product highlights.",
    brand: "BrandA",
    subBrand: "SubBrandA",
    flavour: "Vanilla",
    packType: "Box",
    packSize: "500g",
    priority: "High",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // for edit mode
  const location = useLocation();
  const { job } = location.state || {};
  console.log("hhh", job);

  // Responsive two-column grid for job details
  const jobDetails = [
    { label: "Job No", value: job?.JobNo, icon: <FaBarcode className="me-2 text-primary" /> },
     { label: "Project Name", value: job?.projectId?.[0]?.projectName, icon: <FaBarcode className="me-2 text-primary" /> },
    { label: "Project No", value: job?.projectId?.[0]?.projectNo, icon: <FaBarcode className="me-2 text-primary" /> },
    { label: "Status", value: job?.Status || job.status, icon: <FaInfoCircle className="me-2 text-primary" /> },
    { label: "Due Date", value: job?.createdAt ? new Date(job?.createdAt).toLocaleDateString('en-GB').replace(/\/20/, '/') : job.dueDate, icon: <FaCalendarAlt className="me-2 text-primary" /> },
    { label: "Brand", value: job?.brandName, icon: <FaUser className="me-2 text-primary" /> },
    { label: "Flavour", value: job?.flavour, icon: <FaUser className="me-2 text-primary" /> },
    { label: "SubBrand", value: job?.subBrand, icon: <FaUser className="me-2 text-primary" /> },
    { label: "Pack Type", value: job?.packType, icon: <FaBox className="me-2 text-primary" /> },
    { label: "Pack Size", value: job?.packSize, icon: <FaBox className="me-2 text-primary" /> },
    { label: "Priority", value: job?.priority, icon: <FaInfoCircle className="me-2 text-primary" /> },
    { label: "Assign", value: job?.assign, icon: <FaUser className="me-2 text-primary" /> },
    { label: "Project Barcode", value: job?.barcode, icon: <FaBarcode className="me-2 text-primary" /> },
  ];

  const BackButton = () => {
    navigate(-1);
  }

  return (
    <div className="container py-4 px-1 px-md-4">

      {/* Job Details Grid */}
      <Card className="border-0 shadow-sm rounded-4 mb-4 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4 shadow-sm" style={{ background: "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)" }}>
          <div className="d-flex align-items-center gap-2">
            <FaInfoCircle className="text-white" size={28} />
            <h2 className="mb-0 fw-bold text-white" style={{ letterSpacing: 1 }}>Job Details</h2>
          </div>

          <Button onClick={() => BackButton()} variant="light" size="sm" className="rounded-circle d-flex align-items-center justify-content-center shadow-sm border-0" style={{ width: 36, height: 36 }}>
            <FaTimes className="text-primary" size={18} />
          </Button>
        </div>

        <Row className="g-4">
          {jobDetails.map((item, idx) => (
            <Col xs={12} md={6} key={idx}>
              <div className="d-flex align-items-center bg-light rounded-3 p-3 mb-2 shadow-sm h-100">
                {item.icon}
                <span className="fw-semibold text-secondary" style={{ minWidth: 120 }}>{item.label}:</span>
                <span className="ms-2 fs-6 text-dark">{item.value || <span className="text-muted">-</span>}</span>
              </div>
            </Col>
          ))}
        </Row>

        {/* ✅ New Descriptions Section Added Here */}
       {/* ✅ Stylish Descriptions Section */}
{job?.descriptions?.length > 0 && (
  <div className="mt-4 border-top pt-4">
    <h5 className="fw-bold text-primary mb-3">Descriptions</h5>
    <Row className="g-3">
      {job.descriptions.map((desc, index) => (
        <Col xs={12} md={6} key={index}>
          <div className="bg-white border rounded-3 p-3 shadow-sm h-100">
            <div className="d-flex align-items-center mb-2">
              <FaInfoCircle className="text-primary me-2" />
              <h6 className="mb-0 text-dark">Description {index + 1}</h6>
            </div>
            <div className="text-secondary">{desc}</div>
          </div>
        </Col>
      ))}
    </Row>
  </div>
)}

      </Card>

    </div>
  );
};

export default OvervieJobsTracker;
