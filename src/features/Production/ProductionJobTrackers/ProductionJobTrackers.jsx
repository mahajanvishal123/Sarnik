import React, { useEffect, useState } from "react";
import { Button, Form, Table, Dropdown } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchjobs } from "../../../redux/slices/JobsSlice";

function EmployeeJobTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const { job, loading, error } = useSelector((state) => state.jobs);

  // 🔹 yaha se apna employeeId lo (auth state/localStorage se)
  // Example: agar aap redux me auth rakhe ho
  const employeeId = useSelector((state) => state.auth?.user?._id); 
  // Agar localStorage me h to use this:
  // const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    dispatch(fetchjobs());
  }, [dispatch]);

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
      case "completed":
        return "bg-success text-white";
      case "cancelled":
      case "waitingapproval":
        return "bg-danger text-white";
      case "active":
        return "bg-primary text-white";
      case "reject":
      case "rejected":
        return "bg-danger text-white";
      case "review":
        return "bg-info text-dark";
      case "not started":
        return "bg-secondary text-white";
      case "open":
        return "bg-primary text-white";
      default:
        return "bg-light text-dark";
    }
  };

  // 🔹 Pehle employee ke jobs filter karo
  const employeeJobs = (job?.jobs || []).filter(
    (j) => (j.assignedTo?._id || j.assign) === employeeId
  );

  // 🔹 Uske baad filters aur search lagao
  const filteredJobs = employeeJobs.filter((j) => {
    const terms = searchQuery.trim().split(/\s+/).filter(Boolean);

    if (terms.length === 0)
      return (
        (selectedProject === "All Projects" ||
          (j.projectId?.[0]?.projectName || "").toLowerCase() ===
            selectedProject.toLowerCase()) &&
        (selectedPriority === "All Priorities" ||
          (j.priority || "").toLowerCase() ===
            selectedPriority.toLowerCase()) &&
        (selectedStatus === "All Status" ||
          (j.Status || "").toLowerCase().trim() ===
            selectedStatus.toLowerCase().trim())
      );

    const fields = [
      j.JobNo,
      j.projectId?.[0]?.projectName,
      j.brandName,
      j.subBrand,
      j.flavour,
      j.packType,
      j.packSize,
      j.packCode,
      j.priority,
      j.createdAt
        ? new Date(j.createdAt).toLocaleDateString("en-GB")
        : "",
      j.assignedTo,
      j.updatedAt
        ? new Date(j.updatedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
      j.Status,
    ].map((f) => (f || "").toString().toLowerCase());

    const matchesSearch = terms.every((term) =>
      fields.some((field) => field.includes(term.toLowerCase()))
    );

    const matchesProject =
      selectedProject === "All Projects" ||
      (j.projectId?.[0]?.projectName || "").toLowerCase() ===
        selectedProject.toLowerCase();
    const matchesPriority =
      selectedPriority === "All Priorities" ||
      (j.priority || "").toLowerCase() ===
        selectedPriority.toLowerCase();
    const matchesStatus =
      selectedStatus === "All Status" ||
      (j.Status || "").toLowerCase().trim() ===
        selectedStatus.toLowerCase().trim();

    return matchesSearch && matchesProject && matchesPriority && matchesStatus;
  });

  const handleUpdate = (job) => {
    navigate(`/admin/AddJobTracker/${job._id}`, { state: { job } });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const paginatedProjects = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const JobDetails = (job) => {
    navigate(`/admin/OvervieJobsTracker`, { state: { job } });
  };

  return (
    <div
      className="p-4 m-3"
      style={{ backgroundColor: "white", borderRadius: "10px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="job-title mb-0">My Job Tracker</h2>
      </div>

      <div className="filters d-flex flex-wrap gap-2 mb-4">
        <Form.Control
          type="search"
          placeholder="Search by Job #, Project Name, Brand, etc..."
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
            {[...new Set(employeeJobs.map((j) => j.projectId?.[0]?.projectName || "N/A"))].map(
              (projectName, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => setSelectedProject(projectName)}
                >
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
            {["All Priorities", "High", "Medium", "Low"].map((item) => (
              <Dropdown.Item
                key={item}
                onClick={() => setSelectedPriority(item)}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="light" id="status-dropdown">
            {selectedStatus}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[
              "All Status",
              "In Progress",
              "Review",
              "Not Started",
              "Completed",
            ].map((item) => (
              <Dropdown.Item
                key={item}
                onClick={() => setSelectedStatus(item)}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="table-responsive">
        <Table hover className="align-middle sticky-header">
          <thead className="bg-light">
            <tr>
              <th>JobNo</th>
              <th>ProjectName</th>
              <th>ProjectNo</th>
              <th>Brand</th>
              <th>SubBrand</th>
              <th>Flavour</th>
              <th>PackType</th>
              <th>PackSize</th>
              <th>PackCode</th>
              <th>Priority</th>
              <th>Assign</th>
              <th style={{ whiteSpace: "nowrap" }}>Created Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProjects
              .slice()
              .reverse()
              .map((job) => (
                <tr key={job._id}>
                  <td onClick={() => JobDetails(job)}>
                    <Link style={{ textDecoration: "none" }}>{job.JobNo}</Link>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {job.projectId?.[0]?.projectName || "N/A"}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {job.projectId?.[0]?.projectNo || "N/A"}
                  </td>
                  <td>{job.brandName}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{job.subBrand}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{job.flavour}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{job.packType}</td>
                  <td>{job.packSize}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{job?.packCode}</td>
                  <td>
                    <span className={getPriorityClass(job.priority)}>
                      {job.priority}
                    </span>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{job?.assign}</td>
                  <td>
                    {new Date(job.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <span
                      className={`badge ${getStatusClass(
                        job.Status
                      )} px-2 py-1`}
                    >
                      {job.Status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        id="icone_btn"
                        size="sm"
                        onClick={() => handleUpdate(job)}
                      >
                        <FaEdit />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-muted small">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of{" "}
            {filteredJobs.length}
          </div>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
              >
                &laquo;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                &raquo;
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default EmployeeJobTracker;
