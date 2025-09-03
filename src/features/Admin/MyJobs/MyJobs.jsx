// MyJobs Component - Modified to show only employee-assigned jobs
import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button, Form, Table, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from "react-redux";
import { fetchjobs, ProductionJobsGet } from "../../../redux/slices/JobsSlice";
import { FaUpload, FaFilter } from "react-icons/fa";
import { fetchAssign } from "../../../redux/slices/AssignSlice";

function MyJobs() {
  const [showTimesheetModal, setShowTimesheetModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("All Employees");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user role from Redux store or authentication context
  const { user } = useSelector((state) => state.auth || {});
  const isDesigner = user?.role === "designer";
  const isProduction = user?.role === "production";
  
  const handleReturnJob = () => {
    const hasTimesheet = false;
    if (!hasTimesheet) {
      alert('This jobs is send to the production');
      return;
    }
  };
  
  const fileInputRef = useRef(null);
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };
  
  const handleSelectAll = (e) => {
    // Implement your select all logic here if needed
  };
  
  const getPriorityClass = (priority) => {
    switch ((priority || "").toLowerCase()) {
      case "high":
        return "text-danger";
      case "medium":
        return "text-warning";
      case "low":
        return "text-success";
      default:
        return "";
    }
  };
  
  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase().trim()) {
      case "in progress":
      case "in_progress":
        return "bg-warning text-dark";
      case "review":
      case "waitingapproval":
        return "bg-info text-dark";
      case "not started":
        return "bg-secondary text-white";
      case "completed":
        return "bg-success text-white";
      case "open":
        return "bg-primary text-white";
      case "cancelled":
        return "bg-dark text-white";
      case "rejected":
        return "bg-danger text-white";
      default:
        return "bg-light text-dark";
    }
  };
  
  const { job, loading, error } = useSelector((state) => state.jobs);
  useEffect(() => {
    // Using ProductionJobsGet to get all jobs, then we'll filter for employee assignments
    dispatch(ProductionJobsGet());
  }, [dispatch]);
  
  const { assigns } = useSelector((state) => state.Assign);
  console.log("Assignments:", assigns?.assignments);
  
  useEffect(() => {
    dispatch(fetchAssign());
  }, [dispatch]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  
  // Filter for employee-assigned jobs only
  const filteredProjects = (assigns?.assignments || []).filter((assignment) => {
    // Only show assignments for employees (not production)
    if (!assignment.employeeId || assignment.employeeId.role !== "employee") {
      return false;
    }
    
    const terms = searchQuery.trim().split(/\s+/).filter(Boolean);
    const firstValidJob = (assignment.jobs || []).find(j => j.jobId);
    const employeeName = assignment.employeeId
      ? `${assignment.employeeId.firstName} ${assignment.employeeId.lastName}`.toLowerCase()
      : '';
    const employeeEmail = (assignment.employeeId?.email || '').toLowerCase();
    const description = (assignment.description || '').toLowerCase();
    const brandName = (firstValidJob?.jobId?.brandName || '').toLowerCase();
    const subBrand = (firstValidJob?.jobId?.subBrand || '').toLowerCase();
    const flavour = (firstValidJob?.jobId?.flavour || '').toLowerCase();
    const packType = (firstValidJob?.jobId?.packType || '').toLowerCase();
    const packSize = (firstValidJob?.jobId?.packSize || '').toLowerCase();
    const packCode = (firstValidJob?.jobId?.packCode || '').toLowerCase();
    const jobNo = (firstValidJob?.jobId?.JobNo || '').toString().toLowerCase();
    const priority = (firstValidJob?.jobId?.priority || '').toLowerCase();
    const dueDate = assignment.createdAt
      ? new Date(assignment.createdAt).toLocaleDateString("en-GB").toLowerCase()
      : '';
    const assign = (assignment.selectDesigner || '').toLowerCase();
    const timeLogged = assignment.updatedAt
      ? new Date(assignment.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase()
      : '';
    const status = (firstValidJob?.jobId?.Status || '').toLowerCase();
    const designer = (assignment.selectDesigner || '').toLowerCase();
    
    const fields = [
      employeeName,
      employeeEmail,
      description,
      brandName,
      subBrand,
      flavour,
      packType,
      packSize,
      packCode,
      priority,
      dueDate,
      assign,
      timeLogged,
      status,
      jobNo,
      designer
    ];
    
    const matchesSearch = terms.length === 0 || terms.every(term =>
      fields.some(field => field.includes(term.toLowerCase()))
    );
    
    const matchesEmployee =
      selectedEmployee === "All Employees" ||
      employeeName === selectedEmployee.toLowerCase();
      
    // Fix status filtering to match actual status values
    const assignmentStatus = firstValidJob?.jobId?.Status?.toLowerCase() || '';
    const matchesStatus =
      selectedStatus === "All Status" ||
      (selectedStatus.toLowerCase() === "in_progress" && assignmentStatus === "in_progress") ||
      (selectedStatus.toLowerCase() === "review" && assignmentStatus === "review") ||
      (selectedStatus.toLowerCase() === "active" && assignmentStatus === "active") ||
      (selectedStatus.toLowerCase() === "completed" && assignmentStatus === "completed") ||
      (selectedStatus.toLowerCase() === assignmentStatus);
    
    return matchesSearch && matchesEmployee && matchesStatus;
  });
  
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleCopyFileName = (assignment, index, currentPage, itemsPerPage) => {
    const firstValidJob = (assignment.jobs || []).find(j => j.jobId);
    const displayId = String((currentPage - 1) * itemsPerPage + index + 1).padStart(4, '0');
    const fileName = `${displayId}_${firstValidJob?.jobId?.JobNo || ''}_${firstValidJob?.jobId?.brandName || ''}_${firstValidJob?.jobId?.subBrand || ''}_${firstValidJob?.jobId?.flavour || ''}_${firstValidJob?.jobId?.packType || ''}_${firstValidJob?.jobId?.packSize || ''}_${firstValidJob?.jobId?.packCode || ''}`;
    navigator.clipboard.writeText(fileName)
      .then(() => alert("Copied to clipboard: " + fileName))
      .catch((err) => console.error("Failed to copy!", err));
  };
  
  const handleRowClick = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };
  
  return (
    <div className="p-4 m-2" style={{ backgroundColor: "white", borderRadius: "10px" }}>
      <h5 className="fw-bold mb-3 text-start">Employee Assigned Jobs</h5>
      <div className="d-lg-none mb-2 text-end">
        <Button
          variant="primary"
          size="sm"
          className="fw-bold shadow-sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter className="me-1" />
          Filter
        </Button>
      </div>
      <Row className={`mb-3 align-items-center ${showFilters ? "" : "d-none d-lg-flex"}`}>
        <Col xs={12} lg={9} className="d-flex flex-wrap gap-2 mb-2 mb-lg-0">
          <Form.Control
            type="text"
            placeholder="Search jobs..."
            className="flex-grow-1"
            style={{ minWidth: "150px", maxWidth: "200px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Dropdown>
            <Dropdown.Toggle variant="light" id="employee-dropdown">
              {selectedEmployee}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedEmployee("All Employees")}>
                All Employees
              </Dropdown.Item>
              {[...new Set((assigns?.assignments || [])
                .filter(assignment => assignment.employeeId && assignment.employeeId.role === "employee")
                .map(job =>
                  job.employeeId
                    ? `${job.employeeId.firstName} ${job.employeeId.lastName}`
                    : 'No Employee'
              ))].map((employeeName, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => setSelectedEmployee(employeeName)}
                >
                  {employeeName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="status-dropdown">
              {selectedStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {["All Status", "In_progress", "Review", "Active", "Completed"].map((item) => (
                <Dropdown.Item key={item} onClick={() => setSelectedStatus(item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <div className="table-responsive">
        <Table hover className="align-middle sticky-header">
          <thead className="bg-light">
            <tr>
              <th>EmployeeName</th>
              <th>EmployeeEmail</th>
              <th>Description</th>
              <th>Brand</th>
              <th>SubBrand</th>
              <th>Flavour</th>
              <th>PackType</th>
              <th>PackSize</th>
              <th>PackCode</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Assign</th>
              {isDesigner && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedProjects.slice().reverse().map((assignment, index) => {
              const firstValidJob = (assignment.jobs || []).find(j => j.jobId);
              return (
                <React.Fragment key={assignment._id}>
                  <tr onClick={() => handleRowClick(assignment._id)} style={{ cursor: "pointer" }}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {assignment.employeeId
                        ? `${assignment.employeeId.firstName} ${assignment.employeeId.lastName}`
                        : 'No Employee'}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>{assignment.employeeId?.email}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{assignment.description}</td>
                    <td>{firstValidJob?.jobId?.brandName || 'N/A'}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{firstValidJob?.jobId?.subBrand || 'N/A'}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{firstValidJob?.jobId?.flavour || 'N/A'}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{firstValidJob?.jobId?.packType || 'N/A'}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{firstValidJob?.jobId?.packSize || 'N/A'}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{firstValidJob?.jobId?.packCode || 'N/A'}</td>
                    <td>
                      <span className={getPriorityClass(firstValidJob?.jobId?.priority)}>
                        {firstValidJob?.jobId?.priority || 'N/A'}
                      </span>
                    </td>
                    <td>{new Date(assignment.createdAt).toLocaleDateString("en-GB")}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{assignment.selectDesigner}</td>
                   
                    {isDesigner && (
                      <td className="d-flex gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                        <Button
                          size="sm"
                          variant="dark"
                          className="me-2 d-flex"
                          onClick={handleUploadClick}
                          id="All_btn"
                        >
                          <FaUpload className="me-1" />
                          Upload
                        </Button>
                        <Link to={"/admin/MyJobsHolidayPackageDesign"}></Link>
                        <Button
                          id="All_btn"
                          size="sm"
                          variant="dark"
                          onClick={() => handleCopyFileName(assignment, index, currentPage, itemsPerPage)}
                        >
                          CopyFN
                        </Button>
                      </td>
                    )}
                  </tr>
                  {expandedJob === assignment._id && (
                    <tr>
                      <td colSpan={isDesigner ? "13" : "12"}>
                        <div className="table-responsive">
                          <Table hover className="align-middle sticky-header">
                            <thead className="bg-light">
                              <tr>
                                <th>JobNo</th>
                                <th>Brand</th>
                                <th>Sub Brand</th>
                                <th>Flavour</th>
                                <th>PackType</th>
                                <th>PackSize</th>
                                <th>PackCode</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {assignment.jobs?.filter(j => j.jobId).map((j, idx) => (
                                <tr key={j._id || idx}>
                                  <td>{j.jobId.JobNo}</td>
                                  <td>{j.jobId.brandName}</td>
                                  <td>{j.jobId.subBrand}</td>
                                  <td>{j.jobId.flavour}</td>
                                  <td>{j.jobId.packType}</td>
                                  <td>{j.jobId.packSize}</td>
                                  <td>{j.jobId.packCode}</td>
                                  <td>
                                    <span className={`badge ${getStatusClass(j.jobId.Status) || ''}`}>
                                      {j.jobId.Status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-muted small">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} entries
          </div>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyJobs;