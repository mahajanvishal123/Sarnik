// import React, { useEffect, useState, useRef } from "react";
// import { Modal, Form, Table, Badge, Dropdown, Button } from "react-bootstrap";
// import {
//   BsPlusLg,
//   BsPencil,
//   BsTrash,
//   BsUpload,
//   BsClipboard,
// } from "react-icons/bs";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   deleteCostEstimate,
//   fetchCostEstimates,
//   updateCostEstimate,
// } from "../../../redux/slices/costEstimatesSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { FaDownload, FaTrash } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { fetchProject } from "../../../redux/slices/ProjectsSlice";
// import { fetchClient } from "../../../redux/slices/ClientSlice";
// import {
//   createReceivablePurchase,
//   fetchReceivablePurchases,
//   imagelogoreceivablePurchase,
// } from "../../../redux/slices/receivablePurchaseSlice";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// import { FaRegCopy } from "react-icons/fa";
// import axios from "axios";
// import axiosInstance from "../../../redux/utils/axiosInstance";

// function CostEstimates() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
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
//   const statuses = [
//     "pending ",
//     "Received",
//     "Cancelled",
//     "Completed",
//     "open",
//     "invoiced",
//   ];
//   const { logoreceivablePurchase } = useSelector(
//     (state) => state.receivablePurchases
//   );
//   console.log("gg", logoreceivablePurchase.image);

//   useEffect(() => {
//     dispatch(fetchProject());
//     dispatch(fetchClient());
//     dispatch(fetchCostEstimates());
//     dispatch(imagelogoreceivablePurchase());
//   }, [dispatch]);

//   useEffect(() => {
//     if (Clients && project?.data?.length) {
//       const foundProject = project.data.find((p) => p._id === selectedClientId);
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
//       console.log("stamp", stampFile);
//     }
//   };

//   const handleSavePO = async () => {
//     // if (!selectedProjectId || !selectedClientId || !poDate || !amount) {
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Required Fields Missing",
//     //     text: "Please fill all required fields",
//     //   });
//     //   return;
//     // }

//     const formData = new FormData();
//     formData.append("projectsId", JSON.stringify([selectedProjectId]));
//     formData.append("ClientId", selectedClientId);
//     formData.append("ReceivedDate", poDate);
//     formData.append("POStatus", POStatus || "Pending");
//     formData.append("Amount", amount);
//     formData.append("CostEstimatesId", JSON.stringify([costEstimatesId]));
//     console.log("kkkkkk", costEstimatesId);

//     if (poDocument) {
//       formData.append("image", poDocument);
//     }

//     try {
//       const result = await dispatch(createReceivablePurchase(formData));
//       // Agar API success ho jaye tab fetch karo
//       if (createReceivablePurchase.fulfilled.match(result)) {
//         Swal.fire({
//           icon: "success",
//           title: "PO Created",
//           text: "Purchase order created successfully",
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
//         dispatch(
//           updateCostEstimate({
//             id: costEstimatesId,
//             data: {
//               projectId: selectedProjectId,
//               clientId: selectedClientId,
//               CostPOStatus: "Received",
//             },
//           })
//         );
//         // ✅ Now fetch updated list
//         dispatch(fetchReceivablePurchases());
//         navigate("/admin/receivable");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Creation Failed",
//           text: "Failed to create purchase order.",
//         });
//       }
//     } catch (err) {
//       console.error("Error creating PO:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Something went wrong while creating purchase order.",
//       });
//     }
//   };

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
//     <Modal
//       show={showAddPOModal}
//       onHide={() => setShowAddPOModal(false)}
//       size="lg"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Add Purchase Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-2">
//             <div className="row justify-content-center">
//               {/* <div className="col-md-6">
//                 <Form.Label className="d-block ">Project</Form.Label>
//                 <Form.Select
//                   value={selectedProjectId}
//                   onChange={(e) => setSelectedProjectId(e.target.value)}
//                   className="form-control"
//                   required>
//                   <option value="">-- Select Project --</option>
//                   {project?.data?.map((proj) => (
//                     <option key={proj._id} value={proj._id}>
//                       {proj.projectName || proj.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </div>
//               <div className="col-md-6">
//                 <Form.Label className="d-block ">Client</Form.Label>
//                 <Form.Select
//                   value={selectedClientId}
//                   onChange={(e) => setSelectedClientId(e.target.value)}
//                   className="form-control"
//                   required>
//                   <option value="">-- Select Client --</option>
//                   {Clients?.data?.map((client) => (
//                     <option key={client._id} value={client._id}>
//                       {client.clientName}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </div> */}
//               <div className="row justify-content-center">
//                 <div className="col-md-12">
//                   <Form.Label className="d-block">PO Number</Form.Label>
//                   <Form.Control
//                     value={selectedPoNumber}
//                     onChange={(e) => setSelectedPoNumber(e.target.value)}
//                     className="form-control"
//                   ></Form.Control>
//                 </div>
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
//                       {selectedPO?.projects?.find(
//                         (p) => p.projectId === selectedProjectId
//                       )?.projectName || "-- No Project --"}
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
//                       {selectedPO?.clients?.find(
//                         (c) => c.clientId === selectedClientId
//                       )?.clientName || "-- No Client --"}
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
//               {/* File Upload Field */}
//               {/* <div className="col-md-6">
//         <Form.Label className="d-block">Add Stamp</Form.Label>
//         <div className="file-upload">
//           <Form.Control
//             type="file"
//             accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//             ref={fileInputRef} // attach ref
//             onChange={(e) => {
//               handleFileUpload(e);
//             }}
//             className="form-control"
//           />
//           <small className="text-muted d-flex align-items-center mt-1">
//             <BsUpload className="me-2" /> Upload a file (PDF, DOC up to 10MB)
//           </small>
//         </div>
//         <div className="mt-3">
//           <label className="form-label fw-bold">Or Select From Gallery</label>
//           <div className="d-flex align-items-center">
//             <div
//               id="stampScroll"
//               className="d-flex flex-row overflow-auto"
//               style={{ gap: "10px", flex: 1 }}
//             >
//               {Array.isArray(logoreceivablePurchase?.image) &&
//                 logoreceivablePurchase.image.map((imgUrl, index) => {
//                   const isSelected =
//                     stampFile?.name === `stamp_${index}.jpg` ||
//                     stampFile?.preview === imgUrl;
//                   return (
//                     <div
//                       className={`card border ${isSelected ? "border-primary" : "border-light"}`}
//                       key={index}
//                       style={{ width: "90px", minWidth: "90px", cursor: "pointer" }}
//                       onClick={async () => {
//                         const res = await fetch(imgUrl);
//                         const blob = await res.blob();
//                         const selectedFile = new File([blob], `stamp_${index}.jpg`, {
//                           type: blob.type,
//                         });
//                         // Add a preview property for UI matching
//                         selectedFile.preview = imgUrl;
//                         // Update state
//                         setStampFile(selectedFile);
//                         setPODocument(selectedFile);
//                         // Trigger file upload handler
//                         handleFileUpload({ target: { files: [selectedFile] } });
//                         // Force file input update
//                         const dataTransfer = new DataTransfer();
//                         dataTransfer.items.add(selectedFile);
//                         if (fileInputRef.current) {
//                           fileInputRef.current.files = dataTransfer.files;
//                         }
//                       }}
//                     >
//                       <img
//                         src={imgUrl}
//                         alt={`stamp-${index}`}
//                         className="card-img-top"
//                         style={{ height: "80px", objectFit: "cover", borderRadius: "6px" }}
//                       />
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         </div>
//       </div> */}
//             </div>
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <div className="">
//               {/* <div className="col-md-6">
//                   <Form.Label className="d-block">PO Status</Form.Label>
//                   <Form.Select
//                     value={POStatus}
//                     onChange={(e) => setPOStatus(e.target.value)}
//                     className="form-control"
//                     required>
//                     <option value="">-- Select Status --</option>
//                     {statuses.map((s) => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </Form.Select>
//                 </div> */}
//             </div>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer className="d-flex justify-content-end gap-2">
//         <Button variant="secondary" onClick={() => setShowAddPOModal(false)}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleSavePO}>
//           Save PO
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
//   // //////////
//   const { estimates, loading, error } = useSelector(
//     (state) => state.costEstimates
//   );
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
//       // return "bg-warning text-dark"; // Yellow
//       case "received":
//         return "bg-info text-dark"; // Light Blue
//       // case "cancelled":
//       // return "bg-danger text-white"; // Red
//       // case "completed":
//       //   return "bg-success text-white"; // Green
//       // case "open":
//       //   return "bg-primary text-white"; // Blue
//       case "invoiced":
//         return "bg-dark text-white"; // Dark (You can change it as needed)
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
//   };

//   const Duplicate = (po) => {
//     navigate(`/admin/AddCostEstimates`, {
//       state: {
//         po: {
//           ...po, // pehle ka po ka sara data
//           CostPOStatus: "Pending", // is field ko override kar rahe hai
//         },
//         isDuplicate: true,
//       },
//     });
//   };

//   const UpdateEstimate = (po) => {
//     navigate(`/admin/AddCostEstimates`, {
//       state: {
//         po,
//       },
//     });
//   };
//   //     const Duplicate =(po)=>{
//   //  navigate(`/duplicate/AddCostEstimates/${po._id}`, { state: { po}});
//   //   }
//   // PAGINATION SETUP FOR ESTIMATES
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15;

//   // Add filtering logic before pagination
//   const filteredEstimates = estimates?.costEstimates
//     ?.slice()
//     .reverse()
//     .filter((estimate) => {
//       // Split searchQuery by spaces, ignore empty terms
//       const terms = searchQuery
//         .toLowerCase()
//         .trim()
//         .split(/\s+/)
//         .filter(Boolean);
//       // Prepare searchable fields as strings
//       const estimateRef = (estimate.estimateRef || "").toLowerCase();
//       // FIX: Use 'clients' and 'projects' fields for search
//       const clientName = (
//         estimate.clients?.[0]?.clientName || ""
//       ).toLowerCase();
//       const projectNames = (estimate.projects || [])
//         .map((project) =>
//           (project.projectName || project.name || "").toLowerCase()
//         )
//         .join(" ");
//       const status = (estimate.Status || "").toLowerCase();
//       const poStatus = (estimate.CostPOStatus || "").toLowerCase();
//       const fields = [estimateRef, clientName, projectNames, status, poStatus];
//       // Every term must be found in at least one field
//       const matchesSearch =
//         terms.length === 0 ||
//         terms.every((term) => fields.some((field) => field.includes(term)));

//       // Fix: Correctly map filter values to actual data values
//       let matchesPOStatus = true;
//       if (selectedPOStatus === "Open") {
//         matchesPOStatus = poStatus === "pending";
//       } else if (selectedPOStatus === "Active") {
//         matchesPOStatus = poStatus === "active" || poStatus === "received";
//       } // else "All PO Status" will match all

//       const matchesStatus =
//         selectedStatus === "All Status" || estimate.Status === selectedStatus;
//       // FIX: Compare date in 'YYYY-MM-DD' format
//       const estimateDateStr = estimate.estimateDate
//         ? estimate.estimateDate.slice(0, 10)
//         : "";
//       const matchesDate = !selectedDate || estimateDateStr === selectedDate;
//       return matchesSearch && matchesPOStatus && matchesStatus && matchesDate;
//     });

//   // Update pagination to use filtered data
//   const totalItems = filteredEstimates?.length || 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const paginatedEstimates = filteredEstimates?.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

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

//   // const handleDownloadPDF = async (po) => {
//   //   try {
//   //     const response = await axiosInstance.post(
//   //       `/pdf?CostEstimatesId=${po._id}`,
//   //       {
//   //         projectId: po.projectId?.map(p => p._id),
//   //         clientId: po.clientId?.map(c => c._id),
//   //       }
//   //     );
//   //     const estimate = response.data?.data?.[0];
//   //     if (!estimate) throw new Error("No estimate data found");
//   //     const client = estimate.clientId || {};
//   //     const project = estimate.projectId || {};
//   //     const lineItems = estimate.lineItems || [];
//   //     const doc = new jsPDF('p', 'pt', 'a4');
//   //     const pageWidth = doc.internal.pageSize.width;
//   //     // === HEADER ===
//   //     doc.setFillColor(229, 62, 62); // Red banner
//   //     doc.rect(40, 40, 200, 50, 'F');
//   //     doc.setTextColor(255, 255, 255);
//   //     doc.setFontSize(14);
//   //     // Insert logo image instead of text
//   //     const logoUrl = estimate.image[0];
//   //     const logoBase64 = await getImageBase64(logoUrl);
//   //     doc.addImage(logoBase64, 'PNG', 45, 45, 60, 40);
//   //     doc.setFont('helvetica', 'bold');
//   //     doc.text("SAARANIK", 110, 60);
//   //     // (image, format, x, y, width, height
//   //     doc.setFontSize(8);
//   //     doc.setFont('helvetica', 'normal');
//   //     doc.text("COMPANY ADDRESS DETAILS", 110, 75);
//   //     doc.setTextColor(0, 0, 0); // Reset text color
//   //     // === Estimate Info (Right) ===
//   //     doc.setFontSize(12);
//   //     doc.setFont('helvetica', 'bold');
//   //     doc.text(`Cost Estimate No. ${estimate.estimateRef || '---'}`, 350, 50);
//   //     doc.setFontSize(10);
//   //     doc.setFont('helvetica', 'normal');
//   //     doc.text(`Date: ${new Date(estimate.estimateDate).toLocaleDateString("en-GB")}`, 350, 65);
//   //     doc.text(`Req. Ref.: --`, 350, 80);
//   //     // === Client Info ===
//   //     let currentY = 120;
//   //     doc.setFontSize(10);
//   //     doc.text('To,', 40, currentY);
//   //     currentY += 15;
//   //     doc.text(`Client Name: ${client?.clientName || "Client Name"}`, 40, currentY);
//   //     currentY += 14;
//   //     doc.text(`Client Company Name: ${project?.projectName || "Client Company Name"}`, 40, currentY);
//   //     currentY += 14;
//   //     doc.text(`Address: ${client?.clientAddress?.split(',')[0] || "Address Line 1"}`, 40, currentY);
//   //     currentY += 14;
//   //     doc.text(`shipping Address: ${client?.shippingInformation?.[0]?.shippingAddress || "Address Line 2"}`, 40, currentY);
//   //     currentY += 14;
//   //     doc.text(`Email: ${client?.contactPersons[0].email || "email"}`, 40, currentY);
//   //     console.log("kkk", client?.contactPersons[0].email);
//   //     currentY += 14;
//   //     doc.text(`Phone: ${client?.contactPersons[0].phone || "Phone"}`, 40, currentY);
//   //     currentY += 25;
//   //     // === Table Data ===
//   //     const tableData = lineItems.map((item, index) => [
//   //       (index + 1).toString(),
//   //       item.description || '',
//   //       (item.quantity || 0).toString(),
//   //       (item.rate || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }),
//   //       ((item.quantity || 0) * (item.rate || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2 })
//   //     ]);
//   //     // Add blank rows
//   //     for (let i = 0; i < 15; i++) tableData.push(['', '', '', '', '']);
//   //     let finalY;
//   //     autoTable(doc, {
//   //       startY: currentY,
//   //       head: [['ITEM #', 'Brand & Design / Description', 'QTY', 'Unit Price (INR)', 'Amount (INR)']],
//   //       body: tableData,
//   //       styles: {
//   //         fontSize: 9,
//   //         cellPadding: 4,
//   //         lineColor: [0, 0, 0],
//   //         lineWidth: 0.3,
//   //         halign: 'center',
//   //         valign: 'middle'
//   //       },
//   //       headStyles: {
//   //         fillColor: [230, 230, 230], // Light gray like screenshot
//   //         textColor: [0, 0, 0],
//   //         fontStyle: 'bold',
//   //         fontSize: 9,
//   //         halign: 'center'
//   //       },
//   //       columnStyles: {
//   //         0: { halign: 'center', cellWidth: 50 },
//   //         1: { halign: 'left', cellWidth: 250 },
//   //         2: { halign: 'center', cellWidth: 40 },
//   //         3: { halign: 'right', cellWidth: 80 },
//   //         4: { halign: 'right', cellWidth: 90 }
//   //       },
//   //       theme: 'grid',
//   //       didDrawPage: data => { finalY = data.cursor.y; }
//   //     });
//   //     // === Totals Section ===
//   //     const subTotal = lineItems.reduce((sum, item) => sum + ((item.quantity || 0) * (item.rate || 0)), 0);
//   //     const vat = (subTotal * (estimate.VATRate || 0)) / 100;
//   //     const total = subTotal + vat;
//   //     const totalsBoxX = pageWidth - 160;
//   //     const totalsBoxY = finalY + 20;
//   //     doc.rect(totalsBoxX, totalsBoxY, 120, 45);
//   //     doc.setFontSize(10);
//   //     doc.setFont('helvetica', 'normal');
//   //     doc.text('Sub-Total', totalsBoxX + 5, totalsBoxY + 12);
//   //     doc.text(subTotal.toFixed(2), totalsBoxX + 115, totalsBoxY + 12, { align: 'right' });
//   //     doc.text(`VAT (${estimate.VATRate || 0}%)`, totalsBoxX + 5, totalsBoxY + 25);
//   //     doc.text(vat.toFixed(2), totalsBoxX + 115, totalsBoxY + 25, { align: 'right' });
//   //     doc.setFont('helvetica', 'bold');
//   //     doc.text('TOTAL', totalsBoxX + 5, totalsBoxY + 38);
//   //     doc.text(total.toFixed(2), totalsBoxX + 115, totalsBoxY + 38, { align: 'right' });
//   //     // === Footer Notes ===
//   //     const footerY = totalsBoxY + 65;
//   //     doc.setFont('helvetica', 'normal');
//   //     doc.setFontSize(9);
//   //     doc.text('• Cost based on One-off prices.', 40, footerY);
//   //     doc.text('• The above prices valid for 2 weeks and thereafter subject to our reconfirmation.', 40, footerY + 12);
//   //     doc.setFont('helvetica', 'bold');
//   //     doc.text(`For Your Company Name`, 40, footerY + 40);
//   //     doc.setFont('helvetica', 'normal');
//   //     doc.text('(This is system generated document, hence not signed.)', 40, footerY + 55);
//   //     // === Save PDF ===
//   //     doc.save(`Cost_Estimate_${estimate.estimateRef || 'Estimate'}.pdf`);
//   //   } catch (error) {
//   //     console.error("❌ Error generating PDF:", error);
//   //     alert("Failed to generate PDF.");
//   //   }
//   // };
//   // ... existing code ...
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
//       doc.text(` ${client?.clientName || "Client Name"}`, marginLeft, currentY);
//       currentY += 14;
//       doc.text(
//         ` ${project?.projectName || "Client Company Name"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.clientAddress?.split(",")[0] || "Address Line 1"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.shippingInformation?.[0]?.shippingAddress || "Address Line 2"
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
//         (sum, item) => sum + (item.quantity || 0) * (item.rate || 0),
//         0
//       );
//       const vat = (subTotal * (estimate.VATRate || 0)) / 100;
//       const total = subTotal + vat;
//       const totalsBoxX = pageWidth - marginLeft - 120;
//       const totalsBoxY = finalY + 20;
//       // doc.rect(totalsBoxX, totalsBoxY, 120, 45);
//       // doc.setFontSize(10);
//       // doc.setFont("helvetica", "normal");
//       // doc.text("Sub-Total", totalsBoxX + 5, totalsBoxY + 12);
//       // doc.text(subTotal.toFixed(2), totalsBoxX + 115, totalsBoxY + 12, {
//       //   align: "right",
//       // });
//       // doc.text(`VAT (${estimate.VATRate || 0}%)`, totalsBoxX + 5, totalsBoxY + 25);
//       // doc.text(vat.toFixed(2), totalsBoxX + 115, totalsBoxY + 25, {
//       //   align: "right",
//       // });
//       // doc.setFont("helvetica", "bold");
//       // doc.text("TOTAL", totalsBoxX + 5, totalsBoxY + 38);
//       // doc.text(total.toFixed(2), totalsBoxX + 115, totalsBoxY + 38, {
//       //   align: "right",
//       // });
//       // === Footer Notes ===
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
//       style={{ backgroundColor: "white", borderRadius: "10px" }}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <h2 className="fw-semibold mb-3">Cost Estimates</h2>
//         <Link to={"/admin/AddCostEstimates"}>
//           <button
//             id="btn-All"
//             className=" btn-dark"
//             style={{ border: "none", borderRadius: "10px" }}
//           >
//             <BsPlusLg className="me-2" /> New Estimate
//           </button>
//         </Link>
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
//               <Dropdown.Item
//                 onClick={() => setSelectedPOStatus("All PO Status")}
//               >
//                 All PO Status
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("Open")}>
//                 Open
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("Active")}>
//                 Active
//               </Dropdown.Item>
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
//               <Dropdown.Item onClick={() => setSelectedStatus("All Status")}>
//                 All Status
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Active")}>
//                 Active
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("pending")}>
//                 pending
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Invoice")}>
//                 Invoice
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Completed")}>
//                 Completed
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//       <div
//         className="table-responsive"
//         style={{ maxHeight: "900px", overflowY: "auto" }}
//       >
//         <Table hover className="align-middle sticky-header">
//           <thead
//             style={{
//               backgroundColor: "#f8f9fa",
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//             }}
//           >
//             <tr>
//               {/* <th><input type="checkbox" /></th> */}
//               <th style={{ whiteSpace: "nowrap" }}>CE No</th>
//               <th style={{ whiteSpace: "nowrap" }}>Project Name</th>
//               <th style={{ whiteSpace: "nowrap" }}>Project No</th>
//               <th style={{ whiteSpace: "nowrap" }}>Client Name</th>
//               {/* <th style={{ whiteSpace: 'nowrap' }}>Client Email</th> */}
//               <th>Date</th>
//               {/* <th>ProjectNo</th> */}
//               <th>Amount</th>
//               <th style={{ whiteSpace: "nowrap" }}>PO Status</th>

//               <th style={{ whiteSpace: "nowrap" }}>CE Status</th>
//               {/* <th>POStatus</th> */}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedEstimates?.map((po, index) => (
//               <tr style={{ whiteSpace: "nowrap" }} key={po.poNumber}>
//                 {/* <td><input type="checkbox" /></td> */}
//                 <td onClick={() => CostEstimatesDetails(po)}>
//                   <Link style={{ textDecoration: "none", border: "none" }}>
//                     {po.estimateRef}
//                   </Link>
//                 </td>
//                 <td>
//                   {po.projects
//                     ?.map((project) => project.projectName)
//                     .join(", ")}
//                 </td>
//                 <td>
//                   {po.projects?.map((project) => project.projectNo).join(", ")}
//                 </td>
//                 <td>{po.clients?.[0]?.clientName || "N/A"}</td>
//                 {/* <td>{po.clients?.[0]?.clientEmail || 'N/A'}</td> */}
//                 <td>
//                   {new Date(po.estimateDate)
//                     .toLocaleDateString("en-GB")
//                     .slice(0, 8)}
//                 </td>
//                 <td>
//                   {po.lineItems
//                     ?.reduce((total, item) => total + (item.amount || 0), 0)
//                     .toFixed(2)}
//                 </td>
//                 <td>
//                   <span
//                     className={`badge ${getStatusClass(
//                       po.CostPOStatus
//                     )} px-2 py-1`}
//                   >
//                     {po.CostPOStatus == "Pending" ? "pendig" : "received"}
//                   </span>
//                 </td>

//                 <td>
//                   <span
//                     className={`badge ${getStatusClass(po.Status)} px-2 py-1`}
//                   >
//                     {po.Status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <button
//                       className="btn btn-sm btn-success"
//                       disabled={
//                         po.CostPOStatus?.length > 0 &&
//                         po.CostPOStatus.toLowerCase() !== "pending"
//                       }
//                       onClick={() => {
//                         setCostEstimatesId(po._id); // Store the ID
//                         Ponamehandle(po);
//                         setShowAddPOModal(true); // Open Modal
//                       }}
//                     >
//                       Add PO
//                     </button>
//                     <span
//                       className={`badge ${getStatusClass(
//                         po.receivablePurchases?.[0]?.POStatus?.toLowerCase() ||
//                         "pending"
//                       )} px-2 py-1`}
//                     >
//                       {/* {po.receivablePurchases?.[0]?.POStatus || 'pending'} */}
//                     </span>
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => Duplicate(po)}
//                     >
//                       <FaRegCopy />
//                     </button>
//                     {/* <button className="btn btn-sm btn-primary" onClick={() => handleConvertToInvoice(po)}>ConvertInvoice</button> */}
//                     <button
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={() => UpdateEstimate(po)}
//                     >
//                       <BsPencil />
//                     </button>
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
//             Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//             {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
//             entries
//           </div>
//           <ul className="pagination pagination-sm mb-0">
//             <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               >
//                 <span aria-hidden="true">&laquo;</span>
//               </button>
//             </li>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li
//                 key={i + 1}
//                 className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               </li>
//             ))}
//             <li
//               className={`page-item ${currentPage === totalPages ? "disabled" : ""
//                 }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//               >
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
// import {
//   BsPlusLg,
//   BsPencil,
//   BsTrash,
//   BsUpload,
//   BsClipboard,
// } from "react-icons/bs";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   deleteCostEstimate,
//   fetchCostEstimates,
//   updateCostEstimate,
// } from "../../../redux/slices/costEstimatesSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { FaDownload, FaTrash } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { fetchProject } from "../../../redux/slices/ProjectsSlice";
// import { fetchClient } from "../../../redux/slices/ClientSlice";
// import {
//   createReceivablePurchase,
//   fetchReceivablePurchases,
//   imagelogoreceivablePurchase,
// } from "../../../redux/slices/receivablePurchaseSlice";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// import { FaRegCopy } from "react-icons/fa";
// import axios from "axios";
// import axiosInstance from "../../../redux/utils/axiosInstance";

// function CostEstimates() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
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
//   const statuses = [
//     "pending ",
//     "Received",
//     "Cancelled",
//     "Completed",
//     "open",
//     "invoiced",
//   ];
//   const { logoreceivablePurchase } = useSelector(
//     (state) => state.receivablePurchases
//   );
//   console.log("gg", logoreceivablePurchase.image);

//   useEffect(() => {
//     dispatch(fetchProject());
//     dispatch(fetchClient());
//     dispatch(fetchCostEstimates());
//     dispatch(imagelogoreceivablePurchase());
//   }, [dispatch]);

//   useEffect(() => {
//     if (Clients && project?.data?.length) {
//       const foundProject = project.data.find((p) => p._id === selectedClientId);
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
//       console.log("stamp", stampFile);
//     }
//   };

//   const handleSavePO = async () => {
//     // Make sure we have the amount value
//     const poAmount = selectedPO?.lineItems?.[0]?.amount || amount;

//     // Make sure we have the date value and format it correctly
//     const formattedDate = selectedPO?.estimateDate
//       ? new Date(selectedPO.estimateDate).toISOString().split('T')[0]
//       : poDate;

//     const formData = new FormData();
//     formData.append("projectsId", JSON.stringify([selectedProjectId]));
//     formData.append("ClientId", selectedClientId);
//     formData.append("ReceivedDate", formattedDate);
//     formData.append("POStatus", POStatus || "Pending");
//     formData.append("Amount", poAmount);
//     formData.append("CostEstimatesId", JSON.stringify([costEstimatesId]));
//     console.log("kkkkkk", costEstimatesId);

//     if (poDocument) {
//       formData.append("image", poDocument);
//     }

//     // Log the form data to verify
//     console.log("Form Data being sent:");
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ': ', pair[1]);
//     }

//     try {
//       const result = await dispatch(createReceivablePurchase(formData));
//       // Agar API success ho jaye tab fetch karo
//       if (createReceivablePurchase.fulfilled.match(result)) {
//         Swal.fire({
//           icon: "success",
//           title: "PO Created",
//           text: "Purchase order created successfully",
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
//         dispatch(
//           updateCostEstimate({
//             id: costEstimatesId,
//             data: {
//               projectId: selectedProjectId,
//               clientId: selectedClientId,
//               CostPOStatus: "Received",
//             },
//           })
//         );
//         // ✅ Now fetch updated list
//         dispatch(fetchReceivablePurchases());
//         navigate("/admin/receivable");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Creation Failed",
//           text: "Failed to create purchase order.",
//         });
//       }
//     } catch (err) {
//       console.error("Error creating PO:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Something went wrong while creating purchase order.",
//       });
//     }
//   };

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
//     // Set amount from PO if available
//     if (po.lineItems && po.lineItems.length > 0) {
//       setAmount(po.lineItems[0].amount);
//     }
//     // Set date from PO if available
//     if (po.estimateDate) {
//       setPODate(new Date(po.estimateDate).toISOString().split('T')[0]);
//     }
//     setSelectedPO(po);
//     setShowAddPOModal(true);
//   };

//   // Add PO Modal
//   const renderAddPOModal = () => (
//     <Modal
//       show={showAddPOModal}
//       onHide={() => setShowAddPOModal(false)}
//       size="lg"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Add Purchase Order</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-2">
//             <div className="row justify-content-center">
//               <div className="row justify-content-center">
//                 <div className="col-md-12">
//                   <Form.Label className="d-block">PO Number</Form.Label>
//                   <Form.Control
//                     value={selectedPoNumber}
//                     onChange={(e) => setSelectedPoNumber(e.target.value)}
//                     className="form-control"
//                   ></Form.Control>
//                 </div>
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
//                       {selectedPO?.projects?.find(
//                         (p) => p.projectId === selectedProjectId
//                       )?.projectName || "-- No Project --"}
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
//                       {selectedPO?.clients?.find(
//                         (c) => c.clientId === selectedClientId
//                       )?.clientName || "-- No Client --"}
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
//                   readOnly={!!selectedPO?.lineItems?.[0]?.amount}
//                   required
//                 />
//               </div>
//               <div className="col-md-6">
//                 <Form.Label className="d-block">PO Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={selectedPO?.estimateDate ? new Date(selectedPO.estimateDate).toISOString().split('T')[0] : poDate}
//                   onChange={(e) => setPODate(e.target.value)}
//                   className="form-control"
//                   readOnly={!!selectedPO?.estimateDate}
//                   required
//                 />
//               </div>
//             </div>
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <div className="">
//               {/* PO Status field is commented out in your original code */}
//             </div>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer className="d-flex justify-content-end gap-2">
//         <Button variant="secondary" onClick={() => setShowAddPOModal(false)}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleSavePO}>
//           Save PO
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );

//   const { estimates, loading, error } = useSelector(
//     (state) => state.costEstimates
//   );
//   console.log("Cost Estimates:", estimates.costEstimates);

//   useEffect(() => {
//     dispatch(fetchCostEstimates());
//   }, [dispatch]);

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
//       case "received":
//         return "bg-info text-dark";
//       case "invoiced":
//         return "bg-dark text-white";
//       case "in_progress":
//         return "bg-warning text-dark";
//       case "reject":
//         return "bg-danger text-white";
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
//   };

//   const Duplicate = (po) => {
//     navigate(`/admin/AddCostEstimates`, {
//       state: {
//         po: {
//           ...po, // pehle ka po ka sara data
//           CostPOStatus: "Pending", // is field ko override kar rahe hai
//         },
//         isDuplicate: true,
//       },
//     });
//   };

//   const UpdateEstimate = (po) => {
//     navigate(`/admin/AddCostEstimates`, {
//       state: {
//         po,
//       },
//     });
//   };

//   // PAGINATION SETUP FOR ESTIMATES
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15;

//   // Add filtering logic before pagination
//   const filteredEstimates = estimates?.costEstimates
//     ?.slice()
//     .reverse()
//     .filter((estimate) => {
//       // Split searchQuery by spaces, ignore empty terms
//       const terms = searchQuery
//         .toLowerCase()
//         .trim()
//         .split(/\s+/)
//         .filter(Boolean);
//       // Prepare searchable fields as strings
//       const estimateRef = (estimate.estimateRef || "").toLowerCase();
//       // FIX: Use 'clients' and 'projects' fields for search
//       const clientName = (
//         estimate.clients?.[0]?.clientName || ""
//       ).toLowerCase();
//       const projectNames = (estimate.projects || [])
//         .map((project) =>
//           (project.projectName || project.name || "").toLowerCase()
//         )
//         .join(" ");
//       const status = (estimate.Status || "").toLowerCase();
//       const poStatus = (estimate.CostPOStatus || "").toLowerCase();
//       const fields = [estimateRef, clientName, projectNames, status, poStatus];

//       // Every term must be found in at least one field
//       const matchesSearch =
//         terms.length === 0 ||
//         terms.every((term) => fields.some((field) => field.includes(term)));

//       // Fix: Correctly map filter values to actual data values
//       let matchesPOStatus = true;
//       if (selectedPOStatus === "Open") {
//         matchesPOStatus = poStatus === "pending";
//       } else if (selectedPOStatus === "Active") {
//         matchesPOStatus = poStatus === "active" || poStatus === "received";
//       } // else "All PO Status" will match all

//       const matchesStatus =
//         selectedStatus === "All Status" || estimate.Status === selectedStatus;

//       // FIX: Compare date in 'YYYY-MM-DD' format
//       const estimateDateStr = estimate.estimateDate
//         ? estimate.estimateDate.slice(0, 10)
//         : "";
//       const matchesDate = !selectedDate || estimateDateStr === selectedDate;

//       return matchesSearch && matchesPOStatus && matchesStatus && matchesDate;
//     });

//   // Update pagination to use filtered data
//   const totalItems = filteredEstimates?.length || 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const paginatedEstimates = filteredEstimates?.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

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
//       doc.text(` ${client?.clientName || "Client Name"}`, marginLeft, currentY);
//       currentY += 14;
//       doc.text(
//         ` ${project?.projectName || "Client Company Name"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.clientAddress?.split(",")[0] || "Address Line 1"}`,
//         marginLeft,
//         currentY
//       );
//       currentY += 14;
//       doc.text(
//         ` ${client?.shippingInformation?.[0]?.shippingAddress || "Address Line 2"
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
//         (sum, item) => sum + (item.quantity || 0) * (item.rate || 0),
//         0
//       );
//       const vat = (subTotal * (estimate.VATRate || 0)) / 100;
//       const total = subTotal + vat;

//       const totalsBoxX = pageWidth - marginLeft - 120;
//       const totalsBoxY = finalY + 20;

