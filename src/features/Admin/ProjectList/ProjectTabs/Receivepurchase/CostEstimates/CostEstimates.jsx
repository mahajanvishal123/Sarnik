// import React, { useEffect, useState, useRef } from "react";
// import { Modal, Form, Table, Badge, Dropdown, Button } from "react-bootstrap";
// import { BsPlusLg, BsPencil, BsTrash, BsUpload, BsClipboard } from "react-icons/bs";
// import { Link, useNavigate } from "react-router-dom";
// import { deleteCostEstimate, fetchCostEstimates, updateCostEstimate } from "../../../../../../redux/slices/costEstimatesSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { FaDownload, FaTrash } from "react-icons/fa";
// import Swal from 'sweetalert2';
// import { fetchProject } from "../../../../../../redux/slices/ProjectsSlice";
// import { fetchClient } from "../../../../../../redux/slices/ClientSlice";
// import { createReceivablePurchase, fetchReceivablePurchases, imagelogoreceivablePurchase } from "../../../../../../redux/slices/receivablePurchaseSlice";
// import { jsPDF } from "jspdf";
// import autoTable from 'jspdf-autotable';
// import { FaRegCopy } from "react-icons/fa";
// import axios from "axios";
// import axiosInstance from "../../../../../../redux/utils/axiosInstance";

// function CostEstimates({ projectNO }) {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   console.log("projectNO", projectNO)

//   const projectID = projectNO;


//   // State declarations
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedPOStatus, setSelectedPOStatus] = useState("All PO Status");
//   const [selectedStatus, setSelectedStatus] = useState("All Status");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const [selectedPO, setSelectedPO] = useState(null);
//   const [showAddPOModal, setShowAddPOModal] = useState(false);
//   const [stampFile, setStampFile] = React.useState(null);
//   const fileInputRef = useRef(null);
//   // PO Form states
//   const [selectedProjectId, setSelectedProjectId] = useState("");
//   const [selectedPoNumber, setSelectedPoNumber] = useState("");
//   const [selectedClientId, setSelectedClientId] = useState("");
//   const [costEstimatesId, setCostEstimatesId] = useState("");
//   const [poDate, setPODate] = useState("");
//   const [POStatus, setPOStatus] = useState("");
//   const [amount, setAmount] = useState("");
//   const [poDocument, setPODocument] = useState(null);

//   const { project } = useSelector((state) => state.projects);
//   const { Clients } = useSelector((state) => state.client);
//   const statuses = ["pending ", "Received", "Cancelled", "Completed", "open", "invoiced"];
//   const { logoreceivablePurchase } = useSelector((state) => state.receivablePurchases);
//   console.log("gg", logoreceivablePurchase.image);

//   useEffect(() => {
//     dispatch(fetchProject());
//     dispatch(fetchClient());
//     dispatch(fetchCostEstimates());
//     dispatch(imagelogoreceivablePurchase())
//   }, [dispatch]);

//   useEffect(() => {
//     if (Clients && project?.data?.length) {
//       const foundProject = project.data.find(p => p._id === selectedClientId);
//       if (foundProject) {
//         setSelectedProjectId(foundProject._id);
//       }
//     }
//   }, [Clients, project, selectedClientId]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) {
//         Swal.fire({
//           icon: "error",
//           title: "File too large",
//           text: "Please upload a file smaller than 10MB",
//         });
//         return;
//       }
//       setPODocument(file);
//       setStampFile(file);
//       console.log("stamp", stampFile)
//     }
//   };

//   const handleSavePO = async () => {
//     // if (!selectedProjectId || !selectedClientId || !poDate || !amount) {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Required Fields Missing',
//     //     text: 'Please fill all required fields'
//     //   });
//     //   return;
//     // }
//     const formData = new FormData();
//     formData.append('projectsId', JSON.stringify([selectedProjectId]));
//     formData.append('ClientId', selectedClientId);
//     formData.append('ReceivedDate', poDate);
//     formData.append('POStatus', POStatus || "Pending");
//     formData.append('Amount', amount);
//     formData.append('CostEstimatesId', JSON.stringify([costEstimatesId]));
//     console.log("kkkkkk", costEstimatesId)
//     if (poDocument) {
//       formData.append('image', poDocument);
//     }
//     try {
//       const result = await dispatch(createReceivablePurchase(formData));
//       // Agar API success ho jaye tab fetch karo
//       if (createReceivablePurchase.fulfilled.match(result)) {
//         Swal.fire({
//           icon: 'success',
//           title: 'PO Created',
//           text: 'Purchase order created successfully'
//         });
//         // Reset fields
//         setSelectedProjectId("");
//         setSelectedClientId("");
//         setCostEstimatesId("");
//         setPODate("");
//         setPOStatus("Pending");
//         setAmount("");
//         setPODocument(null);
//         setShowAddPOModal(false);
//         dispatch(updateCostEstimate({
//           id: costEstimatesId,
//           data: {
//             projectId: selectedProjectId,
//             clientId: selectedClientId,
//             CostPOStatus: "Received"
//           }
//         }))
//         // ✅ Now fetch updated list
//         dispatch(fetchReceivablePurchases());
//         navigate("/admin/receivable");
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Creation Failed',
//           text: 'Failed to create purchase order.'
//         });
//       }
//     } catch (err) {
//       console.error("Error creating PO:", err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Something went wrong while creating purchase order.'
//       });
//     }
//   }


//   // Convert to Invoice handler
//   const handleConvertToInvoice = (po) => {
//     setSelectedPO(po);
//     setShowInvoiceModal(true);
//   };

//   const Ponamehandle = (po) => {
//     console.log(po.clients[0].clientName, po.projects[0].projectName, "ddd");
//     console.log(po);
//     setSelectedClientId(po.clients[0]?.clientId || "");
//     setSelectedProjectId(po.projects[0]?.projectId || "");
//     setPOStatus("Pending"); // ✅ Default status set here
//     setSelectedPO(po);
//     setShowAddPOModal(true);
//   };

//   // Add PO Modal
//   const renderAddPOModal = () => (
//     <Modal show={showAddPOModal} onHide={() => setShowAddPOModal(false)} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Add Purchase Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-2">
//             <div className="row justify-content-center">
//               <div className="col-md-12">
//                 <Form.Label className="d-block">PO Number</Form.Label>
//                 <Form.Control
//                   value={selectedPoNumber}
//                   className="form-control"
//                 >
//                 </Form.Control>
//               </div>
//               <div className="row justify-content-center">
//                 <div className="col-md-6">
//                   <Form.Label className="d-block">Project</Form.Label>
//                   <Form.Select
//                     value={selectedProjectId}
//                     disabled
//                     className="form-control"
//                   >
//                     <option value="">
//                       {selectedPO?.projects?.find(p => p.projectId === selectedProjectId)?.projectName || "-- No Project --"}
//                     </option>
//                   </Form.Select>
//                 </div>
//                 <div className="col-md-6">
//                   <Form.Label className="d-block">Client</Form.Label>
//                   <Form.Select
//                     value={selectedClientId}
//                     disabled
//                     className="form-control"
//                   >
//                     <option value="">
//                       {selectedPO?.clients?.find(c => c.clientId === selectedClientId)?.clientName || "-- No Client --"}
//                     </option>
//                   </Form.Select>
//                 </div>
//               </div>
//             </div>
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <div className="row justify-content-center align-items-start">
//               {/* PO Amount Field */}
//               <div className="col-md-6 mb-3 mb-md-0">
//                 <Form.Label className="d-block">PO Amount</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={selectedPO?.lineItems?.[0]?.amount || amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className="form-control"
//                   placeholder="Enter amount"
//                   disabled={!!selectedPO?.lineItems?.[0]?.amount}
//                   required
//                 />
//               </div>
//               {/* PO Date Field */}
//               <div className="col-md-6">
//                 <Form.Label className="d-block">PO Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={selectedPO?.estimateDate ? selectedPO.estimateDate.split('T')[0] : poDate}
//                   onChange={(e) => setPODate(e.target.value)}
//                   className="form-control"
//                   disabled={!!selectedPO?.estimateDate}
//                   required
//                 />
//               </div>
//             </div>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer className="d-flex justify-content-end gap-2">
//         <Button variant="secondary" onClick={() => setShowAddPOModal(false)}>Cancel</Button>
//         <Button variant="primary" onClick={handleSavePO}>Save PO</Button>
//       </Modal.Footer>
//     </Modal>
//   );
//   // //////////
//   const { estimates, loading, error } = useSelector((state) => state.costEstimates);
//   console.log("Cost Estimates:", estimates.costEstimates);

//   useEffect(() => {
//     dispatch(fetchCostEstimates());
//   }, [dispatch]);

//   // ye ok code hai 
//   const getStatusClass = (status) => {
//     switch ((status || "").toLowerCase().trim()) {
//       case "active":
//       case "active project":
//       case "open":
//         return "bg-primary text-white";
//       case "inactive":
//         return "bg-secondary text-white";
//       case "in progress":
//       case "pending":
//         return "bg-warning text-dark";
//       case "completed":
//         return "bg-success text-white";
//       case "closed":
//         return "bg-dark text-white";
//       case "cancelled":
//         return "bg-danger text-white";
//       case "on hold":
//       case "review":
//         return "bg-info text-dark";
//       case "not started":
//         return "bg-secondary text-white";
//       // case "pending":
//       //   return "bg-warning text-dark";     // Yellow
//       case "received":
//         return "bg-info text-dark";        // Light Blue
//       // case "cancelled":
//       //   return "bg-danger text-white";     // Red
//       // case "completed":
//       //   return "bg-success text-white";    // Green
//       // case "open":
//       //   return "bg-primary text-white";    // Blue
//       case "invoiced":
//         return "bg-dark text-white";       // Dark (You can change it as needed)
//       // case "in progress":
//       case "in_progress":
//         return "bg-warning text-dark";
//       // case "active":
//       //   return "bg-primary text-white";
//       case "reject":
//         return "bg-danger text-white";
//       // case "review":
//       //   return "bg-info text-dark";
//       // case "not started":
//       //   return "bg-secondary text-white";
//       default:
//         return "bg-light text-dark";
//     }
//   };

//   const handleDelete = (_id) => {
//     console.log(_id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteCostEstimate(_id))
//           .then(() => {
//             Swal.fire("Deleted!", "The document has been deleted.", "success");
//             dispatch(fetchCostEstimates());
//           })
//           .catch(() => {
//             Swal.fire("Error!", "Something went wrong.", "error");
//           });
//       }
//     });
//   }

//   const Duplicate = (po) => {
//     navigate(`/admin/AddCostEstimates`, {
//       state: {
//         po: {
//           ...po, // pehle ka po ka sara data
//           CostPOStatus: "Pending" // is field ko override kar rahe hai
//         },
//         isDuplicate: true
//       }
//     });
//   };

//   const UpdateEstimate = (po) => {
//     navigate(`/admin/AddCostEstimates`, {
//       state: {
//         po,
//       }
//     })
//   }
//   //     const Duplicate =(po)=>{    
//   //  navigate(`/duplicate/AddCostEstimates/${po._id}`, { state: { po}});
//   //   }
//   // PAGINATION SETUP FOR ESTIMATES
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   // Add filtering logic before pagination
//   const filteredEstimates = estimates?.costEstimates
//     ?.slice()
//     .reverse()
//     .filter((estimate) => {
//       // Split searchQuery by spaces, ignore empty terms
//       const terms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
//       // Prepare searchable fields as strings
//       const estimateRef = (estimate.estimateRef || '').toLowerCase();
//       // FIX: Use 'clients' and 'projects' fields for search
//       const clientName = (estimate.clients?.[0]?.clientName || '').toLowerCase();
//       const projectNames = (estimate.projects || []).map(project => (project.projectName || project.name || '').toLowerCase()).join(' ');
//       const status = (estimate.Status || '').toLowerCase();
//       const poStatus = (estimate.CostPOStatus || '').toLowerCase();
//       const fields = [
//         estimateRef,
//         clientName,
//         projectNames,
//         status,
//         poStatus
//       ];
//       // Every term must be found in at least one field
//       const matchesSearch = terms.length === 0 || terms.every(term =>
//         fields.some(field => field.includes(term))
//       );

//       // Fix: Correctly map filter values to actual data values
//       let matchesPOStatus = true;
//       if (selectedPOStatus === "Open") {
//         matchesPOStatus = poStatus === "pending";
//       } else if (selectedPOStatus === "Active") {
//         matchesPOStatus = poStatus === "active" || poStatus === "received";
//       } // else "All PO Status" will match all

//       const matchesStatus = selectedStatus === "All Status" ||
//         estimate.Status === selectedStatus;
//       // FIX: Compare date in 'YYYY-MM-DD' format
//       const estimateDateStr = estimate.estimateDate ? estimate.estimateDate.slice(0, 10) : "";
//       const matchesDate = !selectedDate || estimateDateStr === selectedDate;
//       return matchesSearch && matchesPOStatus && matchesStatus && matchesDate;
//     });

//   // Update pagination to use filtered data
//   const totalItems = filteredEstimates?.length || 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const paginatedEstimates = filteredEstimates
//     ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   // Helper to fetch image and convert to base64
//   const getImageBase64 = async (url) => {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   const handleDownloadPDF = async (po) => {
//     try {
//       const response = await axiosInstance.post(
//         `/pdf?CostEstimatesId=${po._id}`,
//         {
//           projectId: po.projectId?.map((p) => p._id),
//           clientId: po.clientId?.map((c) => c._id),
//         }
//       );
//       const estimate = response.data?.data?.[0];
//       if (!estimate) throw new Error("No estimate data found");
//       const client = estimate.clientId || {};
//       const project = estimate.projectId || {};
//       const lineItems = estimate.lineItems || [];
//       const doc = new jsPDF("p", "pt", "a4");
//       const pageWidth = doc.internal.pageSize.width;
//       const pageHeight = doc.internal.pageSize.height;
//       const marginLeft = 40;
//       const contentWidth = pageWidth - marginLeft * 2;
//       // === HEADER ===
//       doc.setFillColor(229, 62, 62);
//       doc.rect(marginLeft, 40, 200, 50, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFontSize(14);
//       const logoUrl = estimate.image[0];
//       const logoBase64 = await getImageBase64(logoUrl);
//       doc.addImage(logoBase64, "PNG", marginLeft + 5, 45, 60, 40);
//       doc.setFont("helvetica", "bold");
//       doc.text("SAARANIK", marginLeft + 70, 60);
//       doc.setFontSize(8);
//       doc.setFont("helvetica", "normal");
//       doc.text("COMPANY ADDRESS DETAILS", marginLeft + 70, 75);
//       doc.setTextColor(0, 0, 0);
//       // === Estimate Info (Right) ===
//       doc.setFontSize(12);
//       doc.setFont("helvetica", "bold");
//       doc.text(
//         `Cost Estimate No. ${estimate.estimateRef || "---"}`,
//         pageWidth - marginLeft - 180,
//         50
//       );
//       doc.setFontSize(10);
//       doc.setFont("helvetica", "normal");
//       doc.text(
//         `Date: ${new Date(estimate.estimateDate).toLocaleDateString("en-GB")}`,
//         pageWidth - marginLeft - 180,
//         65
//       );
//       doc.text(`Req. Ref.: --`, pageWidth - marginLeft - 180, 80);
//       // === Client Info ===
//       let currentY = 120;
//       doc.setFontSize(10);
//       doc.text("To,", marginLeft, currentY);
//       currentY += 15;
//       doc.text(
//         ` ${client?.clientName || "Client Name"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${project?.projectName || "Client Company Name"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.clientAddress?.split(",")[0] || "Address Line 1"
//         }`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.shippingInformation?.[0]?.shippingAddress ||
//         "Address Line 2"
//         }`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.contactPersons?.[0]?.email || "email"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.contactPersons?.[0]?.phone || "Phone"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 25;
//       // === Table Data ===
//       const tableData = lineItems.map((item, index) => [
//         (index + 1).toString(),
//         item.description || "",
//         (item.quantity || 0).toString(),
//         (item.rate || 0).toLocaleString("en-IN", {
//           minimumFractionDigits: 2,
//         }),
//         ((item.quantity || 0) * (item.rate || 0)).toLocaleString("en-IN", {
//           minimumFractionDigits: 2,
//         }),
//       ]);
//       for (let i = 0; i < 15; i++) tableData.push(["", "", "", "", ""]);
//       let finalY;
//       autoTable(doc, {
//         startY: currentY,
//         head: [
//           [
//             "ITEM #",
//             "Brand & Design / Description",
//             "QTY",
//             "Unit Price (INR)",
//             "Amount (INR)",
//           ],
//         ],
//         body: tableData,
//         styles: {
//           fontSize: 9,
//           cellPadding: 4,
//           lineColor: [0, 0, 0],
//           lineWidth: 0.3,
//           halign: "center",
//           valign: "middle",
//         },
//         headStyles: {
//           fillColor: [230, 230, 230],
//           textColor: [0, 0, 0],
//           fontStyle: "bold",
//           fontSize: 9,
//           halign: "center",
//         },
//         columnStyles: {
//           0: { halign: "center", cellWidth: 50 },
//           1: { halign: "left", cellWidth: contentWidth - 260 },
//           2: { halign: "center", cellWidth: 40 },
//           3: { halign: "right", cellWidth: 80 },
//           4: { halign: "right", cellWidth: 90 },
//         },
//         theme: "grid",
//         margin: { left: marginLeft, right: marginLeft },
//         didDrawPage: (data) => {
//           finalY = data.cursor.y;
//         },
//       });
//       // === Totals Section ===
//       const subTotal = lineItems.reduce(
//         (sum, item) =>
//           sum + (item.quantity || 0) * (item.rate || 0),
//         0
//       );
//       const vat = (subTotal * (estimate.VATRate || 0)) / 100;
//       const total = subTotal + vat;
//       const totalsBoxX = pageWidth - marginLeft - 120;
//       const totalsBoxY = finalY + 20;

//       const footerY = totalsBoxY + 65;
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9);
//       doc.text("• Cost based on One-off prices.", marginLeft, footerY);
//       doc.text(
//         "• The above prices valid for 2 weeks and thereafter subject to our reconfirmation.",
//         marginLeft,
//         footerY + 12
//       );
//       doc.setFont("helvetica", "bold");
//       doc.text(`For Your Company Name`, marginLeft, footerY + 40);
//       doc.setFont("helvetica", "normal");
//       doc.text(
//         "(This is system generated document, hence not signed.)",
//         marginLeft,
//         footerY + 55
//       );
//       // === Save PDF ===
//       doc.save(`Cost_Estimate_${estimate.estimateRef || "Estimate"}.pdf`);
//     } catch (error) {
//       console.error("❌ Error generating PDF:", error);
//       alert("Failed to generate PDF.");
//     }
//   };

//   const CostEstimatesDetails = (po) => {
//     navigate(`/admin/OvervieCostEstimates`, { state: { po } });
//   };

//   // const Addcostestimate = () => {
//   //   navigate(`/admin/AddCostEstimates`, { state: {projectNO} });
//   // }

//   return (
//     <div
//       className="p-4 m-2"
//       style={{ backgroundColor: "white", borderRadius: "10px" }} >
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <h2 className="fw-semibold mb-3">Cost Estimates</h2>
//         {/* <Link to={"/admin/AddCostEstimates"}> */}
//         <button id="btn-All" onClick={() => { navigate(`/admin/AddCostEstimates`, { state: { idProject: projectID } }) }} className=" btn-dark" style={{ border: "none", borderRadius: "10px" }}>
//           <BsPlusLg className="me-2" /> New Estimate
//         </button>
//         {/* </Link> */}
//       </div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div className="filters d-flex flex-wrap gap-1 mb-4">
//           <div className="search-container flex-grow-1">
//             <Form.Control
//               type="search"
//               placeholder="Search by Job #, Brand Name, Sub Brand, Flavour, Pack Type, Pack Size..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input"
//             />
//           </div>
//           <div className="search-container flex-grow-1">
//             <Form.Control
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="form-control"
//             />
//           </div>
//           <Dropdown className="filter-dropdown">
//             <Dropdown.Toggle
//               variant="light"
//               id="po-status-dropdown"
//               className="custom-dropdown"
//             >
//               {selectedPOStatus}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("All PO Status")}>All PO Status</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("Open")}>Open</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("Active")}>Active</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//           <Dropdown className="filter-dropdown">
//             <Dropdown.Toggle
//               variant="light"
//               id="status-dropdown"
//               className="custom-dropdown"
//             >
//               {selectedStatus}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setSelectedStatus("All Status")}>All Status</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Active")}>Active</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("pending")}>pending</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Invoice")}>Invoice</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Completed")}>Completed</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//       <div className="table-responsive" style={{ maxHeight: "900px", overflowY: "auto" }}>
//         <Table hover className="align-middle sticky-header">
//           <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 1 }}>
//             <tr>
//               {/* <th><input type="checkbox" /></th> */}
//               <th style={{ whiteSpace: 'nowrap' }}>CE No</th>
//               <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
//               <th style={{ whiteSpace: 'nowrap' }}>Project No</th>
//               <th style={{ whiteSpace: 'nowrap' }}>Client Name</th>
//               {/* <th style={{ whiteSpace: 'nowrap' }}>Client Email</th> */}
//               <th>Date</th>
//               {/* <th>ProjectNo</th> */}
//               <th>Amount</th>
//               <th style={{ whiteSpace: 'nowrap' }}>PO Status</th>

//               <th style={{ whiteSpace: 'nowrap' }}>CE Status</th>
//               {/* <th>POStatus</th> */}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedEstimates?.filter((item) => {
//               return (
//                 item.projects[0].projectId == projectNO
//               )
//             }).map((po, index) => (
//               <tr style={{ whiteSpace: "nowrap" }} key={po.poNumber}>
//                 {/* <td><input type="checkbox" /></td> */}
//                 <td onClick={() => CostEstimatesDetails(po)}>
//                   <Link style={{ textDecoration: 'none', border: 'none' }}>
//                     {po.estimateRef}
//                   </Link>
//                 </td>
//                 <td>
//                   {po.projects?.map((project) => project.projectName).join(", ")}
//                 </td>
//                 <td>
//                   {po.projects?.map((project) => project.projectNo).join(", ")}
//                 </td>
//                 <td>{po.clients?.[0]?.clientName || 'N/A'}</td>
//                 {/* <td>{po.clients?.[0]?.clientEmail || 'N/A'}</td> */}
//                 <td>{new Date(po.estimateDate).toLocaleDateString("en-GB").slice(0, 8)}</td>
//                 <td>
//                   {po.lineItems?.reduce((total, item) => total + (item.amount || 0), 0).toFixed(2)}
//                 </td>
//                 <td>
//                   <span className={`badge ${getStatusClass(po.CostPOStatus)} px-2 py-1`}>
//                     {po.CostPOStatus == 'Pending' ? 'pending' : 'received'}
//                   </span>
//                 </td>

//                 <td>
//                   <span className={`badge ${getStatusClass(po.Status)} px-2 py-1`}>
//                     {po.Status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <button className="btn btn-sm btn-success"
//                       disabled={
//                         po.CostPOStatus?.length > 0 &&
//                         po.CostPOStatus.toLowerCase() !== "pending"
//                       }
//                       onClick={() => {
//                         setCostEstimatesId(po._id); // Store the ID
//                         Ponamehandle(po)
//                         setShowAddPOModal(true);   // Open Modal
//                       }}
//                     >
//                       Add PO
//                     </button>
//                     <span className={`badge ${getStatusClass(
//                       po.receivablePurchases?.[0]?.POStatus?.toLowerCase() || "pending"
//                     )} px-2 py-1`}>
//                       {/* {po.receivablePurchases?.[0]?.POStatus || 'pending'} */}
//                     </span>
//                     <button className="btn btn-sm btn-primary" onClick={() => Duplicate(po)}><FaRegCopy /></button>
//                     {/* <button className="btn btn-sm btn-primary" onClick={() => handleConvertToInvoice(po)}>ConvertInvoice</button> */}
//                     <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateEstimate(po)}><BsPencil /></button>
//                     {/* <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(po._id))}>
//                             <FaTrash />
//                           </button> */}
//                     <button
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={() => handleDownloadPDF(po)}
//                     >
//                       <FaDownload />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//       {/* Modal for converting to invoice */}
//       <Modal
//         show={showInvoiceModal}
//         onHide={() => setShowInvoiceModal(false)}
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Convert Estimate to Invoice</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Invoice Number</Form.Label>
//               {/* <Form.Control
//                   type="text"
//                   defaultValue={
//                     selectedPO
//                       ? `INV-${selectedPO.estimateRef.split("-")[1]}`
//                       : ""
//                   }
//                   disabled
//                 /> */}
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Invoice Date</Form.Label>
//               <Form.Control type="date" />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Client</Form.Label>
//               <Form.Control
//                 type="text"
//                 defaultValue={selectedPO?.client}
//                 readOnly
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Due Date</Form.Label>
//               <Form.Control type="date" />
//             </Form.Group>
//             <hr />
//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control type="text" defaultValue="Web Design Services" />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control type="number" defaultValue="1" />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Rate</Form.Label>
//               <Form.Control type="number" defaultValue={selectedPO?.amount} />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="text"
//                 // value={`$${selectedPO?.amount.toFixed(2)}`}
//                 disabled
//               />
//             </Form.Group>
//             <hr />
//             <div className="d-flex justify-content-between">
//               <div>
//                 <strong>Subtotal:</strong>
//                 {/* <span> ${selectedPO?.amount.toFixed(2)}</span> */}
//               </div>
//               <div>
//                 <strong>Tax (10%):</strong>
//                 {/* <span> ${calculateTax(selectedPO?.amount).toFixed(2)}</span> */}
//               </div>
//               <div>
//                 <strong>Total:</strong>
//                 {/* <span> ${calculateTotal(selectedPO?.amount).toFixed(2)}</span> */}
//               </div>
//             </div>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowInvoiceModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button variant="primary">Create Invoice</Button>
//         </Modal.Footer>
//       </Modal>
//       {renderAddPOModal()}
//       {/* Modal for converting to invoice */}
//       {!loading && !error && (
//         <div className="d-flex justify-content-between align-items-center mt-3">
//           <div className="text-muted small">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
//           </div>
//           <ul className="pagination pagination-sm mb-0">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
//                 <span aria-hidden="true">&laquo;</span>
//               </button>
//             </li>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                 <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
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
// export default CostEstimates;


// import React, { useEffect, useState, useRef } from "react";
// import { Modal, Form, Table, Badge, Dropdown, Button } from "react-bootstrap";
// import { BsPlusLg, BsPencil, BsTrash, BsUpload, BsClipboard } from "react-icons/bs";
// import { Link, useNavigate } from "react-router-dom";
// import { deleteCostEstimate, fetchCostEstimates, updateCostEstimate } from "../../../../../../redux/slices/costEstimatesSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { FaDownload, FaTrash } from "react-icons/fa";
// import Swal from 'sweetalert2';
// import { fetchProject } from "../../../../../../redux/slices/ProjectsSlice";
// import { fetchClient } from "../../../../../../redux/slices/ClientSlice";
// import { createReceivablePurchase, fetchReceivablePurchases, imagelogoreceivablePurchase } from "../../../../../../redux/slices/receivablePurchaseSlice";
// import { jsPDF } from "jspdf";
// import autoTable from 'jspdf-autotable';
// import { FaRegCopy } from "react-icons/fa";
// import axios from "axios";
// import axiosInstance from "../../../../../../redux/utils/axiosInstance";

// function CostEstimates({ projectNO }) {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   console.log("projectNO", projectNO)
//   const projectID = projectNO;

//   // State declarations
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedPOStatus, setSelectedPOStatus] = useState("All PO Status");
//   const [selectedStatus, setSelectedStatus] = useState("All Status");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const [selectedPO, setSelectedPO] = useState(null);
//   const [showAddPOModal, setShowAddPOModal] = useState(false);
//   const [stampFile, setStampFile] = React.useState(null);
//   const fileInputRef = useRef(null);
//   // PO Form states
//   const [selectedProjectId, setSelectedProjectId] = useState("");
//   const [selectedPoNumber, setSelectedPoNumber] = useState(""); // Added PO Number state
//   const [selectedClientId, setSelectedClientId] = useState("");
//   const [costEstimatesId, setCostEstimatesId] = useState("");
//   const [poDate, setPODate] = useState("");
//   const [POStatus, setPOStatus] = useState("");
//   const [amount, setAmount] = useState("");
//   const [poDocument, setPODocument] = useState(null);
//   const { project } = useSelector((state) => state.projects);
//   const { Clients } = useSelector((state) => state.client);
//   const statuses = ["pending ", "Received", "Cancelled", "Completed", "open", "invoiced"];
//   const { logoreceivablePurchase } = useSelector((state) => state.receivablePurchases);
//   console.log("gg", logoreceivablePurchase.image);

//   useEffect(() => {
//     dispatch(fetchProject());
//     dispatch(fetchClient());
//     dispatch(fetchCostEstimates());
//     dispatch(imagelogoreceivablePurchase())
//   }, [dispatch]);

//   useEffect(() => {
//     if (Clients && project?.data?.length) {
//       const foundProject = project.data.find(p => p._id === selectedClientId);
//       if (foundProject) {
//         setSelectedProjectId(foundProject._id);
//       }
//     }
//   }, [Clients, project, selectedClientId]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) {
//         Swal.fire({
//           icon: "error",
//           title: "File too large",
//           text: "Please upload a file smaller than 10MB",
//         });
//         return;
//       }
//       setPODocument(file);
//       setStampFile(file);
//       console.log("stamp", stampFile)
//     }
//   };

//   const handleSavePO = async () => {
//     // if (!selectedProjectId || !selectedClientId || !poDate || !amount) {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Required Fields Missing',
//     //     text: 'Please fill all required fields'
//     //   });
//     //   return;
//     // }
//     const formData = new FormData();
//     formData.append('projectsId', JSON.stringify([selectedProjectId]));
//     formData.append('ClientId', selectedClientId);
//     formData.append('ReceivedDate', poDate);
//     formData.append('POStatus', POStatus || "Pending");
//     formData.append('Amount', amount);
//     formData.append('CostEstimatesId', JSON.stringify([costEstimatesId]));
//     formData.append('PONumber', selectedPoNumber);
//     console.log("kkkkkk", costEstimatesId)

//     if (poDocument) {
//       formData.append('image', poDocument);
//     }

//     try {
//       const result = await dispatch(createReceivablePurchase(formData));
//       // Agar API success ho jaye tab fetch karo
//       if (createReceivablePurchase.fulfilled.match(result)) {
//         Swal.fire({
//           icon: 'success',
//           title: 'PO Created',
//           text: 'Purchase order created successfully'
//         });
//         // Reset fields
//         setSelectedProjectId("");
//         setSelectedClientId("");
//         setCostEstimatesId("");
//         setPODate("");
//         setPOStatus("Pending");
//         setAmount("");
//         setSelectedPoNumber(""); // Reset PO Number
//         setPODocument(null);
//         setShowAddPOModal(false);
//         dispatch(updateCostEstimate({
//           id: costEstimatesId,
//           data: {
//             projectId: selectedProjectId,
//             clientId: selectedClientId,
//             CostPOStatus: "Received"
//           }
//         }))
//         // ✅ Now fetch updated list
//         dispatch(fetchReceivablePurchases());
//         navigate("/admin/receivable");
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Creation Failed',
//           text: 'Failed to create purchase order.'
//         });
//       }
//     } catch (err) {
//       console.error("Error creating PO:", err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Something went wrong while creating purchase order.'
//       });
//     }
//   }

//   // Convert to Invoice handler
//   const handleConvertToInvoice = (po) => {
//     setSelectedPO(po);
//     setShowInvoiceModal(true);
//   };

//   const Ponamehandle = (po) => {
//     console.log(po.clients[0].clientName, po.projects[0].projectName, "ddd");
//     console.log(po);
//     setSelectedClientId(po.clients[0]?.clientId || "");
//     setSelectedProjectId(po.projects[0]?.projectId || "");
//     setPOStatus("Pending"); // ✅ Default status set here
//     // Generate a default PO number based on estimate reference
//     setSelectedPoNumber(`PO-${po.estimateRef?.split("-")[1] || Date.now()}`);
//     setSelectedPO(po);
//     setShowAddPOModal(true);
//   };

//   // Add PO Modal
//   const renderAddPOModal = () => (
//     <Modal show={showAddPOModal} onHide={() => setShowAddPOModal(false)} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Add Purchase Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-2">
//             <div className="row justify-content-center">
//               <div className="col-md-12">
//                 <Form.Label className="d-block">PO Number</Form.Label>
//                 <Form.Control
//                   value={selectedPoNumber}
//                   onChange={(e) => setSelectedPoNumber(e.target.value)} // Added onChange handler
//                   className="form-control"
//                   placeholder="Enter PO Number"
//                   required
//                 />
//               </div>
//               <div className="row justify-content-center">
//                 <div className="col-md-6">
//                   <Form.Label className="d-block">Project</Form.Label>
//                   <Form.Select
//                     value={selectedProjectId}
//                     disabled
//                     className="form-control"
//                   >
//                     <option value="">
//                       {selectedPO?.projects?.find(p => p.projectId === selectedProjectId)?.projectName || "-- No Project --"}
//                     </option>
//                   </Form.Select>
//                 </div>
//                 <div className="col-md-6">
//                   <Form.Label className="d-block">Client</Form.Label>
//                   <Form.Select
//                     value={selectedClientId}
//                     disabled
//                     className="form-control"
//                   >
//                     <option value="">
//                       {selectedPO?.clients?.find(c => c.clientId === selectedClientId)?.clientName || "-- No Client --"}
//                     </option>
//                   </Form.Select>
//                 </div>
//               </div>
//             </div>
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <div className="row justify-content-center align-items-start">
//               {/* PO Amount Field */}
//               <div className="col-md-6 mb-3 mb-md-0">
//                 <Form.Label className="d-block">PO Amount</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={
//                     selectedPO?.lineItems
//                       ? selectedPO.lineItems.reduce((sum, item) => sum + (item.amount || 0), 0)
//                       : amount
//                   }
//                   // value={selectedPO?.lineItems?.[0]?.amount || amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className="form-control"
//                   placeholder="Enter amount"
//                   // disabled={!!selectedPO?.lineItems?.[0]?.amount}
//                   required
//                 />
//               </div>
//               {/* PO Date Field */}
//               <div className="col-md-6">
//                 <Form.Label className="d-block">PO Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={selectedPO?.estimateDate ? selectedPO.estimateDate.split('T')[0] : poDate}
//                   onChange={(e) => setPODate(e.target.value)}
//                   className="form-control"
//                   // disabled={!!selectedPO?.estimateDate}
//                   required
//                 />
//               </div>
//             </div>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer className="d-flex justify-content-end gap-2">
//         <Button variant="secondary" onClick={() => setShowAddPOModal(false)}>Cancel</Button>
//         <Button variant="primary" onClick={handleSavePO}>Save PO</Button>
//       </Modal.Footer>
//     </Modal>
//   );

//   // //////////
//   const { estimates, loading, error } = useSelector((state) => state.costEstimates);
//   console.log("Cost Estimates:", estimates.costEstimates);

//   useEffect(() => {
//     dispatch(fetchCostEstimates());
//   }, [dispatch]);

//   // ye ok code hai 
//   const getStatusClass = (status) => {
//     switch ((status || "").toLowerCase().trim()) {
//       case "active":
//       case "active project":
//       case "open":
//         return "bg-primary text-white";
//       case "inactive":
//         return "bg-secondary text-white";
//       case "in progress":
//       case "pending":
//         return "bg-warning text-dark";
//       case "completed":
//         return "bg-success text-white";
//       case "closed":
//         return "bg-dark text-white";
//       case "cancelled":
//         return "bg-danger text-white";
//       case "on hold":
//       case "review":
//         return "bg-info text-dark";
//       case "not started":
//         return "bg-secondary text-white";
//       // case "pending":
//       //   return "bg-warning text-dark";     // Yellow
//       case "received":
//         return "bg-info text-dark";        // Light Blue
//       // case "cancelled":
//       //   return "bg-danger text-white";     // Red
//       // case "completed":
//       //   return "bg-success text-white";    // Green
//       // case "open":
//       //   return "bg-primary text-white";    // Blue
//       case "invoiced":
//         return "bg-dark text-white";       // Dark (You can change it as needed)
//       // case "in progress":
//       case "in_progress":
//         return "bg-warning text-dark";
//       // case "active":
//       //   return "bg-primary text-white";
//       case "reject":
//         return "bg-danger text-white";
//       // case "review":
//       //   return "bg-info text-dark";
//       // case "not started":
//       //   return "bg-secondary text-white";
//       default:
//         return "bg-light text-dark";
//     }
//   };

//   const handleDelete = (_id) => {
//     console.log(_id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteCostEstimate(_id))
//           .then(() => {
//             Swal.fire("Deleted!", "The document has been deleted.", "success");
//             dispatch(fetchCostEstimates());
//           })
//           .catch(() => {
//             Swal.fire("Error!", "Something went wrong.", "error");
//           });
//       }
//     });
//   }

//   const Duplicate = (po) => {
//     navigate(`/admin/AddCostEstimates`, {
//       state: {
//         po: {
//           ...po, // pehle ka po ka sara data
//           CostPOStatus: "Pending" // is field ko override kar rahe hai
//         },
//         isDuplicate: true
//       }
//     });
//   };

//   const UpdateEstimate = (po) => {
//     navigate(`/admin/AddCostEstimates`, {
//       state: {
//         po,
//       }
//     })
//   }

//   // PAGINATION SETUP FOR ESTIMATES
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   // Add filtering logic before pagination
//   const filteredEstimates = estimates?.costEstimates
//     ?.slice()
//     .reverse()
//     .filter((estimate) => {
//       // Split searchQuery by spaces, ignore empty terms
//       const terms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
//       // Prepare searchable fields as strings
//       const estimateRef = (estimate.estimateRef || '').toLowerCase();
//       // FIX: Use 'clients' and 'projects' fields for search
//       const clientName = (estimate.clients?.[0]?.clientName || '').toLowerCase();
//       const projectNames = (estimate.projects || []).map(project => (project.projectName || project.name || '').toLowerCase()).join(' ');
//       const status = (estimate.Status || '').toLowerCase();
//       const poStatus = (estimate.CostPOStatus || '').toLowerCase();
//       const fields = [
//         estimateRef,
//         clientName,
//         projectNames,
//         status,
//         poStatus
//       ];
//       // Every term must be found in at least one field
//       const matchesSearch = terms.length === 0 || terms.every(term =>
//         fields.some(field => field.includes(term))
//       );
//       // Fix: Correctly map filter values to actual data values
//       let matchesPOStatus = true;
//       if (selectedPOStatus === "Open") {
//         matchesPOStatus = poStatus === "pending";
//       } else if (selectedPOStatus === "Active") {
//         matchesPOStatus = poStatus === "active" || poStatus === "received";
//       } // else "All PO Status" will match all
//       const matchesStatus = selectedStatus === "All Status" ||
//         estimate.Status === selectedStatus;
//       // FIX: Compare date in 'YYYY-MM-DD' format
//       const estimateDateStr = estimate.estimateDate ? estimate.estimateDate.slice(0, 10) : "";
//       const matchesDate = !selectedDate || estimateDateStr === selectedDate;
//       return matchesSearch && matchesPOStatus && matchesStatus && matchesDate;
//     });

