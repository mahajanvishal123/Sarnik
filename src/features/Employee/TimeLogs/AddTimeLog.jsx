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
    overtimeTime: '',       // ✅ new: for overtime time input
    taskDescription: '',
  });

  useEffect(() => {
    dispatch(SingleUser());
    dispatch(fetchProject());
    dispatch(fetchjobs());
    dispatch(fetchusers());
    dispatch(fetchMyJobs());
  }, [dispatch]);

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
        overtimeTime: data.overtime || '',  // ✅ set the value if available
      });
    }
  }, [entry, job, empid]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
      overtime: formData.overtimeTime || "00:00",  // ✅ default "00:00" if not provided
      taskDescription: formData.taskDescription,
    };

    dispatch(createTimesheetWorklog(payload))
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Timesheet created successfully!");
        navigate("/employee/TimeTracking");
      })
      .catch((err) => {
        toast.error(err?.message || "Error creating timesheet!");
      });
  };

  const { myjobs } = useSelector((state) => state.MyJobs);
  const MynewJobsdata = myjobs?.assignments?.[0]?.jobId || [];
  const reversedProjectList = Array.isArray(MynewJobsdata) ? MynewJobsdata.flatMap(job => job.projectId).reverse() : [];

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
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedProject = reversedProjectList.find(p => p._id === selectedId);
                        setFormData(prev => ({
                          ...prev,
                          projectId: selectedId,
                          projectName: selectedProject?.projectName || ""
                        }));
                      }}
                    >
                      <option value="">Select a project</option>
                      <option key={job?.projectId?.[0]?._id} value={job?.projectId?.[0]?._id}>
                        {job?.projectId?.[0]?.projectName}
                      </option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Job No.</label>
                    <input
                      className="form-control"
                      value={job?.JobNo || formData.jobName}
                      disabled
                    />
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
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      step="60"
                      required
                    />
                  </div>

                  {/* Overtime checkbox */}
                  <div className="col-md-6 d-flex align-items-center">
                    <label className="form-label me-2 text-danger">Overtime</label>
                    <input
                      type="checkbox"
                      name="overtime"
                      checked={formData.overtime}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Overtime time input — only show if overtime checked */}
                  {formData.overtime && (
                    <div className="col-md-6">
                      <label className="form-label">Overtime Time</label>
                      <input
                        type="time"
                        className="form-control"
                        name="overtimeTime"
                        value={formData.overtimeTime}
                        onChange={handleInputChange}
                        step="60"
                      />
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
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link to="/admin/TimesheetWorklog" className="btn btn-light">Cancel</Link>
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