//       // === Footer Notes ===
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
//       style={{ backgroundColor: "white", borderRadius: "10px" }}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <h2 className="fw-semibold mb-3">Cost Estimates</h2>
//         <Link to={"/admin/AddCostEstimates"}>
//           <button
//             id="btn-All"
//             className=" btn-dark"
//             style={{ border: "none", borderRadius: "10px" }}
//           >
//             <BsPlusLg className="me-2" /> New Estimate
//           </button>
//         </Link>
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
//               <Dropdown.Item
//                 onClick={() => setSelectedPOStatus("All PO Status")}
//               >
//                 All PO Status
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("Open")}>
//                 Open
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedPOStatus("Active")}>
//                 Active
//               </Dropdown.Item>
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
//               <Dropdown.Item onClick={() => setSelectedStatus("All Status")}>
//                 All Status
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Active")}>
//                 Active
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("pending")}>
//                 pending
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Invoice")}>
//                 Invoice
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => setSelectedStatus("Completed")}>
//                 Completed
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//       <div
//         className="table-responsive"
//         style={{ maxHeight: "900px", overflowY: "auto" }}
//       >
//         <Table hover className="align-middle sticky-header">
//           <thead
//             style={{
//               backgroundColor: "#f8f9fa",
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//             }}
//           >
//             <tr>
//               <th style={{ whiteSpace: "nowrap" }}>CE No</th>
//               <th style={{ whiteSpace: "nowrap" }}>Project Name</th>
//               <th style={{ whiteSpace: "nowrap" }}>Project No</th>
//               <th style={{ whiteSpace: "nowrap" }}>Client Name</th>
//               <th>Date</th>
//               <th>Amount</th>
//               <th style={{ whiteSpace: "nowrap" }}>PO Status</th>
//               <th style={{ whiteSpace: "nowrap" }}>CE Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedEstimates?.map((po, index) => (
//               <tr style={{ whiteSpace: "nowrap" }} key={po.poNumber}>
//                 <td onClick={() => CostEstimatesDetails(po)}>
//                   <Link style={{ textDecoration: "none", border: "none" }}>
//                     {po.estimateRef}
//                   </Link>
//                 </td>
//                 <td>
//                   {po.projects
//                     ?.map((project) => project.projectName)
//                     .join(", ")}
//                 </td>
//                 <td>
//                   {po.projects?.map((project) => project.projectNo).join(", ")}
//                 </td>
//                 <td>{po.clients?.[0]?.clientName || "N/A"}</td>
//                 <td>
//                   {new Date(po.estimateDate)
//                     .toLocaleDateString("en-GB")
//                     .slice(0, 8)}
//                 </td>
//                 <td>
//                   {po.lineItems
//                     ?.reduce((total, item) => total + (item.amount || 0), 0)
//                     .toFixed(2)}
//                 </td>
//                 <td>
//                   <span
//                     className={`badge ${getStatusClass(
//                       po.CostPOStatus
//                     )} px-2 py-1`}
//                   >
//                     {po.CostPOStatus == "Pending" ? "pendig" : "received"}
//                   </span>
//                 </td>
//                 <td>
//                   <span
//                     className={`badge ${getStatusClass(po.Status)} px-2 py-1`}
//                   >
//                     {po.Status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <button
//                       className="btn btn-sm btn-success"
//                       disabled={
//                         po.CostPOStatus?.length > 0 &&
//                         po.CostPOStatus.toLowerCase() !== "pending"
//                       }
//                       onClick={() => {
//                         setCostEstimatesId(po._id); // Store the ID
//                         Ponamehandle(po);
//                         setShowAddPOModal(true); // Open Modal
//                       }}
//                     >
//                       Add PO
//                     </button>
//                     <span
//                       className={`badge ${getStatusClass(
//                         po.receivablePurchases?.[0]?.POStatus?.toLowerCase() ||
//                         "pending"
//                       )} px-2 py-1`}
//                     >
//                     </span>
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => Duplicate(po)}
//                     >
//                       <FaRegCopy />
//                     </button>
//                     <button
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={() => UpdateEstimate(po)}
//                     >
//                       <BsPencil />
//                     </button>
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
//                 disabled
//               />
//             </Form.Group>
//             <hr />
//             <div className="d-flex justify-content-between">
//               <div>
//                 <strong>Subtotal:</strong>
//               </div>
//               <div>
//                 <strong>Tax (10%):</strong>
//               </div>
//               <div>
//                 <strong>Total:</strong>
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
//             Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//             {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
//             entries
//           </div>
//           <ul className="pagination pagination-sm mb-0">
//             <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               >
//                 <span aria-hidden="true">&laquo;</span>
//               </button>
//             </li>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li
//                 key={i + 1}
//                 className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               </li>
//             ))}
//             <li
//               className={`page-item ${currentPage === totalPages ? "disabled" : ""
//                 }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//               >
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
import {
  BsPlusLg,
  BsPencil,
  BsTrash,
  BsUpload,
  BsClipboard,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCostEstimate,
  fetchCostEstimates,
  updateCostEstimate,
} from "../../../redux/slices/costEstimatesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaDownload, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { fetchProject } from "../../../redux/slices/ProjectsSlice";
import { fetchClient } from "../../../redux/slices/ClientSlice";
import {
  createReceivablePurchase,
  fetchReceivablePurchases,
  imagelogoreceivablePurchase,
} from "../../../redux/slices/receivablePurchaseSlice";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import axiosInstance from "../../../redux/utils/axiosInstance";
function CostEstimates() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [selectedPoNumber, setSelectedPoNumber] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [costEstimatesId, setCostEstimatesId] = useState("");
  const [poDate, setPODate] = useState("");
  const [POStatus, setPOStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [poDocument, setPODocument] = useState(null);
  const { project } = useSelector((state) => state.projects);
  const { Clients } = useSelector((state) => state.client);
  const statuses = [
    "pending ",
    "Received",
    "Cancelled",
    "Completed",
    "open",
    "invoiced",
  ];
  const { logoreceivablePurchase } = useSelector(
    (state) => state.receivablePurchases
  );
  console.log("gg", logoreceivablePurchase.image);
  useEffect(() => {
    dispatch(fetchProject());
    dispatch(fetchClient());
    dispatch(fetchCostEstimates());
    dispatch(imagelogoreceivablePurchase());
  }, [dispatch]);
  useEffect(() => {
    if (Clients && project?.data?.length) {
      const foundProject = project.data.find((p) => p._id === selectedClientId);
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
      console.log("stamp", stampFile);
    }
  };
  const handleSavePO = async () => {
    // Make sure we have the amount value
    const poAmount = selectedPO?.lineItems?.[0]?.amount || amount;
    // Make sure we have the date value and format it correctly
    const formattedDate = selectedPO?.estimateDate
      ? new Date(selectedPO.estimateDate).toISOString().split('T')[0]
      : poDate;

    // Generate PO number if not provided
    const poNumber = selectedPoNumber || `PO-${Date.now()}`;

    const formData = new FormData();
    formData.append("projectsId", JSON.stringify([selectedProjectId]));
    formData.append("ClientId", selectedClientId);
    formData.append("ReceivedDate", formattedDate);
    formData.append("POStatus", POStatus || "Pending");
    formData.append("Amount", poAmount);
    formData.append("CostEstimatesId", JSON.stringify([costEstimatesId]));
    formData.append("PONumber", poNumber); // Add PO Number to form data
    console.log("kkkkkk", costEstimatesId);
    if (poDocument) {
      formData.append("image", poDocument);
    }
    // Log the form data to verify
    console.log("Form Data being sent:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ', pair[1]);
    }
    try {
      const result = await dispatch(createReceivablePurchase(formData));
      // Agar API success ho jaye tab fetch karo
      if (createReceivablePurchase.fulfilled.match(result)) {
        Swal.fire({
          icon: "success",
          title: "PO Created",
          text: "Purchase order created successfully",
        });
        // Reset fields
        setSelectedProjectId("");
        setSelectedClientId("");
        setCostEstimatesId("");
        setPODate("");
        setPOStatus("Pending");
        setAmount("");
        setSelectedPoNumber(""); // Reset PO number
        setPODocument(null);
        setShowAddPOModal(false);
        await dispatch(
          updateCostEstimate({
            id: costEstimatesId,
            data: {
              projectId: selectedProjectId,
              clientId: selectedClientId,
              CostPOStatus: "Received",
            },
          })
        );

        // ✅ Now fetch updated list
        // dispatch(fetchReceivablePurchases());
        // navigate("/admin/receivable");
      } else {
        Swal.fire({
          icon: "error",
          title: "Creation Failed",
          text: "Failed to create purchase order.",
        });
      }


      window.location.reload();
    } catch (err) {
      console.error("Error creating PO:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while creating purchase order.",
      });
    }
  };
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
    // Set amount from PO if available
    if (po.lineItems && po.lineItems.length > 0) {
      setAmount(po.lineItems[0].amount);
    }
    // Set date from PO if available
    if (po.estimateDate) {
      setPODate(new Date(po.estimateDate).toISOString().split('T')[0]);
    }
    // Generate a default PO number if none exists
    setSelectedPoNumber('');
    setSelectedPO(po);
    setShowAddPOModal(true);
  };
  // Add PO Modal
  const renderAddPOModal = () => (
    <Modal
      show={showAddPOModal}
      onHide={() => setShowAddPOModal(false)}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Purchase Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <div className="row justify-content-center">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <Form.Label className="d-block">PO Number</Form.Label>
                  <Form.Control
                    value={selectedPoNumber}
                    onChange={(e) => setSelectedPoNumber(e.target.value)}
                    className="form-control"
                    placeholder="Enter PO Number"
                  ></Form.Control>
                </div>
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
                      {selectedPO?.projects?.find(
                        (p) => p.projectId === selectedProjectId
                      )?.projectName || "-- No Project --"}
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
                      {selectedPO?.clients?.find(
                        (c) => c.clientId === selectedClientId
                      )?.clientName || "-- No Client --"}
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
                <Form.Control
                  type="number"
                  value={selectedPO?.lineItems?.[0]?.amount || amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-control"
                  placeholder="Enter amount"
                  readOnly={!!selectedPO?.lineItems?.[0]?.amount}
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="d-block">PO Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedPO?.estimateDate ? new Date(selectedPO.estimateDate).toISOString().split('T')[0] : poDate}
                  onChange={(e) => setPODate(e.target.value)}
                  className="form-control"
                  readOnly={!!selectedPO?.estimateDate}
                  required
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="">
              {/* PO Status field is commented out in your original code */}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={() => setShowAddPOModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSavePO}>
          Save PO
        </Button>
      </Modal.Footer>
    </Modal>
  );
  const { estimates, loading, error } = useSelector(
    (state) => state.costEstimates
  );
  console.log("Cost Estimates:", estimates.costEstimates);
  useEffect(() => {
    dispatch(fetchCostEstimates());
  }, [dispatch]);
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
      case "received":
        return "bg-info text-dark";
      case "invoiced":
        return "bg-dark text-white";
      case "in_progress":
        return "bg-warning text-dark";
      case "reject":
        return "bg-danger text-white";
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
  };
  const Duplicate = (po) => {
    navigate(`/admin/AddCostEstimates`, {
      state: {
        po: {
          ...po, // pehle ka po ka sara data
          CostPOStatus: "Pending", // is field ko override kar rahe hai
        },
        isDuplicate: true,
      },
    });
  };
  const UpdateEstimate = (po) => {
    navigate(`/admin/AddCostEstimates`, {
      state: {
        po,
      },
    });
  };
  // PAGINATION SETUP FOR ESTIMATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  // Add filtering logic before pagination
  const filteredEstimates = estimates?.costEstimates
    ?.slice()
    .reverse()
    .filter((estimate) => {
      // Split searchQuery by spaces, ignore empty terms
      const terms = searchQuery
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      // Prepare searchable fields as strings
      const estimateRef = (estimate.estimateRef || "").toLowerCase();
      // FIX: Use 'clients' and 'projects' fields for search
      const clientName = (
        estimate.clients?.[0]?.clientName || ""
      ).toLowerCase();
      const projectNames = (estimate.projects || [])
        .map((project) =>
          (project.projectName || project.name || "").toLowerCase()
        )
        .join(" ");
      const status = (estimate.Status || "").toLowerCase();
      const poStatus = (estimate.CostPOStatus || "").toLowerCase();
      const fields = [estimateRef, clientName, projectNames, status, poStatus];
      // Every term must be found in at least one field
      const matchesSearch =
        terms.length === 0 ||
        terms.every((term) => fields.some((field) => field.includes(term)));
      // Fix: Correctly map filter values to actual data values
      let matchesPOStatus = true;
      if (selectedPOStatus === "Open") {
        matchesPOStatus = poStatus === "pending";
      } else if (selectedPOStatus === "Active") {
        matchesPOStatus = poStatus === "active" || poStatus === "received";
      } // else "All PO Status" will match all
      const matchesStatus =
        selectedStatus === "All Status" || estimate.Status === selectedStatus;
      // FIX: Compare date in 'YYYY-MM-DD' format
      const estimateDateStr = estimate.estimateDate
        ? estimate.estimateDate.slice(0, 10)
        : "";
      const matchesDate = !selectedDate || estimateDateStr === selectedDate;
      return matchesSearch && matchesPOStatus && matchesStatus && matchesDate;
    });
  // Update pagination to use filtered data
  const totalItems = filteredEstimates?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedEstimates = filteredEstimates?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
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
      const response = await axiosInstance.post(
        `/pdf?CostEstimatesId=${po._id}`,
        {
          projectId: po.projectId?.map((p) => p._id),
          clientId: po.clientId?.map((c) => c._id),
        }
      );
      const estimate = response.data?.data?.[0];
      if (!estimate) throw new Error("No estimate data found");
      const client = estimate.clientId || {};
      const project = estimate.projectId || {};
      const lineItems = estimate.lineItems || [];
      const doc = new jsPDF("p", "pt", "a4");
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const marginLeft = 40;
      const contentWidth = pageWidth - marginLeft * 2;
      // === HEADER ===
      doc.setFillColor(229, 62, 62);
      doc.rect(marginLeft, 40, 200, 50, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      const logoUrl = estimate.image[0];
      const logoBase64 = await getImageBase64(logoUrl);
      doc.addImage(logoBase64, "PNG", marginLeft + 5, 45, 60, 40);
      doc.setFont("helvetica", "bold");
      doc.text("SAARANIK", marginLeft + 70, 60);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("COMPANY ADDRESS DETAILS", marginLeft + 70, 75);
      doc.setTextColor(0, 0, 0);
      // === Estimate Info (Right) ===
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(
        `Cost Estimate No. ${estimate.estimateRef || "---"}`,
        pageWidth - marginLeft - 180,
        50
      );
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Date: ${new Date(estimate.estimateDate).toLocaleDateString("en-GB")}`,
        pageWidth - marginLeft - 180,
        65
      );
      doc.text(`Req. Ref.: --`, pageWidth - marginLeft - 180, 80);
      // === Client Info ===
      let currentY = 120;
      doc.setFontSize(10);
      doc.text("To,", marginLeft, currentY);
      currentY += 15;
      doc.text(` ${client?.clientName || "Client Name"}`, marginLeft, currentY);
      currentY += 14;
      doc.text(
        ` ${project?.projectName || "Client Company Name"}`,
        marginLeft,
        currentY
      );
      currentY += 14;
      doc.text(
        ` ${client?.clientAddress?.split(",")[0] || "Address Line 1"}`,
        marginLeft,
        currentY
      );
      currentY += 14;
      doc.text(
        ` ${client?.shippingInformation?.[0]?.shippingAddress || "Address Line 2"
        }`,
        marginLeft,
        currentY
      );
      currentY += 14;
      doc.text(
        ` ${client?.contactPersons?.[0]?.email || "email"}`,
        marginLeft,
        currentY
      );
      currentY += 14;
      doc.text(
        ` ${client?.contactPersons?.[0]?.phone || "Phone"}`,
        marginLeft,
        currentY
      );
      currentY += 25;
      // === Table Data ===
      const tableData = lineItems.map((item, index) => [
        (index + 1).toString(),
        item.description || "",
        (item.quantity || 0).toString(),
        (item.rate || 0).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        }),
        ((item.quantity || 0) * (item.rate || 0)).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        }),
      ]);
      for (let i = 0; i < 15; i++) tableData.push(["", "", "", "", ""]);
      let finalY;
      autoTable(doc, {
        startY: currentY,
        head: [
          [
            "ITEM #",
            "Brand & Design / Description",
            "QTY",
            "Unit Price (INR)",
            "Amount (INR)",
          ],
        ],
        body: tableData,
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
        didDrawPage: (data) => {
          finalY = data.cursor.y;
        },
      });
      // === Totals Section ===
      const subTotal = lineItems.reduce(
        (sum, item) => sum + (item.quantity || 0) * (item.rate || 0),
        0
      );
      const vat = (subTotal * (estimate.VATRate || 0)) / 100;
      const total = subTotal + vat;
      const totalsBoxX = pageWidth - marginLeft - 120;
      const totalsBoxY = finalY + 20;
      // === Footer Notes ===
      const footerY = totalsBoxY + 65;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("• Cost based on One-off prices.", marginLeft, footerY);
      doc.text(
        "• The above prices valid for 2 weeks and thereafter subject to our reconfirmation.",
        marginLeft,
        footerY + 12
      );
      doc.setFont("helvetica", "bold");
      doc.text(`For Your Company Name`, marginLeft, footerY + 40);
      doc.setFont("helvetica", "normal");
      doc.text(
        "(This is system generated document, hence not signed.)",
        marginLeft,
        footerY + 55
      );
      // === Save PDF ===
      doc.save(`Cost_Estimate_${estimate.estimateRef || "Estimate"}.pdf`);
    } catch (error) {
      console.error("❌ Error generating PDF:", error);
      alert("Failed to generate PDF.");
    }
  };
  const CostEstimatesDetails = (po) => {
    navigate(`/admin/OvervieCostEstimates`, { state: { po } });
  };
  return (
    <div
      className="p-4 m-2"
      style={{ backgroundColor: "white", borderRadius: "10px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 className="fw-semibold mb-3">Cost Estimates</h2>
        <Link to={"/admin/AddCostEstimates"}>
          <button
            id="btn-All"
            className=" btn-dark"
            style={{ border: "none", borderRadius: "10px" }}
          >
            <BsPlusLg className="me-2" /> New Estimate
          </button>
        </Link>
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
              <Dropdown.Item
                onClick={() => setSelectedPOStatus("All PO Status")}
              >
                All PO Status
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedPOStatus("Open")}>
                Open
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedPOStatus("Active")}>
                Active
              </Dropdown.Item>
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
              <Dropdown.Item onClick={() => setSelectedStatus("All Status")}>
                All Status
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Active")}>
                Active
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("pending")}>
                pending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Invoice")}>
                Invoice
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Completed")}>
                Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div
        className="table-responsive"
        style={{ maxHeight: "900px", overflowY: "auto" }}
      >
        <Table hover className="align-middle sticky-header">
          <thead
            style={{
              backgroundColor: "#f8f9fa",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <tr>
              <th style={{ whiteSpace: "nowrap" }}>CE No</th>
              <th style={{ whiteSpace: "nowrap" }}>Project Name</th>
              <th style={{ whiteSpace: "nowrap" }}>Project No</th>
              <th style={{ whiteSpace: "nowrap" }}>Client Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th style={{ whiteSpace: "nowrap" }}>PO Status</th>
              <th style={{ whiteSpace: "nowrap" }}>CE Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEstimates?.map((po, index) => (
              <tr style={{ whiteSpace: "nowrap" }} key={po.poNumber}>
                <td onClick={() => CostEstimatesDetails(po)}>
                  <Link style={{ textDecoration: "none", border: "none" }}>
                    {po.estimateRef}
                  </Link>
                </td>
                <td>
                  {po.projects
                    ?.map((project) => project.projectName)
                    .join(", ")}
                </td>
                <td>
                  {po.projects?.map((project) => project.projectNo).join(", ")}
                </td>
                <td>{po.clients?.[0]?.clientName || "N/A"}</td>
                <td>
                  {new Date(po.estimateDate)
                    .toLocaleDateString("en-GB")
                    .slice(0, 8)}
                </td>
                <td>
                  {po.lineItems
                    ?.reduce((total, item) => total + (item.amount || 0), 0)
                    .toFixed(2)}
                </td>
                <td>
                  <span
                    className={`badge ${getStatusClass(
                      po.CostPOStatus
                    )} px-2 py-1`}
                  >
                    {po.CostPOStatus == "Pending" ? "pendig" : "received"}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${getStatusClass(po.Status)} px-2 py-1`}
                  >
                    {po.Status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      disabled={
                        po.CostPOStatus?.length > 0 &&
                        po.CostPOStatus.toLowerCase() !== "pending"
                      }
                      onClick={() => {
                        setCostEstimatesId(po._id); // Store the ID
                        Ponamehandle(po);
                        setShowAddPOModal(true); // Open Modal
                      }}
                    >
                      Add PO
                    </button>
                    <span
                      className={`badge ${getStatusClass(
                        po.receivablePurchases?.[0]?.POStatus?.toLowerCase() ||
                        "pending"
                      )} px-2 py-1`}
                    >
                    </span>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => Duplicate(po)}
                    >
                      <FaRegCopy />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => UpdateEstimate(po)}
                    >
                      <BsPencil />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleDownloadPDF(po)}
                    >
                      <FaDownload />
                    </button>
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
                disabled
              />
            </Form.Group>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <strong>Subtotal:</strong>
              </div>
              <div>
                <strong>Tax (10%):</strong>
              </div>
              <div>
                <strong>Total:</strong>
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
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            entries
          </div>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <span aria-hidden="true">&laquo;</span>
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
              className={`page-item ${currentPage === totalPages ? "disabled" : ""
                }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
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