// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createCostEstimate,
//   imagelogoCostEstimate,
//   updateCostEstimate,
// } from "../../../redux/slices/costEstimatesSlice";
// import { fetchProject } from "../../../redux/slices/ProjectsSlice";
// import { fetchClient } from "../../../redux/slices/ClientSlice";

// const currencies = [
//   { label: "USD - US Dollar", value: "USD" },
//   { label: "EUR - Euro", value: "EUR" },
//   { label: "INR - Indian Rupee", value: "INR" },
//   { label: "GBP - British Pound", value: "GBP" },
//   { label: "JPY - Japanese Yen", value: "JPY" },
//   { label: "AED - UAE Dirham", value: "AED" },
//   { label: "SAR - Saudi Riyal", value: "SAR" },
// ];

// function AddCostEstimates() {
//   const location = useLocation();
//   const po = location.state?.po;
//   const projectNo = location.state?.idProject;
//   const isDuplicate = location.state?.isDuplicate;
//   const id = po?._id;



//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { project } = useSelector((state) => state.projects);
//   const { Clients } = useSelector((state) => state.client);
//   const { logoCostEstimate } = useSelector((state) => state.costEstimates);

//   useEffect(() => {
//     dispatch(fetchProject());
//     dispatch(fetchClient());
//     dispatch(imagelogoCostEstimate());
//   }, [dispatch]);

//   const reversedProjectList = project?.data?.slice().reverse() || [];

//   const [items, setItems] = useState([
//     { description: "", quantity: 0, rate: 0, amount: 0 },
//   ]);

//   const [formData, setFormData] = useState({
//     clientId: "",
//     clientName: "",
//     projectId: "",
//     projectName: "",
//     estimateDate: "",
//     validUntil: "",
//     Notes: "",
//     currency: "USD",
//     POStatus: "Pending",
//     CostPOStatus: "Pending",
//     Status: "Draft",
//   });

//   const [image, setImage] = useState(null);
//   const [taxRate, setTaxRate] = useState(0.05);

//   // 🔹 Auto-select project + client if projectNo passed
//   useEffect(() => {
//     if (projectNo && project?.data?.length) {
//       const foundProject = project?.data?.find((p) => p?._id == projectNo);
//       if (foundProject) {
//         const clientId =
//           typeof foundProject.clientId === "object"
//             ? foundProject.clientId._id
//             : foundProject.clientId;

//         const clientObj = Clients?.data?.find((c) => c._id === clientId);

//         setFormData((prev) => ({
//           ...prev,
//           projectId: foundProject._id,
//           projectName: foundProject.projectName,
//           clientId: clientId,
//           clientName: clientObj ? clientObj.clientName : "",
//         }));
//       }
//     }
//   }, [projectNo, project?.data, Clients?.data]);

//   // 🔹 If editing existing PO
//   useEffect(() => {
//     if (po && project?.data?.length) {
//       const projectId =
//         po.projectId?._id ||
//         po.projectId ||
//         po.projects?.[0]?._id ||
//         po.projects?.[0]?.projectId ||
//         "";

//       const clientId =
//         po.clientId?._id ||
//         po.clientId ||
//         po.clients?.[0]?._id ||
//         po.clients?.[0]?.clientId ||
//         "";

//       const clientObj = Clients?.data?.find((c) => c._id === clientId);

//       setFormData((prev) => ({
//         ...prev,
//         ...po,
//         projectId,
//         clientId,
//         clientName: clientObj ? clientObj.clientName : "",
//         estimateDate: po.estimateDate
//           ? po.estimateDate.substring(0, 10)
//           : "",
//         validUntil: po.validUntil ? po.validUntil.substring(0, 10) : "",
//         currency: po.currency || "USD",
//         Notes: po.Notes || "",
//         POStatus: po.POStatus || "Pending",
//         CostPOStatus: po.CostPOStatus || "Pending",
//         Status: po.Status || "Draft",
//       }));

//       if (Array.isArray(po.lineItems) && po.lineItems.length > 0) {
//         setItems(po.lineItems);
//       }
//     }
//   }, [po, project?.data, Clients?.data]);

