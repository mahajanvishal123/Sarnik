import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { createProject, updateProject, fetchProjectById } from '../../../redux/slices/ProjectsSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchClient } from '../../../redux/slices/ClientSlice';


function AddProjectList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: paramId } = useParams();
  const location = useLocation();
  const { project } = location.state || {};
  const id = paramId || project?._id;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    projectName: '',
    clientId: '',
    managerId: '',
    startDate: '',
    endDate: '',
    projectPriority: '',
    description: '',
    status: '',
    projectRequirements: {
      creativeDesign: false,
      artworkAdaptation: false,
      prepress: false,
      POS: false,
      mockups: false,
      rendering: false,
    },
    budgetAmount: '',
    currency: '',
    totalTime: ''
  });

  // ✅ Populate form in edit mode
  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        clientId: project.clientId?._id || '', // 🔧 Fix here
        projectRequirements: project.projectRequirements?.[0] || {}
      });
    } else if (paramId) {
      dispatch(fetchProjectById(paramId)).then((res) => {
        const fetchedProject = res.payload;
        if (fetchedProject) {
          setFormData({
            ...fetchedProject,
            clientId: fetchedProject.clientId?._id || '', // 🔧 Fix here
            projectRequirements: fetchedProject.projectRequirements?.[0] || {}
          });
        }
      });
    }
  }, [paramId, dispatch, project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      projectRequirements: {
        ...prev.projectRequirements,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      projectRequirements: [formData.projectRequirements]
    };
    if (id) {
      dispatch(updateProject({ id, payload }))
        .unwrap()
        .then(() => {
          toast.success("Project updated successfully!");
          navigate("/production/projectList");
        })
        .catch(() => {
          toast.error("Failed to update project!");
        });
    } else {
      dispatch(createProject(payload))
        .unwrap()
        .then(() => {
          toast.success("Project created successfully!");
          navigate("/production/projectList");
        })
        .catch(() => {
          toast.error("Error creating project");
        });
    }
  };

  const handleCancel = () => {
    navigate("/production/projectList");
  };

  const { Clients } = useSelector((state) => state.client);
  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);

  return (
    <Container className="py-4">
      <div className="form-container p-4 rounded shadow-sm" style={{ backgroundColor: "white", margin: "0 auto" }}>
        <h2 className="mb-4 text-center">{id ? "Edit Project" : "New Project"}</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted mb-1 fw-bold">Project Name</Form.Label>
                <Form.Control
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Form.Label className="text-muted mb-1 fw-bold">Client Name</Form.Label>
                  <Link to={"/production/AddClientManagement"}>
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1">
                      + Create
                    </button>
                  </Link>
                </div>
                <Form.Select
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Client</option>
                  {Clients?.data?.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.clientName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted mb-1 fw-bold">Expected Completion Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate?.slice(0, 10)}
                  onChange={handleInputChange}
                  required
                  min={today} // Disable previous dates
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted mb-1 fw-bold">Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate?.slice(0, 10)}
                  onChange={handleInputChange}
                  required
                  min={today} // Disable previous dates
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted mb-1 fw-bold">Project Priority</Form.Label>
                <Form.Select
                  name="projectPriority"
                  value={formData.projectPriority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted mb-1 fw-bold">Project Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Active Project">Active Project</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Closed">Closed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="On Hold">On Hold</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-4">
            <Form.Label className="text-muted mb-1 fw-bold">Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ resize: 'none' }}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="text-muted mb-3 fw-bold">Project Requirements</Form.Label>
            <div className="d-flex flex-wrap">
              {['creativeDesign', 'artworkAdaptation', 'prepress', 'POS', 'mockups', 'rendering'].map((key) => (
                <div key={key} className="col-6 col-md-4 mb-2">
                  <Form.Check
                    type="checkbox"
                    label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    name={key}
                    checked={formData.projectRequirements[key]}
                    onChange={handleCheckboxChange}
                    className="d-flex align-items-center"
                  />
                </div>
              ))}
            </div>
          </Form.Group>
          <Form.Label className="text-muted mb-3 fw-bold">Budget Information</Form.Label>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Budget Amount"
                  name="budgetAmount"
                  value={formData.budgetAmount}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                >
                  <option value="">Select Currency</option>
                  <option value="AED">AED</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                  <option value="SAR">SAR</option>
                  <option value="USD">USD</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" className="px-4" onClick={handleCancel}>Cancel</Button>
            <Button id='All_btn' type="submit" className="px-4">
              {id ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default AddProjectList;