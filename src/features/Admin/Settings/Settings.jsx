import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Tab,
  Card,
  Badge,
  Alert,
  Tabs,
  Table
} from "react-bootstrap";

const TAX_CATEGORIES = [
  { label: "Standard Rate", rate: 18 },
  { label: "Reduced Rate", rate: 5 },
  { label: "Zero Rate", rate: 0 },
];

const COMPANY_INFO = {
  name: "Saaranik Pvt Ltd",
  address: "123 Main Street, Mumbai, India",
  industry: "Design & Construction",
  trn: "100000000000002",
  email: "info@saaranik.com",
  phone: "+91-9876543210",
};

const SettingsPage = () => {
  // General
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  // Company
  const [company, setCompany] = useState(COMPANY_INFO);
  // Notifications
  const [notifProject, setNotifProject] = useState(true);
  const [notifTask, setNotifTask] = useState(true);
  const [notifDue, setNotifDue] = useState(true);
  const [notifDesktop, setNotifDesktop] = useState(true);
  const [notifMobile, setNotifMobile] = useState(true);

  // Feedback states
  const [generalSaved, setGeneralSaved] = useState(false);
  const [notifSaved, setNotifSaved] = useState(false);
  const [companySaved, setCompanySaved] = useState(false);

  const handleCompanyChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  return (
    <Container fluid className="p-4" >
      <h4 className="mb-4 fw-bold">Settings</h4>
      <Tab.Container defaultActiveKey="notifications" >
        <Nav variant="tabs" className="mb-3">
          {/* <Nav.Item>
            <Nav.Link eventKey="general">General Preferences</Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link eventKey="notifications">Notifications</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="company">Company Info</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          {/* General Preferences */}
          {/* <Tab.Pane eventKey="general">
            <Form
              onSubmit={e => {
                e.preventDefault();
                setGeneralSaved(true);
                setTimeout(() => setGeneralSaved(false), 2000);
              }}
            >
              <Row className="mb-4">
                <Col md={6}>
                  <h5>Interface Settings</h5>
                  <Form.Check
                    type="switch"
                    label="Compact View"
                    checked={compactView}
                    onChange={() => setCompactView(!compactView)}
                  />
                </Col>
                <Col md={6}>
                  <h5>Language & Region</h5>
                  <Form.Group className="mb-2">
                    <Form.Label>Language</Form.Label>
                    <Form.Select>
                      <option>English (US)</option>
                      <option>Hindi (IN)</option>
                      <option>Marathi (IN)</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Time Zone</Form.Label>
                    <Form.Select>
                      <option>Asia/Kolkata (IST)</option>
                      <option>UTC</option>
                      <option>Asia/Dubai (GST)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}>
                  <h5>Default Settings</h5>
                  <Form.Group className="mb-2">
                    <Form.Label>Default Project View</Form.Label>
                    <Form.Select>
                      <option>List View</option>
                      <option>Board View</option>
                      <option>Calendar View</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Default Dashboard</Form.Label>
                    <Form.Select>
                      <option>Project Overview</option>
                      <option>Job Tracker</option>
                      <option>Cost Estimates</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <h5>Session Settings</h5>
                  <Form.Check
                    type="switch"
                    label="Auto-save Changes"
                    checked={autoSave}
                    onChange={() => setAutoSave(!autoSave)}
                  />
                  <Form.Group className="mt-2">
                    <Form.Label>Session Timeout</Form.Label>
                    <Form.Select>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex gap-2">
                <Button variant="dark" type="submit">Save Changes</Button>
                <Button variant="secondary" type="reset">Reset to Default</Button>
              </div>
              {generalSaved && <Alert variant="success" className="mt-3">General settings saved!</Alert>}
            </Form>
          </Tab.Pane> */}

          {/* Notifications */}
          <Tab.Pane eventKey="notifications">
            <Form
              onSubmit={e => {
                e.preventDefault();
                setNotifSaved(true);
                setTimeout(() => setNotifSaved(false), 2000);
              }}
            >
              <Row className="mb-4">
                <Col md={6}>
                  <h5>Notification Types</h5>
                  <Form.Check
                    type="switch"
                    label={<><div className="fw-semibold">Project Updates</div><div className="text-muted small">Receive updates about project status changes and milestones</div></>}
                    className="mb-3"
                    checked={notifProject}
                    onChange={() => setNotifProject(!notifProject)}
                  />
                  <Form.Check
                    type="switch"
                    label={<><div className="fw-semibold">Task Assignments</div><div className="text-muted small">Get notified when you are assigned to new tasks</div></>}
                    className="mb-3"
                    checked={notifTask}
                    onChange={() => setNotifTask(!notifTask)}
                  />
                  <Form.Check
                    type="switch"
                    label={<><div className="fw-semibold">Due Date Reminders</div><div className="text-muted small">Receive reminders before task due dates</div></>}
                    className="mb-3"
                    checked={notifDue}
                    onChange={() => setNotifDue(!notifDue)}
                  />
                </Col>
                <Col md={6}>
                  <h5>Notification Preferences</h5>
                  <Form.Check
                    type="switch"
                    label={<><div className="fw-semibold">Desktop Notifications</div><div className="text-muted small">Show notifications on your desktop</div></>}
                    className="mb-3"
                    checked={notifDesktop}
                    onChange={() => setNotifDesktop(!notifDesktop)}
                  />
                  <Form.Check
                    type="switch"
                    label={<><div className="fw-semibold">Mobile Push Notifications</div><div className="text-muted small">Receive notifications on your mobile device</div></>}
                    checked={notifMobile}
                    onChange={() => setNotifMobile(!notifMobile)}
                  />
                </Col>
              </Row>
              <div className="d-flex gap-2">
                <Button variant="dark" type="submit">Save Changes</Button>
                <Button variant="secondary" type="reset">Reset to Default</Button>
              </div>
              {notifSaved && <Alert variant="success" className="mt-3">Notification settings saved!</Alert>}
            </Form>
          </Tab.Pane>

          {/* Company Info (with Tax Category) */}
          <Tab.Pane eventKey="company">
            <Form
              onSubmit={e => {
                e.preventDefault();
                setCompanySaved(true);
                setTimeout(() => setCompanySaved(false), 2000);
              }}
            >
              <Row className="justify-content-center">
                <Col md={7}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h5 className="mb-3 fw-bold">Company Information</h5>
                      <Form.Group className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control name="name" value={company.name} onChange={handleCompanyChange} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address" value={company.address} onChange={handleCompanyChange} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Industry</Form.Label>
                        <Form.Control name="industry" value={company.industry} onChange={handleCompanyChange} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>TRN</Form.Label>
                        <Form.Control name="trn" value={company.trn} onChange={handleCompanyChange} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={company.email} onChange={handleCompanyChange} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control name="phone" value={company.phone} onChange={handleCompanyChange} />
                      </Form.Group>
                      <hr className="my-4" />
                      <h5 className="mb-3 fw-bold">Tax Categories</h5>
                      <div className="mb-3">
                        {TAX_CATEGORIES.map((cat, idx) => (
                          <div key={cat.label} className="d-flex align-items-center mb-2">
                            <span className="me-3 fw-semibold">{cat.label}</span>
                            <Badge bg={cat.rate === 0 ? "success" : cat.rate < 10 ? "warning" : "primary"}>
                              {cat.rate}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                      <Button variant="primary" className="mt-2 w-100" type="submit">
                        Save Company Info
                      </Button>
                      {companySaved && <Alert variant="success" className="mt-3">Company info saved!</Alert>}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default SettingsPage;