//   const calculateAmount = (quantity, rate) => quantity * rate;

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
//     newItems[index].amount = calculateAmount(
//       newItems[index].quantity,
//       newItems[index].rate
//     );
//     setItems(newItems);
//   };

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const addItem = () => {
//     setItems([...items, { description: "", quantity: 0, rate: 0, amount: 0 }]);
//   };

//   const removeItem = (index) => {
//     const newItems = [...items];
//     newItems.splice(index, 1);
//     setItems(newItems);
//   };

//   const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
//   const tax = subtotal * taxRate;
//   const total = subtotal + tax;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();

//     formDataToSend.append("projectId", formData.projectId);
//     formDataToSend.append("clientId", formData.clientId);
//     formDataToSend.append("estimateDate", formData.estimateDate);
//     formDataToSend.append("validUntil", formData.validUntil);
//     formDataToSend.append("currency", formData.currency);
//     formDataToSend.append("lineItems", JSON.stringify(items));
//     formDataToSend.append("VATRate", taxRate * 100);
//     formDataToSend.append("Notes", formData.Notes);
//     formDataToSend.append("POStatus", formData.POStatus);
//     formDataToSend.append("CostPOStatus", formData.CostPOStatus);
//     formDataToSend.append("Status", formData.Status);

//     if (image) formDataToSend.append("image", image);

//     if (isDuplicate || !id) {
//       dispatch(createCostEstimate(formDataToSend))
//         .unwrap()
//         .then(() => {
//           toast.success("Estimates created successfully!");
//           navigate(-1);
//         })
//         .catch(() => toast.error("Failed to create estimates"));
//     } else {
//       dispatch(updateCostEstimate({ id, data: formDataToSend }))
//         .unwrap()
//         .then(() => {
//           toast.success("Estimates updated successfully!");
//           navigate(-1);
//         })
//         .catch(() => toast.error("Failed to update estimates"));
//     }
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files?.[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   // 🔹 On project change → auto-select client
//   const handleProjectChange = (e) => {
//     const selectedId = e.target.value;
//     const selectedProject = project?.data?.find((p) => p._id === selectedId);

//     let clientId = "";
//     let clientName = "";
//     if (selectedProject?.clientId) {
//       clientId =
//         typeof selectedProject.clientId === "object"
//           ? selectedProject.clientId._id
//           : selectedProject.clientId;

//       const clientObj = Clients?.data?.find((c) => c._id === clientId);
//       clientName = clientObj ? clientObj.clientName : "";
//     }

//     setFormData({
//       ...formData,
//       projectId: selectedId,
//       projectName: selectedProject?.projectName || "",
//       clientId,
//       clientName,
//     });
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="container py-4">
//         <h4 className="fw-bold mb-4">Cost Estimates</h4>
//         <div className="bg-white border rounded-3 p-4 shadow-sm">
//           <h4 className="fw-semibold mb-4">
//             {id && !isDuplicate ? "Update Estimate" : "Create New Estimate"}
//           </h4>

//           <form onSubmit={handleSubmit}>
//             {/* 🔹 Client */}
//             <div className="row mb-3">
//               <div className="col-md-4 mb-3">
//                 <div className="d-flex align-items-center justify-content-between mb-2">
//                   <label className="form-label mb-0 fw-bold">Client</label>
//                   <Link to="/admin/AddClientManagement">
//                     <button
//                       className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
//                       type="button"
//                     >
//                       + Create
//                     </button>
//                   </Link>
//                 </div>
//                 <select
//                   className="form-select"
//                   name="clientId"
//                   value={formData.clientId || ""}
//                   onChange={(e) => {
//                     const selectedClientId = e.target.value;
//                     const selectedClient = Clients?.data?.find(
//                       (c) => c._id === selectedClientId
//                     );
//                     setFormData({
//                       ...formData,
//                       clientId: selectedClientId,
//                       clientName: selectedClient
//                         ? selectedClient.clientName
//                         : "",
//                     });
//                   }}
//                   required
//                 >
//                   <option value="">Select Client</option>
//                   {Clients?.data?.map((client) => (
//                     <option key={client._id} value={client._id}>
//                       {client.clientName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* 🔹 Project */}
//               <div className="col-md-4 mb-3">
//                 <div className="d-flex align-items-center justify-content-between mb-2">
//                   <label className="form-label mb-0 fw-bold">Project</label>
//                   <Link to="/admin/AddProjectList">
//                     <button
//                       className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
//                       type="button"
//                     >
//                       + Projects
//                     </button>
//                   </Link>
//                 </div>
//                 <select
//                   className="form-select"
//                   name="projectId"
//                   value={formData.projectId || ""}
//                   onChange={handleProjectChange}
//                   required
//                 >
//                   <option value="">Select a project</option>
//                   {reversedProjectList.map((proj) => (
//                     <option key={proj._id} value={proj._id}>
//                       {proj.projectNo} - {proj.projectName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* 🔹 Dates */}
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Estimate Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   name="estimateDate"
//                   value={formData.estimateDate}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Valid Until</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   name="validUntil"
//                   value={formData.validUntil}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </div>

//               {/* 🔹 Currency + Status */}
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Currency</label>
//                 <select
//                   className="form-select"
//                   name="currency"
//                   value={formData.currency}
//                   onChange={handleFormChange}
//                   required
//                 >
//                   {currencies.map((curr) => (
//                     <option key={curr.value} value={curr.value}>
//                       {curr.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Status</label>
//                 <select
//                   className="form-select"
//                   name="Status"
//                   value={formData.Status}
//                   onChange={handleFormChange}
//                   required
//                 >
//                   <option value="Draft">Draft</option>
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                   <option value="Completed">Completed</option>
//                   <option value="pending">pending</option>
//                 </select>
//               </div>

//               {/* 🔹 Logo */}
//               {/* <div className="col-md-4 mb-3 ">
//                 <label className="form-label">Upload PDF Logo</label>
//                 <div className="input-group">
//                   <input
//                     type="file"
//                     className="form-control"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                   {image && (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={image.name}
//                       readOnly
//                     />
//                   )}
//                 </div>
//                 <div className="mt-3">
//                   <label className="form-label fw-bold">
//                     Or Select From Gallery
//                   </label>
//                   <div className="d-flex align-items-center">
//                     <div
//                       className="d-flex flex-row overflow-auto"
//                       style={{ gap: "10px", flex: 1 }}
//                     >
//                       {Array.isArray(logoCostEstimate?.image) &&
//                         logoCostEstimate.image.map((imgUrl, index) => (
//                           <div
//                             className={`card border ${image?.name === `logo_${index}.jpg`
//                               ? "border-primary"
//                               : "border-light"
//                               }`}
//                             key={index}
//                             style={{
//                               width: "90px",
//                               minWidth: "90px",
//                               cursor: "pointer",
//                             }}
//                             onClick={() => {
//                               fetch(imgUrl)
//                                 .then((res) => res.blob())
//                                 .then((blob) => {
//                                   const file = new File(
//                                     [blob],
//                                     `logo_${index}.jpg`,
//                                     { type: blob.type }
//                                   );
//                                   setImage(file);
//                                 });
//                             }}
//                           >
//                             <img
//                               src={imgUrl}
//                               alt="logo"
//                               className="card-img-top"
//                               style={{
//                                 height: "80px",
//                                 objectFit: "cover",
//                                 borderRadius: "6px",
//                               }}
//                             />
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//             </div>

//             {/* 🔹 Line Items */}
//             <h6 className="fw-semibold mb-3">Line Items</h6>
//             <div className="row fw-semibold text-muted mb-2 px-2">
//               <div className="col-md-5">Description</div>
//               <div className="col-md-2">Quantity</div>
//               <div className="col-md-2">Rate</div>
//               <div className="col-md-2">Amount</div>
//               <div className="col-md-1 text-end"></div>
//             </div>

//             {items.map((item, index) => (
//               <div
//                 className="row gx-2 gy-2 align-items-center mb-2 px-2 py-2"
//                 key={index}
//                 style={{ background: "#f9f9f9", borderRadius: "8px" }}
//               >
//                 <div className="col-md-5">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Item description"
//                     value={item.description}
//                     required
//                     onChange={(e) =>
//                       handleItemChange(index, "description", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div className="col-md-2">
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={item.quantity}
//                     required
//                     onChange={(e) =>
//                       handleItemChange(
//                         index,
//                         "quantity",
//                         parseInt(e.target.value) || 0
//                       )
//                     }
//                   />
//                 </div>
//                 <div className="col-md-2">
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={item.rate}
//                     required
//                     onChange={(e) =>
//                       handleItemChange(
//                         index,
//                         "rate",
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                   />
//                 </div>
//                 <div className="col-md-2">
//                   <span>
//                     {formData.currency} {item.amount.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="col-md-1 text-end">
//                   <button
//                     className="btn btn-link text-danger p-0"
//                     onClick={() => removeItem(index)}
//                     type="button"
//                   >
//                     remove
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <button
//               className="btn border rounded px-3 py-1 mb-4 text-dark"
//               onClick={addItem}
//               type="button"
//             >
//               + Add Line Item
//             </button>

//             {/* 🔹 Totals + Notes */}
//             <div className="row mt-4">
//               <div className="col-md-6">
//                 <label className="form-label">VAT Rate (%)</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={(taxRate * 100).toFixed(2)}
//                   onChange={(e) =>
//                     setTaxRate(
//                       isNaN(parseFloat(e.target.value))
//                         ? 0
//                         : parseFloat(e.target.value) / 100
//                     )
//                   }
//                   required
//                 />
//                 <div className="mt-3">
//                   Subtotal: {formData.currency} {subtotal.toFixed(2)}
//                   <br />
//                   VAT: {formData.currency} {tax.toFixed(2)}
//                   <br />
//                   <strong>
//                     Total: {formData.currency} {total.toFixed(2)}
//                   </strong>
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Notes</label>
//                 <textarea
//                   className="form-control"
//                   name="Notes"
//                   rows="5"
//                   value={formData.Notes}
//                   onChange={handleFormChange}
//                 />
//               </div>
//             </div>

//             {/* 🔹 Submit */}
//             <div className="mt-4 d-flex gap-2">
//               <button className="btn btn-primary rounded-pill px-4" type="submit">
//                 {id && !isDuplicate ? "Update Estimate" : "Create Estimate"}
//               </button>
//               <button
//                 className="btn btn-outline-secondary rounded-pill px-4"
//                 type="button"
//                 onClick={() => navigate(-1)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddCostEstimates;

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createCostEstimate,
//   imagelogoCostEstimate,
//   updateCostEstimate,
// } from "../../../redux/slices/costEstimatesSlice";
// import { fetchProject } from "../../../redux/slices/ProjectsSlice";
// import { fetchClient } from "../../../redux/slices/ClientSlice";

// const currencies = [
//   { label: "USD - US Dollar", value: "USD" },
//   { label: "EUR - Euro", value: "EUR" },
//   { label: "INR - Indian Rupee", value: "INR" },
//   { label: "GBP - British Pound", value: "GBP" },
//   { label: "JPY - Japanese Yen", value: "JPY" },
//   { label: "AED - UAE Dirham", value: "AED" },
//   { label: "SAR - Saudi Riyal", value: "SAR" },
// ];

// function AddCostEstimates() {
//   const location = useLocation();
//   const po = location.state?.po;
//   const projectNo = location.state?.idProject;
//   const isDuplicate = location.state?.isDuplicate;
//   const id = po?._id;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { project } = useSelector((state) => state.projects);
//   const { Clients } = useSelector((state) => state.client);
//   const { logoCostEstimate } = useSelector((state) => state.costEstimates);

//   // Get today's date in YYYY-MM-DD format for min attribute
//   const today = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     dispatch(fetchProject());
//     dispatch(fetchClient());
//     dispatch(imagelogoCostEstimate());
//   }, [dispatch]);

//   const reversedProjectList = project?.data?.slice().reverse() || [];
//   const [items, setItems] = useState([
//     { description: "", quantity: 0, rate: 0, amount: 0 },
//   ]);
//   const [formData, setFormData] = useState({
//     clientId: "",
//     clientName: "",
//     projectId: "",
//     projectName: "",
//     estimateDate: today, // Default to today
//     validUntil: "",
//     Notes: "",
//     currency: "USD",
//     POStatus: "Pending",
//     CostPOStatus: "Pending",
//     Status: "Draft",
//   });
//   const [image, setImage] = useState(null);
//   const [taxRate, setTaxRate] = useState(0.05);

//   // 🔹 Auto-select project + client if projectNo passed
//   useEffect(() => {
//     if (projectNo && project?.data?.length) {
//       const foundProject = project?.data?.find((p) => p?._id == projectNo);
//       if (foundProject) {
//         const clientId =
//           typeof foundProject.clientId === "object"
//             ? foundProject.clientId._id
//             : foundProject.clientId;
//         const clientObj = Clients?.data?.find((c) => c._id === clientId);
//         setFormData((prev) => ({
//           ...prev,
//           projectId: foundProject._id,
//           projectName: foundProject.projectName,
//           clientId: clientId,
//           clientName: clientObj ? clientObj.clientName : "",
//           estimateDate: prev.estimateDate || today, // Keep existing date or set to today
//         }));
//       }
//     }
//   }, [projectNo, project?.data, Clients?.data, today]);

//   // 🔹 If editing existing PO
//   useEffect(() => {
//     if (po && project?.data?.length) {
//       const projectId =
//         po.projectId?._id ||
//         po.projectId ||
//         po.projects?.[0]?._id ||
//         po.projects?.[0]?.projectId ||
//         "";
//       const clientId =
//         po.clientId?._id ||
//         po.clientId ||
//         po.clients?.[0]?._id ||
//         po.clients?.[0]?.clientId ||
//         "";
//       const clientObj = Clients?.data?.find((c) => c._id === clientId);

//       // For existing estimates, allow the original date even if it's in the past
//       const estimateDate = po.estimateDate
//         ? po.estimateDate.substring(0, 10)
//         : today;

//       const validUntil = po.validUntil
//         ? po.validUntil.substring(0, 10)
//         : "";

//       setFormData((prev) => ({
//         ...prev,
//         ...po,
//         projectId,
//         clientId,
//         clientName: clientObj ? clientObj.clientName : "",
//         estimateDate,
//         validUntil,
//         currency: po.currency || "USD",
//         Notes: po.Notes || "",
//         POStatus: po.POStatus || "Pending",
//         CostPOStatus: po.CostPOStatus || "Pending",
//         Status: po.Status || "Draft",
//       }));

//       if (Array.isArray(po.lineItems) && po.lineItems.length > 0) {
//         setItems(po.lineItems);
//       }
//     }
//   }, [po, project?.data, Clients?.data, today]);

//   const calculateAmount = (quantity, rate) => quantity * rate;

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
//     newItems[index].amount = calculateAmount(
//       newItems[index].quantity,
//       newItems[index].rate
//     );
//     setItems(newItems);
//   };

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const addItem = () => {
//     setItems([...items, { description: "", quantity: 0, rate: 0, amount: 0 }]);
//   };

//   const removeItem = (index) => {
//     const newItems = [...items];
//     newItems.splice(index, 1);
//     setItems(newItems);
//   };

//   const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
//   const tax = subtotal * taxRate;
//   const total = subtotal + tax;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append("projectId", formData.projectId);
//     formDataToSend.append("clientId", formData.clientId);
//     formDataToSend.append("estimateDate", formData.estimateDate);
//     formDataToSend.append("validUntil", formData.validUntil);
//     formDataToSend.append("currency", formData.currency);
//     formDataToSend.append("lineItems", JSON.stringify(items));
//     formDataToSend.append("VATRate", taxRate * 100);
//     formDataToSend.append("Notes", formData.Notes);
//     formDataToSend.append("POStatus", formData.POStatus);
//     formDataToSend.append("CostPOStatus", formData.CostPOStatus);
//     formDataToSend.append("Status", formData.Status);
//     if (image) formDataToSend.append("image", image);

//     if (isDuplicate || !id) {
//       dispatch(createCostEstimate(formDataToSend))
//         .unwrap()
//         .then(() => {
//           toast.success("Estimates created successfully!");
//           navigate(-1);
//         })
//         .catch(() => toast.error("Failed to create estimates"));
//     } else {
//       dispatch(updateCostEstimate({ id, data: formDataToSend }))
//         .unwrap()
//         .then(() => {
//           toast.success("Estimates updated successfully!");
//           navigate(-1);
//         })
//         .catch(() => toast.error("Failed to update estimates"));
//     }
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files?.[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   // 🔹 On project change → auto-select client
//   const handleProjectChange = (e) => {
//     const selectedId = e.target.value;
//     const selectedProject = project?.data?.find((p) => p._id === selectedId);
//     let clientId = "";
//     let clientName = "";
//     if (selectedProject?.clientId) {
//       clientId =
//         typeof selectedProject.clientId === "object"
//           ? selectedProject.clientId._id
//           : selectedProject.clientId;
//       const clientObj = Clients?.data?.find((c) => c._id === clientId);
//       clientName = clientObj ? clientObj.clientName : "";
//     }
//     setFormData({
//       ...formData,
//       projectId: selectedId,
//       projectName: selectedProject?.projectName || "",
//       clientId,
//       clientName,
//     });
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="container py-4">
//         <h4 className="fw-bold mb-4">Cost Estimates</h4>
//         <div className="bg-white border rounded-3 p-4 shadow-sm">
//           <h4 className="fw-semibold mb-4">
//             {id && !isDuplicate ? "Update Estimate" : "Create New Estimate"}
//           </h4>
//           <form onSubmit={handleSubmit}>
//             {/* 🔹 Client */}
//             <div className="row mb-3">
//               <div className="col-md-4 mb-3">
//                 <div className="d-flex align-items-center justify-content-between mb-2">
//                   <label className="form-label mb-0 fw-bold">Client</label>
//                   <Link to="/admin/AddClientManagement">
//                     <button
//                       className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
//                       type="button"
//                     >
//                       + Create
//                     </button>
//                   </Link>
//                 </div>
//                 <select
//                   className="form-select"
//                   name="clientId"
//                   value={formData.clientId || ""}
//                   onChange={(e) => {
//                     const selectedClientId = e.target.value;
//                     const selectedClient = Clients?.data?.find(
//                       (c) => c._id === selectedClientId
//                     );
//                     setFormData({
//                       ...formData,
//                       clientId: selectedClientId,
//                       clientName: selectedClient
//                         ? selectedClient.clientName
//                         : "",
//                     });
//                   }}
//                   required
//                 >
//                   <option value="">Select Client</option>
//                   {Clients?.data?.map((client) => (
//                     <option key={client._id} value={client._id}>
//                       {client.clientName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {/* 🔹 Project */}
//               <div className="col-md-4 mb-3">
//                 <div className="d-flex align-items-center justify-content-between mb-2">
//                   <label className="form-label mb-0 fw-bold">Project</label>
//                   <Link to="/admin/AddProjectList">
//                     <button
//                       className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
//                       type="button"
//                     >
//                       + Projects
//                     </button>
//                   </Link>
//                 </div>
//                 <select
//                   className="form-select"
//                   name="projectId"
//                   value={formData.projectId || ""}
//                   onChange={handleProjectChange}
//                   required
//                 >
//                   <option value="">Select a project</option>
//                   {reversedProjectList.map((proj) => (
//                     <option key={proj._id} value={proj._id}>
//                       {proj.projectNo} - {proj.projectName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {/* 🔹 Dates */}
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Estimate Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   name="estimateDate"
//                   value={formData.estimateDate}
//                   onChange={handleFormChange}
//                   min={id ? undefined : today} // Only enforce min for new estimates
//                   required
//                 />
//               </div>
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Valid Until</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   name="validUntil"
//                   value={formData.validUntil}
//                   onChange={handleFormChange}
//                   min={formData.estimateDate || today} // Valid until must be after estimate date
//                   required
//                 />
//               </div>
//               {/* 🔹 Currency + Status */}
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Currency</label>
//                 <select
//                   className="form-select"
//                   name="currency"
//                   value={formData.currency}
//                   onChange={handleFormChange}
//                   required
//                 >
//                   {currencies.map((curr) => (
//                     <option key={curr.value} value={curr.value}>
//                       {curr.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Status</label>
//                 <select
//                   className="form-select"
//                   name="Status"
//                   value={formData.Status}
//                   onChange={handleFormChange}
//                   required
//                 >
//                   <option value="Draft">Draft</option>
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                   <option value="Completed">Completed</option>
//                   <option value="pending">pending</option>
//                 </select>
//               </div>
//             </div>
//             {/* 🔹 Line Items */}
//             <h6 className="fw-semibold mb-3">Line Items</h6>
//             <div className="row fw-semibold text-muted mb-2 px-2">
//               <div className="col-md-5">Description</div>
//               <div className="col-md-2">Quantity</div>
//               <div className="col-md-2">Rate</div>
//               <div className="col-md-2">Amount</div>
//               <div className="col-md-1 text-end"></div>
//             </div>
//             {items.map((item, index) => (
//               <div
//                 className="row gx-2 gy-2 align-items-center mb-2 px-2 py-2"
//                 key={index}
//                 style={{ background: "#f9f9f9", borderRadius: "8px" }}
//               >
//                 <div className="col-md-5">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Item description"
//                     value={item.description}
//                     required
//                     onChange={(e) =>
//                       handleItemChange(index, "description", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div className="col-md-2">
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={item.quantity}
//                     required
//                     onChange={(e) =>
//                       handleItemChange(
//                         index,
//                         "quantity",
//                         parseInt(e.target.value) || 0
//                       )
//                     }
//                   />
//                 </div>
//                 <div className="col-md-2">
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={item.rate}
//                     required
//                     onChange={(e) =>
//                       handleItemChange(
//                         index,
//                         "rate",
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                   />
//                 </div>
//                 <div className="col-md-2">
//                   <span>
//                     {formData.currency} {item.amount.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="col-md-1 text-end">
//                   <button
//                     className="btn btn-link text-danger p-0"
//                     onClick={() => removeItem(index)}
//                     type="button"
//                   >
//                     remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <button
//               className="btn border rounded px-3 py-1 mb-4 text-dark"
//               onClick={addItem}
//               type="button"
//             >
//               + Add Line Item
//             </button>
//             {/* 🔹 Totals + Notes */}
//             <div className="row mt-4">
//               <div className="col-md-6">
//                 <label className="form-label">VAT Rate (%)</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={(taxRate * 100).toFixed(2)}
//                   onChange={(e) =>
//                     setTaxRate(
//                       isNaN(parseFloat(e.target.value))
//                         ? 0
//                         : parseFloat(e.target.value) / 100
//                     )
//                   }
//                   required
//                 />
//                 <div className="mt-3">
//                   Subtotal: {formData.currency} {subtotal.toFixed(2)}
//                   <br />
//                   VAT: {formData.currency} {tax.toFixed(2)}
//                   <br />
//                   <strong>
//                     Total: {formData.currency} {total.toFixed(2)}
//                   </strong>
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Notes</label>
//                 <textarea
//                   className="form-control"
//                   name="Notes"
//                   rows="5"
//                   value={formData.Notes}
//                   onChange={handleFormChange}
//                 />
//               </div>
//             </div>
//             {/* 🔹 Submit */}
//             <div className="mt-4 d-flex gap-2">
//               <button className="btn btn-primary rounded-pill px-4" type="submit">
//                 {id && !isDuplicate ? "Update Estimate" : "Create Estimate"}
//               </button>
//               <button
//                 className="btn btn-outline-secondary rounded-pill px-4"
//                 type="button"
//                 onClick={() => navigate(-1)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddCostEstimates;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createCostEstimate,
  imagelogoCostEstimate,
  updateCostEstimate,
  fetchCostEstimates
} from "../../../redux/slices/costEstimatesSlice";
import { fetchProject } from "../../../redux/slices/ProjectsSlice";
import { fetchClient } from "../../../redux/slices/ClientSlice";

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "AED - UAE Dirham", value: "AED" },
  { label: "SAR - Saudi Riyal", value: "SAR" },
];

function AddCostEstimates() {
  const location = useLocation();
  const po = location.state?.po;
  const projectNo = location.state?.idProject;
  const isDuplicate = location.state?.isDuplicate;
  const id = po?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.projects);
  const { Clients } = useSelector((state) => state.client);
  const { estimates, loading, error } = useSelector(
    (state) => state.costEstimates
  );

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    dispatch(fetchProject());
    dispatch(fetchClient());
    dispatch(imagelogoCostEstimate());
    dispatch(fetchCostEstimates()); // Fetch all cost estimates
  }, [dispatch]);

  // Debug: Log the data to check what we're getting
  useEffect(() => {
    console.log("Projects data:", project?.data);
    console.log("Cost estimates data:", estimates.costEstimates);
  }, [project, estimates.costEstimates]);

  // Filter projects that don't have cost estimates yet
  const getProjectsWithoutEstimates = () => {
    if (!project?.data) {
      console.log("No projects data available");
      return [];
    }

    // If no cost estimates, return all projects
    if (!estimates || !estimates.costEstimates || estimates.costEstimates.length === 0) {
      console.log("No cost estimates found, returning all projects");
      return project.data;
    }

    // Get all project IDs that already have cost estimates
    const projectIdsWithEstimates = new Set();
    estimates.costEstimates.forEach(estimate => {
      if (estimate.projects && estimate.projects.length > 0) {
        estimate.projects.forEach(proj => {
          // The project ID might be in projectId or _id field
          const projectId = proj.projectId || proj._id;
          if (projectId) {
            projectIdsWithEstimates.add(projectId);
            console.log("Project with estimate:", projectId);
          }
        });
      }
    });

    console.log("All project IDs with estimates:", Array.from(projectIdsWithEstimates));

    // Filter out projects that already have estimates
    const projectsWithoutEstimates = project.data.filter(proj => {
      const hasEstimate = projectIdsWithEstimates.has(proj._id);
      console.log(`Project ${proj._id} (${proj.projectName}) has estimate:`, hasEstimate);
      return !hasEstimate;
    });

    console.log("Projects without estimates:", projectsWithoutEstimates);
    return projectsWithoutEstimates;
  };

  const reversedProjectList = getProjectsWithoutEstimates().slice().reverse() || [];

  // If we're editing an existing estimate, include its project in the list
  const getAvailableProjects = () => {
    if (id && po?.projects?.[0]?.projectId) {
      const currentProjectId = po.projects[0].projectId;
      const currentProject = project?.data?.find(p => p._id === currentProjectId);

      if (currentProject && !reversedProjectList.find(p => p._id === currentProjectId)) {
        return [currentProject, ...reversedProjectList];
      }
    }
    return reversedProjectList;
  };

  const availableProjects = getAvailableProjects();

  const [items, setItems] = useState([
    { description: "", quantity: 0, rate: 0, amount: 0 },
  ]);

  const [formData, setFormData] = useState({
    clientId: "",
    clientName: "",
    projectId: "",
    projectName: "",
    estimateDate: today, // Default to today
    validUntil: "",
    Notes: "",
    currency: "USD",
    POStatus: "Pending",
    CostPOStatus: "Pending",
    Status: "Draft",
  });

  const [image, setImage] = useState(null);
  const [taxRate, setTaxRate] = useState(0.05);

  // 🔹 Auto-select project + client if projectNo passed
  useEffect(() => {
    if (projectNo && project?.data?.length) {
      const foundProject = project?.data?.find((p) => p?._id == projectNo);
      if (foundProject) {
        const clientId =
          typeof foundProject.clientId === "object"
            ? foundProject.clientId._id
            : foundProject.clientId;
        const clientObj = Clients?.data?.find((c) => c._id === clientId);
        setFormData((prev) => ({
          ...prev,
          projectId: foundProject._id,
          projectName: foundProject.projectName,
          clientId: clientId,
          clientName: clientObj ? clientObj.clientName : "",
          estimateDate: prev.estimateDate || today, // Keep existing date or set to today
        }));
      }
    }
  }, [projectNo, project?.data, Clients?.data, today]);

  // 🔹 If editing existing PO
  useEffect(() => {
    if (po && project?.data?.length) {
      const projectId =
        po.projectId?._id ||
        po.projectId ||
        po.projects?.[0]?._id ||
        po.projects?.[0]?.projectId ||
        "";
      const clientId =
        po.clientId?._id ||
        po.clientId ||
        po.clients?.[0]?._id ||
        po.clients?.[0]?.clientId ||
        "";
      const clientObj = Clients?.data?.find((c) => c._id === clientId);
      // For existing estimates, allow the original date even if it's in the past
      const estimateDate = po.estimateDate
        ? po.estimateDate.substring(0, 10)
        : today;
      const validUntil = po.validUntil
        ? po.validUntil.substring(0, 10)
        : "";
      setFormData((prev) => ({
        ...prev,
        ...po,
        projectId,
        clientId,
        clientName: clientObj ? clientObj.clientName : "",
        estimateDate,
        validUntil,
        currency: po.currency || "USD",
        Notes: po.Notes || "",
        POStatus: po.POStatus || "Pending",
        CostPOStatus: po.CostPOStatus || "Pending",
        Status: po.Status || "Draft",
      }));
      if (Array.isArray(po.lineItems) && po.lineItems.length > 0) {
        setItems(po.lineItems);
      }
    }
  }, [po, project?.data, Clients?.data, today]);

  const calculateAmount = (quantity, rate) => quantity * rate;

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount = calculateAmount(
      newItems[index].quantity,
      newItems[index].rate
    );
    setItems(newItems);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 0, rate: 0, amount: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("projectId", formData.projectId);
    formDataToSend.append("clientId", formData.clientId);
    formDataToSend.append("estimateDate", formData.estimateDate);
    formDataToSend.append("validUntil", formData.validUntil);
    formDataToSend.append("currency", formData.currency);
    formDataToSend.append("lineItems", JSON.stringify(items));
    formDataToSend.append("VATRate", taxRate * 100);
    formDataToSend.append("Notes", formData.Notes);
    formDataToSend.append("POStatus", formData.POStatus);
    formDataToSend.append("CostPOStatus", formData.CostPOStatus);
    formDataToSend.append("Status", formData.Status);
    if (image) formDataToSend.append("image", image);
    if (isDuplicate || !id) {
      dispatch(createCostEstimate(formDataToSend))
        .unwrap()
        .then(() => {
          toast.success("Estimates created successfully!");
          navigate(-1);
        })
        .catch(() => toast.error("Failed to create estimates"));
    } else {
      dispatch(updateCostEstimate({ id, data: formDataToSend }))
        .unwrap()
        .then(() => {
          toast.success("Estimates updated successfully!");
          navigate(-1);
        })
        .catch(() => toast.error("Failed to update estimates"));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  // 🔹 On project change → auto-select client
  const handleProjectChange = (e) => {
    const selectedId = e.target.value;
    const selectedProject = project?.data?.find((p) => p._id === selectedId);
    let clientId = "";
    let clientName = "";
    if (selectedProject?.clientId) {
      clientId =
        typeof selectedProject.clientId === "object"
          ? selectedProject.clientId._id
          : selectedProject.clientId;
      const clientObj = Clients?.data?.find((c) => c._id === clientId);
      clientName = clientObj ? clientObj.clientName : "";
    }
    setFormData({
      ...formData,
      projectId: selectedId,
      projectName: selectedProject?.projectName || "",
      clientId,
      clientName,
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="container py-4">
        <h4 className="fw-bold mb-4">Cost Estimates</h4>
        <div className="bg-white border rounded-3 p-4 shadow-sm">
          <h4 className="fw-semibold mb-4">
            {id && !isDuplicate ? "Update Estimate" : "Create New Estimate"}
          </h4>
          <form onSubmit={handleSubmit}>
            {/* 🔹 Client */}
            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <label className="form-label mb-0 fw-bold">Client</label>
                  <Link to="/admin/AddClientManagement">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                      type="button"
                    >
                      + Create
                    </button>
                  </Link>
                </div>
                <select
                  className="form-select"
                  name="clientId"
                  value={formData.clientId || ""}
                  onChange={(e) => {
                    const selectedClientId = e.target.value;
                    const selectedClient = Clients?.data?.find(
                      (c) => c._id === selectedClientId
                    );
                    setFormData({
                      ...formData,
                      clientId: selectedClientId,
                      clientName: selectedClient
                        ? selectedClient.clientName
                        : "",
                    });
                  }}
                  required
                >
                  <option value="">Select Client</option>
                  {Clients?.data?.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.clientName}
                    </option>
                  ))}
                </select>
              </div>
              {/* 🔹 Project */}
              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <label className="form-label mb-0 fw-bold">Project</label>
                  <Link to="/admin/AddProjectList">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                      type="button"
                    >
                      + Projects
                    </button>
                  </Link>
                </div>
                <select
                  className="form-select"
                  name="projectId"
                  value={formData.projectId || ""}
                  onChange={handleProjectChange}
                  required
                >
                  <option value="">Select a project</option>
                  {availableProjects.map((proj) => (
                    <option key={proj._id} value={proj._id}>
                      {proj.projectNo} - {proj.projectName}
                    </option>
                  ))}
                </select>
              </div>
              {/* 🔹 Dates */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Estimate Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="estimateDate"
                  value={formData.estimateDate}
                  onChange={handleFormChange}
                  min={id ? undefined : today} // Only enforce min for new estimates
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Valid Until</label>
                <input
                  type="date"
                  className="form-control"
                  name="validUntil"
                  value={formData.validUntil}
                  onChange={handleFormChange}
                  min={formData.estimateDate || today} // Valid until must be after estimate date
                  required
                />
              </div>
              {/* 🔹 Currency + Status */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Currency</label>
                <select
                  className="form-select"
                  name="currency"
                  value={formData.currency}
                  onChange={handleFormChange}
                  required
                >
                  {currencies.map((curr) => (
                    <option key={curr.value} value={curr.value}>
                      {curr.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="Status"
                  value={formData.Status}
                  onChange={handleFormChange}
                  required
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Completed">Completed</option>
                  <option value="pending">pending</option>
                </select>
              </div>
            </div>
            {/* 🔹 Line Items */}
            <h6 className="fw-semibold mb-3">Line Items</h6>
            <div className="row fw-semibold text-muted mb-2 px-2">
              <div className="col-md-5">Description</div>
              <div className="col-md-2">Quantity</div>
              <div className="col-md-2">Rate</div>
              <div className="col-md-2">Amount</div>
              <div className="col-md-1 text-end"></div>
            </div>
            {items.map((item, index) => (
              <div
                className="row gx-2 gy-2 align-items-center mb-2 px-2 py-2"
                key={index}
                style={{ background: "#f9f9f9", borderRadius: "8px" }}
              >
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Item description"
                    value={item.description}
                    required
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    value={item.quantity}
                    required
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    value={item.rate}
                    required
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "rate",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="col-md-2">
                  <span>
                    {formData.currency} {item.amount.toFixed(2)}
                  </span>
                </div>
                <div className="col-md-1 text-end">
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => removeItem(index)}
                    type="button"
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}
            <button
              className="btn border rounded px-3 py-1 mb-4 text-dark"
              onClick={addItem}
              type="button"
            >
              + Add Line Item
            </button>
            {/* 🔹 Totals + Notes */}
            <div className="row mt-4">
              <div className="col-md-6">
                <label className="form-label">VAT Rate (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={(taxRate * 100).toFixed(2)}
                  onChange={(e) =>
                    setTaxRate(
                      isNaN(parseFloat(e.target.value))
                        ? 0
                        : parseFloat(e.target.value) / 100
                    )
                  }
                  required
                />
                <div className="mt-3">
                  Subtotal: {formData.currency} {subtotal.toFixed(2)}
                  <br />
                  VAT: {formData.currency} {tax.toFixed(2)}
                  <br />
                  <strong>
                    Total: {formData.currency} {total.toFixed(2)}
                  </strong>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  name="Notes"
                  rows="5"
                  value={formData.Notes}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            {/* 🔹 Submit */}
            <div className="mt-4 d-flex gap-2">
              <button className="btn btn-primary rounded-pill px-4" type="submit">
                {id && !isDuplicate ? "Update Estimate" : "Create Estimate"}
              </button>
              <button
                className="btn btn-outline-secondary rounded-pill px-4"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCostEstimates;