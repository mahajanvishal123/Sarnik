import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Barcode from 'react-barcode';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject } from '../../../redux/slices/ProjectsSlice';
import { createjob, Project_job_Id, updatejob } from '../../../redux/slices/JobsSlice';
import CreatableSelect from "react-select/creatable";
import { apiUrl } from '../../../redux/utils/config';

function AddJobTracker() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Project name sho
  const { id: paramId } = useParams();
  const location = useLocation();
  const { job } = location.state || {};
  const projectId = location.state?.id;
  const id = paramId || job?._id;

  const { project, loading, error } = useSelector((state) => state.projects);
  useEffect(() => {
    if (projectId && project?.data?.length) {
      const foundProject = project.data.find(p => p._id === projectId);
      if (foundProject) {
        setFormData(prev => ({
          ...prev,
          projectsId: foundProject._id,
        }));
      }
    }
  }, [projectId, project]);

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  // Form submit f
  const [formData, setFormData] = useState({
    projectsId: '',
    brandName: '',
    subBrand: '',
    flavour: '',
    packType: '',
    packCode: '',
    packSize: '',
    priority: '',
    Status: 'Active',
    totalTime: '',
    assign: 'Not Assing',
    barcode: "",
  });

  // Static options
  // const brandOptions = [
  //   { value: 'Pepsi', label: 'Pepsi' },
  //   { value: 'CocaCola', label: 'CocaCola' },
  //   { value: 'Fanta', label: 'Fanta' },
  // ];

  const flavourOptions = [
    { value: 'Orange', label: 'Orange' },
    { value: 'Lime', label: 'Lime' },
    { value: 'Ginger Ale', label: 'Ginger Ale' },
  ];

  const packSizeOptions = [
    { value: '250ml', label: '250ml' },
    { value: '500ml', label: '500ml' },
    { value: '1L', label: '1L' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (job && project?.data?.length) {
      let projectId = '';
      if (Array.isArray(job.projectId) && job.projectId.length > 0) {
        projectId = job.projectId[0]._id;
      } else if (Array.isArray(job.projectsId) && job.projectsId.length > 0) {
        projectId = typeof job.projectsId[0] === 'object'
          ? job.projectsId[0]._id
          : job.projectsId[0];
      }
      setFormData((prev) => ({
        ...prev,
        ...job,
        projectsId: projectId,
      }));
    }
  }, [job, project?.data]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      projectsId: [formData.projectsId],
    };

    if (job) {
      dispatch(updatejob({ id: job._id, data: payload }))
        .unwrap()
        .then(() => {
          toast.success("Job updated successfully!");
          const selectedProjectId = formData.projectsId;
          // navigate(`/admin/ProjectOverview/${selectedProjectId}`, { state: { openTab: 'jobs' } });
          navigate(-1);
          dispatch(Project_job_Id(selectedProjectId));
        })
        .catch(() => {
          toast.error("Failed to update job!");
        });
    } else {
      dispatch(createjob(payload))
        .unwrap()
        .then(() => {
          toast.success("Job created successfully!");
          const selectedProjectId = formData.projectsId;
          // navigate(`/admin/ProjectOverview/${selectedProjectId}`, { state: { openTab: 'jobs' } });
          navigate(-1);
          dispatch(Project_job_Id(selectedProjectId));
        })
        .catch(() => {
          toast.error("Failed to create job!");
        });
    }
  };

  const handleCancel = () => {
    navigate("/admin/projectList");
  }
  const Cancel = () => {
    navigate(-1);
  }

  // Project name sho
  const selectedProjectName = project?.data?.find(p => p._id === formData.projectsId)?.projectName || "";

  const reversedProjectList = project?.data?.slice().reverse() || [];

  const idToIndexMap = {};
  reversedProjectList.forEach((project, index) => {
    idToIndexMap[project._id] = String(index + 1).padStart(4, '0');
  });

 
  // Keep the options in local state so we can push newly‑created ones
  const [brandOptions, setBrandOptions] = useState([
    { value: "Coca‑Cola", label: "Coca‑Cola" },
    { value: "Pepsi",     label: "Pepsi" },
    // …your initial list
  ]);

  // When the user creates a brand that isn’t in the list yet
  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setBrandOptions((prev) => [...prev, newOption]);
    setFormData((prev) => ({ ...prev, brandName: inputValue }));
  };

  // Add state for select options
  const [selectOptions, setSelectOptions] = useState({
    brandName: [],
    subBrand: [],
    flavour: [],
    packType: [],
    packCode: [],
    priority: [],
    status: [],
  });

  // Fetch select options from API on mount
  useEffect(() => {
    axios.get(`${apiUrl}/jobs/select`)
      .then(res => {
        if (res.data.success && res.data.data) {
          setSelectOptions({
            brandName: (res.data.data.brandName || []).map(v => ({ value: v, label: v })),
            subBrand: (res.data.data.subBrand || []).map(v => ({ value: v, label: v })),
            flavour: (res.data.data.flavour || []).map(v => ({ value: v, label: v })),
            packType: (res.data.data.packType || []).map(v => ({ value: v, label: v })),
            packCode: (res.data.data.packCode || []).map(v => ({ value: v, label: v })),
            priority: (res.data.data.priority || []).map(v => ({ value: v, label: v })),
            status: (res.data.data.status || []).map(v => ({ value: v, label: v })),
          });
        }
      });
  }, []);

  // Generic handler for creating new options
  const handleCreateOption = (field) => (inputValue) => {
    axios.post(`${apiUrl}/jobs/select`, {
      [field]: [...selectOptions[field].map(opt => opt.value), inputValue]
    }).then(() =>{
      setSelectOptions(prev => ({
        ...prev,
        [field]: [...prev[field], { value: inputValue, label: inputValue }]
      }));
      setFormData(prev => ({
        ...prev,
        [field]: inputValue
      }));
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="mb-4">{job?._id ? "Edit Jobs" : "Add Jobs"}</h2>

            <form className="row g-3" onSubmit={handleSubmit}>
              {/* Project Name */}
              {/* <div className="col-md-6">
                <label className="form-label">Project Name</label> */}
              {/* <select
                  name="projectsId"
                  className="form-control"
                  value={formData.projectsId}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a project</option>
                  {project?.data?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select> */}
              {/* <select
                  name="projectsId"
                  className="form-control"
                  value={formData.projectsId}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a project</option>
                  {project?.data?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select> */}
              {/* ok map  */}
              {/* <select
                  name="projectsId"
                  className="form-control"
                  value={formData.projectsId || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a project</option>
                  {project?.data?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select> */}

              {/* <select
                  name="projectsId"
                  className="form-control"
                  value={formData.projectsId || ""}
                  onChange={handleChange}
                >
                  <option value={selectedProjectName}>
                    {selectedProjectName}
                  </option>
                </select> */}
              {/* </div> */}

              {/* <div className="col-md-6">
                <label className="form-label">Project</label>
                <select
                  name="projectsId"
                  className="form-control"
                  value={formData.projectsId || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a project</option>
                  {project?.data?.map((p) => (
                    <option key={p._id} value={p._id}>
                      {idToIndexMap[p._id] || '----'}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="col-md-6">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  className="form-control"
                  value={selectedProjectName || ""}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Project Number</label>
                <input
                  type="text"
                  name="projectNumber"
                  className="form-control"
                  value={idToIndexMap[formData.projectsId] || ""}
                  readOnly
                />
              </div>

              {/* Brand Name */}
              <div className="col-md-6">
                <label className="form-label">Brand Name</label>

                <CreatableSelect
                  options={selectOptions.brandName}
                  value={selectOptions.brandName.find((opt) => opt.value === formData.brandName)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, brandName: option?.value || "" }))
                  }
                  onCreateOption={handleCreateOption('brandName')}
                  isClearable
                  required
                />
              </div>

              {/* Sub Brand */}
              <div className="col-md-6">
                <label className="form-label">Sub Brand</label>
                <CreatableSelect
                  options={selectOptions.subBrand}
                  value={selectOptions.subBrand.find((opt) => opt.value === formData.subBrand)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, subBrand: option?.value || "" }))
                  }
                  onCreateOption={handleCreateOption('subBrand')}
                  isClearable
                  required
                />
              </div>

              {/* Flavour */}
              <div className="col-md-6">
                <label className="form-label">Flavour</label>
                <CreatableSelect
                  options={selectOptions.flavour}
                  value={selectOptions.flavour.find(opt => opt.value === formData.flavour)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, flavour: option?.value || '' }))
                  }
                  onCreateOption={handleCreateOption('flavour')}
                  isClearable
                  required
                />
              </div>

              {/* Pack Type */}
              <div className="col-md-6">
                <label className="form-label">Pack Type</label>
                <CreatableSelect
                  options={selectOptions.packType}
                  value={selectOptions.packType.find(opt => opt.value === formData.packType)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, packType: option?.value || '' }))
                  }
                  onCreateOption={handleCreateOption('packType')}
                  isClearable
                  required
                />
              </div>

              {/* Pack Code */}
              <div className="col-md-6">
                <label className="form-label">Pack Code</label>
                <CreatableSelect
                  options={selectOptions.packCode}
                  value={selectOptions.packCode.find(opt => opt.value === formData.packCode)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, packCode: option?.value || '' }))
                  }
                  onCreateOption={handleCreateOption('packCode')}
                  isClearable
                  required
                />
              </div>

              {/* Pack Size */}
              <div className="col-md-6">
                <label htmlFor="packSize" className="form-label">
                  Pack Size
                </label>

                <input
                  type="text"
                  id="packSize"
                  className="form-control"
                  value={formData.packSize}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, packSize: e.target.value }))
                  }
                  required
                />
              </div>


              {/* Priority */}
              {/* <div className="col-md-6">
                <label className="form-label">Priority</label>
                <CreatableSelect
                  options={selectOptions.priority}
                  value={selectOptions.priority.find(opt => opt.value === formData.priority)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, priority: option?.value || '' }))
                  }
                  onCreateOption={handleCreateOption('priority')}
                  isClearable
                  required
                />
              </div> */}
                  <div className="col-md-6">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required

                >
                  <option value="">Select</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              

              {/* Status */}
              {/* <div className="col-md-6">
                <label className="form-label">Status</label>
                <CreatableSelect
                  options={selectOptions.status}
                  value={selectOptions.status.find(opt => opt.value === formData.Status)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, Status: option?.value || '' }))
                  }
                  onCreateOption={handleCreateOption('status')}
                  isClearable
                  required
                />
              </div> */}
              {/* Status Add */}
                   {/* <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div> */}

              {/* Total Time Logged */}
              {/* <div className="col-md-6">
                <label className="form-label">Total Time Logged</label>
                <input
                  type="time"
                  className="form-control"
                  name="totalTime"
                  value={formData.totalTime}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, totalTime: e.target.value }))
                  }
                />
              </div> */}

              {/* assign */}
              {/* <div className="col-md-6">
                <label className="form-label">assign</label>
                <select
                  className="form-select"
                  name="assign"
                  value={formData.assign}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Production">Production</option>
                  <option value="Designer">Designer</option>
                </select>
              </div> */}

              {/* Barcode */}
              {/* Barcode Input */}
              <div className="col-md-6">
                <label className="form-label">Barcode</label>
                <input
                  type="text"
                  className="form-control"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter barcode"
                />
              </div>

              {/* Barcode Preview */}
              {formData.barcode && (
                <div className="col-md-6 d-flex align-items-center">
                  <Barcode value={formData.barcode} />
                </div>
              )}


              {/* Buttons */}
              <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-outline-secondary" onClick={() => Cancel()}>Cancel</button>
                <button type="submit" className="btn btn-dark">
                  {id || job?._id ? "Save" : "Create Jobs"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddJobTracker;
