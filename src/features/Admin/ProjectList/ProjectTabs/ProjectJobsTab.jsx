// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
// import { Modal, Form, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { deletejob, fetchjobs, Project_job_Id, updatejob, UpdateJobAssign } from '../../../../redux/slices/JobsSlice';
// import Swal from 'sweetalert2';
// import { fetchusers } from '../../../../redux/slices/userSlice';
// import { createAssigns } from '../../../../redux/slices/AssignSlice';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function ProjectJobsTab() {
//   const location = useLocation();
//   const params = useParams();
//   console.log("hello me project id", params);
//   const id = location.state?.id || params.id;

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [selectedProduction, setSelectedProduction] = useState('');
//   const [selectedAdditional, setSelectedAdditional] = useState('');
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [attachedFile, setAttachedFile] = useState(null);
//   const [selectedJobs, setSelectedJobs] = useState({});
//   const [errorMessage, setErrorMessage] = useState('');

//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [selectedDesigner, setSelectedDesigner] = useState('');
//   const [assignmentDescription, setAssignmentDescription] = useState('');

//   const jobs = [
//     {
//       id: "00001",
//       brandName: "Brand1",
//       subBrand: "SubBrand1",
//       flavour: "Flavour1",
//       packType: "Type1",
//       packSize: "Size 1ml",
//       packCode: "Code1",
//       deadline: "2024/01/20",
//       brief: "ViewBrief",
//       status: "Pending Upload",
//       statusVariant: "warning",
//     },
//     {
//       id: "00002",
//       brandName: "Brand2",
//       subBrand: "SubBrand2",
//       flavour: "Flavour2",
//       packType: "Type2",
//       packSize: "Size 2ml",
//       packCode: "Code2",
//       deadline: "2024/01/25",
//       brief: "ViewBrief",
//       status: "In Progress",
//       statusVariant: "info",
//     },
//     {
//       id: "00003",
//       brandName: "Brand3",
//       subBrand: "SubBrand3",
//       flavour: "Flavour3",
//       packType: "Type3",
//       packSize: "Size 3ml",
//       packCode: "Code3",
//       deadline: "2024/02/01",
//       brief: "ViewBrief",
//       status: "DraftSaved",
//       statusVariant: "secondary",
//     },
//   ];

//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const { userAll } = useSelector((state) => state.user);
//   console.log("data user", userAll?.data?.users);

//   useEffect(() => {
//     dispatch(fetchusers());
//   }, [dispatch]);

//   const [currentAssignment, setCurrentAssignment] = useState(1);
//   const itemsAssignment = 10;

//   const filteredAssignment = (userAll?.data?.users || []).filter(
//     (j) =>
//       ((j?.assign || "").toString().toLowerCase() ===
//         selectedDesigner.toLowerCase()) &&
//       selectedDesigner !== ""
//   );

//   const paginatedAssignment = filteredAssignment.slice(
//     (currentAssignment - 1) * itemsAssignment,
//     currentAssignment * itemsAssignment
//   );


//   const handleSubmitAssignment = async () => {
//     const selectedJobIds = Object.keys(selectedJobs).filter(id => selectedJobs[id]);
//     const payload = {
//       employeeId: [selectedEmployee],
//       jobId: selectedJobIds,
//       selectDesigner: selectedDesigner,
//       description: assignmentDescription,
//       Status: "In Progress",
//     };
//     console.log("📦 Assignment Payload:", payload);
//     try {
//       // 1️⃣ Create assignment
//       await dispatch(createAssigns(payload)).unwrap();

//       // 2️⃣ Update job
//       const response = await dispatch(
//         dispatch(Project_job_Id(id))
//       ).unwrap();

//       toast.success(response.message || "Project assigned successfully!");
//       setShowAssignModal(false);
//       setSelectedJobs({});
//       navigate("/admin/MyJobs");
//     } catch (err) {
//       console.error("❌ Full Error Object:", err);

//       const status =
//         err?.status ||
//         err?.originalStatus ||
//         err?.response?.status ||
//         err?.data?.status ||
//         err?.data?.statusCode ||
//         500;

//       const message =
//         err?.message ||
//         err?.data?.message ||
//         err?.response?.data?.message ||
//         "Assignment failed!";

//       console.log("📛 Status Code:", status);
//       console.log("📨 Message:", message);

//       if (status === 409) {
//         console.log("status === 409", status === 409);

//         toast.error("Job already assigned to this employee!", {
//           toastId: "job-already-assigned"
//         });

//         setTimeout(() => {
//           setShowAssignModal(false);
//         }, 300);

//       } else {
//         toast.error(message);
//         setTimeout(() => {
//           setShowAssignModal(false);
//         }, 300);
//       }
//     }
//   };

//   const handleJobAssign = (selectedIds, assignTo) => {
//     const payload = {
//       id: selectedIds,
//       assign: assignTo,
//     };
//     console.log("Assignment Payload:", payload);
//     dispatch(Project_job_Id(id))
//       .then(() => {
//         // Swal.fire("Success!", "Jobs assigned successfully", "success");
//         // dispatch(fetchjobs());
//       })
//       .catch(() => {
//         Swal.fire("Error!", "Something went wrong", "error");
//       });
//   };

//   const employees = [
//     { _id: "123", name: "John Doe" },
//     { _id: "456", name: "Jane Smith" },
//   ];

//   const handleCheckboxChange = (jobId) => {
//     setSelectedJobs((prev) => ({
//       ...prev,
//       [jobId]: !prev[jobId],
//     }));
//   };

//   const handleCSVImport = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("CSV file selected:", file.name);
//     }
//   };

//   const getPriorityClass = (priority) => {
//     switch (priority.toLowerCase()) {
//       case "high":
//         return "text-danger";
//       case "medium":
//         return "text-warning";
//       case "low":
//         return "text-success";
//       default:
//         return "";
//     }
//   };
//   // ////////////////////////////////////////
//   // const location = useLocation();
//   // const params = useParams();
//   // const id = location.state?.id || params.id;
//   useEffect(() => {
//     console.log("Project ID:", id);
//   }, [id]);

//   const { job, loading, error } = useSelector((state) => state.jobs);
//   console.log(job.jobs, "all jobs");

//   const { ProjectJob } = useSelector((state) => state.jobs);
//   console.log(ProjectJob, "all jobs");

//   useEffect(() => {
//     dispatch(Project_job_Id(id));
//   }, [dispatch, id]);

//   const handleDelete = (_id) => {
//     console.log(_id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to mark this job as Cancelled?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, mark as Cancelled!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // dispatch(deletejob({ id: _id, data: { status: "Cancelled" } }))
//         console.log(id);

//         dispatch(updatejob({ id: _id, data: { Status: "Cancelled" } }))
//           .unwrap()
//           .then(() => {
//             Swal.fire("Updated!", "The job has been marked as Cancelled.", "success");
//             dispatch(Project_job_Id(id));
//           })
//           .catch(() => {
//             Swal.fire("Error!", "Something went wrong while updating.", "error");
//           });
//       }
//     });
//   };

//   const handleUpdate = (job) => {
//     console.log(job, "dcvhrvrejhcvwerjhcvhgv")
//     navigate(`/admin/AddJobTracker/${job._id}`, { state: { job } });
//   };

//   const JobDetails = (job) => {
//     navigate(`/admin/OvervieJobsTracker`, { state: { job } });
//   }
//   const getStatusClass = (status) => {
//     switch (status.toLowerCase().trim()) {
//       case "in progress":
//       case "in_progress":
//         return "bg-warning text-dark";
//       case "completed":
//         return "bg-success text-white";
//       case "cancelled":
//       case "waitingapproval":
//         return "bg-info text-dark";
//         return "bg-danger text-white";
//       case "active":
//         return "bg-primary text-white";
//       case "reject":
//         return "bg-danger text-white";
//       case "review":
//         return "bg-info text-dark";
//       case "not started":
//         return "bg-secondary text-white";
//       case "open":
//         return "bg-primary text-white";
//       case "rejected": // ✅ Added for "Rejected"
//         return "bg-danger text-white";
//       default:
//         return "bg-light text-dark";
//     }
//   };


//   // ✅ Copy File Name & Download CSV
//   const handleDownloadFileNamesCSV = () => {
//     const rows = [["JobFileName"]];
//     job?.jobs?.forEach((j, index) => {
//       const jobNo = String(index + 1).padStart(5, '0');
//       const fileName = `${jobNo}_${j.brandName}_${j.subBrand}_${j.flavour}_${j.packType}_${j.packSize}_${j.packCode}`;
//       rows.push([fileName]);
//     });
//     const csvContent = rows.map((r) => r.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "JobFileNames.csv";
//     link.click();
//     URL.revokeObjectURL(url);
//   };


//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const filteredProjects = ProjectJob?.jobs || [];
//   const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const AddJob = () => {
//     navigate(`/admin/AddJobTracker/${id}`, { state: { id } });
//   };

//   return (
//     <div className="card">
//       <div className="card-header d-flex align-content-center justify-content-between mt-3">
//         <h5 className="card-title mb-0">Jobs List</h5>
//         <div className="text-end">
//           <Button
//             id="All_btn"
//             className="m-2"
//             variant="primary"
//             onClick={() => {
//               const selectedJobIds = Object.keys(selectedJobs).filter((id) => selectedJobs[id]);
//               if (selectedJobIds.length === 0) {
//                 setErrorMessage("Please select at least 1 job to assign.");
//                 setTimeout(() => setErrorMessage(""), 3000);
//               } else {
//                 handleJobAssign(selectedJobIds); // ✅ Call with selected IDs
//                 setShowAssignModal(true);
//               }
//             }}
//           >
//             Assign
//           </Button>
//           {/* <Button className="btn btn-secondary m-2" onClick={handleDownloadFileNamesCSV}>
//             📄 Copy File Name
//           </Button> */}

//           {/* <label className="btn btn-success m-2">
//             <i className="bi bi-upload"></i> Import CSV
//             <input
//               type="file"
//               accept=".csv"
//               onChange={handleCSVImport}
//               hidden
//             />
//           </label> */}


//           <button onClick={() => AddJob()} id="All_btn" className="btn btn-primary">
//             <i className="bi bi-plus"></i> Add Job
//           </button>

//         </div>
//       </div>



//       {loading && (
//         <div className="text-center my-5">
//           <Spinner animation="border" variant="primary" />
//           <div className="mt-2">Loading projects...</div>
//         </div>
//       )}
//       <div className="card-body">

//         {errorMessage && (
//           <div className="alert alert-danger py-2" role="alert">
//             {errorMessage}
//           </div>
//         )}

//         <div className="table-responsive">
//           {paginatedProjects.length === 0 ? (
//             <div className="text-danger text-center my-5">
//               No jobs found.
//             </div>
//           ) : (
//             <table className="table table-hover">
//               <thead>
//                 <tr>
//                   <th>
//                     <input
//                       type="checkbox"
//                       onChange={(e) => {
//                         const checked = e.target.checked;
//                         const newSelectedJobs = {};
//                         job?.jobs?.forEach((job) => {
//                           newSelectedJobs[job._id] = checked;
//                         });
//                         setSelectedJobs(newSelectedJobs);
//                       }}
//                       checked={
//                         job?.jobs?.length > 0 &&
//                         job?.jobs?.every((j) => selectedJobs[j._id])
//                       }
//                     />
//                   </th>
//                   <th>JobsNo</th>
//                   <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
//                   <th style={{ whiteSpace: 'nowrap' }}>Project No</th>
//                   <th>Brand</th>
//                   <th>SubBrand</th>
//                   <th>Flavour</th>
//                   <th>PackType</th>
//                   <th>PackSize</th>
//                   <th>PackCode</th>
//                   <th>Priority</th>
//                   <th style={{ whiteSpace: 'nowrap' }}>Due Date</th>
//                   <th>Assignee</th>
//                   <th>TotalTime</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedProjects?.map((job, index) => (
//                   <tr key={job._id}>
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={selectedJobs[job._id] || false}
//                         onChange={() => handleCheckboxChange(job._id)}
//                       />
//                     </td>
//                     <td onClick={() => JobDetails(job)}>
//                       <Link style={{ textDecoration: 'none' }}>{job.JobNo}</Link>
//                     </td>
//                     <td style={{ whiteSpace: 'nowrap' }}>{job.projectId?.[0]?.projectName || 'N/A'}</td>
//                     <td style={{ whiteSpace: 'nowrap' }}>{job.projectId?.[0]?.projectNo || 'N/A'}</td>
//                     <td style={{ whiteSpace: 'nowrap' }}>{job.brandName}</td>
//                     <td style={{ whiteSpace: 'nowrap' }}>{job.subBrand}</td>
//                     <td style={{ whiteSpace: 'nowrap' }}>{job.flavour}</td>
//                     <td style={{ whiteSpace: 'nowrap' }}>{job.packType}</td>
//                     <td style={{ whiteSpace: 'nowrap' }}>{job.packSize}</td>
//                     <td style={{ whiteSpace: 'nowrap' }}>{job?.packCode}</td>
//                     <td>
//                       <span className={getPriorityClass(job.priority)}>
//                         {job.priority}
//                       </span>
//                     </td>
//                     <td>{new Date(job?.createdAt).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
//                     <td style={{ whiteSpace: 'nowrap' }}>{job.assign}</td>

//                     <td>
//                       {new Date(job.updatedAt).toLocaleTimeString('en-US', {
//                         hour: '2-digit',
//                         minute: '2-digit',
//                         hour12: false
//                       })}
//                     </td>

//                     {/* <th>
//                                         <Button id='All_btn' variant="success" style={{ width: "130px" }} size="sm" >
//                                           {job.Status || "Active"}
//                                         </Button></th> */}
//                     <td>
//                       <span
//                         className={`badge ${getStatusClass(job.Status)} px-2 py-1`}
//                       >
//                         {job.Status}
//                       </span>
//                     </td>
//                     <td className="d-flex">
//                       <button className="btn btn-sm btn-outline-primary me-1" onClick={() => JobDetails(job)}>
//                         <i className="bi bi-eye"></i> View
//                       </button>
//                       <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleUpdate(job)}>
//                         <i className="bi bi-pencil"></i> Edit
//                       </button>
//                       {/* <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(job._id)}>
//                         <i className="bi bi-trash"></i> Cancelled
//                       </button> */}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>