//   // Update pagination to use filtered data
//   const totalItems = filteredEstimates?.length || 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const paginatedEstimates = filteredEstimates
//     ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   // Helper to fetch image and convert to base64
//   const getImageBase64 = async (url) => {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   const handleDownloadPDF = async (po) => {
//     try {
//       const response = await axiosInstance.post(
//         `/pdf?CostEstimatesId=${po._id}`,
//         {
//           projectId: po.projectId?.map((p) => p._id),
//           clientId: po.clientId?.map((c) => c._id),
//         }
//       );
//       const estimate = response.data?.data?.[0];
//       if (!estimate) throw new Error("No estimate data found");
//       const client = estimate.clientId || {};
//       const project = estimate.projectId || {};
//       const lineItems = estimate.lineItems || [];
//       const doc = new jsPDF("p", "pt", "a4");
//       const pageWidth = doc.internal.pageSize.width;
//       const pageHeight = doc.internal.pageSize.height;
//       const marginLeft = 40;
//       const contentWidth = pageWidth - marginLeft * 2;
//       // === HEADER ===
//       doc.setFillColor(229, 62, 62);
//       doc.rect(marginLeft, 40, 200, 50, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFontSize(14);
//       const logoUrl = estimate.image[0];
//       const logoBase64 = await getImageBase64(logoUrl);
//       doc.addImage(logoBase64, "PNG", marginLeft + 5, 45, 60, 40);
//       doc.setFont("helvetica", "bold");
//       doc.text("SAARANIK", marginLeft + 70, 60);
//       doc.setFontSize(8);
//       doc.setFont("helvetica", "normal");
//       doc.text("COMPANY ADDRESS DETAILS", marginLeft + 70, 75);
//       doc.setTextColor(0, 0, 0);
//       // === Estimate Info (Right) ===
//       doc.setFontSize(12);
//       doc.setFont("helvetica", "bold");
//       doc.text(
//         `Cost Estimate No. ${estimate.estimateRef || "---"}`,
//         pageWidth - marginLeft - 180,
//         50
//       );
//       doc.setFontSize(10);
//       doc.setFont("helvetica", "normal");
//       doc.text(
//         `Date: ${new Date(estimate.estimateDate).toLocaleDateString("en-GB")}`,
//         pageWidth - marginLeft - 180,
//         65
//       );
//       doc.text(`Req. Ref.: --`, pageWidth - marginLeft - 180, 80);
//       // === Client Info ===
//       let currentY = 120;
//       doc.setFontSize(10);
//       doc.text("To,", marginLeft, currentY);
//       currentY += 15;
//       doc.text(
//         ` ${client?.clientName || "Client Name"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${project?.projectName || "Client Company Name"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.clientAddress?.split(",")[0] || "Address Line 1"
//         }`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.shippingInformation?.[0]?.shippingAddress ||
//         "Address Line 2"
//         }`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.contactPersons?.[0]?.email || "email"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.contactPersons?.[0]?.phone || "Phone"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 25;
//       // === Table Data ===
//       const tableData = lineItems.map((item, index) => [
//         (index + 1).toString(),
//         item.description || "",
//         (item.quantity || 0).toString(),
//         (item.rate || 0).toLocaleString("en-IN", {
//           minimumFractionDigits: 2,
//         }),
//         ((item.quantity || 0) * (item.rate || 0)).toLocaleString("en-IN", {
//           minimumFractionDigits: 2,
//         }),
//       ]);
//       for (let i = 0; i < 15; i++) tableData.push(["", "", "", "", ""]);
//       let finalY;
//       autoTable(doc, {
//         startY: currentY,
//         head: [
//           [
//             "ITEM #",
//             "Brand & Design / Description",
//             "QTY",
//             "Unit Price (INR)",
//             "Amount (INR)",
//           ],
//         ],
//         body: tableData,
//         styles: {
//           fontSize: 9,
//           cellPadding: 4,
//           lineColor: [0, 0, 0],
//           lineWidth: 0.3,
//           halign: "center",
//           valign: "middle",
//         },
//         headStyles: {
//           fillColor: [230, 230, 230],
//           textColor: [0, 0, 0],
//           fontStyle: "bold",
//           fontSize: 9,
//           halign: "center",
//         },
//         columnStyles: {
//           0: { halign: "center", cellWidth: 50 },
//           1: { halign: "left", cellWidth: contentWidth - 260 },
//           2: { halign: "center", cellWidth: 40 },
//           3: { halign: "right", cellWidth: 80 },
//           4: { halign: "right", cellWidth: 90 },
//         },
//         theme: "grid",
//         margin: { left: marginLeft, right: marginLeft },
//         didDrawPage: (data) => {
//           finalY = data.cursor.y;
//         },
//       });
//       // === Totals Section ===
//       const subTotal = lineItems.reduce(
//         (sum, item) =>
//           sum + (item.quantity || 0) * (item.rate || 0),
//         0
//       );
//       const vat = (subTotal * (estimate.VATRate || 0)) / 100;
//       const total = subTotal + vat;
//       const totalsBoxX = pageWidth - marginLeft - 120;
//       const totalsBoxY = finalY + 20;

//       const footerY = totalsBoxY + 65;
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9);
//       doc.text("• Cost based on One-off prices.", marginLeft, footerY);
//       doc.text(
//         "• The above prices valid for 2 weeks and thereafter subject to our reconfirmation.",
//         marginLeft,
//         footerY + 12
//       );
//       doc.setFont("helvetica", "bold");
//       doc.text(`For Your Company Name`, marginLeft, footerY + 40);
//       doc.setFont("helvetica", "normal");
//       doc.text(
//         "(This is system generated document, hence not signed.)",
//         marginLeft,
//         footerY + 55
//       );
//       // === Save PDF ===
//       doc.save(`Cost_Estimate_${estimate.estimateRef || "Estimate"}.pdf`);
//     } catch (error) {
//       console.error("❌ Error generating PDF:", error);
//       alert("Failed to generate PDF.");
//     }
//   };

//   const CostEstimatesDetails = (po) => {
//     navigate(`/admin/OvervieCostEstimates`, { state: { po } });
//   };

//   return (
//     <div
//       className="p-4 m-2"
//       style={{ backgroundColor: "white", borderRadius: "10px" }} >
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <h2 className="fw-semibold mb-3">Cost Estimates</h2>
//         {/* <Link to={"/admin/AddCostEstimates"}> */}
//         <button id="btn-All" onClick={() => { navigate(`/admin/AddCostEstimates`, { state: { idProject: projectID } }) }} className=" btn-dark" style={{ border: "none", borderRadius: "10px" }}>
//           <BsPlusLg className="me-2" /> New Estimate
//         </button>
//         {/* </Link> */}
//       </div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div className="filters d-flex flex-wrap gap-1 mb-4">
//           <div className="search-container flex-grow-1">
//             <Form.Control
//               type="search"
//               placeholder="Search by Job #, Brand Name, Sub Brand, Flavour, Pack Type, Pack Size..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input"
//             />
//           </div>
//           <div className="search-container flex-grow-1">
//             <Form.Control
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="form-control"
//             />
//           </div>
//           <Dropdown className="filter-dropdown">
//             <Dropdown.Toggle
//               variant="light"
//               id="po-status-dropdown"
//               className="custom-dropdown"
//             >
//               {selectedPOStatus}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("All PO Status")}>All PO Status</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("Open")}>Open</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("Active")}>Active</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//           <Dropdown className="filter-dropdown">
//             <Dropdown.Toggle
//               variant="light"
//               id="status-dropdown"
//               className="custom-dropdown"
//             >
//               {selectedStatus}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setSelectedStatus("All Status")}>All Status</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Active")}>Active</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("pending")}>pending</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Invoice")}>Invoice</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Completed")}>Completed</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//       <div className="table-responsive" style={{ maxHeight: "900px", overflowY: "auto" }}>
//         <Table hover className="align-middle sticky-header">
//           <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 1 }}>
//             <tr>
//               {/* <th><input type="checkbox" /></th> */}
//               <th style={{ whiteSpace: 'nowrap' }}>CE No</th>
//               <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
//               <th style={{ whiteSpace: 'nowrap' }}>Project No</th>
//               <th style={{ whiteSpace: 'nowrap' }}>Client Name</th>
//               {/* <th style={{ whiteSpace: 'nowrap' }}>Client Email</th> */}
//               <th>Date</th>
//               {/* <th>ProjectNo</th> */}
//               <th>Amount</th>
//               <th style={{ whiteSpace: 'nowrap' }}>PO Status</th>
//               <th style={{ whiteSpace: 'nowrap' }}>CE Status</th>
//               {/* <th>POStatus</th> */}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedEstimates?.filter((item) => {
//               return (
//                 item.projects[0].projectId == projectNO
//               )
//             }).map((po, index) => (
//               <tr style={{ whiteSpace: "nowrap" }} key={po.poNumber}>
//                 {/* <td><input type="checkbox" /></td> */}
//                 <td onClick={() => CostEstimatesDetails(po)}>
//                   <Link style={{ textDecoration: 'none', border: 'none' }}>
//                     {po.estimateRef}
//                   </Link>
//                 </td>
//                 <td>
//                   {po.projects?.map((project) => project.projectName).join(", ")}
//                 </td>
//                 <td>
//                   {po.projects?.map((project) => project.projectNo).join(", ")}
//                 </td>
//                 <td>{po.clients?.[0]?.clientName || 'N/A'}</td>
//                 {/* <td>{po.clients?.[0]?.clientEmail || 'N/A'}</td> */}
//                 <td>{new Date(po.estimateDate).toLocaleDateString("en-GB").slice(0, 8)}</td>
//                 <td>
//                   {po.lineItems?.reduce((total, item) => total + (item.amount || 0), 0).toFixed(2)}
//                 </td>
//                 <td>
//                   <span className={`badge ${getStatusClass(po.CostPOStatus)} px-2 py-1`}>
//                     {po.CostPOStatus == 'Pending' ? 'pending' : 'received'}
//                   </span>
//                 </td>
//                 <td>
//                   <span className={`badge ${getStatusClass(po.Status)} px-2 py-1`}>
//                     {po.Status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <button className="btn btn-sm btn-success"
//                       disabled={
//                         po.CostPOStatus?.length > 0 &&
//                         po.CostPOStatus.toLowerCase() !== "pending"
//                       }
//                       onClick={() => {
//                         setCostEstimatesId(po._id); // Store the ID
//                         Ponamehandle(po)
//                         setShowAddPOModal(true);   // Open Modal
//                       }}
//                     >
//                       Add PO
//                     </button>
//                     <span className={`badge ${getStatusClass(
//                       po.receivablePurchases?.[0]?.POStatus?.toLowerCase() || "pending"
//                     )} px-2 py-1`}>
//                       {/* {po.receivablePurchases?.[0]?.POStatus || 'pending'} */}
//                     </span>
//                     <button className="btn btn-sm btn-primary" onClick={() => Duplicate(po)}><FaRegCopy /></button>
//                     {/* <button className="btn btn-sm btn-primary" onClick={() => handleConvertToInvoice(po)}>ConvertInvoice</button> */}
//                     <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateEstimate(po)}><BsPencil /></button>
//                     {/* <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(po._id))}>
//                             <FaTrash />
//                           </button> */}
//                     <button
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={() => handleDownloadPDF(po)}
//                     >
//                       <FaDownload />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//       {/* Modal for converting to invoice */}
//       <Modal
//         show={showInvoiceModal}
//         onHide={() => setShowInvoiceModal(false)}
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Convert Estimate to Invoice</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Invoice Number</Form.Label>
//               {/* <Form.Control
//                   type="text"
//                   defaultValue={
//                     selectedPO
//                       ? `INV-${selectedPO.estimateRef.split("-")[1]}`
//                       : ""
//                   }
//                   disabled
//                 /> */}
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Invoice Date</Form.Label>
//               <Form.Control type="date" />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Client</Form.Label>
//               <Form.Control
//                 type="text"
//                 defaultValue={selectedPO?.client}
//                 readOnly
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Due Date</Form.Label>
//               <Form.Control type="date" />
//             </Form.Group>
//             <hr />
//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control type="text" defaultValue="Web Design Services" />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control type="number" defaultValue="1" />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Rate</Form.Label>
//               <Form.Control type="number" defaultValue={selectedPO?.amount} />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="text"
//                 // value={`$${selectedPO?.amount.toFixed(2)}`}
//                 disabled
//               />
//             </Form.Group>
//             <hr />
//             <div className="d-flex justify-content-between">
//               <div>
//                 <strong>Subtotal:</strong>
//                 {/* <span> ${selectedPO?.amount.toFixed(2)}</span> */}
//               </div>
//               <div>
//                 <strong>Tax (10%):</strong>
//                 {/* <span> ${calculateTax(selectedPO?.amount).toFixed(2)}</span> */}
//               </div>
//               <div>
//                 <strong>Total:</strong>
//                 {/* <span> ${calculateTotal(selectedPO?.amount).toFixed(2)}</span> */}
//               </div>
//             </div>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowInvoiceModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button variant="primary">Create Invoice</Button>
//         </Modal.Footer>
//       </Modal>
//       {renderAddPOModal()}
//       {/* Modal for converting to invoice */}
//       {!loading && !error && (
//         <div className="d-flex justify-content-between align-items-center mt-3">
//           <div className="text-muted small">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
//           </div>
//           <ul className="pagination pagination-sm mb-0">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
//                 <span aria-hidden="true">&laquo;</span>
//               </button>
//             </li>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                 <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
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

// export default CostEstimates;

// import React, { useEffect, useState, useRef } from "react";
// import { Modal, Form, Table, Badge, Dropdown, Button } from "react-bootstrap";
// import { BsPlusLg, BsPencil, BsTrash, BsUpload, BsClipboard } from "react-icons/bs";
// import { Link, useNavigate } from "react-router-dom";
// import { deleteCostEstimate, fetchCostEstimates, updateCostEstimate } from "../../../../../../redux/slices/costEstimatesSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { FaDownload, FaTrash } from "react-icons/fa";
// import Swal from 'sweetalert2';
// import { fetchProject } from "../../../../../../redux/slices/ProjectsSlice";
// import { fetchClient } from "../../../../../../redux/slices/ClientSlice";
// import { createReceivablePurchase, fetchReceivablePurchases, imagelogoreceivablePurchase } from "../../../../../../redux/slices/receivablePurchaseSlice";
// import { jsPDF } from "jspdf";
// import autoTable from 'jspdf-autotable';
// import { FaRegCopy } from "react-icons/fa";
// import axios from "axios";
// import axiosInstance from "../../../../../../redux/utils/axiosInstance";

// function CostEstimates({ projectNO }) {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   console.log("projectNO", projectNO)
//   const projectID = projectNO;
//   // State declarations
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedPOStatus, setSelectedPOStatus] = useState("All PO Status");
//   const [selectedStatus, setSelectedStatus] = useState("All Status");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const [selectedPO, setSelectedPO] = useState(null);
//   const [showAddPOModal, setShowAddPOModal] = useState(false);
//   const [stampFile, setStampFile] = React.useState(null);
//   const fileInputRef = useRef(null);
//   // PO Form states
//   const [selectedProjectId, setSelectedProjectId] = useState("");
//   const [selectedPoNumber, setSelectedPoNumber] = useState(""); // Added PO Number state
//   const [selectedClientId, setSelectedClientId] = useState("");
//   const [costEstimatesId, setCostEstimatesId] = useState("");
//   const [poDate, setPODate] = useState("");
//   const [POStatus, setPOStatus] = useState("");
//   const [amount, setAmount] = useState("");
//   const [poDocument, setPODocument] = useState(null);
//   const [isAmountEditable, setIsAmountEditable] = useState(false); // New state to control amount editability

//   const { project } = useSelector((state) => state.projects);
//   const { Clients } = useSelector((state) => state.client);
//   const statuses = ["pending ", "Received", "Cancelled", "Completed", "open", "invoiced"];
//   const { logoreceivablePurchase } = useSelector((state) => state.receivablePurchases);
//   console.log("gg", logoreceivablePurchase.image);

//   useEffect(() => {
//     dispatch(fetchProject());
//     dispatch(fetchClient());
//     dispatch(fetchCostEstimates());
//     dispatch(imagelogoreceivablePurchase())
//   }, [dispatch]);

//   useEffect(() => {
//     if (Clients && project?.data?.length) {
//       const foundProject = project.data.find(p => p._id === selectedClientId);
//       if (foundProject) {
//         setSelectedProjectId(foundProject._id);
//       }
//     }
//   }, [Clients, project, selectedClientId]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) {
//         Swal.fire({
//           icon: "error",
//           title: "File too large",
//           text: "Please upload a file smaller than 10MB",
//         });
//         return;
//       }
//       setPODocument(file);
//       setStampFile(file);
//       console.log("stamp", stampFile)
//     }
//   };

//   const handleSavePO = async () => {
//     // if (!selectedProjectId || !selectedClientId || !poDate || !amount) {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Required Fields Missing',
//     //     text: 'Please fill all required fields'
//     //   });
//     //   return;
//     // }
//     const formData = new FormData();
//     formData.append('projectsId', JSON.stringify([selectedProjectId]));
//     formData.append('ClientId', selectedClientId);
//     formData.append('ReceivedDate', poDate);
//     formData.append('POStatus', POStatus || "Pending");
//     formData.append('Amount', amount);
//     formData.append('CostEstimatesId', JSON.stringify([costEstimatesId]));
//     formData.append('PONumber', selectedPoNumber);
//     console.log("kkkkkk", costEstimatesId)
//     if (poDocument) {
//       formData.append('image', poDocument);
//     }
//     try {
//       const result = await dispatch(createReceivablePurchase(formData));
//       // Agar API success ho jaye tab fetch karo
//       if (createReceivablePurchase.fulfilled.match(result)) {
//         Swal.fire({
//           icon: 'success',
//           title: 'PO Created',
//           text: 'Purchase order created successfully'
//         });
//         // Reset fields
//         setSelectedProjectId("");
//         setSelectedClientId("");
//         setCostEstimatesId("");
//         setPODate("");
//         setPOStatus("Pending");
//         setAmount("");
//         setSelectedPoNumber(""); // Reset PO Number
//         setPODocument(null);
//         setIsAmountEditable(false); // Reset editability state
//         setShowAddPOModal(false);
//         dispatch(updateCostEstimate({
//           id: costEstimatesId,
//           data: {
//             projectId: selectedProjectId,
//             clientId: selectedClientId,
//             CostPOStatus: "Received"
//           }
//         }))
//         // ✅ Now fetch updated list
//         dispatch(fetchReceivablePurchases());
//         navigate("/admin/receivable");
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Creation Failed',
//           text: 'Failed to create purchase order.'
//         });
//       }
//     } catch (err) {
//       console.error("Error creating PO:", err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Something went wrong while creating purchase order.'
//       });
//     }
//   }

//   // Convert to Invoice handler
//   const handleConvertToInvoice = (po) => {
//     setSelectedPO(po);
//     setShowInvoiceModal(true);
//   };

//   const Ponamehandle = (po) => {
//     console.log(po.clients[0].clientName, po.projects[0].projectName, "ddd");
//     console.log(po);
//     setSelectedClientId(po.clients[0]?.clientId || "");
//     setSelectedProjectId(po.projects[0]?.projectId || "");
//     setPOStatus("Pending"); // ✅ Default status set here
//     // Generate a default PO number based on estimate reference
//     setSelectedPoNumber(`PO-${po.estimateRef?.split("-")[1] || Date.now()}`);

//     // Calculate total amount from line items
//     const totalAmount = po.lineItems?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
//     setAmount(totalAmount.toString());

//     setSelectedPO(po);
//     setShowAddPOModal(true);
//   };

//   // Add PO Modal
//   const renderAddPOModal = () => (
//     <Modal show={showAddPOModal} onHide={() => setShowAddPOModal(false)} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Add Purchase Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-2">
//             <div className="row justify-content-center">
//               <div className="col-md-12">
//                 <Form.Label className="d-block">PO Number</Form.Label>
//                 <Form.Control
//                   value={selectedPoNumber}
//                   onChange={(e) => setSelectedPoNumber(e.target.value)} // Added onChange handler
//                   className="form-control"
//                   placeholder="Enter PO Number"
//                   required
//                 />
//               </div>
//               <div className="row justify-content-center">
//                 <div className="col-md-6">
//                   <Form.Label className="d-block">Project</Form.Label>
//                   <Form.Select
//                     value={selectedProjectId}
//                     disabled
//                     className="form-control"
//                   >
//                     <option value="">
//                       {selectedPO?.projects?.find(p => p.projectId === selectedProjectId)?.projectName || "-- No Project --"}
//                     </option>
//                   </Form.Select>
//                 </div>
//                 <div className="col-md-6">
//                   <Form.Label className="d-block">Client</Form.Label>
//                   <Form.Select
//                     value={selectedClientId}
//                     disabled
//                     className="form-control"
//                   >
//                     <option value="">
//                       {selectedPO?.clients?.find(c => c.clientId === selectedClientId)?.clientName || "-- No Client --"}
//                     </option>
//                   </Form.Select>
//                 </div>
//               </div>
//             </div>
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <div className="row justify-content-center align-items-start">
//               {/* PO Amount Field */}
//               <div className="col-md-6 mb-3 mb-md-0">
//                 <Form.Label className="d-block">PO Amount</Form.Label>
//                 <div className="input-group">
//                   <Form.Control
//                     type="number"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     className="form-control"
//                     placeholder="Enter amount"
//                     required
//                   />
//                   {/* <Button
//                     variant="outline-secondary"
//                     onClick={() => setIsAmountEditable(!isAmountEditable)}
//                     title={isAmountEditable ? "Lock amount" : "Edit amount"}
//                   >
//                     {isAmountEditable ? <BsPencil /> : <BsPencil />}
//                   </Button> */}
//                 </div>
//               </div>
//               {/* PO Date Field */}
//               <div className="col-md-6">
//                 <Form.Label className="d-block">PO Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={selectedPO?.estimateDate ? selectedPO.estimateDate.split('T')[0] : poDate}
//                   onChange={(e) => setPODate(e.target.value)}
//                   className="form-control"
//                   required
//                 />
//               </div>
//             </div>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer className="d-flex justify-content-end gap-2">
//         <Button variant="secondary" onClick={() => {
//           setShowAddPOModal(false);
//           setIsAmountEditable(false); // Reset editability state when closing modal
//         }}>Cancel</Button>
//         <Button variant="primary" onClick={handleSavePO}>Save PO</Button>
//       </Modal.Footer>
//     </Modal>
//   );
//   // //////////
//   const { estimates, loading, error } = useSelector((state) => state.costEstimates);
//   console.log("Cost Estimates:", estimates.costEstimates);

//   useEffect(() => {
//     dispatch(fetchCostEstimates());
//   }, [dispatch]);
//   // ye ok code hai 
//   const getStatusClass = (status) => {
//     switch ((status || "").toLowerCase().trim()) {
//       case "active":
//       case "active project":
//       case "open":
//         return "bg-primary text-white";
//       case "inactive":
//         return "bg-secondary text-white";
//       case "in progress":
//       case "pending":
//         return "bg-warning text-dark";
//       case "completed":
//         return "bg-success text-white";
//       case "closed":
//         return "bg-dark text-white";
//       case "cancelled":
//         return "bg-danger text-white";
//       case "on hold":
//       case "review":
//         return "bg-info text-dark";
//       case "not started":
//         return "bg-secondary text-white";
//       // case "pending":
//       //   return "bg-warning text-dark";     // Yellow
//       case "received":
//         return "bg-info text-dark";        // Light Blue
//       // case "cancelled":
//       //   return "bg-danger text-white";     // Red
//       // case "completed":
//       //   return "bg-success text-white";    // Green
//       // case "open":
//       //   return "bg-primary text-white";    // Blue
//       case "invoiced":
//         return "bg-dark text-white";       // Dark (You can change it as needed)
//       // case "in progress":
//       case "in_progress":
//         return "bg-warning text-dark";
//       // case "active":
//       //   return "bg-primary text-white";
//       case "reject":
//         return "bg-danger text-white";
//       // case "review":
//       //   return "bg-info text-dark";
//       // case "not started":
//       //   return "bg-secondary text-white";
//       default:
//         return "bg-light text-dark";
//     }
//   };

//   const handleDelete = (_id) => {
//     console.log(_id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteCostEstimate(_id))
//           .then(() => {
//             Swal.fire("Deleted!", "The document has been deleted.", "success");
//             dispatch(fetchCostEstimates());
//           })
//           .catch(() => {
//             Swal.fire("Error!", "Something went wrong.", "error");
//           });
//       }
//     });
//   }

//   const Duplicate = (po) => {
//     navigate(`/admin/AddCostEstimates`, {
//       state: {
//         po: {
//           ...po, // pehle ka po ka sara data
//           CostPOStatus: "Pending" // is field ko override kar rahe hai
//         },
//         isDuplicate: true
//       }
//     });
//   };

//   const UpdateEstimate = (po) => {
//     navigate(`/admin/AddCostEstimates`, {
//       state: {
//         po,
//       }
//     })
//   }
//   // PAGINATION SETUP FOR ESTIMATES
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   // Add filtering logic before pagination
//   const filteredEstimates = estimates?.costEstimates
//     ?.slice()
//     .reverse()
//     .filter((estimate) => {
//       // Split searchQuery by spaces, ignore empty terms
//       const terms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
//       // Prepare searchable fields as strings
//       const estimateRef = (estimate.estimateRef || '').toLowerCase();
//       // FIX: Use 'clients' and 'projects' fields for search
//       const clientName = (estimate.clients?.[0]?.clientName || '').toLowerCase();
//       const projectNames = (estimate.projects || []).map(project => (project.projectName || project.name || '').toLowerCase()).join(' ');
//       const status = (estimate.Status || '').toLowerCase();
//       const poStatus = (estimate.CostPOStatus || '').toLowerCase();
//       const fields = [
//         estimateRef,
//         clientName,
//         projectNames,
//         status,
//         poStatus
//       ];
//       // Every term must be found in at least one field
//       const matchesSearch = terms.length === 0 || terms.every(term =>
//         fields.some(field => field.includes(term))
//       );
//       // Fix: Correctly map filter values to actual data values
//       let matchesPOStatus = true;
//       if (selectedPOStatus === "Open") {
//         matchesPOStatus = poStatus === "pending";
//       } else if (selectedPOStatus === "Active") {
//         matchesPOStatus = poStatus === "active" || poStatus === "received";
//       } // else "All PO Status" will match all
//       const matchesStatus = selectedStatus === "All Status" ||
//         estimate.Status === selectedStatus;
//       // FIX: Compare date in 'YYYY-MM-DD' format
//       const estimateDateStr = estimate.estimateDate ? estimate.estimateDate.slice(0, 10) : "";
//       const matchesDate = !selectedDate || estimateDateStr === selectedDate;
//       return matchesSearch && matchesPOStatus && matchesStatus && matchesDate;
//     });

//   // Update pagination to use filtered data
//   const totalItems = filteredEstimates?.length || 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const paginatedEstimates = filteredEstimates
//     ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   // Helper to fetch image and convert to base64
//   const getImageBase64 = async (url) => {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   const handleDownloadPDF = async (po) => {
//     try {
//       const response = await axiosInstance.post(
//         `/pdf?CostEstimatesId=${po._id}`,
//         {
//           projectId: po.projectId?.map((p) => p._id),
//           clientId: po.clientId?.map((c) => c._id),
//         }
//       );
//       const estimate = response.data?.data?.[0];
//       if (!estimate) throw new Error("No estimate data found");
//       const client = estimate.clientId || {};
//       const project = estimate.projectId || {};
//       const lineItems = estimate.lineItems || [];
//       const doc = new jsPDF("p", "pt", "a4");
//       const pageWidth = doc.internal.pageSize.width;
//       const pageHeight = doc.internal.pageSize.height;
//       const marginLeft = 40;
//       const contentWidth = pageWidth - marginLeft * 2;
//       // === HEADER ===
//       doc.setFillColor(229, 62, 62);
//       doc.rect(marginLeft, 40, 200, 50, "F");
//       doc.setTextColor(255, 255, 255);
//       doc.setFontSize(14);
//       const logoUrl = estimate.image[0];
//       const logoBase64 = await getImageBase64(logoUrl);
//       doc.addImage(logoBase64, "PNG", marginLeft + 5, 45, 60, 40);
//       doc.setFont("helvetica", "bold");
//       doc.text("SAARANIK", marginLeft + 70, 60);
//       doc.setFontSize(8);
//       doc.setFont("helvetica", "normal");
//       doc.text("COMPANY ADDRESS DETAILS", marginLeft + 70, 75);
//       doc.setTextColor(0, 0, 0);
//       // === Estimate Info (Right) ===
//       doc.setFontSize(12);
//       doc.setFont("helvetica", "bold");
//       doc.text(
//         `Cost Estimate No. ${estimate.estimateRef || "---"}`,
//         pageWidth - marginLeft - 180,
//         50
//       );
//       doc.setFontSize(10);
//       doc.setFont("helvetica", "normal");
//       doc.text(
//         `Date: ${new Date(estimate.estimateDate).toLocaleDateString("en-GB")}`,
//         pageWidth - marginLeft - 180,
//         65
//       );
//       doc.text(`Req. Ref.: --`, pageWidth - marginLeft - 180, 80);
//       // === Client Info ===
//       let currentY = 120;
//       doc.setFontSize(10);
//       doc.text("To,", marginLeft, currentY);
//       currentY += 15;
//       doc.text(
//         ` ${client?.clientName || "Client Name"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${project?.projectName || "Client Company Name"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.clientAddress?.split(",")[0] || "Address Line 1"
//         }`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.shippingInformation?.[0]?.shippingAddress ||
//         "Address Line 2"
//         }`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.contactPersons?.[0]?.email || "email"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.contactPersons?.[0]?.phone || "Phone"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 25;
//       // === Table Data ===
//       const tableData = lineItems.map((item, index) => [
//         (index + 1).toString(),
//         item.description || "",
//         (item.quantity || 0).toString(),
//         (item.rate || 0).toLocaleString("en-IN", {
//           minimumFractionDigits: 2,
//         }),
//         ((item.quantity || 0) * (item.rate || 0)).toLocaleString("en-IN", {
//           minimumFractionDigits: 2,
//         }),
//       ]);
//       for (let i = 0; i < 15; i++) tableData.push(["", "", "", "", ""]);
//       let finalY;
//       autoTable(doc, {
//         startY: currentY,
//         head: [
//           [
//             "ITEM #",
//             "Brand & Design / Description",
//             "QTY",
//             "Unit Price (INR)",
//             "Amount (INR)",
//           ],
//         ],
//         body: tableData,
//         styles: {
//           fontSize: 9,
//           cellPadding: 4,
//           lineColor: [0, 0, 0],
//           lineWidth: 0.3,
//           halign: "center",
//           valign: "middle",
//         },
//         headStyles: {
//           fillColor: [230, 230, 230],
//           textColor: [0, 0, 0],
//           fontStyle: "bold",
//           fontSize: 9,
//           halign: "center",
//         },
//         columnStyles: {
//           0: { halign: "center", cellWidth: 50 },
//           1: { halign: "left", cellWidth: contentWidth - 260 },
//           2: { halign: "center", cellWidth: 40 },
//           3: { halign: "right", cellWidth: 80 },
//           4: { halign: "right", cellWidth: 90 },
//         },
//         theme: "grid",
//         margin: { left: marginLeft, right: marginLeft },
//         didDrawPage: (data) => {
//           finalY = data.cursor.y;
//         },
//       });
//       // === Totals Section ===
//       const subTotal = lineItems.reduce(
//         (sum, item) =>
//           sum + (item.quantity || 0) * (item.rate || 0),
//         0
//       );
//       const vat = (subTotal * (estimate.VATRate || 0)) / 100;
//       const total = subTotal + vat;
//       const totalsBoxX = pageWidth - marginLeft - 120;
//       const totalsBoxY = finalY + 20;
//       const footerY = totalsBoxY + 65;
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(9);
//       doc.text("• Cost based on One-off prices.", marginLeft, footerY);
//       doc.text(
//         "• The above prices valid for 2 weeks and thereafter subject to our reconfirmation.",
//         marginLeft,
//         footerY + 12
//       );
//       doc.setFont("helvetica", "bold");
//       doc.text(`For Your Company Name`, marginLeft, footerY + 40);
//       doc.setFont("helvetica", "normal");
//       doc.text(
//         "(This is system generated document, hence not signed.)",
//         marginLeft,
//         footerY + 55
//       );
//       // === Save PDF ===
//       doc.save(`Cost_Estimate_${estimate.estimateRef || "Estimate"}.pdf`);
//     } catch (error) {
//       console.error("❌ Error generating PDF:", error);
//       alert("Failed to generate PDF.");
//     }
//   };

//   const CostEstimatesDetails = (po) => {
//     navigate(`/admin/OvervieCostEstimates`, { state: { po } });
//   };

//   return (
//     <div
//       className="p-4 m-2"
//       style={{ backgroundColor: "white", borderRadius: "10px" }} >
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <h2 className="fw-semibold mb-3">Cost Estimates</h2>
//         {/* <Link to={"/admin/AddCostEstimates"}> */}
//         <button id="btn-All" onClick={() => { navigate(`/admin/AddCostEstimates`, { state: { idProject: projectID } }) }} className=" btn-dark" style={{ border: "none", borderRadius: "10px" }}>
//           <BsPlusLg className="me-2" /> New Estimate
//         </button>
//         {/* </Link> */}
//       </div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div className="filters d-flex flex-wrap gap-1 mb-4">
//           <div className="search-container flex-grow-1">
//             <Form.Control
//               type="search"
//               placeholder="Search by Job #, Brand Name, Sub Brand, Flavour, Pack Type, Pack Size..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input"
//             />
//           </div>
//           <div className="search-container flex-grow-1">
//             <Form.Control
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="form-control"
//             />
//           </div>
//           <Dropdown className="filter-dropdown">
//             <Dropdown.Toggle
//               variant="light"
//               id="po-status-dropdown"
//               className="custom-dropdown"
//             >
//               {selectedPOStatus}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("All PO Status")}>All PO Status</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("Open")}>Open</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("Active")}>Active</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//           <Dropdown className="filter-dropdown">
//             <Dropdown.Toggle
//               variant="light"
//               id="status-dropdown"
//               className="custom-dropdown"
//             >
//               {selectedStatus}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setSelectedStatus("All Status")}>All Status</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Active")}>Active</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("pending")}>pending</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Invoice")}>Invoice</Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Completed")}>Completed</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//       <div className="table-responsive" style={{ maxHeight: "900px", overflowY: "auto" }}>
//         <Table hover className="align-middle sticky-header">
//           <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 1 }}>
//             <tr>
//               {/* <th><input type="checkbox" /></th> */}
//               <th style={{ whiteSpace: 'nowrap' }}>CE No</th>
//               <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
//               <th style={{ whiteSpace: 'nowrap' }}>Project No</th>
//               <th style={{ whiteSpace: 'nowrap' }}>Client Name</th>
//               {/* <th style={{ whiteSpace: 'nowrap' }}>Client Email</th> */}
//               <th>Date</th>
//               {/* <th>ProjectNo</th> */}
//               <th>Amount</th>
//               <th style={{ whiteSpace: 'nowrap' }}>PO Status</th>
//               <th style={{ whiteSpace: 'nowrap' }}>CE Status</th>
//               {/* <th>POStatus</th> */}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedEstimates?.filter((item) => {
//               return (
//                 item.projects[0].projectId == projectNO
//               )
//             }).map((po, index) => (
//               <tr style={{ whiteSpace: "nowrap" }} key={po.poNumber}>
//                 {/* <td><input type="checkbox" /></td> */}
//                 <td onClick={() => CostEstimatesDetails(po)}>
//                   <Link style={{ textDecoration: 'none', border: 'none' }}>
//                     {po.estimateRef}
//                   </Link>
//                 </td>
//                 <td>
//                   {po.projects?.map((project) => project.projectName).join(", ")}
//                 </td>
//                 <td>
//                   {po.projects?.map((project) => project.projectNo).join(", ")}
//                 </td>
//                 <td>{po.clients?.[0]?.clientName || 'N/A'}</td>
//                 {/* <td>{po.clients?.[0]?.clientEmail || 'N/A'}</td> */}
//                 <td>{new Date(po.estimateDate).toLocaleDateString("en-GB").slice(0, 8)}</td>
//                 <td>
//                   {po.lineItems?.reduce((total, item) => total + (item.amount || 0), 0).toFixed(2)}
//                 </td>
//                 <td>
//                   <span className={`badge ${getStatusClass(po.CostPOStatus)} px-2 py-1`}>
//                     {po.CostPOStatus == 'Pending' ? 'pending' : 'received'}
//                   </span>
//                 </td>
//                 <td>
//                   <span className={`badge ${getStatusClass(po.Status)} px-2 py-1`}>
//                     {po.Status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <button className="btn btn-sm btn-success"
//                       disabled={
//                         po.CostPOStatus?.length > 0 &&
//                         po.CostPOStatus.toLowerCase() !== "pending"
//                       }
//                       onClick={() => {
//                         setCostEstimatesId(po._id); // Store the ID
//                         Ponamehandle(po)
//                         setShowAddPOModal(true);   // Open Modal
//                       }}
//                     >
//                       Add PO
//                     </button>
//                     <span className={`badge ${getStatusClass(
//                       po.receivablePurchases?.[0]?.POStatus?.toLowerCase() || "pending"
//                     )} px-2 py-1`}>
//                       {/* {po.receivablePurchases?.[0]?.POStatus || 'pending'} */}
//                     </span>
//                     <button className="btn btn-sm btn-primary" onClick={() => Duplicate(po)}><FaRegCopy /></button>
//                     {/* <button className="btn btn-sm btn-primary" onClick={() => handleConvertToInvoice(po)}>ConvertInvoice</button> */}
//                     <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateEstimate(po)}><BsPencil /></button>
//                     {/* <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(po._id))}>
//                             <FaTrash />
//                           </button> */}
//                     <button
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={() => handleDownloadPDF(po)}
//                     >
//                       <FaDownload />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//       {/* Modal for converting to invoice */}
//       <Modal
//         show={showInvoiceModal}
//         onHide={() => setShowInvoiceModal(false)}
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Convert Estimate to Invoice</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Invoice Number</Form.Label>
//               {/* <Form.Control
//                   type="text"
//                   defaultValue={
//                     selectedPO
//                       ? `INV-${selectedPO.estimateRef.split("-")[1]}`
//                       : ""
//                   }
//                   disabled
//                 /> */}
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Invoice Date</Form.Label>
//               <Form.Control type="date" />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Client</Form.Label>
//               <Form.Control
//                 type="text"
//                 defaultValue={selectedPO?.client}
//                 readOnly
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Due Date</Form.Label>
//               <Form.Control type="date" />
//             </Form.Group>
//             <hr />
//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control type="text" defaultValue="Web Design Services" />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control type="number" defaultValue="1" />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Rate</Form.Label>
//               <Form.Control type="number" defaultValue={selectedPO?.amount} />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="text"
//                 // value={`$${selectedPO?.amount.toFixed(2)}`}
//                 disabled
//               />
//             </Form.Group>
//             <hr />
//             <div className="d-flex justify-content-between">
//               <div>
//                 <strong>Subtotal:</strong>
//                 {/* <span> ${selectedPO?.amount.toFixed(2)}</span> */}
//               </div>
//               <div>
//                 <strong>Tax (10%):</strong>
//                 {/* <span> ${calculateTax(selectedPO?.amount).toFixed(2)}</span> */}
//               </div>
//               <div>
//                 <strong>Total:</strong>
//                 {/* <span> ${calculateTotal(selectedPO?.amount).toFixed(2)}</span> */}
//               </div>
//             </div>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowInvoiceModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button variant="primary">Create Invoice</Button>
//         </Modal.Footer>
//       </Modal>
//       {renderAddPOModal()}
//       {/* Modal for converting to invoice */}
//       {!loading && !error && (
//         <div className="d-flex justify-content-between align-items-center mt-3">
//           <div className="text-muted small">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
//           </div>
//           <ul className="pagination pagination-sm mb-0">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
//                 <span aria-hidden="true">&laquo;</span>
//               </button>
//             </li>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                 <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
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

// export default CostEstimates;



import React, { useEffect, useState, useRef } from "react";
import { Modal, Form, Table, Badge, Dropdown, Button } from "react-bootstrap";
import { BsPlusLg, BsPencil, BsTrash, BsUpload, BsClipboard } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { deleteCostEstimate, fetchCostEstimates, updateCostEstimate } from "../../../../../../redux/slices/costEstimatesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaDownload, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { fetchProject } from "../../../../../../redux/slices/ProjectsSlice";
import { fetchClient } from "../../../../../../redux/slices/ClientSlice";
import { createReceivablePurchase, fetchReceivablePurchases, imagelogoreceivablePurchase } from "../../../../../../redux/slices/receivablePurchaseSlice";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import axiosInstance from "../../../../../../redux/utils/axiosInstance";
import { fetchInvoicingBilling } from "../../../../../../redux/slices/InvoicingBillingSlice";
import { apiUrl } from "../../../../../../redux/utils/config";

