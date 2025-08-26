import React, { useEffect, useState } from 'react';
import { LuDownload, LuEye, LuRotateCcw } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Complete_WaitingApproval, EmployeeCompletedStatus, filterStatus } from '../../../redux/slices/JobsSlice';
import { Button, Form, Table, ProgressBar, Pagination, Modal, Dropdown, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaComments, FaDownload, FaEye } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function WaitingApproval() {
    const [selectedJobs, setSelectedJobs] = useState({});
    const [error, setError] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const id = location.state?.id || params.id;

    const [Status, setStatus] = useState("WaitingApproval");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState("All Projects");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { job, loading } = useSelector((state) => state.jobs);
    console.log("Job data hai ", job.jobs);

    useEffect(() => {
        // dispatch(filterStatus(Status));
        dispatch(Complete_WaitingApproval())
    }, [dispatch, Status]);

    const isAnySelected = Object.values(selectedJobs).some(Boolean);

    const handleCheckboxChange = (jobId) => {
        setSelectedJobs((prev) => ({
            ...prev,
            [jobId]: !prev[jobId],
        }));
        setError('');
    };

    const handleReturnClick = () => {
        if (isAnySelected) {
            navigate("/admin/jobsView");
        } else {
            setError("Please select at least one job before proceeding.");
        }
    };

    const getPriorityClass = (priority) => {
        switch ((priority || "").toLowerCase()) {
            case "high": return "text-danger";
            case "medium": return "text-warning";
            case "low": return "text-success";
            default: return "";
        }
    };

    const getStatusClass = (status) => {
        switch ((status || "").toLowerCase().trim()) {
            case "in progress":
            case "in_progress":
                return "bg-warning text-dark";
            case "waitingapproval":
            case "review":
                return "bg-info text-dark";
            case "not started":
                return "bg-secondary text-white";
            case "completed":
                return "bg-success text-white";
            case "open":
                return "bg-primary text-white";
            case "cancelled":
                return "bg-dark text-white";
            case "reject":
            case "rejected": // ✅ Added for "Rejected"
                return "bg-danger text-white";
            default:
                return "bg-light text-dark";
        }
    };

    const handleUpdate = (job) => {
        navigate(`/admin/AddJobTracker`, { state: { job } });
    };

    const JobDetails = (job) => {
        navigate(`/admin/OvervieJobsTracker`, { state: { job } });
    };

    const handleDesignerClick = (job) => { };

    const filteredProjects = (job?.jobs || []).filter((j) => {
        const terms = searchQuery.trim().split(/\s+/).filter(Boolean);
        if (terms.length === 0) {
            const matchesProject = selectedProject === "All Projects" || (j.projectId?.[0]?.projectName?.toLowerCase() === selectedProject.toLowerCase());
            return matchesProject;
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
            j.priority,
            j.createdAt ? new Date(j.createdAt).toLocaleDateString("en-GB") : '',
            j.assignedTo,
            j.updatedAt ? new Date(j.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '',
            j.Status
        ].map(f => (f || '').toString().toLowerCase());
        const matchesSearch = terms.every(term => fields.some(field => field.includes(term.toLowerCase())));
        const matchesProject = selectedProject === "All Projects" || (j.projectId?.[0]?.projectName?.toLowerCase() === selectedProject.toLowerCase());
        return matchesSearch && matchesProject;
    });

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleApproveJob = (jobId) => {
        const selectedJob = (job?.jobs || []).find((job) => job._id === jobId);
        if (!selectedJob) return;

        Swal.fire({
            title: "Approve Job",
            text: "Are you sure you want to approve this job?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, mark completed!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(EmployeeCompletedStatus({ id: jobId, data: { Status: "Completed" } }));
                dispatch(filterStatus(Status));
                Swal.fire("Marked!", "Job has been marked as completed.", "success");
                console.log("Marking job as completed:", jobId);
            }
        });
    };

    const handleRejectJob = (jobId) => {
        const selectedJob = (job?.jobs || []).find((job) => job._id === jobId);
        if (!selectedJob) return;

        Swal.fire({
            title: "Reject Job",
            text: "Are you sure you want to reject this job?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Reject!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(EmployeeCompletedStatus({ id: jobId, data: { Status: "Retun" } }));
                dispatch(filterStatus(Status));
                Swal.fire("Retun!", "Job has been Retun.", "success");
                console.log("Retun job:", jobId);
            }
        });
    };

    return (
        <div className="container-fluid mt-2">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                <div className="d-flex gap-2 mt-2 mt-md-0"></div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    {/* <h2 className="job-title mb-0">Waiting for Approval</h2> */}
                    <h2 className="job-title mb-0">Completed</h2>
                </div>

                <div className="d-md-none mb-3">
                    <button className="btn btn-outline-secondary w-100" onClick={() => setShowFilters(!showFilters)}>
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    {/* 🔍 Search Input */}
                    <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
                        <Form.Control
                            type="search"
                            placeholder="Search jobs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: "250px" }}
                        />
                    </div>
                    {/* <div className="d-flex gap-2 mb-2">
                        <Button
                            variant={Status === "WaitingApproval" ? "primary" : "outline-primary"}
                            size="sm"
                            onClick={() => setStatus("WaitingApproval")}
                        >
                            Waiting Approval
                        </Button>

                        <Button
                            variant={Status === "Rejected" ? "danger" : "outline-danger"}
                            size="sm"
                            onClick={() => setStatus("Rejected")}
                        >
                            Rejected
                        </Button>
                    </div> */}
                </div>

                {/* 📋 Table */}
                <div className="table-responsive">
                    <Table hover className="align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>JobNo</th>
                                <th>ProjectName</th>
                                <th>Brand</th>
                                <th>SubBrand</th>
                                <th>Flavour</th>
                                <th>PackType</th>
                                <th>PackSize</th>
                                <th>PackCode</th>
                                <th>Priority</th>
                                <th style={{ whiteSpace: "nowrap" }}>Date Completed</th>
                                <th>Assign</th>
                                <th>TimeLogged</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProjects.some(job => {
                                const status = job.Status?.toLowerCase();
                                return status === "waitingapproval" || status === "completed";
                            }) ? (
                                paginatedProjects
                                    .slice()
                                    .reverse()
                                    .filter(job => {
                                        const status = job.Status?.toLowerCase();
                                        return status === "waitingapproval" || status === "completed";
                                    })
                                    .map((job, index) => (
                                        <tr key={job._id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedJobs[job._id] || false}
                                                    onChange={() => handleCheckboxChange(job._id)}
                                                />
                                            </td>
                                            <td onClick={() => JobDetails(job)}>
                                                <Link style={{ textDecoration: 'none' }}>{job.JobNo}</Link>
                                            </td>
                                            <td style={{ whiteSpace: "nowrap" }}>{job.projectId?.[0]?.projectName || 'N/A'}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{job.brandName}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{job.subBrand}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{job.flavour}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{job.packType}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{job.packSize}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{job.packCode}</td>
                                            <td style={{ whiteSpace: "nowrap" }}><span className={getPriorityClass(job.priority)}>{job.priority}</span></td>
                                            <td style={{ whiteSpace: "nowrap" }}>{new Date(job.createdAt).toLocaleDateString("en-GB")}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{job.assign}</td>
                                            <td>{new Date(job.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>
                                                <span className={`badge ${getStatusClass(job.Status)} px-2 py-1`}>
                                                    {job.Status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        onClick={() => handleApproveJob(job._id)}
                                                        className="btn btn-primary btn-sm fw-semibold px-3 py-1 text-white"
                                                        disabled={job.Status?.toLowerCase() !== "waitingapproval"}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectJob(job._id)}
                                                        className="btn btn-outline-danger btn-sm fw-semibold px-3 py-1"
                                                        disabled={job.Status?.toLowerCase() !== "waitingapproval"}
                                                    >
                                                        Retun
                                                    </button>
                                                </div>

                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan="17" className="text-center text-muted py-4">
                                        No jobs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Pagination */}
                {!loading && !error && (
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                        <div className="text-muted small">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {(currentPage - 1) * itemsPerPage + paginatedProjects.length} of {filteredProjects.length}
                        </div>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                                    &laquo;
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                                    &raquo;
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WaitingApproval;