//       <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Job</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Select Designer</Form.Label>
//               <Form.Select
//                 value={selectedDesigner}
//                 onChange={(e) => {
//                   setSelectedDesigner(e.target.value);
//                   setSelectedEmployee("");
//                 }}
//               >
//                 <option value="">-- Select --</option>
//                 <option value="Designer">Designer</option>
//                 <option value="Production">Production</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Select Employee</Form.Label>
//               <Form.Select
//                 value={selectedEmployee}
//                 onChange={(e) => setSelectedEmployee(e.target.value)}
//                 disabled={!selectedDesigner}
//               >
//                 <option value="">-- Select Employee --</option>
//                 {paginatedAssignment
//                   .filter((emp) => emp.role === 'employee')
//                   .map((emp) => (
//                     <option key={emp._id} value={emp._id}>
//                       {emp.firstName || "Unnamed Employee"} {emp.lastName || "Unnamed Employee"}
//                     </option>
//                   ))}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={assignmentDescription}
//                 onChange={(e) => setAssignmentDescription(e.target.value)}
//                 placeholder="Enter assignment details or instructions..."
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSubmitAssignment}>
//             Assign
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {!loading && !error && (
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div className="text-muted small">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {(currentPage - 1) * itemsPerPage + paginatedProjects.length} of {filteredProjects.length}
//           </div>
//           <ul className="pagination pagination-sm mb-0">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
//                 <span aria-hidden="true">&laquo;</span>

//               </button>
//             </li>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                 <button type="button" className="page-link" onClick={() => setCurrentPage(i + 1)}>
//                   {i + 1}
//                 </button>
//               </li>
//             ))}
//             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>

//                 <span aria-hidden="true">&raquo;</span>
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProjectJobsTab;

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deletejob, fetchjobs, Project_job_Id, updatejob, UpdateJobAssign } from '../../../../redux/slices/JobsSlice';
import Swal from 'sweetalert2';
import { fetchusers } from '../../../../redux/slices/userSlice';
import { createAssigns } from '../../../../redux/slices/AssignSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from '../../../../redux/utils/config';

function ProjectJobsTab() {
  const location = useLocation();
  const params = useParams();
  const id = location.state?.id || params.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedJobs, setSelectedJobs] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState('');

  const { userAll } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchusers());
  }, [dispatch]);

  // ✅ Worklog API state
  const [worklogData, setWorklogData] = useState([]);

  useEffect(() => {
    const fetchWorklogs = async () => {
      try {
        const res = await fetch(`${apiUrl}/jobs/worklog-project/${id}`);
        const data = await res.json();
        console.log("📊 Worklog API Response:", data);

        if (data.success) {
          setWorklogData(data.employees || []);
        }
      } catch (err) {
        console.error("❌ Error fetching worklogs:", err);
      }
    };

    if (id) fetchWorklogs();
  }, [id]);

  const getEmployeeTotalTime = (assignee) => {
    const emp = worklogData.find(
      (e) =>
        e.employee?._id === assignee ||
        e.employee?.email === assignee ||
        `${e.employee?.firstName} ${e.employee?.lastName}` === assignee
    );
    return emp ? emp.totalTimeSpent : "00:00";
  };

  const handleSubmitAssignment = async () => {
    const selectedJobIds = Object.keys(selectedJobs).filter(id => selectedJobs[id]);
    const payload = {
      employeeId: [selectedEmployee],
      jobId: selectedJobIds,
      selectDesigner: selectedDesigner,
      description: assignmentDescription,
      Status: "In Progress",
    };
    try {
      await dispatch(createAssigns(payload)).unwrap();
      const response = await dispatch(Project_job_Id(id)).unwrap();

      toast.success(response.message || "Project assigned successfully!");
      setShowAssignModal(false);
      setSelectedJobs({});
      setAssignmentDescription('');
      setSelectedDesigner('');
      setSelectedEmployee('');
      
      // navigate("/admin/MyJobs");
    } catch (err) {
      const status = err?.status || err?.data?.statusCode || 500;
      const message = err?.message || err?.data?.message || "Assignment failed!";

      if (status === 409) {
        toast.error("Job already assigned to this employee!", { toastId: "job-already-assigned" });
        setTimeout(() => setShowAssignModal(false), 300);
      } else {
        toast.error(message);
        setTimeout(() => setShowAssignModal(false), 300);
      }
    }
  };

  const handleJobAssign = (selectedIds, assignTo) => {
    const payload = { id: selectedIds, assign: assignTo };
    console.log("Assignment Payload:", payload);
    dispatch(Project_job_Id(id))
      .catch(() => Swal.fire("Error!", "Something went wrong", "error"));
  };

  const handleCheckboxChange = (jobId) => {
    setSelectedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  useEffect(() => {
    dispatch(Project_job_Id(id));
  }, [dispatch, id]);

  const { job, loading, error } = useSelector((state) => state.jobs);
  const { ProjectJob } = useSelector((state) => state.jobs);

  const handleUpdate = (job) => {
    navigate(`/admin/AddJobTracker/${job._id}`, { state: { job } });
  };

  const JobDetails = (job) => {
    navigate(`/admin/OvervieJobsTracker`, { state: { job } });
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high": return "text-danger";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "";
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase().trim()) {
      case "in progress":
      case "in_progress": return "bg-warning text-dark";
      case "completed": return "bg-success text-white";
      case "cancelled": return "bg-info text-dark";
      case "reject":
      case "rejected": return "bg-danger text-white";
      case "review": return "bg-info text-dark";
      case "not started": return "bg-secondary text-white";
      case "open": return "bg-primary text-white";
      case "active": return "bg-primary text-white";
      default: return "bg-light text-dark";
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredProjects = ProjectJob?.jobs || [];
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const AddJob = () => {
    navigate(`/admin/AddJobTracker/${id}`, { state: { id } });
  };

  return (
    <div className="card">
      <div className="card-header d-flex align-content-center justify-content-between mt-3">
        <h5 className="card-title mb-0">Jobs List</h5>
        <div className="text-end">
          <Button
            id="All_btn"
            className="m-2"
            variant="primary"
            onClick={() => {
              const selectedJobIds = Object.keys(selectedJobs).filter((id) => selectedJobs[id]);
              if (selectedJobIds.length === 0) {
                setErrorMessage("Please select at least 1 job to assign.");
                setTimeout(() => setErrorMessage(""), 3000);
              } else {
                handleJobAssign(selectedJobIds);
                setShowAssignModal(true);
              }
            }}
          >
            Assign
          </Button>

          <button onClick={() => AddJob()} id="All_btn" className="btn btn-primary">
            <i className="bi bi-plus"></i> Add Job
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <div className="mt-2">Loading projects...</div>
        </div>
      )}

      <div className="card-body">
        {errorMessage && (
          <div className="alert alert-danger py-2" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="table-responsive">
          {paginatedProjects.length === 0 ? (
            <div className="text-danger text-center my-5">No jobs found.</div>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>JobsNo</th>
                  <th>Project Name</th>
                  <th>Project No</th>
                  <th>Brand</th>
                  <th>SubBrand</th>
                  <th>Flavour</th>
                  <th>PackType</th>
                  <th>PackSize</th>
                  <th>PackCode</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Assignee</th>
                  <th>TotalTime</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProjects?.map((job) => (
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
                    <td>{job.projectId?.[0]?.projectName || 'N/A'}</td>
                    <td>{job.projectId?.[0]?.projectNo || 'N/A'}</td>
                    <td>{job.brandName}</td>
                    <td>{job.subBrand}</td>
                    <td>{job.flavour}</td>
                    <td>{job.packType}</td>
                    <td>{job.packSize}</td>
                    <td>{job.packCode}</td>
                    <td><span className={getPriorityClass(job.priority)}>{job.priority}</span></td>
                    <td>{new Date(job?.createdAt).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                    {/* <td>{job.assign}</td> */}
                    <td>{job.assign ? job.assignedTo : "Not Assigned"}</td>
                    <td>{getEmployeeTotalTime(job.assign)}</td>
                    <td><span className={`badge ${getStatusClass(job.Status)} px-2 py-1`}>{job.Status}</span></td>
                    <td className="d-flex">
                      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => JobDetails(job)}>
                        <i className="bi bi-eye"></i> View
                      </button>
                      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleUpdate(job)}>
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Designer</Form.Label>
              <Form.Select
                value={selectedDesigner}
                onChange={(e) => { setSelectedDesigner(e.target.value); setSelectedEmployee(""); }}
              >
                <option value="">-- Select --</option>
                <option value="Designer">Designer</option>
                <option value="production">Production</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Employee</Form.Label>
              <Form.Select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                disabled={!selectedDesigner}
              >
                <option value="">-- Select Employee --</option>
                {(userAll?.data?.users || [])
                  // .filter((emp) => emp.role === 'employee' && emp.assign === selectedDesigner)
                  .filter((emp) => {
                    if (selectedDesigner == "production") {
                      return (
                        emp.role == "production"
                      )
                    } else {
                      return (
                        emp.role === 'employee' && emp.assign === selectedDesigner
                      )
                    }
                  })
                  .map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={assignmentDescription}
                onChange={(e) => setAssignmentDescription(e.target.value)}
                placeholder="Enter assignment details or instructions..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmitAssignment}>Assign</Button>
        </Modal.Footer>
      </Modal>

      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-muted small">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {(currentPage - 1) * itemsPerPage + paginatedProjects.length} of {filteredProjects.length}
          </div>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button type="button" className="page-link" onClick={() => setCurrentPage(i + 1)}>
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

export default ProjectJobsTab;