function CostEstimates({ projectNO }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log("projectNO", projectNO)
  const projectID = projectNO;
  // State declarations
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPOStatus, setSelectedPOStatus] = useState("All PO Status");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState("");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);
  const [showAddPOModal, setShowAddPOModal] = useState(false);
  const [stampFile, setStampFile] = React.useState(null);
  const fileInputRef = useRef(null);
  // PO Form states
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedPoNumber, setSelectedPoNumber] = useState(""); // Added PO Number state
  const [selectedClientId, setSelectedClientId] = useState("");
  const [costEstimatesId, setCostEstimatesId] = useState("");
  const [poDate, setPODate] = useState("");
  const [POStatus, setPOStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [poDocument, setPODocument] = useState(null);
  const [isAmountEditable, setIsAmountEditable] = useState(false); // New state to control amount editability
  const { project } = useSelector((state) => state.projects);
  const { Clients } = useSelector((state) => state.client);
  const statuses = ["pending ", "Received", "Cancelled", "Completed", "open", "invoiced"];
  const { logoreceivablePurchase } = useSelector((state) => state.receivablePurchases);
  console.log("gg", logoreceivablePurchase.image);

  const { invocing } = useSelector((state) => state.InvoicingBilling);

  useEffect(() => {
    dispatch(fetchProject());
    dispatch(fetchClient());
    dispatch(fetchCostEstimates());
    dispatch(imagelogoreceivablePurchase());
    dispatch(fetchInvoicingBilling());
  }, [dispatch]);

  useEffect(() => {
    if (Clients && project?.data?.length) {
      const foundProject = project.data.find(p => p._id === selectedClientId);
      if (foundProject) {
        setSelectedProjectId(foundProject._id);
      }
    }
  }, [Clients, project, selectedClientId]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please upload a file smaller than 10MB",
        });
        return;
      }
      setPODocument(file);
      setStampFile(file);
      console.log("stamp", stampFile)
    }
  };

  const handleSavePO = async () => {
    // if (!selectedProjectId || !selectedClientId || !poDate || !amount) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Required Fields Missing',
    //     text: 'Please fill all required fields'
    //   });
    //   return;
    // }
    const formData = new FormData();
    formData.append('projectsId', JSON.stringify([selectedProjectId]));
    formData.append('ClientId', selectedClientId);
    formData.append('ReceivedDate', poDate);
    formData.append('POStatus', POStatus || "Pending");
    formData.append('Amount', amount);
    formData.append('CostEstimatesId', JSON.stringify([costEstimatesId]));
    formData.append('PONumber', selectedPoNumber);
    console.log("kkkkkk", costEstimatesId)
    if (poDocument) {
      formData.append('image', poDocument);
    }
    try {
      const result = await dispatch(createReceivablePurchase(formData));
      // Agar API success ho jaye tab fetch karo
      if (createReceivablePurchase.fulfilled.match(result)) {
        Swal.fire({
          icon: 'success',
          title: 'PO Created',
          text: 'Purchase order created successfully'
        });
        // Reset fields
        setSelectedProjectId("");
        setSelectedClientId("");
        setCostEstimatesId("");
        setPODate("");
        setPOStatus("Pending");
        setAmount("");
        setSelectedPoNumber(""); // Reset PO Number
        setPODocument(null);
        setIsAmountEditable(false); // Reset editability state
        setShowAddPOModal(false);
        dispatch(updateCostEstimate({
          id: costEstimatesId,
          data: {
            projectId: selectedProjectId,
            clientId: selectedClientId,
            CostPOStatus: "Received"
          }
        }))
        // ✅ Now fetch updated list
        dispatch(fetchReceivablePurchases());
        navigate("/admin/receivable");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Creation Failed',
          text: 'Failed to create purchase order.'
        });
      }
    } catch (err) {
      console.error("Error creating PO:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while creating purchase order.'
      });
    }
  }

  // Convert to Invoice handler
  const handleConvertToInvoice = (po) => {
    setSelectedPO(po);
    setShowInvoiceModal(true);
  };

  const Ponamehandle = (po) => {
    console.log(po.clients[0].clientName, po.projects[0].projectName, "ddd");
    console.log(po);
    setSelectedClientId(po.clients[0]?.clientId || "");
    setSelectedProjectId(po.projects[0]?.projectId || "");
    setPOStatus("Pending"); // ✅ Default status set here
    // Generate a default PO number based on estimate reference
    setSelectedPoNumber(`PO-${po.estimateRef?.split("-")[1] || Date.now()}`);
    // Calculate total amount from line items
    const totalAmount = po.lineItems?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
    setAmount(totalAmount.toString());
    setSelectedPO(po);
    setShowAddPOModal(true);
  };

  // Handler for "To be invoiced" button
  const handleToBeInvoiced = (po) => {
    console.log("po", po._id);
    const client = po.ClientId?.[0] || po.clients?.[0];
    const project = po.projectId?.[0] || po.projects?.[0];
    const costEstimate = po.CostEstimatesId?.[0] || po.costEstimates?.[0];

    // Extract line items from the cost estimate
    const lineItems = po?.lineItems || [];

    const purchaseOrderData = {
      clientId: client?._id || client?.clientId,
      projectId: project?._id || project?.projectId,
      CostEstimatesId: po?._id || costEstimate?.costEstimateId,
      ReceivablePurchaseId: po?._id,
      lineItems: lineItems, // Add the line items here
      Amount: po.Amount || (lineItems.reduce((sum, item) => sum + (item.amount || 0), 0)),
      currency: po?.currency
    };

    console.log(purchaseOrderData);


    console.log("Purchase Order Data:", purchaseOrderData);

    navigate("/admin/AddInvoice", {
      state: {
        isFromPurchaseOrder: true,
        purchaseOrder: purchaseOrderData
      }
    });
  };

  // Add PO Modal
  const renderAddPOModal = () => (
    <Modal show={showAddPOModal} onHide={() => setShowAddPOModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Purchase Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <Form.Label className="d-block">PO Number</Form.Label>
                <Form.Control
                  value={selectedPoNumber}
                  onChange={(e) => setSelectedPoNumber(e.target.value)} // Added onChange handler
                  className="form-control"
                  placeholder="Enter PO Number"
                  required
                />
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <Form.Label className="d-block">Project</Form.Label>
                  <Form.Select
                    value={selectedProjectId}
                    disabled
                    className="form-control"
                  >
                    <option value="">
                      {selectedPO?.projects?.find(p => p.projectId === selectedProjectId)?.projectName || "-- No Project --"}
                    </option>
                  </Form.Select>
                </div>
                <div className="col-md-6">
                  <Form.Label className="d-block">Client</Form.Label>
                  <Form.Select
                    value={selectedClientId}
                    disabled
                    className="form-control"
                  >
                    <option value="">
                      {selectedPO?.clients?.find(c => c.clientId === selectedClientId)?.clientName || "-- No Client --"}
                    </option>
                  </Form.Select>
                </div>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="row justify-content-center align-items-start">
              {/* PO Amount Field */}
              <div className="col-md-6 mb-3 mb-md-0">
                <Form.Label className="d-block">PO Amount</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-control"
                    placeholder="Enter amount"
                    required
                  />
                  {/* <Button
                    variant="outline-secondary"
                    onClick={() => setIsAmountEditable(!isAmountEditable)}
                    title={isAmountEditable ? "Lock amount" : "Edit amount"}
                  >
                    {isAmountEditable ? <BsPencil /> : <BsPencil />}
                  </Button> */}
                </div>
              </div>
              {/* PO Date Field */}
              <div className="col-md-6">
                <Form.Label className="d-block">PO Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedPO?.estimateDate ? selectedPO.estimateDate.split('T')[0] : poDate}
                  onChange={(e) => setPODate(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={() => {
          setShowAddPOModal(false);
          setIsAmountEditable(false); // Reset editability state when closing modal
        }}>Cancel</Button>
        <Button variant="primary" onClick={handleSavePO}>Save PO</Button>
      </Modal.Footer>
    </Modal>
  );
  // //////////
  const { estimates, loading, error } = useSelector((state) => state.costEstimates);
  console.log("Cost Estimates:", estimates.costEstimates);

  useEffect(() => {
    dispatch(fetchCostEstimates());
  }, [dispatch]);

  // ye ok code hai 
  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase().trim()) {
      case "active":
      case "active project":
      case "open":
        return "bg-primary text-white";
      case "inactive":
        return "bg-secondary text-white";
      case "in progress":
      case "pending":
        return "bg-warning text-dark";
      case "completed":
        return "bg-success text-white";
      case "closed":
        return "bg-dark text-white";
      case "cancelled":
        return "bg-danger text-white";
      case "on hold":
      case "review":
        return "bg-info text-dark";
      case "not started":
        return "bg-secondary text-white";
      // case "pending":
      //   return "bg-warning text-dark";     // Yellow
      case "received":
        return "bg-info text-dark";        // Light Blue
      // case "cancelled":
      //   return "bg-danger text-white";     // Red
      // case "completed":
      //   return "bg-success text-white";    // Green
      // case "open":
      //   return "bg-primary text-white";    // Blue
      case "invoiced":
        return "bg-dark text-white";       // Dark (You can change it as needed)
      // case "in progress":
      case "in_progress":
        return "bg-warning text-dark";
      // case "active":
      //   return "bg-primary text-white";
      case "reject":
        return "bg-danger text-white";
      // case "review":
      //   return "bg-info text-dark";
      // case "not started":
      //   return "bg-secondary text-white";
      default:
        return "bg-light text-dark";
    }
  };

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCostEstimate(_id))
          .then(() => {
            Swal.fire("Deleted!", "The document has been deleted.", "success");
            dispatch(fetchCostEstimates());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  }

  const Duplicate = (po) => {
    navigate(`/admin/AddCostEstimates`, {
      state: {
        po: {
          ...po, // pehle ka po ka sara data
          CostPOStatus: "Pending" // is field ko override kar rahe hai
        },
        isDuplicate: true
      }
    });
  };

  const UpdateEstimate = (po) => {
    navigate(`/admin/AddCostEstimates`, {
      state: {
        po,
      }
    })
  }

  // PAGINATION SETUP FOR ESTIMATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Add filtering logic before pagination
  const filteredEstimates = estimates?.costEstimates
    ?.slice()
    .reverse()
    .filter((estimate) => {
      // Split searchQuery by spaces, ignore empty terms
      const terms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
      // Prepare searchable fields as strings
      const estimateRef = (estimate.estimateRef || '').toLowerCase();
      // FIX: Use 'clients' and 'projects' fields for search
      const clientName = (estimate.clients?.[0]?.clientName || '').toLowerCase();
      const projectNames = (estimate.projects || []).map(project => (project.projectName || project.name || '').toLowerCase()).join(' ');
      const status = (estimate.Status || '').toLowerCase();
      const poStatus = (estimate.CostPOStatus || '').toLowerCase();
      const fields = [
        estimateRef,
        clientName,
        projectNames,
        status,
        poStatus
      ];
      // Every term must be found in at least one field
      const matchesSearch = terms.length === 0 || terms.every(term =>
        fields.some(field => field.includes(term))
      );
      // Fix: Correctly map filter values to actual data values
      let matchesPOStatus = true;
      if (selectedPOStatus === "Open") {
        matchesPOStatus = poStatus === "pending";
      } else if (selectedPOStatus === "Active") {
        matchesPOStatus = poStatus === "active" || poStatus === "received";
      } // else "All PO Status" will match all
      const matchesStatus = selectedStatus === "All Status" ||
        estimate.Status === selectedStatus;
      // FIX: Compare date in 'YYYY-MM-DD' format
      const estimateDateStr = estimate.estimateDate ? estimate.estimateDate.slice(0, 10) : "";
      const matchesDate = !selectedDate || estimateDateStr === selectedDate;
      return matchesSearch && matchesPOStatus && matchesStatus && matchesDate;
    });

  // Update pagination to use filtered data
  const totalItems = filteredEstimates?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedEstimates = filteredEstimates
    ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Helper to fetch image and convert to base64
  const getImageBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

const handleDownloadPDF = async (po) => {
  try {
    // ===== API =====
    const response = await axiosInstance.post(
      `/pdf?CostEstimatesId=${po._id}`,
      {
        projectId: po.projectId?.map((p) => p._id),
        clientId: po.clientId?.map((c) => c._id),
      }
    );
    
    // Fetch company info with logo
    const userid = localStorage.getItem("_id"); 
// agar localStorage me save hai

const companyInfoResponse = await axiosInstance.get(`${apiUrl}/user/${userid}`);
console.log(companyInfoResponse.data);  

    const companyInfo = companyInfoResponse.data.companyInfo;
    const logoUrl = companyInfo.logoUrl && companyInfo.logoUrl.length > 0 ? companyInfo.logoUrl[0] : null;
    
    const estimate = response.data?.data?.[0];
    if (!estimate) throw new Error("No estimate data found");
    const client = estimate.clientId || {};
    const project = estimate.projectId || {};
    const lineItems = estimate.lineItems || [];
    const currency = (estimate.currency || "INR").toUpperCase();
    
    // ===== Helpers =====
    const toMoney = (n) =>
      Number(n || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    
    // simple image -> base64 helper (browser)
    const getImageBase64 = async (url) => {
      const res = await fetch(url);
      const blob = await res.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    };
    
    // ===== PDF init =====
    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.width;
    const marginLeft = 40;
    const contentWidth = pageWidth - marginLeft * 2;
    
    // ===== HEADER =====
    // ===== HEADER =====
doc.setFillColor(229, 62, 62);
// Red background box
doc.rect(marginLeft, 40, contentWidth, 65, "F");

// Use company logo from API
if (logoUrl) {
  try {
    const logoBase64 = await getImageBase64(logoUrl);

    // Show logo INSIDE red background
    // (centered inside box, maintain aspect ratio)
    const logoHeight = 55;       // thoda gap upar-niche ke liye
    const logoWidth = contentWidth - 40; // thoda margin left-right
    const logoX = marginLeft + 20;
    const logoY = 45; // red box ke andar
    
    doc.addImage(logoBase64, "PNG", logoX, logoY, logoWidth, logoHeight);
  } catch (e) {
    console.error("Error loading logo:", e);
  }
}

    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
   
    
    // ===== Estimate Info (below header, right) =====
    const estimateDate = estimate.estimateDate
      ? new Date(estimate.estimateDate)
      : new Date();
    const formattedDate = `${estimateDate
      .getDate()
      .toString()
      .padStart(2, "0")}.${(estimateDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${estimateDate.getFullYear()}`;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    let estimateY = 120;
    const infoX = pageWidth - marginLeft - 180;
    doc.text(
      `Cost Estimate No. ${estimate.estimateRef || "0000"}`,
      infoX,
      estimateY
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Date: ${formattedDate}`, infoX, estimateY + 15);
    doc.text(`Req. Ref.: --`, infoX, estimateY + 30);
    
    // ===== Client block (left) =====
    let currentY = 120;
    doc.setFontSize(10);
    doc.text("To,", marginLeft, currentY);
    currentY += 15;
    doc.text(
      ` ${client?.clientName || "Cadbury India ltd"}`,
      marginLeft,
      currentY
    );
    currentY += 14;
    doc.text(
      ` ${project?.projectName || "Cadbury Chocolate Renovation"}`,
      marginLeft,
      currentY
    );
    currentY += 14;
    doc.text(
      ` ${client?.clientAddress?.split(",")[0] || "9a"}`,
      marginLeft,
      currentY
    );
    currentY += 14;
    doc.text(
      ` ${
        client?.shippingInformation?.[0]?.shippingAddress || "Address Line 2"
      }`,
      marginLeft,
      currentY
    );
    currentY += 14;
    doc.text(
      ` ${client?.contactPersons?.[0]?.email || "ghosh@cadbury.co.in"}`,
      marginLeft,
      currentY
    );
    currentY += 14;
    doc.text(
      ` ${client?.contactPersons?.[0]?.phone || "00913322308629"}`,
      marginLeft,
      currentY
    );
    currentY += 25;
    
    // ===== Items Table =====
    const head = [
      "ITEM #",
      "Brand & Design / Description",
      "QTY",
      `Unit Price (${currency})`,
      `Amount (${currency})`,
    ];
    const body = lineItems.map((item, idx) => {
      const qty = Number(item.quantity || 0);
      const rate = Number(item.rate || 0);
      const amt = qty * rate;
      return [
        String(idx + 1),
        item.description || "",
        String(qty),
        toMoney(rate),
        toMoney(amt),
      ];
    });
    
    // pad to 15 rows if you want fixed height
    while (body.length < 15) body.push(["", "", "", "", ""]);
    
    autoTable(doc, {
      startY: currentY,
      head: [head],
      body,
      styles: {
        fontSize: 9,
        cellPadding: 4,
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [230, 230, 230],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        fontSize: 9,
        halign: "center",
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 50 },
        1: { halign: "left", cellWidth: contentWidth - 260 },
        2: { halign: "center", cellWidth: 40 },
        3: { halign: "right", cellWidth: 80 },
        4: { halign: "right", cellWidth: 90 },
      },
      theme: "grid",
      margin: { left: marginLeft, right: marginLeft },
    });
    
    const finalY = doc.lastAutoTable.finalY;
    
    // ===== Totals =====
    const subTotal = lineItems.reduce(
      (sum, it) => sum + Number(it.quantity || 0) * Number(it.rate || 0),
      0
    );
    const vatRate = Number(estimate.vatRate ?? 18);
    const vat = (subTotal * vatRate) / 100;
    const total = subTotal + vat;
    
    // ===== Amount in Words + Totals (merged, aligned) =====
    const totalInWords =
      estimate.amountInWords ||
      "Rupees One Thousand Eight Hundred Twenty-Three and Ten Paise only";
    
    autoTable(doc, {
      startY: finalY + 10,
      margin: { left: marginLeft },
      tableWidth: contentWidth,
      head: [],
      body: [
        [
          {
            content: totalInWords,
            styles: {
              font: "helvetica",
              fontStyle: "bold",
              fontSize: 10,
              textColor: [0, 112, 192],
              halign: "left",
            },
          },
          { content: "Sub-Total", styles: { halign: "left" } },
          {
            content: toMoney(subTotal),
            styles: { halign: "right", textColor: [0, 112, 192] },
          },
        ],
        [
          { content: "", styles: {} },
          { content: `VAT (${vatRate}%)`, styles: { halign: "left" } },
          {
            content: toMoney(vat),
            styles: { halign: "right", textColor: [0, 112, 192] },
          },
        ],
        [
          { content: "", styles: {} },
          { content: "TOTAL", styles: { halign: "left", fontStyle: "bold" } },
          {
            content: toMoney(total),
            styles: {
              halign: "right",
              fontStyle: "bold",
              textColor: [0, 112, 192],
            },
          },
        ],
      ],
      columnStyles: {
        0: { cellWidth: contentWidth - 200 },
        1: { cellWidth: 100 },
        2: { cellWidth: 100 },
      },
      styles: {
        fontSize: 9,
        cellPadding: 6,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        valign: "middle",
      },
      theme: "grid",
    });
    
    const afterTotalsY = doc.lastAutoTable.finalY;
    
    // ===== Notes & Signature =====
    let footerY = afterTotalsY + 12;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("• Cost based on One-off prices.", marginLeft, footerY);
    doc.text(
      "• The above prices valid for 2 weeks and thereafter subject to our reconfirmation.",
      marginLeft,
      footerY + 12
    );
    
    footerY += 50;
    doc.setFont("helvetica", "bold");
    doc.text("For Company Name", marginLeft, footerY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      "(This is system generated document, hence not signed.)",
      marginLeft,
      footerY + 15
    );
    
    // ===== Save =====
    doc.save(`Cost_Estimate_${estimate.estimateRef || "Estimate"}.pdf`);
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    Swal.fire({
      icon: "error",
      title: "PDF Generation Failed",
      text: error?.message || "Something went wrong while generating the PDF.",
    });
  }
};


  const CostEstimatesDetails = (po) => {
    navigate(`/admin/OvervieCostEstimates`, { state: { po } });
  };

  return (
    <div
      className="p-4 m-2"
      style={{ backgroundColor: "white", borderRadius: "10px" }} >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 className="fw-semibold mb-3">Cost Estimates</h2>
        {/* <Link to={"/admin/AddCostEstimates"}> */}
        <button id="btn-All" onClick={() => { navigate(`/admin/AddCostEstimates`, { state: { idProject: projectID } }) }} className=" btn-dark" style={{ border: "none", borderRadius: "10px" }}>
          <BsPlusLg className="me-2" /> New Estimate
        </button>
        {/* </Link> */}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="filters d-flex flex-wrap gap-1 mb-4">
          <div className="search-container flex-grow-1">
            <Form.Control
              type="search"
              placeholder="Search by Job #, Brand Name, Sub Brand, Flavour, Pack Type, Pack Size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="search-container flex-grow-1">
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-control"
            />
          </div>
          <Dropdown className="filter-dropdown">
            <Dropdown.Toggle
              variant="light"
              id="po-status-dropdown"
              className="custom-dropdown"
            >
              {selectedPOStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedPOStatus("All PO Status")}>All PO Status</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedPOStatus("Open")}>Open</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedPOStatus("Active")}>Active</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="filter-dropdown">
            <Dropdown.Toggle
              variant="light"
              id="status-dropdown"
              className="custom-dropdown"
            >
              {selectedStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedStatus("All Status")}>All Status</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Active")}>Active</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("pending")}>pending</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Invoice")}>Invoice</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Completed")}>Completed</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="table-responsive" style={{ maxHeight: "900px", overflowY: "auto" }}>
        <Table hover className="align-middle sticky-header">
          <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              {/* <th><input type="checkbox" /></th> */}
              <th style={{ whiteSpace: 'nowrap' }}>CE No</th>
              <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
              <th style={{ whiteSpace: 'nowrap' }}>Project No</th>
              <th style={{ whiteSpace: 'nowrap' }}>Client Name</th>
              {/* <th style={{ whiteSpace: 'nowrap' }}>Client Email</th> */}
              <th>Date</th>
              {/* <th>ProjectNo</th> */}
              <th>Amount</th>
              <th style={{ whiteSpace: 'nowrap' }}>PO Status</th>
              <th style={{ whiteSpace: 'nowrap' }}>CE Status</th>
              {/* <th>POStatus</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEstimates?.filter((item) => {
              return (
                item.projects[0].projectId == projectNO
              )
            }).map((po, index) => (
              <tr style={{ whiteSpace: "nowrap" }} key={po.poNumber}>
                {/* <td><input type="checkbox" /></td> */}
                <td onClick={() => CostEstimatesDetails(po)}>
                  <Link style={{ textDecoration: 'none', border: 'none' }}>
                    {po.estimateRef}
                  </Link>
                </td>
                <td>
                  {po.projects?.map((project) => project.projectName).join(", ")}
                </td>
                <td>
                  {po.projects?.map((project) => project.projectNo).join(", ")}
                </td>
                <td>{po.clients?.[0]?.clientName || 'N/A'}</td>
                {/* <td>{po.clients?.[0]?.clientEmail || 'N/A'}</td> */}
                <td>{new Date(po.estimateDate).toLocaleDateString("en-GB").slice(0, 8)}</td>
                <td>
                  {po.lineItems?.reduce((total, item) => total + (item.amount || 0), 0).toFixed(2)}
                </td>
                <td>
                  <span className={`badge ${getStatusClass(po.CostPOStatus)} px-2 py-1`}>
                    {po.CostPOStatus == 'Pending' ? 'pending' : 'received'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusClass(po.Status)} px-2 py-1`}>
                    {po.Status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    {/* <button className="btn btn-sm btn-success"
                      disabled={
                        po.CostPOStatus?.length > 0 &&
                        po.CostPOStatus.toLowerCase() !== "pending"
                      }
                      onClick={() => {
                        setCostEstimatesId(po._id); // Store the ID
                        Ponamehandle(po)
                        setShowAddPOModal(true);   // Open Modal
                      }}
                    >
                      Add PO
                    </button> */}
                    <button
                      className="btn btn-sm btn-success"
                      disabled={
                        // Disable if:
                        // 1. PO status is not pending (existing condition)
                        (po.CostPOStatus?.length > 0 && po.CostPOStatus.toLowerCase() !== "pending") ||
                        // 2. An invoice already exists for this cost estimate (new condition)
                        (invocing?.InvoicingBilling?.some(invoice =>
                          invoice.CostEstimatesId?._id === po._id
                        ))
                      }
                      onClick={() => {
                        setCostEstimatesId(po._id); // Store the ID
                        Ponamehandle(po);
                        setShowAddPOModal(true);   // Open Modal
                      }}
                    >
                      Add PO
                    </button>
                    <span className={`badge ${getStatusClass(
                      po.receivablePurchases?.[0]?.POStatus?.toLowerCase() || "pending"
                    )} px-2 py-1`}>
                      {/* {po.receivablePurchases?.[0]?.POStatus || 'pending'} */}
                    </span>
                    <button className="btn btn-sm btn-primary" onClick={() => Duplicate(po)}><FaRegCopy /></button>
                    {/* <button className="btn btn-sm btn-primary" onClick={() => handleConvertToInvoice(po)}>ConvertInvoice</button> */}
                    <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateEstimate(po)}><BsPencil /></button>
                    {/* <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(po._id))}>
                            <FaTrash />
                          </button> */}
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleDownloadPDF(po)}
                    >
                      <FaDownload />
                    </button>
                    {/* <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() =>
                        po.CostPOStatus === "Pending"
                          ? handleToBeInvoiced(po)
                          : navigate("/admin/Invoicing_Billing")
                      }
                      className="px-3 py-1 fw-semibold border-2"
                      style={{
                        transition: 'all 0.3s ease',
                        borderRadius: '6px',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        whiteSpace: "nowrap"
                      }}
                    >
                      {po.CostPOStatus == "Pending" ? "To be invoiced" : "Invoiced"}
                    </Button> */}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => {
                        // Check if this cost estimate has an invoice
                        const hasInvoice = invocing?.InvoicingBilling?.some(
                          invoice => invoice.CostEstimatesId?._id === po._id
                        );

                        if (hasInvoice) {
                          // If invoice exists, navigate to invoicing page
                          navigate("/admin/Invoicing_Billing");
                        } else {
                          // If no invoice, proceed with creating one
                          po.CostPOStatus === "Pending"
                            ? handleToBeInvoiced(po)
                            : navigate("/admin/Invoicing_Billing");
                        }
                      }}
                      className="px-3 py-1 fw-semibold border-2"
                      style={{
                        transition: 'all 0.3s ease',
                        borderRadius: '6px',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        whiteSpace: "nowrap"
                      }}
                    >
                      {/* Check if this cost estimate has an invoice */}
                      {invocing?.InvoicingBilling?.some(
                        invoice => invoice.CostEstimatesId?._id === po._id
                      ) ? "Invoiced" : (po.CostPOStatus == "Pending" ? "To be invoiced" : "Invoiced")}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Modal for converting to invoice */}
      <Modal
        show={showInvoiceModal}
        onHide={() => setShowInvoiceModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Convert Estimate to Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Invoice Number</Form.Label>
              {/* <Form.Control
                  type="text"
                  defaultValue={
                    selectedPO
                      ? `INV-${selectedPO.estimateRef.split("-")[1]}`
                      : ""
                  }
                  disabled
                /> */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Invoice Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedPO?.client}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <hr />
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" defaultValue="Web Design Services" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" defaultValue="1" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rate</Form.Label>
              <Form.Control type="number" defaultValue={selectedPO?.amount} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                // value={`$${selectedPO?.amount.toFixed(2)}`}
                disabled
              />
            </Form.Group>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <strong>Subtotal:</strong>
                {/* <span> ${selectedPO?.amount.toFixed(2)}</span> */}
              </div>
              <div>
                <strong>Tax (10%):</strong>
                {/* <span> ${calculateTax(selectedPO?.amount).toFixed(2)}</span> */}
              </div>
              <div>
                <strong>Total:</strong>
                {/* <span> ${calculateTotal(selectedPO?.amount).toFixed(2)}</span> */}
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowInvoiceModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary">Create Invoice</Button>
        </Modal.Footer>
      </Modal>
      {renderAddPOModal()}
      {/* Modal for converting to invoice */}
      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted small">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
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

export default CostEstimates;