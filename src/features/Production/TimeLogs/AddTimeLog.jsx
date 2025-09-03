import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchProject } from '../../../redux/slices/ProjectsSlice';
import { fetchjobs } from '../../../redux/slices/JobsSlice';
import { createTimesheetWorklog, updateTimesheetWorklog } from '../../../redux/slices/TimesheetWorklogSlice';
import { toast } from "react-toastify";
import { fetchusers, SingleUser } from '../../../redux/slices/userSlice';
import { fetchMyJobs } from '../../../redux/slices/Employee/MyJobsSlice';
import "react-toastify/dist/ReactToastify.css";

function AddTimeLog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id, openTab, entry, job } = location.state || {};
  const { UserSingle } = useSelector((state) => state.user);
  const empid = UserSingle?._id;
  const { myjobs } = useSelector((state) => state.MyJobs);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    projectId: '',
    jobId: '',
    employeeId: empid,
    time: '',
    date: getTodayDate(),
    overtime: false,
    overtimeTime: '',
    taskDescription: '',
  });

  // Extract all projects and jobs from myjobs data
  const [projects, setProjects] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    dispatch(SingleUser());
    dispatch(fetchProject());
    dispatch(fetchjobs());
    dispatch(fetchusers());
    dispatch(fetchMyJobs());
  }, [dispatch]);

  // Process myjobs data to extract projects and jobs
  useEffect(() => {
    if (myjobs && myjobs.assignments) {
      const allProjects = [];
      const allJobs = [];

      myjobs.assignments.forEach(assignment => {
        if (assignment.jobs && assignment.jobs.length > 0) {
          assignment.jobs.forEach(job => {
            if (job.jobId && job.jobId.projectId && job.jobId.projectId.length > 0) {
              // Add project to projects list if not already present
              const project = job.jobId.projectId[0];
              if (!allProjects.some(p => p._id === project._id)) {
                allProjects.push(project);
              }

              // Add job to jobs list
              allJobs.push({
                _id: job.jobId._id,
                JobNo: job.jobId.JobNo,
                projectId: project._id,
                projectName: project.projectName,
                Status: job.jobId.Status
              });
            }
          });
        }
      });

      setProjects(allProjects);
      setJobs(allJobs);
    }
  }, [myjobs]);

  useEffect(() => {
    if (entry || job) {
      const data = entry || job;
      const parsedDate = data.date ? new Date(data.date).toISOString().split('T')[0] : getTodayDate();
      setFormData({
        date: parsedDate,
        projectId: Array.isArray(data.projectId) ? data.projectId[0]._id : data.projectId?._id || '',
        jobId: Array.isArray(data.jobId) ? data.jobId[0]._id : data._id || '',
        employeeId: Array.isArray(data.employeeId) ? data.employeeId[0]._id : empid,
        time: data.time || '',
        taskDescription: data.taskDescription || '',
        overtime: data.overtime ? true : false,
        overtimeTime: data.overtime || '',
      });
    }
  }, [entry, job, empid]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'projectId') {
      // When project changes, find the first job for that project
      const projectJobs = jobs.filter(j => j.projectId === value);
      const firstJobId = projectJobs.length > 0 ? projectJobs[0]._id : '';

      setFormData(prev => ({
        ...prev,
        projectId: value,
        jobId: firstJobId
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  // Handle time input formatting
  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers and colon
    if (!/^[0-9:]*$/.test(value)) return;

    // Format as HH:MM
    let formattedValue = value
      .replace(/\D/g, '') // Remove non-digits
      .replace(/^(\d{0,2})(\d{0,2})/, '$1:$2') // Add colon
      .replace(/(\d{2}):(\d{2}).*/, '$1:$2'); // Limit to HH:MM

    // Validate hours and minutes
    const [hours, minutes] = formattedValue.split(':');
    if (hours && parseInt(hours) > 23) {
      formattedValue = `23:${minutes || '00'}`;
    }
    if (minutes && parseInt(minutes) > 59) {
      formattedValue = `${hours || '00'}:59`;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      projectId: [formData.projectId],
      jobId: [formData.jobId],
      employeeId: [formData.employeeId],
      time: formData.time,
      date: formData.date,
      overtime: formData.overtimeTime || "00:00",
      taskDescription: formData.taskDescription,
    };
    dispatch(createTimesheetWorklog(payload))
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Timesheet created successfully!");
        navigate("/production/TimeTracking");
      })
      .catch((err) => {
        toast.error(err?.message || "Error creating timesheet!");
      });
  };

  // Get jobs for the selected project
  const filteredJobs = jobs.filter(job => job.projectId === formData.projectId);
  // Get the selected job object
  const selectedJob = jobs.find(job => job._id === formData.jobId);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="card-title mb-4">Timesheet & Worklog</h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Project</label>
                    <select
                      className="form-select"
                      name="projectId"
                      value={formData.projectId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a project</option>
                      {projects.map(project => (
                        <option key={project._id} value={project._id}>
                          {project.projectName} ({project.projectNo})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Job No.</label>
                    <select
                      className="form-select"
                      name="jobId"
                      value={formData.jobId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a job</option>
                      {filteredJobs.map(job => (
                        <option key={job._id} value={job._id}>
                          {job.JobNo} - {job.Status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time Worked (HH:MM)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="time"
                      value={formData.time}
                      onChange={handleTimeChange}
                      placeholder="HH:MM"
                      pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                      required
                    />
                    <small className="text-muted">Enter total time worked (e.g., 2:30 for 2 hours 30 minutes)</small>
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <label className="form-label me-2 text-danger">Overtime</label>
                    <input
                      type="checkbox"
                      name="overtime"
                      checked={formData.overtime}
                      onChange={handleInputChange}
                    />
                  </div>
                  {formData.overtime && (
                    <div className="col-md-6">
                      <label className="form-label">Overtime Time (HH:MM)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="overtimeTime"
                        value={formData.overtimeTime}
                        onChange={handleTimeChange}
                        placeholder="HH:MM"
                        pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                      />
                      <small className="text-muted">Enter overtime hours (e.g., 1:15 for 1 hour 15 minutes)</small>
                    </div>
                  )}
                  <div className="col-12">
                    <label className="form-label">Note</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="taskDescription"
                      value={formData.taskDescription}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <div className="btn btn-light" onClick={() => navigate(-1)}>Cancel</div>
                  <button type="submit" className="btn btn-dark">
                    {id ? "Update Time Entry" : "Submit Time Entry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTimeLog;