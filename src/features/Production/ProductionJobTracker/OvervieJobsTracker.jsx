// import React, { useRef, useState } from "react";
// import { Card, Row, Col, Button, Table, OverlayTrigger, Tooltip, Modal, Badge } from "react-bootstrap";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { FaUpload, FaFileExcel, FaTimes, FaBarcode, FaUser, FaClock, FaCalendarAlt, FaInfoCircle, FaPlus, FaBox } from "react-icons/fa";

// import { useDispatch } from "react-redux";

// const OvervieJobsTracker = ({ onClose }) => {
//   const fileInputRef = useRef(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       alert(`Selected file: ${file.name}`);
//     }
//   };

//   const handleShowDetails = (title) => {
//     setModalContent(title);
//     setShowModal(true);
//   };

//   const assignments = [
//     {
//       date: "25/03/2025",
//       title: "Design Brief",
//       assignedTo: "Designer",
//       timeSpent: "3:00",
//     },
//     {
//       date: "25/03/2025",
//       title: "Color Palette Selection",
//       assignedTo: "Designer",
//       timeSpent: "3:00",
//     },
//     {
//       date: "25/03/2025",
//       title: "Client Review",
//       assignedTo: "Designer",
//       timeSpent: "3:00",
//     },
//   ];

//   // Sample job data
//   const jobs = {
//     JobNo: "0006",
//     status: "In Progress",
//     dueDate: "April 25, 2025",
//     instructions:
//       "Create a visually appealing banner for the Spring Sale. Use pastel color palette and add product highlights.",
//     brand: "BrandA",
//     subBrand: "SubBrandA",
//     flavour: "Vanilla",
//     packType: "Box",
//     packSize: "500g",
//     priority: "High",
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams(); // for edit mode
//   const location = useLocation();
//   const { job } = location.state || {};
//   console.log("hhh", job);

//   // Responsive two-column grid for job details
//   const jobDetails = [
//     { label: "Job No", value: job?.JobNo, icon: <FaBarcode className="me-2 text-primary" /> },
//      { label: "Project Name", value: job?.projectId?.[0]?.projectName, icon: <FaBarcode className="me-2 text-primary" /> },
//     { label: "Project No", value: job?.projectId?.[0]?.projectNo, icon: <FaBarcode className="me-2 text-primary" /> },
//     { label: "Status", value: job?.Status || job.status, icon: <FaInfoCircle className="me-2 text-primary" /> },
//     { label: "Due Date", value: job?.createdAt ? new Date(job?.createdAt).toLocaleDateString('en-GB').replace(/\/20/, '/') : job.dueDate, icon: <FaCalendarAlt className="me-2 text-primary" /> },
//     { label: "Brand", value: job?.brandName, icon: <FaUser className="me-2 text-primary" /> },
//     { label: "Flavour", value: job?.flavour, icon: <FaUser className="me-2 text-primary" /> },
//     { label: "SubBrand", value: job?.subBrand, icon: <FaUser className="me-2 text-primary" /> },
//     { label: "Pack Type", value: job?.packType, icon: <FaBox className="me-2 text-primary" /> },
//     { label: "Pack Size", value: job?.packSize, icon: <FaBox className="me-2 text-primary" /> },
//     { label: "Priority", value: job?.priority, icon: <FaInfoCircle className="me-2 text-primary" /> },
//     { label: "Assign", value: job?.assign, icon: <FaUser className="me-2 text-primary" /> },
//     { label: "Project Barcode", value: job?.barcode, icon: <FaBarcode className="me-2 text-primary" /> },
//   ];

//   const BackButton = () => {
//     navigate(-1);
//   }

//   return (
//     <div className="container py-4 px-1 px-md-4">

//       {/* Job Details Grid */}
//       <Card className="border-0 shadow-sm rounded-4 mb-4 p-4">
//         <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4 shadow-sm" style={{ background: "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)" }}>
//           <div className="d-flex align-items-center gap-2">
//             <FaInfoCircle className="text-white" size={28} />
//             <h2 className="mb-0 fw-bold text-white" style={{ letterSpacing: 1 }}>Job Details</h2>
//           </div>

//           <Button onClick={() => BackButton()} variant="light" size="sm" className="rounded-circle d-flex align-items-center justify-content-center shadow-sm border-0" style={{ width: 36, height: 36 }}>
//             <FaTimes className="text-primary" size={18} />
//           </Button>
//         </div>

//         <Row className="g-4">
//           {jobDetails.map((item, idx) => (
//             <Col xs={12} md={6} key={idx}>
//               <div className="d-flex align-items-center bg-light rounded-3 p-3 mb-2 shadow-sm h-100">
//                 {item.icon}
//                 <span className="fw-semibold text-secondary" style={{ minWidth: 120 }}>{item.label}:</span>
//                 <span className="ms-2 fs-6 text-dark">{item.value || <span className="text-muted">-</span>}</span>
//               </div>
//             </Col>
//           ))}
//         </Row>

//         {/* ✅ New Descriptions Section Added Here */}
//        {/* ✅ Stylish Descriptions Section */}
// {job?.descriptions?.length > 0 && (
//   <div className="mt-4 border-top pt-4">
//     <h5 className="fw-bold text-primary mb-3">Descriptions</h5>
//     <Row className="g-3">
//       {job.descriptions.map((desc, index) => (
//         <Col xs={12} md={6} key={index}>
//           <div className="bg-white border rounded-3 p-3 shadow-sm h-100">
//             <div className="d-flex align-items-center mb-2">
//               <FaInfoCircle className="text-primary me-2" />
//               <h6 className="mb-0 text-dark">Description {index + 1}</h6>
//             </div>
//             <div className="text-secondary">{desc}</div>
//           </div>
//         </Col>
//       ))}
//     </Row>
//   </div>
// )}

//       </Card>

//     </div>
//   );
// };

// export default OvervieJobsTracker;




