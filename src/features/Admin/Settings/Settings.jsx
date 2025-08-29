  // import React, { useState } from "react";
  // import {
  //   Container,
  //   Row,
  //   Col,
  //   Form,
  //   Button,
  //   Nav,
  //   Tab,
  //   Card,
  //   Badge,
  //   Alert,
  //   Tabs,
  //   Table
  // } from "react-bootstrap";

  // const TAX_CATEGORIES = [
  //   { label: "Standard Rate", rate: 18 },
  //   { label: "Reduced Rate", rate: 5 },
  //   { label: "Zero Rate", rate: 0 },
  // ];

  // const COMPANY_INFO = {
  //   name: "Saaranik Pvt Ltd",
  //   address: "123 Main Street, Mumbai, India",
  //   industry: "Design & Construction",
  //   trn: "100000000000002",
  //   email: "info@saaranik.com",
  //   phone: "+91-9876543210",
  // };

  // const SettingsPage = () => {
  //   // General
  //   const [darkMode, setDarkMode] = useState(false);
  //   const [compactView, setCompactView] = useState(false);
  //   const [autoSave, setAutoSave] = useState(true);
  //   // Company
  //   const [company, setCompany] = useState(COMPANY_INFO);
  //   // Notifications
  //   const [notifProject, setNotifProject] = useState(true);
  //   const [notifTask, setNotifTask] = useState(true);
  //   const [notifDue, setNotifDue] = useState(true);
  //   const [notifDesktop, setNotifDesktop] = useState(true);
  //   const [notifMobile, setNotifMobile] = useState(true);

  //   // Feedback states
  //   const [generalSaved, setGeneralSaved] = useState(false);
  //   const [notifSaved, setNotifSaved] = useState(false);
  //   const [companySaved, setCompanySaved] = useState(false);

  //   const handleCompanyChange = (e) => {
  //     setCompany({ ...company, [e.target.name]: e.target.value });
  //   };

  //   return (
  //     <Container fluid className="p-4" >
  //       <h4 className="mb-4 fw-bold">Settings</h4>
  //       <Tab.Container defaultActiveKey="notifications" >
  //         <Nav variant="tabs" className="mb-3">
  //           {/* <Nav.Item>
  //             <Nav.Link eventKey="general">General Preferences</Nav.Link>
  //           </Nav.Item> */}
  //           <Nav.Item>
  //             <Nav.Link eventKey="notifications">Notifications</Nav.Link>
  //           </Nav.Item>
  //           <Nav.Item>
  //             <Nav.Link eventKey="company">Company Info</Nav.Link>
  //           </Nav.Item>
  //         </Nav>
  //         <Tab.Content>
  //           {/* General Preferences */}
  //           {/* <Tab.Pane eventKey="general">
  //             <Form
  //               onSubmit={e => {
  //                 e.preventDefault();
  //                 setGeneralSaved(true);
  //                 setTimeout(() => setGeneralSaved(false), 2000);
  //               }}
  //             >
  //               <Row className="mb-4">
  //                 <Col md={6}>
  //                   <h5>Interface Settings</h5>
  //                   <Form.Check
  //                     type="switch"
  //                     label="Compact View"
  //                     checked={compactView}
  //                     onChange={() => setCompactView(!compactView)}
  //                   />
  //                 </Col>
  //                 <Col md={6}>
  //                   <h5>Language & Region</h5>
  //                   <Form.Group className="mb-2">
  //                     <Form.Label>Language</Form.Label>
  //                     <Form.Select>
  //                       <option>English (US)</option>
  //                       <option>Hindi (IN)</option>
  //                       <option>Marathi (IN)</option>
  //                     </Form.Select>
  //                   </Form.Group>
  //                   <Form.Group className="mb-2">
  //                     <Form.Label>Time Zone</Form.Label>
  //                     <Form.Select>
  //                       <option>Asia/Kolkata (IST)</option>
  //                       <option>UTC</option>
  //                       <option>Asia/Dubai (GST)</option>
  //                     </Form.Select>
  //                   </Form.Group>
  //                 </Col>
  //               </Row>
  //               <Row className="mb-4">
  //                 <Col md={6}>
  //                   <h5>Default Settings</h5>
  //                   <Form.Group className="mb-2">
  //                     <Form.Label>Default Project View</Form.Label>
  //                     <Form.Select>
  //                       <option>List View</option>
  //                       <option>Board View</option>
  //                       <option>Calendar View</option>
  //                     </Form.Select>
  //                   </Form.Group>
  //                   <Form.Group className="mb-2">
  //                     <Form.Label>Default Dashboard</Form.Label>
  //                     <Form.Select>
  //                       <option>Project Overview</option>
  //                       <option>Job Tracker</option>
  //                       <option>Cost Estimates</option>
  //                     </Form.Select>
  //                   </Form.Group>
  //                 </Col>
  //                 <Col md={6}>
  //                   <h5>Session Settings</h5>
  //                   <Form.Check
  //                     type="switch"
  //                     label="Auto-save Changes"
  //                     checked={autoSave}
  //                     onChange={() => setAutoSave(!autoSave)}
  //                   />
  //                   <Form.Group className="mt-2">
  //                     <Form.Label>Session Timeout</Form.Label>
  //                     <Form.Select>
  //                       <option>30 minutes</option>
  //                       <option>1 hour</option>
  //                       <option>2 hours</option>
  //                     </Form.Select>
  //                   </Form.Group>
  //                 </Col>
  //               </Row>
  //               <div className="d-flex gap-2">
  //                 <Button variant="dark" type="submit">Save Changes</Button>
  //                 <Button variant="secondary" type="reset">Reset to Default</Button>
  //               </div>
  //               {generalSaved && <Alert variant="success" className="mt-3">General settings saved!</Alert>}
  //             </Form>
  //           </Tab.Pane> */}

  //           {/* Notifications */}
  //           <Tab.Pane eventKey="notifications">
  //             <Form
  //               onSubmit={e => {
  //                 e.preventDefault();
  //                 setNotifSaved(true);
  //                 setTimeout(() => setNotifSaved(false), 2000);
  //               }}
  //             >
  //               <Row className="mb-4">
  //                 <Col md={6}>
  //                   <h5>Notification Types</h5>
  //                   <Form.Check
  //                     type="switch"
  //                     label={<><div className="fw-semibold">Project Updates</div><div className="text-muted small">Receive updates about project status changes and milestones</div></>}
  //                     className="mb-3"
  //                     checked={notifProject}
  //                     onChange={() => setNotifProject(!notifProject)}
  //                   />
  //                   <Form.Check
  //                     type="switch"
  //                     label={<><div className="fw-semibold">Task Assignments</div><div className="text-muted small">Get notified when you are assigned to new tasks</div></>}
  //                     className="mb-3"
  //                     checked={notifTask}
  //                     onChange={() => setNotifTask(!notifTask)}
  //                   />
  //                   <Form.Check
  //                     type="switch"
  //                     label={<><div className="fw-semibold">Due Date Reminders</div><div className="text-muted small">Receive reminders before task due dates</div></>}
  //                     className="mb-3"
  //                     checked={notifDue}
  //                     onChange={() => setNotifDue(!notifDue)}
  //                   />
  //                 </Col>
  //                 <Col md={6}>
  //                   <h5>Notification Preferences</h5>
  //                   <Form.Check
  //                     type="switch"
  //                     label={<><div className="fw-semibold">Desktop Notifications</div><div className="text-muted small">Show notifications on your desktop</div></>}
  //                     className="mb-3"
  //                     checked={notifDesktop}
  //                     onChange={() => setNotifDesktop(!notifDesktop)}
  //                   />
  //                   <Form.Check
  //                     type="switch"
  //                     label={<><div className="fw-semibold">Mobile Push Notifications</div><div className="text-muted small">Receive notifications on your mobile device</div></>}
  //                     checked={notifMobile}
  //                     onChange={() => setNotifMobile(!notifMobile)}
  //                   />
  //                 </Col>
  //               </Row>
  //               <div className="d-flex gap-2">
  //                 <Button variant="dark" type="submit">Save Changes</Button>
  //                 <Button variant="secondary" type="reset">Reset to Default</Button>
  //               </div>
  //               {notifSaved && <Alert variant="success" className="mt-3">Notification settings saved!</Alert>}
  //             </Form>
  //           </Tab.Pane>

  //           {/* Company Info (with Tax Category) */}
  //           <Tab.Pane eventKey="company">
  //             <Form
  //               onSubmit={e => {
  //                 e.preventDefault();
  //                 setCompanySaved(true);
  //                 setTimeout(() => setCompanySaved(false), 2000);
  //               }}
  //             >
  //               <Row className="justify-content-center">
  //                 <Col md={7}>
  //                   <Card className="shadow-sm">
  //                     <Card.Body>
  //                       <h5 className="mb-3 fw-bold">Company Information</h5>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Company Name</Form.Label>
  //                         <Form.Control name="name" value={company.name} onChange={handleCompanyChange} />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Address</Form.Label>
  //                         <Form.Control name="address" value={company.address} onChange={handleCompanyChange} />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Industry</Form.Label>
  //                         <Form.Control name="industry" value={company.industry} onChange={handleCompanyChange} />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>TRN</Form.Label>
  //                         <Form.Control name="trn" value={company.trn} onChange={handleCompanyChange} />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Email</Form.Label>
  //                         <Form.Control name="email" value={company.email} onChange={handleCompanyChange} />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Phone</Form.Label>
  //                         <Form.Control name="phone" value={company.phone} onChange={handleCompanyChange} />
  //                       </Form.Group>
  //                       <hr className="my-4" />
  //                       <h5 className="mb-3 fw-bold">Tax Categories</h5>
  //                       <div className="mb-3">
  //                         {TAX_CATEGORIES.map((cat, idx) => (
  //                           <div key={cat.label} className="d-flex align-items-center mb-2">
  //                             <span className="me-3 fw-semibold">{cat.label}</span>
  //                             <Badge bg={cat.rate === 0 ? "success" : cat.rate < 10 ? "warning" : "primary"}>
  //                               {cat.rate}%
  //                             </Badge>
  //                           </div>
  //                         ))}
  //                       </div>
  //                       <Button variant="primary" className="mt-2 w-100" type="submit">
  //                         Save Company Info
  //                       </Button>
  //                       {companySaved && <Alert variant="success" className="mt-3">Company info saved!</Alert>}
  //                     </Card.Body>
  //                   </Card>
  //                 </Col>
  //               </Row>
  //             </Form>
  //           </Tab.Pane>
  //         </Tab.Content>
  //       </Tab.Container>
  //     </Container>
  //   );
  // };

  // export default SettingsPage;


  // import React, { useState, useEffect } from "react";
  // import {
  //   Container,
  //   Row,
  //   Col,
  //   Form,
  //   Button,
  //   Nav,
  //   Tab,
  //   Card,
  //   Alert,
  //   Spinner,
  //   Modal
  // } from "react-bootstrap";
  // import { apiUrl } from "../../../redux/utils/config";

  // const SettingsPage = () => {
  //   const [userData, setUserData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [saving, setSaving] = useState(false);
  //   const [saveSuccess, setSaveSuccess] = useState(false);
  //   const [showTaxModal, setShowTaxModal] = useState(false);
  //   const [newTaxCategory, setNewTaxCategory] = useState({ name: "", rate: 0 });
    
  //   // Notification states
  //   const [notifProject, setNotifProject] = useState(true);
  //   const [notifTask, setNotifTask] = useState(true);
  //   const [notifDue, setNotifDue] = useState(true);
  //   const [notifDesktop, setNotifDesktop] = useState(true);
  //   const [notifMobile, setNotifMobile] = useState(true);
    
  //   // Form states
  //   const [formData, setFormData] = useState({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     phone: "",
  //     country: "",
  //     state: "",
  //     assign: "",
  //     companyInfo: {
  //       name: "",
  //       address: "",
  //       industry: "",
  //       trn: "",
  //       email: "",
  //       phone: ""
  //     },
  //     TaxCategories: []
  //   });

  //   // Fetch user data from API
  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       try {
  //         setLoading(true);
  //         // 修复：添加了反引号
  //         const response = await fetch(`${apiUrl}/user/685e6f6364a81f874cd99761`);
  //         if (!response.ok) {
  //           // 修复：添加了反引号
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         setUserData(data);
  //         setFormData({
  //           firstName: data.firstName || "",
  //           lastName: data.lastName || "",
  //           email: data.email || "",
  //           phone: data.phone || "",
  //           country: data.country || "",
  //           state: data.state || "",
  //           assign: data.assign || "",
  //           companyInfo: data.companyInfo || {
  //             name: "",
  //             address: "",
  //             industry: "",
  //             trn: "",
  //             email: "",
  //             phone: ""
  //           },
  //           TaxCategories: data.TaxCategories || []
  //         });
  //         setLoading(false);
  //       } catch (err) {
  //         setError(err.message);
  //         setLoading(false);
  //       }
  //     };
  //     fetchUserData();
  //   }, []);

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: value
  //     }));
  //   };

  //   const handleCompanyChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData(prev => ({
  //       ...prev,
  //       companyInfo: {
  //         ...prev.companyInfo,
  //         [name]: value
  //       }
  //     }));
  //   };

  //   const handleTaxCategoryChange = (index, field, value) => {
  //     const updatedTaxCategories = [...formData.TaxCategories];
  //     if (field === 'rate') {
  //       value = parseFloat(value) || 0;
  //     }
  //     updatedTaxCategories[index] = {
  //       ...updatedTaxCategories[index],
  //       [field]: value
  //     };
  //     setFormData(prev => ({
  //       ...prev,
  //       TaxCategories: updatedTaxCategories
  //     }));
  //   };

  //   const addTaxCategory = () => {
  //     if (newTaxCategory.name.trim() === "") {
  //       alert("Please enter a category name");
  //       return;
  //     }
  //     setFormData(prev => ({
  //       ...prev,
  //       TaxCategories: [...prev.TaxCategories, { ...newTaxCategory }]
  //     }));
  //     setNewTaxCategory({ name: "", rate: 0 });
  //     setShowTaxModal(false);
  //   };

  //   const removeTaxCategory = (index) => {
  //     setFormData(prev => ({
  //       ...prev,
  //       TaxCategories: prev.TaxCategories.filter((_, i) => i !== index)
  //     }));
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setSaving(true);
  //     setSaveSuccess(false);
  //     try {
  //       // Prepare the data to be sent according to your payload structure
  //       const dataToSend = {
  //         firstName: formData.firstName,
  //         lastName: formData.lastName,
  //         email: formData.email,
  //         phone: formData.phone,
  //         country: formData.country,
  //         state: formData.state,
  //         assign: formData.assign,
  //         companyInfo: formData.companyInfo,
  //         TaxCategories: formData.TaxCategories,
  //         // Include other fields from your payload if needed
  //         role: userData.role || "Admin",
  //         permissions: userData.permissions || { dashboardAccess: true, clientManagement: true },
  //         accessLevel: userData.accessLevel || { fullAccess: true }
  //       };
        
  //       // 修复：添加了反引号
  //       const response = await fetch(`${apiUrl}/user/685e6f6364a81f874cd99761`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(dataToSend)
  //       });
        
  //       if (!response.ok) {
  //         // 修复：添加了反引号
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
        
  //       const updatedData = await response.json();
  //       setUserData(updatedData);
  //       setSaveSuccess(true);
  //       setTimeout(() => setSaveSuccess(false), 3000);
  //     } catch (err) {
  //       setError(err.message);
  //       console.error("Update error:", err);
  //     } finally {
  //       setSaving(false);
  //     }
  //   };

  //   if (loading) {
  //     return (
  //       <Container fluid className="p-4 d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
  //         <Spinner animation="border" role="status">
  //           <span className="visually-hidden">Loading...</span>
  //         </Spinner>
  //       </Container>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <Container fluid className="p-4">
  //         <Alert variant="danger">Error: {error}</Alert>
  //         <Button onClick={() => window.location.reload()}>Try Again</Button>
  //       </Container>
  //     );
  //   }

  //   return (
  //     <Container fluid className="p-4">
  //       <h4 className="mb-4 fw-bold">Settings</h4>
        
  //       {/* Tax Category Modal */}
  //       <Modal show={showTaxModal} onHide={() => setShowTaxModal(false)}>
  //         <Modal.Header closeButton>
  //           <Modal.Title>Add New Tax Category</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Form.Group className="mb-3">
  //             <Form.Label>Category Name</Form.Label>
  //             <Form.Control
  //               type="text"
  //               value={newTaxCategory.name}
  //               onChange={(e) => setNewTaxCategory({ ...newTaxCategory, name: e.target.value })}
  //               placeholder="e.g., Standard Rate"
  //             />
  //           </Form.Group>
  //           <Form.Group className="mb-3">
  //             <Form.Label>Tax Rate (%)</Form.Label>
  //             <Form.Control
  //               type="number"
  //               value={newTaxCategory.rate}
  //               onChange={(e) => setNewTaxCategory({ ...newTaxCategory, rate: parseFloat(e.target.value) || 0 })}
  //               placeholder="e.g., 18"
  //             />
  //           </Form.Group>
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="secondary" onClick={() => setShowTaxModal(false)}>
  //             Cancel
  //           </Button>
  //           <Button variant="primary" onClick={addTaxCategory}>
  //             Add Category
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
        
  //       <Tab.Container defaultActiveKey="profile">
  //         <Nav variant="tabs" className="mb-3">
  //           <Nav.Item>
  //             <Nav.Link eventKey="profile">Profile</Nav.Link>
  //           </Nav.Item>
  //           <Nav.Item>
  //             <Nav.Link eventKey="notifications">Notifications</Nav.Link>
  //           </Nav.Item>
  //           <Nav.Item>
  //             <Nav.Link eventKey="company">Company Info</Nav.Link>
  //           </Nav.Item>
  //         </Nav>
          
  //         <Tab.Content>
  //           {/* Profile Tab */}
  //           <Tab.Pane eventKey="profile">
  //             <Form onSubmit={handleSubmit} >
  //               <Row className="justify-content-center">
  //                 <Col md={8}>
  //                   <Card className="shadow-sm ">
  //                     <Card.Body>
  //                       <h5 className="mb-3 fw-bold">Personal Information</h5>
  //                       <Row>
  //                         <Col md={6}>
  //                           <Form.Group className="mb-3">
  //                             <Form.Label>First Name</Form.Label>
  //                             <Form.Control
  //                               type="text"
  //                               name="firstName"
  //                               value={formData.firstName}
  //                               onChange={handleInputChange}
  //                             />
  //                           </Form.Group>
  //                         </Col>
  //                         <Col md={6}>
  //                           <Form.Group className="mb-3">
  //                             <Form.Label>Last Name</Form.Label>
  //                             <Form.Control
  //                               type="text"
  //                               name="lastName"
  //                               value={formData.lastName}
  //                               onChange={handleInputChange}
  //                             />
  //                           </Form.Group>
  //                         </Col>
  //                       </Row>
  //                       <Row>
  //                         <Col md={6}>
  //                           <Form.Group className="mb-3">
  //                             <Form.Label>Email</Form.Label>
  //                             <Form.Control
  //                               type="email"
  //                               name="email"
  //                               value={formData.email}
  //                               onChange={handleInputChange}
  //                             />
  //                           </Form.Group>
  //                         </Col>
  //                         <Col md={6}>
  //                           <Form.Group className="mb-3">
  //                             <Form.Label>Phone</Form.Label>
  //                             <Form.Control
  //                               type="text"
  //                               name="phone"
  //                               value={formData.phone}
  //                               onChange={handleInputChange}
  //                             />
  //                           </Form.Group>
  //                         </Col>
  //                       </Row>
  //                       <Row>
  //                         <Col md={6}>
  //                           <Form.Group className="mb-3">
  //                             <Form.Label>Country</Form.Label>
  //                             <Form.Control
  //                               type="text"
  //                               name="country"
  //                               value={formData.country}
  //                               onChange={handleInputChange}
  //                             />
  //                           </Form.Group>
  //                         </Col>
  //                         <Col md={6}>
  //                           <Form.Group className="mb-3">
  //                             <Form.Label>State</Form.Label>
  //                             <Form.Control
  //                               type="text"
  //                               name="state"
  //                               value={formData.state}
  //                               onChange={handleInputChange}
  //                             />
  //                           </Form.Group>
  //                         </Col>
  //                       </Row>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Assign</Form.Label>
  //                         <Form.Control
  //                           type="text"
  //                           name="assign"
  //                           value={formData.assign}
  //                           onChange={handleInputChange}
  //                         />
  //                       </Form.Group>
  //                       <Button
  //                         variant="primary"
  //                         type="submit"
  //                         disabled={saving}
  //                       >
  //                         {saving ? "Saving..." : "Save Profile"}
  //                       </Button>
  //                       {saveSuccess && <Alert variant="success" className="mt-3">Profile updated successfully!</Alert>}
  //                     </Card.Body>
  //                   </Card>
  //                 </Col>
  //               </Row>
  //             </Form>
  //           </Tab.Pane>
            
  //           {/* Notifications Tab */}
  //           <Tab.Pane eventKey="notifications">
  //             <Form
  //               onSubmit={e => {
  //                 e.preventDefault();
  //                 setSaveSuccess(true);
  //                 setTimeout(() => setSaveSuccess(false), 2000);
  //               }}
  //             >
  //               <Row className="mb-4">
  //                 <Col md={6}>
  //                   <h5>Notification Types</h5>
  //                   <Form.Check
  //                     type="switch"
  //                     label={<><div className="fw-semibold">Project Updates</div><div className="text-muted small">Receive updates about project status changes and milestones</div></>}
  //                     className="mb-3"
  //                     checked={notifProject}
  //                     onChange={() => setNotifProject(!notifProject)}
  //                   />
  //                   <Form.Check
  //                     type="switch"
  //                     label={<><div className="fw-semibold">Task Assignments</div><div className="text-muted small">Get notified when you are assigned to new tasks</div></>}
  //                     className="mb-3"
  //                     checked={notifTask}
  //                     onChange={() => setNotifTask(!notifTask)}
  //                   />
  //                   <Form.Check
  //                     type="switch"
  //                     label={<><div className="fw-semibold">Due Date Reminders</div><div className="text-muted small">Receive reminders before task due dates</div></>}
  //                     className="mb-3"
  //                     checked={notifDue}
  //                     onChange={() => setNotifDue(!notifDue)}
  //                   />
  //                 </Col>
  //                 <Col md={6}>
  //                   <h5>Notification Preferences</h5>
  //                   <Form.Check
  //                     type="switch"
  //                     label={<><div className="fw-semibold">Desktop Notifications</div><div className="text-muted small">Show notifications on your desktop</div></>}
  //                     className="mb-3"
  //                     checked={notifDesktop}
  //                     onChange={() => setNotifDesktop(!notifDesktop)}
  //                   />
  //                   <Form.Check
  //                     type="switch"
  //                     label={<><div className="fw-semibold">Mobile Push Notifications</div><div className="text-muted small">Receive notifications on your mobile device</div></>}
  //                     checked={notifMobile}
  //                     onChange={() => setNotifMobile(!notifMobile)}
  //                   />
  //                 </Col>
  //               </Row>
  //               <div className="d-flex gap-2">
  //                 <Button variant="dark" type="submit">Save Changes</Button>
  //                 <Button variant="secondary" type="reset">Reset to Default</Button>
  //               </div>
  //               {saveSuccess && <Alert variant="success" className="mt-3">Notification settings saved!</Alert>}
  //             </Form>
  //           </Tab.Pane>
            
  //           {/* Company Info Tab */}
  //           <Tab.Pane eventKey="company">
  //             <Form onSubmit={handleSubmit}>
  //               <Row className="justify-content-center">
  //                 <Col md={8}>
  //                   <Card className="shadow-sm">
  //                     <Card.Body>
  //                       <h5 className="mb-3 fw-bold">Company Information</h5>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Company Name</Form.Label>
  //                         <Form.Control
  //                           name="name"
  //                           value={formData.companyInfo.name}
  //                           onChange={handleCompanyChange}
  //                         />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Address</Form.Label>
  //                         <Form.Control
  //                           name="address"
  //                           value={formData.companyInfo.address}
  //                           onChange={handleCompanyChange}
  //                         />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Industry</Form.Label>
  //                         <Form.Control
  //                           name="industry"
  //                           value={formData.companyInfo.industry}
  //                           onChange={handleCompanyChange}
  //                         />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>TRN</Form.Label>
  //                         <Form.Control
  //                           name="trn"
  //                           value={formData.companyInfo.trn}
  //                           onChange={handleCompanyChange}
  //                         />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Email</Form.Label>
  //                         <Form.Control
  //                           name="email"
  //                           value={formData.companyInfo.email}
  //                           onChange={handleCompanyChange}
  //                         />
  //                       </Form.Group>
  //                       <Form.Group className="mb-3">
  //                         <Form.Label>Phone</Form.Label>
  //                         <Form.Control
  //                           name="phone"
  //                           value={formData.companyInfo.phone}
  //                           onChange={handleCompanyChange}
  //                         />
  //                       </Form.Group>
  //                       <hr className="my-4" />
  //                       <div className="d-flex justify-content-between align-items-center mb-3">
  //                         <h5 className="fw-bold mb-0">Tax Categories</h5>
  //                         <Button
  //                           variant="outline-primary"
  //                           size="sm"
  //                           onClick={() => setShowTaxModal(true)}
  //                         >
  //                           Add Tax Category
  //                         </Button>
  //                       </div>
  //                       {formData.TaxCategories.length === 0 ? (
  //                         <p className="text-muted">No tax categories added yet.</p>
  //                       ) : (
  //                         formData.TaxCategories.map((category, index) => (
  //                           <Row key={index} className="mb-2 align-items-center">
  //                             <Col md={6}>
  //                               <Form.Group>
  //                                 <Form.Label>Category Name</Form.Label>
  //                                 <Form.Control
  //                                   type="text"
  //                                   value={category.name || ""}
  //                                   onChange={(e) => handleTaxCategoryChange(index, 'name', e.target.value)}
  //                                   placeholder="Category name"
  //                                 />
  //                               </Form.Group>
  //                             </Col>
  //                             <Col md={4}>
  //                               <Form.Group>
  //                                 <Form.Label>Rate (%)</Form.Label>
  //                                 <Form.Control
  //                                   type="number"
  //                                   value={category.rate || 0}
  //                                   onChange={(e) => handleTaxCategoryChange(index, 'rate', parseFloat(e.target.value))}
  //                                   placeholder="Rate"
  //                                 />
  //                               </Form.Group>
  //                             </Col>
  //                             <Col md={2} className="pt-3">
  //                               <Button
  //                                 variant="outline-danger"
  //                                 size="sm"
  //                                 onClick={() => removeTaxCategory(index)}
  //                               >
  //                                 Remove
  //                               </Button>
  //                             </Col>
  //                           </Row>
  //                         ))
  //                       )}
  //                       <Button
  //                         variant="primary"
  //                         className="mt-3 w-100"
  //                         type="submit"
  //                         disabled={saving}
  //                       >
  //                         {saving ? "Saving..." : "Save Company Info"}
  //                       </Button>
  //                       {saveSuccess && <Alert variant="success" className="mt-3">Company info saved!</Alert>}
  //                     </Card.Body>
  //                   </Card>
  //                 </Col>
  //               </Row>
  //             </Form>
  //           </Tab.Pane>
  //         </Tab.Content>
  //       </Tab.Container>
  //     </Container>
  //   );
  // };

  // export default SettingsPage;


  import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Tab,
  Card,
  Alert,
  Spinner,
  Modal
} from "react-bootstrap";
import { apiUrl } from "../../../redux/utils/config";
const SettingsPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [newTaxCategory, setNewTaxCategory] = useState({ name: "", rate: 0 });
  // Notification states
  const [notifProject, setNotifProject] = useState(true);
  const [notifTask, setNotifTask] = useState(true);
  const [notifDue, setNotifDue] = useState(true);
  const [notifDesktop, setNotifDesktop] = useState(true);
  const [notifMobile, setNotifMobile] = useState(true);
  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    assign: "",
    companyInfo: {
      name: "",
      address: "",
      industry: "",
      trn: "",
      email: "",
      phone: "",
      bankAccountName: "",
      bankName: "",
      iban: "",
      swiftCode: ""
    },
    TaxCategories: []
  });
  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/user/685e6f6364a81f874cd99761`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          country: data.country || "",
          state: data.state || "",
          assign: data.assign || "",
          companyInfo: data.companyInfo || {
            name: "",
            address: "",
            industry: "",
            trn: "",
            email: "",
            phone: "",
            bankAccountName: "",
            bankName: "",
            iban: "",
            swiftCode: ""
          },
          TaxCategories: data.TaxCategories || []
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [name]: value
      }
    }));
  };
  const handleTaxCategoryChange = (index, field, value) => {
    const updatedTaxCategories = [...formData.TaxCategories];
    if (field === 'rate') {
      value = parseFloat(value) || 0;
    }
    updatedTaxCategories[index] = {
      ...updatedTaxCategories[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      TaxCategories: updatedTaxCategories
    }));
  };
  const addTaxCategory = () => {
    if (newTaxCategory.name.trim() === "") {
      alert("Please enter a category name");
      return;
    }
    setFormData(prev => ({
      ...prev,
      TaxCategories: [...prev.TaxCategories, { ...newTaxCategory }]
    }));
    setNewTaxCategory({ name: "", rate: 0 });
    setShowTaxModal(false);
  };
  const removeTaxCategory = (index) => {
    setFormData(prev => ({
      ...prev,
      TaxCategories: prev.TaxCategories.filter((_, i) => i !== index)
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      // Prepare the data to be sent according to your payload structure
      const dataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        state: formData.state,
        assign: formData.assign,
        companyInfo: formData.companyInfo,
        TaxCategories: formData.TaxCategories,
        // Include other fields from your payload if needed
        role: userData.role || "Admin",
        permissions: userData.permissions || { dashboardAccess: true, clientManagement: true },
        accessLevel: userData.accessLevel || { fullAccess: true }
      };
      const response = await fetch(`${apiUrl}/user/685e6f6364a81f874cd99761`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = await response.json();
      setUserData(updatedData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Update error:", err);
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <Container fluid className="p-4 d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  if (error) {
    return (
      <Container fluid className="p-4">
        <Alert variant="danger">Error: {error}</Alert>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </Container>
    );
  }
  return (
    <Container fluid className="p-4">
      <h4 className="mb-4 fw-bold">Settings</h4>
      {/* Tax Category Modal */}
      <Modal show={showTaxModal} onHide={() => setShowTaxModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Tax Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={newTaxCategory.name}
              onChange={(e) => setNewTaxCategory({ ...newTaxCategory, name: e.target.value })}
              placeholder="e.g., Standard Rate"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tax Rate (%)</Form.Label>
            <Form.Control
              type="number"
              value={newTaxCategory.rate}
              onChange={(e) => setNewTaxCategory({ ...newTaxCategory, rate: parseFloat(e.target.value) || 0 })}
              placeholder="e.g., 18"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTaxModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addTaxCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
      <Tab.Container defaultActiveKey="profile">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="profile">Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="notifications">Notifications</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="company">Company Info</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          {/* Profile Tab */}
          <Tab.Pane eventKey="profile">
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col md={8}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h5 className="mb-3 fw-bold">Personal Information</h5>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>Assign</Form.Label>
                        <Form.Control
                          type="text"
                          name="assign"
                          value={formData.assign}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Profile"}
                      </Button>
                      {saveSuccess && <Alert variant="success" className="mt-3">Profile updated successfully!</Alert>}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Form>
          </Tab.Pane>
          {/* Notifications Tab */}
          <Tab.Pane eventKey="notifications">
            <Form
              onSubmit={e => {
                e.preventDefault();
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 2000);
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
              {saveSuccess && <Alert variant="success" className="mt-3">Notification settings saved!</Alert>}
            </Form>
          </Tab.Pane>
          {/* Company Info Tab */}
          <Tab.Pane eventKey="company">
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col md={8}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h5 className="mb-3 fw-bold">Company Information</h5>
                      <Form.Group className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                          name="name"
                          value={formData.companyInfo.name}
                          onChange={handleCompanyChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          name="address"
                          value={formData.companyInfo.address}
                          onChange={handleCompanyChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Industry</Form.Label>
                        <Form.Control
                          name="industry"
                          value={formData.companyInfo.industry}
                          onChange={handleCompanyChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>TRN</Form.Label>
                        <Form.Control
                          name="trn"
                          value={formData.companyInfo.trn}
                          onChange={handleCompanyChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          value={formData.companyInfo.email}
                          onChange={handleCompanyChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          name="phone"
                          value={formData.companyInfo.phone}
                          onChange={handleCompanyChange}
                        />
                      </Form.Group>
                      {/* Bank Account Information */}
                      <hr className="my-4" />
                      <h5 className="mb-3 fw-bold">Bank Account Information</h5>
                      <Form.Group className="mb-3">
                        <Form.Label>Bank Account Name</Form.Label>
                        <Form.Control
                          name="bankAccountName"
                          value={formData.companyInfo.bankAccountName}
                          onChange={handleCompanyChange}
                          placeholder="Account holder name"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                          name="bankName"
                          value={formData.companyInfo.bankName}
                          onChange={handleCompanyChange}
                          placeholder="Bank name"
                        />
                      </Form.Group>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>IBAN</Form.Label>
                            <Form.Control
                              name="iban"
                              value={formData.companyInfo.iban}
                              onChange={handleCompanyChange}
                              placeholder="International Bank Account Number"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>SWIFT Code</Form.Label>
                            <Form.Control
                              name="swiftCode"
                              value={formData.companyInfo.swiftCode}
                              onChange={handleCompanyChange}
                              placeholder="Bank identifier code"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Tax Categories</h5>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => setShowTaxModal(true)}
                        >
                          Add Tax Category
                        </Button>
                      </div>
                      {formData.TaxCategories.length === 0 ? (
                        <p className="text-muted">No tax categories added yet.</p>
                      ) : (
                        formData.TaxCategories.map((category, index) => (
                          <Row key={index} className="mb-2 align-items-center">
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={category.name || ""}
                                  onChange={(e) => handleTaxCategoryChange(index, 'name', e.target.value)}
                                  placeholder="Category name"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Rate (%)</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={category.rate || 0}
                                  onChange={(e) => handleTaxCategoryChange(index, 'rate', parseFloat(e.target.value))}
                                  placeholder="Rate"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={2} className="pt-3">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeTaxCategory(index)}
                              >
                                Remove
                              </Button>
                            </Col>
                          </Row>
                        ))
                      )}
                      <Button
                        variant="primary"
                        className="mt-3 w-100"
                        type="submit"
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Company Info"}
                      </Button>
                      {saveSuccess && <Alert variant="success" className="mt-3">Company info saved!</Alert>}
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