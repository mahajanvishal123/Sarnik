import React, { useState, useEffect } from "react";
import { Table, Button, Form, Dropdown, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updatejob } from "../../../redux/slices/JobsSlice";

function ReturnedJobs() {
  const [returnedJobs, setReturnedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Load returned jobs from localStorage
    const storedReturnedJobs = JSON.parse(localStorage.getItem('returnedJobs') || '[]');
    setReturnedJobs(storedReturnedJobs);
  }, []);

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
    switch (status.toLowerCase().trim()) {
      case "in progress":
      case "in_progress":
        return "bg-warning text-dark";
      case "completed":
        return "bg-success text-white";
      case "cancelled":
        return "bg-danger text-white";
      case "active":
        return "bg-primary text-white";
      case "reject":
        return "bg-danger text-white";
      case "review":
        return "bg-info text-dark";
      case "not started":
        return "bg-secondary text-white";
      case "open":
        return "bg-primary text-white";
      case "returned":
        return "bg-warning text-dark";
      default:
        return "bg-light text-dark";
    }
  };

  const handleReassign = (job) => {
    // Update job status back to "Completed" and remove from returned jobs
    dispatch(updatejob({ id: job._id, data: { Status: "Completed" } }));
    
    // Remove from localStorage
    const updatedReturnedJobs = returnedJobs.filter(j => j._id !== job._id);
    setReturnedJobs(updatedReturnedJobs);
    localStorage.setItem('returnedJobs', JSON.stringify(updatedReturnedJobs));
  };

  const filteredJobs = returnedJobs.filter((j) => {
    const terms = searchQuery.trim().split(/\s+/).filter(Boolean);
    if (terms.length === 0) {
      const matchesProject =
        selectedProject === "All Projects" ||
        (j.projectId?.[0]?.projectName?.toLowerCase() === selectedProject.toLowerCase());
      const matchesPriority =
        selectedPriority === "All Priorities" ||
        (j.priority?.toLowerCase() === selectedPriority.toLowerCase());
      return matchesProject && matchesPriority;
    }
    
    const fields = [
      j.JobNo,
      j.projectId?.[0]?.projectName,
      j.brandName,
      j.subBrand,
      j.flavour,
      j.packType,
      j.packSize,
      j.packCode,
      j.updatedAt ? new Date(j.updatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : '',
      j.createdAt ? new Date(j.createdAt).toLocaleDateString("en-GB") : '',
      j.assignedTo,
      j.priority,
      j.Status
    ].map(f => (f || '').toString().toLowerCase());
    
    const matchesSearch = terms.every(term =>
      fields.some(field => field.includes(term.toLowerCase()))
    );
    const matchesProject =
      selectedProject === "All Projects" ||
      (j.projectId?.[0]?.projectName?.toLowerCase() === selectedProject.toLowerCase());
    const matchesPriority =
      selectedPriority === "All Priorities" ||
      (j.priority?.toLowerCase() === selectedPriority.toLowerCase());
    
    return matchesSearch && matchesProject && matchesPriority;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container-fluid bg-white p-3 mt-4 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="job-title mb-0">Returned Jobs</h2>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Back to Completed Jobs
        </Button>
      </div>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
        <Form.Control
          type="search"
          placeholder="Search returned jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "250px" }}
        />
        <Dropdown>
          <Dropdown.Toggle variant="light" id="project-dropdown">
            {selectedProject}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedProject("All Projects")}>
              All Projects
            </Dropdown.Item>
            {[...new Set(returnedJobs.map((j) => j.projectId?.[0]?.projectName || "N/A"))].map(
              (projectName, index) => (
                <Dropdown.Item key={index} onClick={() => setSelectedProject(projectName)}>
                  {projectName}
                </Dropdown.Item>
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="priority-dropdown">
            {selectedPriority}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedPriority("All Priorities")}>
              All Priorities
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPriority("High")}>
              High
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPriority("Medium")}>
              Medium
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPriority("Low")}>
              Low
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <Table hover className="align-middle">
          <thead className="bg-light">
            <tr>
              <th>JobNo</th>
              <th style={{ whiteSpace: "nowrap" }}>Project Name</th>
              <th style={{ whiteSpace: "nowrap" }}>Project No</th>
              <th>Brand</th>
              <th style={{ whiteSpace: "nowrap" }}>Sub Brand</th>
              <th>Flavour</th>
              <th>PackType</th>
              <th>PackSize</th>
              <th>PackCode</th>
              <th>TimeLogged</th>
              <th>Due Date</th>
              <th>assign</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.length > 0 ? (
              paginatedJobs.map((job, index) => (
                <tr key={job._id || index}>
                  <td>{job.JobNo}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {job.projectId?.[0]?.projectName || "N/A"}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {job.projectId?.[0]?.projectNo || "N/A"}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{job.brandName}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{job.subBrand}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{job.flavour}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{job.packType}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{job.packSize}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{job?.packCode}</td>
                  <td>
                    {new Date(job.updatedAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {new Date(job.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{job?.assign}</td>
                  <td>
                    <span className={getPriorityClass(job.priority)}>{job.priority}</span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusClass(job.Status)} px-2 py-1`}>
                      {job.Status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="success" 
                        size="sm" 
                        onClick={() => handleReassign(job)}
                      >
                        Re-assign to Completed
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="text-center py-4">
                  No returned jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-muted small">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {(currentPage - 1) * itemsPerPage + paginatedJobs.length} of {filteredJobs.length}
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

export default ReturnedJobs;