// import React, { useRef, useState, useEffect } from "react";
// import { Card, Row, Col, Button, Table, Spinner, Alert, Badge } from "react-bootstrap";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   FaUpload,
//   FaFileExcel,
//   FaTimes,
//   FaBarcode,
//   FaUser,
//   FaClock,
//   FaCalendarAlt,
//   FaInfoCircle,
//   FaPlus,
//   FaBox,
// } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { apiUrl } from "../../../redux/utils/config";
// const OvervieJobsTracker = ({ onClose }) => {
//   const fileInputRef = useRef(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState("");
//   const [workLogData, setWorkLogData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       alert(`Selected file: ${file.name}`);
//     }
//   };
//   const handleShowDetails = (title) => {
//     setModalContent(title);
//     setShowModal(true);
//   };
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams(); // for edit mode
//   const location = useLocation();
//   const { job } = location.state || {};
//   // Fetch work log data when component mounts
//   useEffect(() => {
//     const fetchWorkLogData = async () => {
//       if (!job?.projectId?.[0]?._id) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           `${apiUrl}/jobs/worklog-project/${job.projectId[0]._id}`
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setWorkLogData(data);
//       } catch (err) {
//         console.error("Error fetching work log data:", err);
//         setError("Failed to load work log data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWorkLogData();
//   }, [job?.projectId]);
//   // Function to format time (HH:MM)
//   const formatTime = (timeString) => {
//     if (!timeString) return "00:00";
//     // Remove any seconds portion if present
//     const timeParts = timeString.split(':');
//     return `${timeParts[0]}:${timeParts[1]}`;
//   };
//   // Function to calculate total time spent
//   const calculateTotalTime = (timeEntries) => {
//     let totalMinutes = 0;
//     timeEntries.forEach(entry => {
//       const [hours, minutes] = entry.time.split(':').map(Number);
//       totalMinutes += hours * 60 + minutes;
//     });
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };
//   // Function to add two time values (HH:MM)
//   const addTimes = (time1, time2) => {
//     if (!time1) time1 = "00:00";
//     if (!time2) time2 = "00:00";
//     const [hours1, minutes1] = time1.split(':').map(Number);
//     const [hours2, minutes2] = time2.split(':').map(Number);
//     let totalMinutes = (hours1 + hours2) * 60 + minutes1 + minutes2;
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };
//   // Calculate total project time
//   const calculateProjectTotalTime = () => {
//     if (!workLogData?.employees) return "00:00";
//     let totalMinutes = 0;
//     workLogData.employees.forEach(employee => {
//       employee.worklogs.forEach(log => {
//         const [hours, minutes] = log.time.split(':').map(Number);
//         totalMinutes += hours * 60 + minutes;
//       });
//     });
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };
//   // Calculate total overtime
//   const calculateProjectOvertime = () => {
//     if (!workLogData?.employees) return "00:00";
//     let totalMinutes = 0;
//     workLogData.employees.forEach(employee => {
//       employee.worklogs.forEach(log => {
//         const [hours, minutes] = log.overtime.split(':').map(Number);
//         totalMinutes += hours * 60 + minutes;
//       });
//     });
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   const calculateEmployeeTotalTime = (worklogs) => {
//     let totalTime = "00:00";
//     worklogs.forEach(log => {
//       totalTime = addTimes(totalTime, addTimes(log.time, log.overtime));
//     });
//     return totalTime;
//   };
//   // Responsive two-column grid for job details
//   const jobDetails = [
//     {
//       label: "Job No",
//       value: job?.JobNo,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//     {
//       label: "Project Name",
//       value: job?.projectId?.[0]?.projectName,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//     {
//       label: "Project No",
//       value: job?.projectId?.[0]?.projectNo,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//     {
//       label: "Status",
//       value: job?.Status || job?.status,
//       icon: <FaInfoCircle className="me-2 text-primary" />,
//     },
//     {
//       label: "Due Date",
//       value: job?.createdAt
//         ? new Date(job?.createdAt)
//           .toLocaleDateString("en-GB")
//           .replace(/\/20/, "/")
//         : job?.dueDate,
//       icon: <FaCalendarAlt className="me-2 text-primary" />,
//     },
//     {
//       label: "Brand",
//       value: job?.brandName,
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "Flavour",
//       value: job?.flavour,
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "SubBrand",
//       value: job?.subBrand,
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "Pack Type",
//       value: job?.packType,
//       icon: <FaBox className="me-2 text-primary" />,
//     },
//     {
//       label: "Pack Size",
//       value: job?.packSize,
//       icon: <FaBox className="me-2 text-primary" />,
//     },
//     {
//       label: "Priority",
//       value: job?.priority,
//       icon: <FaInfoCircle className="me-2 text-primary" />,
//     },
//     {
//       label: "Assign",
//       value: job?.assignedTo ? `${job.assignedTo.firstName} ${job.assignedTo.lastName}` : 'Not assigned',
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "Project Barcode",
//       value: job?.barcode,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//   ];
//   const BackButton = () => {
//     navigate(-1);
//   };
//   return (
//     <div className="container py-4 px-1 px-md-4">
//       {/* Job Details Grid */}
//       <Card className="border-0 shadow-sm rounded-4 mb-4 p-4">
//         <div
//           className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4 shadow-sm"
//           style={{ backgroundColor: "#0052CC" }}
//         >
//           <div className="d-flex align-items-center gap-2">
//             <FaInfoCircle className="text-white" size={28} />
//             <h2
//               className="mb-0 fw-bold text-white"
//               style={{ letterSpacing: 1 }}
//             >
//               Job Details
//             </h2>
//           </div>
//           <Button
//             onClick={() => BackButton()}
//             variant="light"
//             size="sm"
//             className="rounded-circle d-flex align-items-center justify-content-center shadow-sm border-0"
//             style={{ width: 36, height: 36 }}
//           >
//             <FaTimes className="text-primary" size={18} />
//           </Button>
//         </div>
//         <Row className="g-4">
//           {jobDetails.map((item, idx) => (
//             <Col xs={12} md={6} key={idx}>
//               <div className="d-flex align-items-center bg-light rounded-3 p-3 mb-2 shadow-sm h-100" style={{ color: "#0052CC" }}>
//                 {item.icon}
//                 <span
//                   className="fw-semibold text-secondary"
//                   style={{ minWidth: 120 }}
//                 >
//                   {item.label}:
//                 </span>
//                 <span className="ms-2 fs-6 text-dark">
//                   {item.value || <span className="text-muted">-</span>}
//                 </span>
//               </div>
//             </Col>
//           ))}
//         </Row>
//         {/* ✅ Work Log Section from API */}
//         <div className="mt-4 border-top pt-4">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5 className="fw-bold text-primary mb-0">Work Log:</h5>
//             {loading && <Spinner animation="border" size="sm" variant="primary" />}
//           </div>
//           {error && (
//             <Alert variant="warning" className="mb-3">
//               {error}
//             </Alert>
//           )}
//           {workLogData && workLogData.employees && workLogData.employees.length > 0 ? (
//             <>
//               {workLogData.employees.map((employeeData, empIndex) => (
//                 <div key={empIndex} className="mb-4">
//                   <div className="d-flex justify-content-end align-items-center mb-2 bg-light p-2 rounded">
//                     <Badge bg="primary" className="fs-6">
//                       Total Time: {calculateEmployeeTotalTime(employeeData.worklogs)}
//                     </Badge>
//                   </div>
//                   <div className="table-responsive">
//                     <Table
//                       striped
//                       bordered
//                       hover
//                       size="sm"
//                       className="align-middle shadow-sm"
//                     >
//                       <thead className="bg-light">
//                         <tr>
//                           <th>Date</th>
//                           <th>Employee Name</th>
//                           <th>Assign</th>
//                           <th>Task Description</th>
//                           <th className="text-center">Time Spent</th>
//                           <th className="text-center">Overtime</th>
//                           <th className="text-center">Total Time</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {employeeData.worklogs.map((log, logIndex) => (
//                           <tr key={logIndex}>
//                             <td>{log.date ? new Date(log.date).toLocaleDateString() : "-"}</td>
//                             <td>
//                               {employeeData.employee.firstName} {employeeData.employee.lastName}
//                             </td>
//                             <td>
//                               {employeeData.employee.assign || "-"}
//                             </td>
//                             <td style={{ whiteSpace: "pre-line" }}>
//                               {log.taskDescription || "-"}
//                             </td>
//                             <td className="text-center fw-bold text-primary">
//                               {formatTime(log.time)}
//                             </td>
//                             <td className="text-center fw-bold text-danger">
//                               {formatTime(log.overtime)}
//                             </td>
//                             <td className="text-center fw-bold text-success">
//                               {addTimes(log.time, log.overtime)}
//                             </td>
//                             <td>
//                               <Badge
//                                 bg={
//                                   log.status === "Approved"
//                                     ? "success"
//                                     : log.status === "Rejected"
//                                       ? "danger"
//                                       : "warning"
//                                 }
//                               >
//                                 {log.status || "Pending"}
//                               </Badge>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   </div>
//                 </div>
//               ))}
//               {/* Project Time Summary */}
//               <Card className="border-0 bg-light rounded-4 mt-3">
//                 <Card.Body className="py-3">
//                   <Row>
//                     <Col md={4}>
//                       <div className="text-center p-2">
//                         <h6 className="text-muted mb-1">Work Time</h6>
//                         <h4 className="fw-bold text-primary mb-0">{calculateProjectTotalTime()}</h4>
//                       </div>
//                     </Col>
//                     <Col md={4}>
//                       <div className="text-center p-2">
//                         <h6 className="text-muted mb-1">Over Time</h6>
//                         <h4 className="fw-bold text-danger mb-0">{calculateProjectOvertime()}</h4>
//                       </div>
//                     </Col>
//                     <Col md={4}>
//                       <div className="text-center p-2">
//                         <h6 className="text-muted mb-1"> Total Time</h6>
//                         <h4 className="fw-bold text-success mb-0">
//                           {addTimes(calculateProjectTotalTime(), calculateProjectOvertime())}
//                         </h4>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Card.Body>
//               </Card>
//             </>
//           ) : (
//             !loading && !error && <p className="text-muted">No work log data available</p>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// };
// export default OvervieJobsTracker;

// import React, { useRef, useState, useEffect } from "react";
// import { Card, Row, Col, Button, Table, Spinner, Alert, Badge } from "react-bootstrap";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   FaUpload,
//   FaFileExcel,
//   FaTimes,
//   FaBarcode,
//   FaUser,
//   FaClock,
//   FaCalendarAlt,
//   FaInfoCircle,
//   FaPlus,
//   FaBox,
// } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { apiUrl } from "../../../redux/utils/config";

// const OvervieJobsTracker = ({ onClose }) => {
//   const fileInputRef = useRef(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState("");
//   const [workLogData, setWorkLogData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [jobData, setJobData] = useState(null); // Add state for job data

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       alert(`Selected file: ${file.name}`);
//     }
//   };

//   const handleShowDetails = (title) => {
//     setModalContent(title);
//     setShowModal(true);
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams(); // for edit mode
//   const location = useLocation();
//   const { job } = location.state || {};

//   // Fetch job details when component mounts
//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       if (!job?._id) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(`${apiUrl}/jobs/${job._id}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setJobData(data);
//       } catch (err) {
//         console.error("Error fetching job details:", err);
//         setError("Failed to load job details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobDetails();
//   }, [job?._id]);

//   // Fetch work log data when component mounts
//   useEffect(() => {
//     const fetchWorkLogData = async () => {
//       if (!job?.projectId?.[0]?._id) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           `${apiUrl}/jobs/worklog-project/${job.projectId[0]._id}`
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setWorkLogData(data);
//       } catch (err) {
//         console.error("Error fetching work log data:", err);
//         setError("Failed to load work log data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWorkLogData();
//   }, [job?.projectId]);

//   // Function to format time (HH:MM)
//   const formatTime = (timeString) => {
//     if (!timeString) return "00:00";
//     // Remove any seconds portion if present
//     const timeParts = timeString.split(':');
//     return `${timeParts[0]}:${timeParts[1]}`;
//   };

//   // Function to calculate total time spent
//   const calculateTotalTime = (timeEntries) => {
//     let totalMinutes = 0;
//     timeEntries.forEach(entry => {
//       const [hours, minutes] = entry.time.split(':').map(Number);
//       totalMinutes += hours * 60 + minutes;
//     });
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   // Function to add two time values (HH:MM)
//   const addTimes = (time1, time2) => {
//     if (!time1) time1 = "00:00";
//     if (!time2) time2 = "00:00";
//     const [hours1, minutes1] = time1.split(':').map(Number);
//     const [hours2, minutes2] = time2.split(':').map(Number);
//     let totalMinutes = (hours1 + hours2) * 60 + minutes1 + minutes2;
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   // Calculate total project time
//   const calculateProjectTotalTime = () => {
//     if (!workLogData?.employees) return "00:00";
//     let totalMinutes = 0;
//     workLogData.employees.forEach(employee => {
//       employee.worklogs.forEach(log => {
//         const [hours, minutes] = log.time.split(':').map(Number);
//         totalMinutes += hours * 60 + minutes;
//       });
//     });
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   // Calculate total overtime
//   const calculateProjectOvertime = () => {
//     if (!workLogData?.employees) return "00:00";
//     let totalMinutes = 0;
//     workLogData.employees.forEach(employee => {
//       employee.worklogs.forEach(log => {
//         const [hours, minutes] = log.overtime.split(':').map(Number);
//         totalMinutes += hours * 60 + minutes;
//       });
//     });
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   const calculateEmployeeTotalTime = (worklogs) => {
//     let totalTime = "00:00";
//     worklogs.forEach(log => {
//       totalTime = addTimes(totalTime, addTimes(log.time, log.overtime));
//     });
//     return totalTime;
//   };

//   // Get assigned user name from job data or location state
//   const getAssignedUserName = () => {
//     // First try to get from jobData (fetched details)
//     if (jobData?.assignedTo?.firstName && jobData?.assignedTo?.lastName) {
//       return `${jobData.assignedTo.firstName} ${jobData.assignedTo.lastName}`;
//     }

//     // Then try from the job in location state
//     if (job?.assignedTo?.firstName && job?.assignedTo?.lastName) {
//       return `${job.assignedTo.firstName} ${job.assignedTo.lastName}`;
//     }

//     // If none of the above, return 'Not assigned'
//     return 'Not assigned';
//   };

//   // Responsive two-column grid for job details
//   const jobDetails = [
//     {
//       label: "Job No",
//       value: job?.JobNo,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//     {
//       label: "Project Name",
//       value: job?.projectId?.[0]?.projectName,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//     {
//       label: "Project No",
//       value: job?.projectId?.[0]?.projectNo,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//     {
//       label: "Status",
//       value: job?.Status || job?.status,
//       icon: <FaInfoCircle className="me-2 text-primary" />,
//     },
//     {
//       label: "Due Date",
//       value: job?.createdAt
//         ? new Date(job?.createdAt)
//           .toLocaleDateString("en-GB")
//           .replace(/\/20/, "/")
//         : job?.dueDate,
//       icon: <FaCalendarAlt className="me-2 text-primary" />,
//     },
//     {
//       label: "Brand",
//       value: job?.brandName,
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "Flavour",
//       value: job?.flavour,
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "SubBrand",
//       value: job?.subBrand,
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "Pack Type",
//       value: job?.packType,
//       icon: <FaBox className="me-2 text-primary" />,
//     },
//     {
//       label: "Pack Size",
//       value: job?.packSize,
//       icon: <FaBox className="me-2 text-primary" />,
//     },
//     {
//       label: "Priority",
//       value: job?.priority,
//       icon: <FaInfoCircle className="me-2 text-primary" />,
//     },
//     {
//       label: "Assign",
//       value: getAssignedUserName(), // Use the helper function
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "Project Barcode",
//       value: job?.barcode,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//   ];

//   const BackButton = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="container py-4 px-1 px-md-4">
//       {/* Job Details Grid */}
//       <Card className="border-0 shadow-sm rounded-4 mb-4 p-4">
//         <div
//           className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4 shadow-sm"
//           style={{ backgroundColor: "#0052CC" }}
//         >
//           <div className="d-flex align-items-center gap-2">
//             <FaInfoCircle className="text-white" size={28} />
//             <h2
//               className="mb-0 fw-bold text-white"
//               style={{ letterSpacing: 1 }}
//             >
//               Job Details
//             </h2>
//           </div>
//           <Button
//             onClick={() => BackButton()}
//             variant="light"
//             size="sm"
//             className="rounded-circle d-flex align-items-center justify-content-center shadow-sm border-0"
//             style={{ width: 36, height: 36 }}
//           >
//             <FaTimes className="text-primary" size={18} />
//           </Button>
//         </div>
//         <Row className="g-4">
//           {jobDetails.map((item, idx) => (
//             <Col xs={12} md={6} key={idx}>
//               <div className="d-flex align-items-center bg-light rounded-3 p-3 mb-2 shadow-sm h-100" style={{ color: "#0052CC" }}>
//                 {item.icon}
//                 <span
//                   className="fw-semibold text-secondary"
//                   style={{ minWidth: 120 }}
//                 >
//                   {item.label}:
//                 </span>
//                 <span className="ms-2 fs-6 text-dark">
//                   {item.value || <span className="text-muted">-</span>}
//                 </span>
//               </div>
//             </Col>
//           ))}
//         </Row>
//         {/* ✅ Work Log Section from API */}
//         <div className="mt-4 border-top pt-4">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5 className="fw-bold text-primary mb-0">Work Log:</h5>
//             {loading && <Spinner animation="border" size="sm" variant="primary" />}
//           </div>
//           {error && (
//             <Alert variant="warning" className="mb-3">
//               {error}
//             </Alert>
//           )}
//           {workLogData && workLogData.employees && workLogData.employees.length > 0 ? (
//             <>
//               {workLogData.employees.map((employeeData, empIndex) => (
//                 <div key={empIndex} className="mb-4">
//                   <div className="d-flex justify-content-end align-items-center mb-2 bg-light p-2 rounded">
//                     <Badge bg="primary" className="fs-6">
//                       Total Time: {calculateEmployeeTotalTime(employeeData.worklogs)}
//                     </Badge>
//                   </div>
//                   <div className="table-responsive">
//                     <Table
//                       striped
//                       bordered
//                       hover
//                       size="sm"
//                       className="align-middle shadow-sm"
//                     >
//                       <thead className="bg-light">
//                         <tr>
//                           <th>Date</th>
//                           <th>Employee Name</th>
//                           <th>Assign</th>
//                           <th>Task Description</th>
//                           <th className="text-center">Time Spent</th>
//                           <th className="text-center">Overtime</th>
//                           <th className="text-center">Total Time</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {employeeData.worklogs.map((log, logIndex) => (
//                           <tr key={logIndex}>
//                             <td>{log.date ? new Date(log.date).toLocaleDateString() : "-"}</td>
//                             <td>
//                               {employeeData.employee.firstName} {employeeData.employee.lastName}
//                             </td>
//                             <td>
//                               {employeeData.employee.assign || "-"}
//                             </td>
//                             <td style={{ whiteSpace: "pre-line" }}>
//                               {log.taskDescription || "-"}
//                             </td>
//                             <td className="text-center fw-bold text-primary">
//                               {formatTime(log.time)}
//                             </td>
//                             <td className="text-center fw-bold text-danger">
//                               {formatTime(log.overtime)}
//                             </td>
//                             <td className="text-center fw-bold text-success">
//                               {addTimes(log.time, log.overtime)}
//                             </td>
//                             <td>
//                               <Badge
//                                 bg={
//                                   log.status === "Approved"
//                                     ? "success"
//                                     : log.status === "Rejected"
//                                       ? "danger"
//                                       : "warning"
//                                 }
//                               >
//                                 {log.status || "Pending"}
//                               </Badge>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   </div>
//                 </div>
//               ))}
//               {/* Project Time Summary */}
//               <Card className="border-0 bg-light rounded-4 mt-3">
//                 <Card.Body className="py-3">
//                   <Row>
//                     <Col md={4}>
//                       <div className="text-center p-2">
//                         <h6 className="text-muted mb-1">Work Time</h6>
//                         <h4 className="fw-bold text-primary mb-0">{calculateProjectTotalTime()}</h4>
//                       </div>
//                     </Col>
//                     <Col md={4}>
//                       <div className="text-center p-2">
//                         <h6 className="text-muted mb-1">Over Time</h6>
//                         <h4 className="fw-bold text-danger mb-0">{calculateProjectOvertime()}</h4>
//                       </div>
//                     </Col>
//                     <Col md={4}>
//                       <div className="text-center p-2">
//                         <h6 className="text-muted mb-1"> Total Time</h6>
//                         <h4 className="fw-bold text-success mb-0">
//                           {addTimes(calculateProjectTotalTime(), calculateProjectOvertime())}
//                         </h4>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Card.Body>
//               </Card>
//             </>
//           ) : (
//             !loading && !error && <p className="text-muted">No work log data available</p>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default OvervieJobsTracker;



// import React, { useRef, useState, useEffect } from "react";
// import { Card, Row, Col, Button, Table, Spinner, Alert, Badge } from "react-bootstrap";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   FaUpload,
//   FaFileExcel,
//   FaTimes,
//   FaBarcode,
//   FaUser,
//   FaClock,
//   FaCalendarAlt,
//   FaInfoCircle,
//   FaPlus,
//   FaBox,
// } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { apiUrl } from "../../../redux/utils/config";

// const OvervieJobsTracker = ({ onClose }) => {
//   const fileInputRef = useRef(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState("");
//   const [workLogData, setWorkLogData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       alert(`Selected file: ${file.name}`);
//     }
//   };

//   const handleShowDetails = (title) => {
//     setModalContent(title);
//     setShowModal(true);
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams(); // for edit mode
//   const location = useLocation();
//   const { job } = location.state || {};

//   // Fetch work log data when component mounts
//   useEffect(() => {
//     const fetchWorkLogData = async () => {
//       if (!job?.projectId?.[0]?._id) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           `${apiUrl}/jobs/worklog-project/${job.projectId[0]._id}`
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setWorkLogData(data);
//       } catch (err) {
//         console.error("Error fetching work log data:", err);
//         setError("Failed to load work log data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWorkLogData();
//   }, [job?.projectId]);

//   // Function to format time (HH:MM)
//   const formatTime = (timeString) => {
//     if (!timeString) return "00:00";
//     // Remove any seconds portion if present
//     const timeParts = timeString.split(':');
//     return `${timeParts[0]}:${timeParts[1]}`;
//   };

//   // Function to calculate total time spent
//   const calculateTotalTime = (timeEntries) => {
//     let totalMinutes = 0;
//     timeEntries.forEach(entry => {
//       const [hours, minutes] = entry.time.split(':').map(Number);
//       totalMinutes += hours * 60 + minutes;
//     });
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   // Function to add two time values (HH:MM)
//   const addTimes = (time1, time2) => {
//     if (!time1) time1 = "00:00";
//     if (!time2) time2 = "00:00";
//     const [hours1, minutes1] = time1.split(':').map(Number);
//     const [hours2, minutes2] = time2.split(':').map(Number);
//     let totalMinutes = (hours1 + hours2) * 60 + minutes1 + minutes2;
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   // Calculate total project time
//   const calculateProjectTotalTime = () => {
//     if (!workLogData?.employees) return "00:00";
//     let totalMinutes = 0;
//     workLogData.employees.forEach(employee => {
//       employee.worklogs.forEach(log => {
//         const [hours, minutes] = log.time.split(':').map(Number);
//         totalMinutes += hours * 60 + minutes;
//       });
//     });
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   // Calculate total overtime
//   const calculateProjectOvertime = () => {
//     if (!workLogData?.employees) return "00:00";
//     let totalMinutes = 0;
//     workLogData.employees.forEach(employee => {
//       employee.worklogs.forEach(log => {
//         const [hours, minutes] = log.overtime.split(':').map(Number);
//         totalMinutes += hours * 60 + minutes;
//       });
//     });
//     const hours = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   const calculateEmployeeTotalTime = (worklogs) => {
//     let totalTime = "00:00";
//     worklogs.forEach(log => {
//       totalTime = addTimes(totalTime, addTimes(log.time, log.overtime));
//     });
//     return totalTime;
//   };

//   // Responsive two-column grid for job details
//   const jobDetails = [
//     {
//       label: "Job No",
//       value: job?.JobNo,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//     {
//       label: "Project Name",
//       value: job?.projectId?.[0]?.projectName,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//     {
//       label: "Project No",
//       value: job?.projectId?.[0]?.projectNo,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//     {
//       label: "Status",
//       value: job?.Status || job?.status,
//       icon: <FaInfoCircle className="me-2 text-primary" />,
//     },
//     {
//       label: "Due Date",
//       value: job?.createdAt
//         ? new Date(job?.createdAt)
//           .toLocaleDateString("en-GB")
//           .replace(/\/20/, "/")
//         : job?.dueDate,
//       icon: <FaCalendarAlt className="me-2 text-primary" />,
//     },
//     {
//       label: "Brand",
//       value: job?.brandName,
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "Flavour",
//       value: job?.flavour,
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "SubBrand",
//       value: job?.subBrand,
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "Pack Type",
//       value: job?.packType,
//       icon: <FaBox className="me-2 text-primary" />,
//     },
//     {
//       label: "Pack Size",
//       value: job?.packSize,
//       icon: <FaBox className="me-2 text-primary" />,
//     },
//     {
//       label: "Priority",
//       value: job?.priority,
//       icon: <FaInfoCircle className="me-2 text-primary" />,
//     },
//     {
//       label: "Assigned To",
//       value: job?.assignedTo ? `${job.assignedTo.firstName} ${job.assignedTo.lastName}` : (job?.assign ? job.assign : 'Not assigned'),
//       icon: <FaUser className="me-2 text-primary" />,
//     },
//     {
//       label: "Project Barcode",
//       value: job?.barcode,
//       icon: <FaBarcode className="me-2 text-primary" />,
//     },
//   ];

//   const BackButton = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="container py-4 px-1 px-md-4">
//       {/* Job Details Grid */}
//       <Card className="border-0 shadow-sm rounded-4 mb-4 p-4">
//         <div
//           className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4 shadow-sm"
//           style={{ backgroundColor: "#0052CC" }}
//         >
//           <div className="d-flex align-items-center gap-2">
//             <FaInfoCircle className="text-white" size={28} />
//             <h2
//               className="mb-0 fw-bold text-white"
//               style={{ letterSpacing: 1 }}
//             >
//               Job Details
//             </h2>
//           </div>
//           <Button
//             onClick={() => BackButton()}
//             variant="light"
//             size="sm"
//             className="rounded-circle d-flex align-items-center justify-content-center shadow-sm border-0"
//             style={{ width: 36, height: 36 }}
//           >
//             <FaTimes className="text-primary" size={18} />
//           </Button>
//         </div>
//         <Row className="g-4">
//           {jobDetails.map((item, idx) => (
//             <Col xs={12} md={6} key={idx}>
//               <div className="d-flex align-items-center bg-light rounded-3 p-3 mb-2 shadow-sm h-100" style={{ color: "#0052CC" }}>
//                 {item.icon}
//                 <span
//                   className="fw-semibold text-secondary"
//                   style={{ minWidth: 120 }}
//                 >
//                   {item.label}:
//                 </span>
//                 <span className="ms-2 fs-6 text-dark">
//                   {item.value || <span className="text-muted">-</span>}
//                 </span>
//               </div>
//             </Col>
//           ))}
//         </Row>

//         {/* Debug Info - Remove in production */}
//         <div className="mb-3">
//           <small className="text-muted">
//             Debug: Job data: {JSON.stringify(job?.assignedTo, null, 2)}
//           </small>
//         </div>

//         {/* ✅ Work Log Section from API */}
//         <div className="mt-4 border-top pt-4">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5 className="fw-bold text-primary mb-0">Work Log:</h5>
//             {loading && <Spinner animation="border" size="sm" variant="primary" />}
//           </div>
//           {error && (
//             <Alert variant="warning" className="mb-3">
//               {error}
//             </Alert>
//           )}
//           {workLogData && workLogData.employees && workLogData.employees.length > 0 ? (
//             <>
//               {workLogData.employees.map((employeeData, empIndex) => (
//                 <div key={empIndex} className="mb-4">
//                   <div className="d-flex justify-content-end align-items-center mb-2 bg-light p-2 rounded">
//                     <Badge bg="primary" className="fs-6">
//                       Total Time: {calculateEmployeeTotalTime(employeeData.worklogs)}
//                     </Badge>
//                   </div>
//                   <div className="table-responsive">
//                     <Table
//                       striped
//                       bordered
//                       hover
//                       size="sm"
//                       className="align-middle shadow-sm"
//                     >
//                       <thead className="bg-light">
//                         <tr>
//                           <th>Date</th>
//                           <th>Employee Name</th>
//                           <th>Assign</th>
//                           <th>Task Description</th>
//                           <th className="text-center">Time Spent</th>
//                           <th className="text-center">Overtime</th>
//                           <th className="text-center">Total Time</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {employeeData.worklogs.map((log, logIndex) => (
//                           <tr key={logIndex}>
//                             <td>{log.date ? new Date(log.date).toLocaleDateString() : "-"}</td>
//                             <td>
//                               {employeeData.employee.firstName} {employeeData.employee.lastName}
//                             </td>
//                             <td>
//                               {employeeData.employee.assign || "-"}
//                             </td>
//                             <td style={{ whiteSpace: "pre-line" }}>
//                               {log.taskDescription || "-"}
//                             </td>
//                             <td className="text-center fw-bold text-primary">
//                               {formatTime(log.time)}
//                             </td>
//                             <td className="text-center fw-bold text-danger">
//                               {formatTime(log.overtime)}
//                             </td>
//                             <td className="text-center fw-bold text-success">
//                               {addTimes(log.time, log.overtime)}
//                             </td>
//                             <td>
//                               <Badge
//                                 bg={
//                                   log.status === "Approved"
//                                     ? "success"
//                                     : log.status === "Rejected"
//                                       ? "danger"
//                                       : "warning"
//                                 }
//                               >
//                                 {log.status || "Pending"}
//                               </Badge>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   </div>
//                 </div>
//               ))}
//               {/* Project Time Summary */}
//               <Card className="border-0 bg-light rounded-4 mt-3">
//                 <Card.Body className="py-3">
//                   <Row>
//                     <Col md={4}>
//                       <div className="text-center p-2">
//                         <h6 className="text-muted mb-1">Work Time</h6>
//                         <h4 className="fw-bold text-primary mb-0">{calculateProjectTotalTime()}</h4>
//                       </div>
//                     </Col>
//                     <Col md={4}>
//                       <div className="text-center p-2">
//                         <h6 className="text-muted mb-1">Over Time</h6>
//                         <h4 className="fw-bold text-danger mb-0">{calculateProjectOvertime()}</h4>
//                       </div>
//                     </Col>
//                     <Col md={4}>
//                       <div className="text-center p-2">
//                         <h6 className="text-muted mb-1"> Total Time</h6>
//                         <h4 className="fw-bold text-success mb-0">
//                           {addTimes(calculateProjectTotalTime(), calculateProjectOvertime())}
//                         </h4>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Card.Body>
//               </Card>
//             </>
//           ) : (
//             !loading && !error && <p className="text-muted">No work log data available</p>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default OvervieJobsTracker;

import React, { useRef, useState, useEffect } from "react";
import { Card, Row, Col, Button, Table, Spinner, Alert, Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FaUpload,
  FaFileExcel,
  FaTimes,
  FaBarcode,
  FaUser,
  FaClock,
  FaCalendarAlt,
  FaInfoCircle,
  FaPlus,
  FaBox,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { apiUrl } from "../../../redux/utils/config";
const OvervieJobsTracker = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [workLogData, setWorkLogData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // for edit mode
  const location = useLocation();
  const { job } = location.state || {};
  // Fetch work log data when component mounts
  useEffect(() => {
    const fetchWorkLogData = async () => {
      if (!job?.projectId?.[0]?._id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${apiUrl}/jobs/worklog-project/${job.projectId[0]._id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWorkLogData(data);
      } catch (err) {
        console.error("Error fetching work log data:", err);
        setError("Failed to load work log data");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkLogData();
  }, [job?.projectId]);
  // Function to format time (HH:MM)
  const formatTime = (timeString) => {
    if (!timeString) return "00:00";
    // Remove any seconds portion if present
    const timeParts = timeString.split(':');
    return `${timeParts[0]}:${timeParts[1]}`;
  };
  // Function to calculate total time spent
  const calculateTotalTime = (timeEntries) => {
    let totalMinutes = 0;
    timeEntries.forEach(entry => {
      const [hours, minutes] = entry.time.split(':').map(Number);
      totalMinutes += hours * 60 + minutes;
    });
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  // Function to add two time values (HH:MM)
  const addTimes = (time1, time2) => {
    if (!time1) time1 = "00:00";
    if (!time2) time2 = "00:00";
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);
    let totalMinutes = (hours1 + hours2) * 60 + minutes1 + minutes2;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  // Calculate total project time
  const calculateProjectTotalTime = () => {
    if (!workLogData?.employees) return "00:00";
    let totalMinutes = 0;
    workLogData.employees.forEach(employee => {
      employee.worklogs.forEach(log => {
        const [hours, minutes] = log.time.split(':').map(Number);
        totalMinutes += hours * 60 + minutes;
      });
    });
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  // Calculate total overtime
  const calculateProjectOvertime = () => {
    if (!workLogData?.employees) return "00:00";
    let totalMinutes = 0;
    workLogData.employees.forEach(employee => {
      employee.worklogs.forEach(log => {
        const [hours, minutes] = log.overtime.split(':').map(Number);
        totalMinutes += hours * 60 + minutes;
      });
    });
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  const calculateEmployeeTotalTime = (worklogs) => {
    let totalTime = "00:00";
    worklogs.forEach(log => {
      totalTime = addTimes(totalTime, addTimes(log.time, log.overtime));
    });
    return totalTime;
  };
  // Helper function to get assigned person's name
  // Helper function to get assigned person's name
  const getAssignedToName = (job) => {
    if (job?.assignedTo?.firstName && job?.assignedTo?.lastName) {
      return `${job.assignedTo.firstName} ${job.assignedTo.lastName}`;
    }
    return job?.assign || "Not assigned";
  };
  // Responsive two-column grid for job details
  const jobDetails = [
    {
      label: "Job No",
      value: job?.JobNo,
      icon: <FaBarcode className="me-2 text-primary" />,
    },
    {
      label: "Project Name",
      value: job?.projectId?.[0]?.projectName,
      icon: <FaBarcode className="me-2 text-primary" />,
    },
    {
      label: "Project No",
      value: job?.projectId?.[0]?.projectNo,
      icon: <FaBarcode className="me-2 text-primary" />,
    },
    {
      label: "Status",
      value: job?.Status || job?.status,
      icon: <FaInfoCircle className="me-2 text-primary" />,
    },
    {
      label: "Due Date",
      value: job?.createdAt
        ? new Date(job?.createdAt)
          .toLocaleDateString("en-GB")
          .replace(/\/20/, "/")
        : job?.dueDate,
      icon: <FaCalendarAlt className="me-2 text-primary" />,
    },
    {
      label: "Brand",
      value: job?.brandName,
      icon: <FaUser className="me-2 text-primary" />,
    },
    {
      label: "Flavour",
      value: job?.flavour,
      icon: <FaUser className="me-2 text-primary" />,
    },
    {
      label: "SubBrand",
      value: job?.subBrand,
      icon: <FaUser className="me-2 text-primary" />,
    },
    {
      label: "Pack Type",
      value: job?.packType,
      icon: <FaBox className="me-2 text-primary" />,
    },
    {
      label: "Pack Size",
      value: job?.packSize,
      icon: <FaBox className="me-2 text-primary" />,
    },
    {
      label: "Priority",
      value: job?.priority,
      icon: <FaInfoCircle className="me-2 text-primary" />,
    },
    {
      label: "Assigned To",
      value: getAssignedToName(job), // Fixed: Using helper function
      icon: <FaUser className="me-2 text-primary" />,
    },
    {
      label: "Project Barcode",
      value: job?.barcode,
      icon: <FaBarcode className="me-2 text-primary" />,
    },
  ];
  const BackButton = () => {
    navigate(-1);
  };
  return (
    <div className="container py-4 px-1 px-md-4">
      {/* Job Details Grid */}
      <Card className="border-0 shadow-sm rounded-4 mb-4 p-4">
        <div
          className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4 shadow-sm"
          style={{ backgroundColor: "#0052CC" }}
        >
          <div className="d-flex align-items-center gap-2">
            <FaInfoCircle className="text-white" size={28} />
            <h2
              className="mb-0 fw-bold text-white"
              style={{ letterSpacing: 1 }}
            >
              Job Details
            </h2>
          </div>
          <Button
            onClick={() => BackButton()}
            variant="light"
            size="sm"
            className="rounded-circle d-flex align-items-center justify-content-center shadow-sm border-0"
            style={{ width: 36, height: 36 }}
          >
            <FaTimes className="text-primary" size={18} />
          </Button>
        </div>
        <Row className="g-4">
          {jobDetails.map((item, idx) => (
            <Col xs={12} md={6} key={idx}>
              <div className="d-flex align-items-center bg-light rounded-3 p-3 mb-2 shadow-sm h-100" style={{ color: "#0052CC" }}>
                {item.icon}
                <span
                  className="fw-semibold text-secondary"
                  style={{ minWidth: 120 }}
                >
                  {item.label}:
                </span>
                <span className="ms-2 fs-6 text-dark">
                  {item.value || <span className="text-muted">-</span>}
                </span>
              </div>
            </Col>
          ))}
        </Row>
        {/* Debug Info - Remove in production */}
        {/* <div className="mb-3">
          <small className="text-muted">
            Debug: Job data: {JSON.stringify(job?.assignedTo, null, 2)}
          </small>
        </div> */}
        {/* ✅ Work Log Section from API */}
        <div className="mt-4 border-top pt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-primary mb-0">Work Log:</h5>
            {loading && <Spinner animation="border" size="sm" variant="primary" />}
          </div>
          {error && (
            <Alert variant="warning" className="mb-3">
              {error}
            </Alert>
          )}
          {workLogData && workLogData.employees && workLogData.employees.length > 0 ? (
            <>
              {workLogData.employees.map((employeeData, empIndex) => (
                <div key={empIndex} className="mb-4">
                  <div className="d-flex justify-content-end align-items-center mb-2 bg-light p-2 rounded">
                    <Badge bg="primary" className="fs-6">
                      Total Time: {calculateEmployeeTotalTime(employeeData.worklogs)}
                    </Badge>
                  </div>
                  <div className="table-responsive">
                    <Table
                      striped
                      bordered
                      hover
                      size="sm"
                      className="align-middle shadow-sm"
                    >
                      <thead className="bg-light">
                        <tr>
                          <th>Date</th>
                          <th>Employee Name</th>
                          <th>Assign</th>
                          <th>Task Description</th>
                          <th className="text-center">Work Time </th>
                          <th className="text-center">Over Time</th>
                          <th className="text-center">Total Time</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeData.worklogs.map((log, logIndex) => (
                          <tr key={logIndex}>
                            <td>{log.date ? new Date(log.date).toLocaleDateString() : "-"}</td>
                            <td>
                              {employeeData.employee.firstName} {employeeData.employee.lastName}
                            </td>
                            <td>
                              {employeeData.employee.assign || "-"}
                            </td>
                            <td style={{ whiteSpace: "pre-line" }}>
                              {log.taskDescription || "-"}
                            </td>
                            <td className="text-center fw-bold text-primary">
                              {formatTime(log.time)}
                            </td>
                            <td className="text-center fw-bold text-danger">
                              {formatTime(log.overtime)}
                            </td>
                            <td className="text-center fw-bold text-success">
                              {addTimes(log.time, log.overtime)}
                            </td>
                            <td>
                              <Badge
                                bg={
                                  log.status === "Approved"
                                    ? "success"
                                    : log.status === "Rejected"
                                      ? "danger"
                                      : "warning"
                                }
                              >
                                {log.status || "Pending"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              ))}
              {/* Project Time Summary */}
              <Card className="border-0 bg-light rounded-4 mt-3">
                <Card.Body className="py-3">
                  <Row>
                    <Col md={4}>
                      <div className="text-center p-2">
                        <h6 className="text-muted mb-1">Work Time</h6>
                        <h4 className="fw-bold text-primary mb-0">{calculateProjectTotalTime()}</h4>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center p-2">
                        <h6 className="text-muted mb-1">Over Time</h6>
                        <h4 className="fw-bold text-danger mb-0">{calculateProjectOvertime()}</h4>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center p-2">
                        <h6 className="text-muted mb-1"> Total Time</h6>
                        <h4 className="fw-bold text-success mb-0">
                          {addTimes(calculateProjectTotalTime(), calculateProjectOvertime())}
                        </h4>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </>
          ) : (
            !loading && !error && <p className="text-muted">No work log data available</p>
          )}
        </div>
      </Card>
    </div>
  );
};
export default OvervieJobsTracker;