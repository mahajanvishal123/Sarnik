// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch } from 'react-redux';
// import { createClients, fetchClient, fetchClientsById, UpdateClients } from '../../../redux/slices/ClientSlice';
// import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';
// import { apiUrl } from '../../../redux/utils/config';
// import CreatableSelect from "react-select/creatable";
// import { countries } from './countrydata';

// // Add this function to format date for input fields
// const formatDate = (dateStr) => {
//   if (!dateStr) return '';
//   const d = new Date(dateStr);
//   if (isNaN(d)) return '';
//   const month = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   return `${d.getFullYear()}-${month}-${day}`;
// };

// function AddClientManagement() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams(); // for edit mo
//   const location = useLocation();
//   const { client } = location.state || {};
//   const _id = client?._id
//   console.log("oo", _id);

//   // Initial form state
//   const [formData, setFormData] = useState({
//     clientName: '',
//     industry: '',
//     website: '',
//     clientAddress: '',
//     TaxID_VATNumber: '',
//     CSRCode: '',
//     Status: '',
//     button_Client_Suplier: ''
//   });

//   // Contact persons state
//   const [contactPersons, setContactPersons] = useState([
//     {
//       contactName: '',
//       jobTitle: '',
//       email: '',
//       phone: '',
//       department: '',
//       salesRepresentative: ''
//     }
//   ]);

//   // Billing information state
//   const [billingInformation, setBillingInformation] = useState([
//     {
//       billingAddress: '',
//       billingContactName: '',
//       billingEmail: '',
//       billingPhone: '',
//       currency: '',
//       preferredPaymentMethod: ''
//     }
//   ]);
//   // Shipping information state
//   const [shippingInformation, setShippingInformation] = useState([
//     {
//       shippingAddress: '',
//       shippingContactName: '',
//       shippingEmail: '',
//       shippingPhone: '',
//       preferredShippingMethod: '',
//       specialInstructions: ''
//     }
//   ]);
//   // Financial information state
//   const [financialInformation, setFinancialInformation] = useState([
//     {
//       annualRevenue: '',
//       creditRating: '',
//       bankName: '',
//       accountNumber: '',
//       fiscalYearEnd: '',
//       financialContact: ''
//     }
//   ]);

//   // Ledger information state
//   const [ledgerInformation, setLedgerInformation] = useState([
//     {
//       accountCode: '',
//       accountType: '',
//       openingBalance: '',
//       balanceDate: '',
//       taxCategory: '',
//       costCenter: ''
//     }
//   ]);

//   // Additional information state
//   const [additionalInformation, setAdditionalInformation] = useState({
//     paymentTerms: '',
//     creditLimit: '',
//     notes: ''
//   });

//   // Add state for errors
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const updateStates = (clientData) => {
//       setFormData({
//         clientName: clientData.clientName || '',
//         industry: clientData.industry || '',
//         website: clientData.website || '',
//         clientAddress: clientData.clientAddress || '',
//         TaxID_VATNumber: clientData.TaxID_VATNumber || '',
//         CSRCode: clientData.CSRCode || '',
//         Status: clientData.Status || '',
//         button_Client_Suplier: clientData.button_Client_Suplier || ''
//       });

//       setContactPersons(clientData.contactPersons || []);
//       setBillingInformation(clientData.billingInformation || []);
//       setShippingInformation(clientData.shippingInformation || []);
//       setFinancialInformation(
//         (clientData.financialInformation || []).map((item) => ({
//           ...item,
//           fiscalYearEnd: formatDate(item.fiscalYearEnd),
//         }))
//       );
//       setLedgerInformation(
//         (clientData.ledgerInformation || []).map((item) => ({
//           ...item,
//           balanceDate: formatDate(item.balanceDate),
//         }))
//       );
//       setAdditionalInformation(clientData.additionalInformation || {
//         paymentTerms: '',
//         creditLimit: '',
//         notes: ''
//       });
//     };

//     if (client) {
//       updateStates(client);
//     } else if (id) {
//       dispatch(fetchClientsById(id)).then((res) => {
//         const fetchedclient = res.payload;
//         if (fetchedclient) {
//           updateStates(fetchedclient);
//         }
//       });
//     }
//   }, [id, dispatch, client]);



//   // Handle basic form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle contact person changes
//   const handleContactChange = (index, e) => {
//     const { name, value } = e.target;
//     let newValue = value;
//     // if (name === 'phone') {
//     //   newValue = newValue.replace(/[^\d]/g, '').slice(0, 10);
//     // }
//     const updatedContacts = [...contactPersons];
//     updatedContacts[index] = {
//       ...updatedContacts[index],
//       [name]: newValue
//     };
//     setContactPersons(updatedContacts);
//   };

//   // Handle billing information changes
//   const handleBillingChange = (index, e) => {
//     const { name, value } = e.target;
//     let newValue = value;
//     if (name === 'billingPhone') {
//       newValue = newValue.replace(/[^\d]/g, '').slice(0, 10);
//     }
//     const updatedBilling = [...billingInformation];
//     updatedBilling[index] = {
//       ...updatedBilling[index],
//       [name]: newValue
//     };
//     setBillingInformation(updatedBilling);
//   };

//   // Handle shipping information changes
//   const handleShippingChange = (index, e) => {
//     const { name, value } = e.target;
//     let newValue = value;
//     if (name === 'shippingPhone') {
//       newValue = newValue.replace(/[^\d]/g, '').slice(0, 10);
//     }
//     const updatedShipping = [...shippingInformation];
//     updatedShipping[index] = {
//       ...updatedShipping[index],
//       [name]: newValue
//     };
//     setShippingInformation(updatedShipping);
//   };

//   // Handle financial information changes
//   const handleFinancialChange = (index, e) => {
//     const { name, value } = e.target;
//     let newValue = value;
//     if (name === 'creditRating') {
//       // Only allow numbers between 1 and 5
//       let num = Number(newValue);
//       if (newValue === '') {
//         newValue = '';
//       } else if (num < 1) {
//         newValue = '1';
//       } else if (num > 5) {
//         newValue = '5';
//       } else {
//         newValue = String(num);
//       }
//     }
//     const updatedFinancial = [...financialInformation];
//     updatedFinancial[index] = {
//       ...updatedFinancial[index],
//       [name]: newValue
//     };
//     setFinancialInformation(updatedFinancial);
//   };

//   // Handle ledger information changes
//   const handleLedgerChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedLedger = [...ledgerInformation];
//     updatedLedger[index] = {
//       ...updatedLedger[index],
//       [name]: value
//     };
//     setLedgerInformation(updatedLedger);
//   };


//   const handleAdditionalChange = (e) => {
//     const { name, value } = e.target;
//     setAdditionalInformation(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };


//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const fullData = {
//       ...formData,
//       contactPersons,
//       billingInformation,
//       shippingInformation,
//       financialInformation,
//       ledgerInformation,
//       additionalInformation
//     };
//     console.log('Full Data Object:', fullData);
//     if (_id) {
//       dispatch(UpdateClients({ _id, data: fullData }))
//         .unwrap()
//         .then(() => {
//           toast.success("clientupdated successfully!");
//           navigate("/admin/clientManagement");
//           dispatch(fetchClient());
//         })
//         .catch(() => {
//           toast.error("Failed to update client!");
//         });
//     } else {
//       dispatch(createClients(fullData))
//         .unwrap()
//         .then(() => {
//           toast.success("clientcreated successfully!");
//           navigate("/admin/clientManagement");
//           dispatch(fetchClient());
//         })
//         .catch(() => {
//           toast.error("Error creating client");
//         });
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const fullData = {
//   //     ...formData,
//   //     contactPersons,
//   //     billingInformation,
//   //     shippingInformation,
//   //     financialInformation,
//   //     ledgerInformation,
//   //     additionalInformation
//   //   };
//   //         dispatch(createClients(fullData))
//   //       .unwrap()
//   //       .then(() => {
//   //         toast.success("clientcreated successfully!");
//   //         navigate("/clientManagement");
//   //       })
//   //       .catch(() => {
//   //         toast.error("Error creating client");
//   //       });
//   // };

//   // ///////////////////////////////////////////////////////////////////////////////////////////

//   // Keep the options in local state so we can push newly‑created ones
//   const [brandOptions, setBrandOptions] = useState([
//     { value: "Coca‑Cola", label: "Coca‑Cola" },
//     { value: "Pepsi", label: "Pepsi" },
//     // …your initial list
//   ]);

//   // When the user creates a brand that isn’t in the list yet
//   const handleCreate = (inputValue) => {
//     const newOption = { value: inputValue, label: inputValue };
//     setBrandOptions((prev) => [...prev, newOption]);
//     setFormData((prev) => ({ ...prev, brandName: inputValue }));
//   };

//   // Add state for select options
//   const [selectOptions, setSelectOptions] = useState({
//     industry: [],
//     currency: [],
//     preferredPaymentMethod: [],
//     preferredShippingMethod: [],
//     accountType: [],

//   });

//   // Fetch select options from API on mount
//   useEffect(() => {
//     axios.get(`${apiUrl}/client/selectclient`)
//       .then(res => {
//         if (res.data.success && res.data.data) {
//           setSelectOptions({
//             industry: (res.data.data.industry || []).map(v => ({ value: v, label: v })),
//             currency: (res.data.data.currency || []).map(v => ({ value: v, label: v })),
//             preferredPaymentMethod: (res.data.data.preferredPaymentMethod || []).map(v => ({ value: v, label: v })),
//             preferredShippingMethod: (res.data.data.preferredShippingMethod || []).map(v => ({ value: v, label: v })),
//             accountType: (res.data.data.accountType || []).map(v => ({ value: v, label: v })),
//           });
//         }
//       });
//   }, []);

//   // Generic handler for creating new options
//   const [userData, setUserData] = useState({
//     countryCode: "+44",
//     phoneNumber: "",
//   });

//   const validatePhone = () => {
//     const fullNumber = userData.countryCode + userData.phoneNumber;
//     if (!/^\+\d{10,15}$/.test(fullNumber)) {
//       errors.phoneNumber = "Enter a valid phone number with selected country code.";
//     }
//   };

//   const handleCreateOption = (field) => (inputValue) => {
//     axios.post(`${apiUrl}/client/selectclient`, {
//       [field]: [...selectOptions[field].map(opt => opt.value), inputValue]
//     }).then(() => {
//       setSelectOptions(prev => ({
//         ...prev,
//         [field]: [...prev[field], { value: inputValue, label: inputValue }]
//       }));
//       setFormData(prev => ({
//         ...prev,
//         [field]: inputValue
//       }));
//     });
//   };
//   if (!/^\+447\d{9}$/.test(formData.CSRCode)) {
//     errors.CSRCode = "Enter valid UK mobile number (e.g. 7912345678)";
//   }

//   // Country wise phone validation regex (basic formats)
//   const phoneRegexByCountry = {
//     "+44": /^7\d{9}$/,          // UK (07xxxxxxxxx → 10 digit, local mobile)
//     "+91": /^\d{10}$/,          // India
//     "+1": /^\d{10}$/,           // USA/Canada
//     "+61": /^\d{9}$/,           // Australia
//     "+81": /^\d{10}$/,          // Japan
//     "+49": /^\d{10,11}$/,       // Germany
//     "+33": /^\d{9}$/,           // France
//     "+39": /^\d{9,10}$/,        // Italy
//     "+971": /^\d{9}$/,          // UAE
//     "+92": /^\d{10}$/,          // Pakistan
//     "+880": /^\d{10}$/,         // Bangladesh
//     "+94": /^\d{9}$/,           // Sri Lanka
//     "+60": /^\d{9,10}$/,        // Malaysia
//     "+65": /^\d{8}$/,           // Singapore
//     "+34": /^\d{9}$/,           // Spain
//     "+7": /^\d{10}$/,           // Russia
//     "+86": /^\d{11}$/,          // China
//     "+82": /^\d{9,10}$/,        // South Korea
//     "+55": /^\d{10,11}$/,       // Brazil
//     "+20": /^\d{10}$/,          // Egypt
//   };

//   const phoneLengthByCountry = {
//     "+44": 10,   // UK
//     "+91": 10,   // India
//     "+1": 10,    // USA/Canada
//     "+61": 9,    // Australia
//     "+81": 10,   // Japan
//     "+49": 11,   // Germany
//     "+33": 9,    // France
//     "+39": 10,   // Italy
//     "+971": 9,   // UAE
//     "+92": 10,   // Pakistan
//     "+880": 10,  // Bangladesh
//     "+94": 9,    // Sri Lanka
//     "+60": 10,   // Malaysia
//     "+65": 8,    // Singapore
//     "+34": 9,    // Spain
//     "+7": 10,    // Russia
//     "+86": 11,   // China
//     "+82": 10,   // South Korea
//     "+55": 11,   // Brazil
//     "+20": 10,   // Egypt
//   };


//   return (
//     <>
//       <ToastContainer />
//       <div className="container mt-5">
//         <div className="card shadow-sm">
//           <div className="card-body">
//             {/* <h1 className="card-title h4 mb-4">Add Company</h1> */}
//             <h2 className="mb-4">{id || client?._id ? "Edit client" : "New Company (Client)"}</h2>
//             <form className="row g-3" onSubmit={handleSubmit}>
//               <div className='col-md-3'>  <h6 className="mb-3">Client/Supplier Information</h6></div>
//               <div className="col-md-6"></div>
//               <div className="col-md-6">
//                 <label className="form-label">Name</label>
//                 <input required type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="form-control" placeholder="Enter  name" />
//                 {errors.clientName && <div className="text-danger small">{errors.clientName}</div>}
//               </div>

//               {/* <div className="col-md-6">
//                 <label className="form-label">industry</label>
//                 <select className="form-select" name="industry" required value={formData.industry} onChange={handleChange}>
//                   <option value="">Select industry</option>
//                   <option value="manufacturing">Manufacturing</option>
//                   <option value="tech">Technology</option>
//                   <option value="retail">Retail</option>
//                 </select>
//                 {errors.industry && <div className="text-danger small">{errors.industry}</div>}
//               </div> */}
//               {/* industry */}
//               <div className="col-md-6">
//                 <label className="form-label">Industry</label>
//                 <CreatableSelect
//                   options={selectOptions.industry}
//                   value={selectOptions.industry.find((opt) => opt.value === formData.industry)}
//                   onChange={(option) =>
//                     setFormData((prev) => ({ ...prev, industry: option?.value || "" }))
//                   }
//                   onCreateOption={handleCreateOption('industry')}
//                   isClearable
//                   required
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Website</label>
//                 <input value={formData.website} name='website' onChange={handleChange} className="form-control" />
//                 {errors.website && <div className="text-danger small">{errors.website}</div>}
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Client Address</label>
//                 <textarea required className="form-control" name="clientAddress" value={formData.clientAddress} onChange={handleChange}></textarea>
//                 {errors.clientAddress && <div className="text-danger small">{errors.clientAddress}</div>}
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Tax ID/VAT Number</label>
//                 <input
//                   required
//                   type="text"
//                   name="TaxID_VATNumber"
//                   value={formData.TaxID_VATNumber}
//                   onChange={handleChange}
//                   className="form-control"
//                   maxLength={15}
//                   pattern="\d*"
//                   inputMode="numeric"
//                 />

//                 {errors.TaxID_VATNumber && <div className="text-danger small">{errors.TaxID_VATNumber}</div>}
//               </div>
//               {/* <div className="col-md-6">
//                 <label className="form-label">Phone Number</label>
//                 <div className="input-group">
//                   <select
//                     className="form-select"
//                     value={userData.countryCode}
//                     onChange={(e) => {
//                       const newCode = e.target.value;
//                       const maxLength = phoneLengthByCountry[newCode] || 10;

//                       let newPhone = userData.phoneNumber;
//                       if (newPhone.length > maxLength) {
//                         newPhone = newPhone.slice(0, maxLength);
//                       }

//                       setUserData({
//                         ...userData,
//                         countryCode: newCode,
//                         phoneNumber: newPhone,
//                       });
//                     }}
//                   >
//                     <option value="+44">🇬🇧 +44 (UK)</option>
//                     <option value="+91">🇮🇳 +91 (India)</option>
//                     <option value="+1">🇺🇸 +1 (USA/Canada)</option>
//                     <option value="+61">🇦🇺 +61 (Australia)</option>
//                     <option value="+81">🇯🇵 +81 (Japan)</option>
//                     <option value="+49">🇩🇪 +49 (Germany)</option>
//                     <option value="+33">🇫🇷 +33 (France)</option>
//                     <option value="+39">🇮🇹 +39 (Italy)</option>
//                     <option value="+971">🇦🇪 +971 (UAE)</option>
//                     <option value="+92">🇵🇰 +92 (Pakistan)</option>
//                     <option value="+880">🇧🇩 +880 (Bangladesh)</option>
//                     <option value="+94">🇱🇰 +94 (Sri Lanka)</option>
//                     <option value="+60">🇲🇾 +60 (Malaysia)</option>
//                     <option value="+65">🇸🇬 +65 (Singapore)</option>
//                     <option value="+34">🇪🇸 +34 (Spain)</option>
//                     <option value="+7">🇷🇺 +7 (Russia)</option>
//                     <option value="+86">🇨🇳 +86 (China)</option>
//                     <option value="+82">🇰🇷 +82 (South Korea)</option>
//                     <option value="+55">🇧🇷 +55 (Brazil)</option>
//                     <option value="+20">🇪🇬 +20 (Egypt)</option>
//                   </select>

//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={userData.phoneNumber}
//                     onChange={(e) => {
//                       let input = e.target.value.replace(/\D/g, ""); // sirf digits allow

//                       const maxLength = phoneLengthByCountry[userData.countryCode] || 10;

//                       if (input.length > maxLength) {
//                         input = input.slice(0, maxLength); // jyada digit cut kar do
//                       }

//                       setUserData({ ...userData, phoneNumber: input });
//                     }}
//                     className="form-control"
//                     inputMode="numeric"
//                     placeholder="Phone number"
//                   />

//                 </div>

//                 {errors.phoneNumber && (
//                   <div className="text-danger small">{errors.phoneNumber}</div>
//                 )}
//               </div> */}


//               <div className="col-md-6">
//                 <label className="form-label">Phone Number</label>
//                 <div className="input-group">
//                   <select
//                     className="form-select"
//                     value={userData.countryCode}
//                     onChange={(e) => {
//                       const newCode = e.target.value;
//                       const selected = countries.find(c => c.code === newCode);

//                       let newPhone = userData.phoneNumber;
//                       if (newPhone.length > (selected?.length || 10)) {
//                         newPhone = newPhone.slice(0, selected.length);
//                       }

//                       setUserData({
//                         ...userData,
//                         countryCode: newCode,
//                         phoneNumber: newPhone,
//                       });
//                     }}
//                   >
//                     {countries.map((c, i) => (
//                       <option key={i} value={c.code}>
//                         {c.name} ({c.code})
//                       </option>
//                     ))}
//                   </select>

//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={userData.phoneNumber}
//                     onChange={(e) => {
//                       let input = e.target.value.replace(/\D/g, ""); // sirf digits
//                       const selected = countries.find(c => c.code === userData.countryCode);
//                       const maxLength = selected?.length || 10;

//                       if (input.length > maxLength) {
//                         input = input.slice(0, maxLength); // jyada digit cut kar do
//                       }

//                       setUserData({ ...userData, phoneNumber: input });
//                     }}
//                     className="form-control"
//                     inputMode="numeric"
//                     placeholder="Phone number"
//                   />
//                 </div>

//                 {errors.phoneNumber && (
//                   <div className="text-danger small">{errors.phoneNumber}</div>
//                 )}
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Status</label>
//                 <select
//                   className="form-select"
//                   name="Status"
//                   required
//                   value={formData.Status}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Status</option> {/* empty option for forcing selection */}
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//                 {errors.Status && <div className="text-danger small">{errors.Status}</div>}
//               </div>

//               <div className='col-md-12 row'>
//                 <h5 className="mb-3 mt-4">Contact Persons</h5>

//                 {contactPersons.map((contact, index) => (
//                   <div className="border p-3 mb-3" key={index}>
//                     <div className="row">
//                       <div className="col-md-6">
//                         <label className="form-label">Contact Name</label>
//                         <input
//                           type="text"
//                           name="contactName"
//                           required
//                           value={contact.contactName}
//                           onChange={(e) => handleContactChange(index, e)}
//                           className="form-control"
//                           placeholder="Enter Contact Name"
//                         />
//                         {errors[`contactName_${index}`] && <div className="text-danger small">{errors[`contactName_${index}`]}</div>}
//                       </div>

//                       <div className="col-md-6">
//                         <label className="form-label">Job Title</label>
//                         <input
//                           type="text"
//                           name="jobTitle"
//                           required
//                           value={contact.jobTitle}
//                           onChange={(e) => handleContactChange(index, e)}
//                           className="form-control"
//                           placeholder="Enter Job Title"
//                         />
//                         {errors[`jobTitle_${index}`] && <div className="text-danger small">{errors[`jobTitle_${index}`]}</div>}
//                       </div>

//                       <div className="col-md-6">
//                         <label className="form-label">Email</label>
//                         <input
//                           type="email"
//                           name="email"
//                           required
//                           value={contact.email}
//                           onChange={(e) => handleContactChange(index, e)}
//                           className="form-control"
//                           placeholder="Enter Email"
//                         />
//                         {errors[`email_${index}`] && <div className="text-danger small">{errors[`email_${index}`]}</div>}
//                       </div>

//                       <div className="col-md-6">
//                         <label className="form-label">Phone</label>
//                         <input
//                           type="number"
//                           name="phone"
//                           required
//                           value={contact.phone}
//                           onChange={(e) => handleContactChange(index, e)}
//                           className="form-control"
//                           placeholder="Enter Phone"
//                           maxLength={10}
//                         />
//                         {errors[`phone_${index}`] && <div className="text-danger small">{errors[`phone_${index}`]}</div>}
//                       </div>

//                       <div className="col-md-6">
//                         <label className="form-label">Department</label>
//                         <input
//                           type="text"
//                           name="department"
//                           required
//                           value={contact.department}
//                           onChange={(e) => handleContactChange(index, e)}
//                           className="form-control"
//                           placeholder="Enter Department"
//                         />
//                         {errors[`department_${index}`] && <div className="text-danger small">{errors[`department_${index}`]}</div>}
//                       </div>

//                       <div className="col-md-6">
//                         <label className="form-label">Sales Representative</label>
//                         <input
//                           type="text"
//                           name="salesRepresentative"
//                           required
//                           value={contact.salesRepresentative}
//                           onChange={(e) => handleContactChange(index, e)}
//                           className="form-control"
//                           placeholder="Enter Sales Representative"
//                         />
//                         {errors[`salesRepresentative_${index}`] && <div className="text-danger small">{errors[`salesRepresentative_${index}`]}</div>}
//                       </div>

//                       <div className="col-md-12 mt-2 d-flex justify-content-end">
//                         {contactPersons.length > 1 && (
//                           <button
//                             type="button"
//                             className="btn btn-danger btn-sm"
//                             onClick={() => {
//                               const updatedContacts = [...contactPersons];
//                               updatedContacts.splice(index, 1);
//                               setContactPersons(updatedContacts);
//                             }}
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Add More Button */}
//                 <div className="mb-3">
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={() => {
//                       setContactPersons([
//                         ...contactPersons,
//                         {
//                           contactName: '',
//                           jobTitle: '',
//                           email: '',
//                           phone: '',
//                           department: '',
//                           salesRepresentative: ''
//                         }
//                       ]);
//                     }}
//                   >
//                     + Add Another Contact
//                   </button>
//                 </div>
//               </div>

//               {/* Billing Information */}
//               <div className='col-md-12 row'>
//                 {/* <h5 className="mb-3 mt-4">Billing Information</h5>
//                 <div className="col-md-12">
//                   <label className="form-label">Billing Address</label>
//                   <textarea className="form-control" rows="3" name="billingAddress" value={billingInformation[0].billingAddress} onChange={(e) => handleBillingChange(0, e)}></textarea>
//                   {errors.billingAddress && <div className="text-danger small">{errors.billingAddress}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Billing Contact Name</label>
//                   <input type="text" className="form-control" name="billingContactName" value={billingInformation[0].billingContactName} onChange={(e) => handleBillingChange(0, e)} />
//                   {errors.billingContactName && <div className="text-danger small">{errors.billingContactName}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Billing Email</label>
//                   <input type="email" className="form-control" name="billingEmail" value={billingInformation[0].billingEmail} onChange={(e) => handleBillingChange(0, e)} />
//                   {errors.billingEmail && <div className="text-danger small">{errors.billingEmail}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Billing Phone</label>
//                   <input type="tel" className="form-control" name="billingPhone" value={billingInformation[0].billingPhone} onChange={(e) => handleBillingChange(0, e)} maxLength={10} />
//                   {errors.billingPhone && <div className="text-danger small">{errors.billingPhone}</div>}
//                 </div> */}

//                 {/* <div className="col-md-6">
//                   <label className="form-label">Currency</label>
//                   <select className="form-select" name="currency" required value={billingInformation[0].currency} onChange={(e) => handleBillingChange(0, e)}>
//                     <option value="">Select Currency</option>
//                     <option value="USD">USD</option>
//                     <option value="EUR">EUR</option>
//                     <option value="GBP">GBP</option>
//                   </select>
//                   {errors.currency && <div className="text-danger small">{errors.currency}</div>}
//                 </div> */}
//                 {/* <div className="col-md-6">
//                   <label className="form-label">Currency</label>
//                   <CreatableSelect
//                     options={selectOptions.currency}
//                     value={selectOptions.currency.find((opt) => opt.value === formData.currency)}
//                     onChange={(option) =>
//                       setFormData((prev) => ({ ...prev, currency: option?.value || "" }))
//                     }
//                     onCreateOption={handleCreateOption('currency')}
//                     isClearable

//                   />
//                 </div> */}

//                 {/* <div className="col-md-6">
//                   <label className="form-label">Preferred Payment Method</label>
//                   <select className="form-select" name="preferredPaymentMethod" required value={billingInformation[0].preferredPaymentMethod} onChange={(e) => handleBillingChange(0, e)}>
//                     <option value="">Select Payment Method</option>
//                     <option value="BankTransfer">BankTransfer</option>
//                     <option value="CreditCard">CreditCard</option>
//                     <option value="Check">Check</option>
//                   </select>
//                   {errors.preferredPaymentMethod && <div className="text-danger small">{errors.preferredPaymentMethod}</div>}
//                 </div> */}

//                 {/* <div className="col-md-6">
//                   <label className="form-label">Preferred Payment Method</label>
//                   <CreatableSelect
//                     options={selectOptions.preferredPaymentMethod}
//                     value={selectOptions.preferredPaymentMethod.find((opt) => opt.value === formData.preferredPaymentMethod)}
//                     onChange={(option) =>
//                       setFormData((prev) => ({ ...prev, preferredPaymentMethod: option?.value || "" }))
//                     }
//                     onCreateOption={handleCreateOption('preferredPaymentMethod')}
//                     isClearable
//                   />
//                 </div> */}

//                 {/* Shipping Information */}
//                 {/* <h5 className="mb-3 mt-4">Shipping Information</h5>
//                 <div className="col-md-12">
//                   <label className="form-label">Shipping Address</label>
//                   <textarea className="form-control" rows="3" name="shippingAddress" value={shippingInformation[0].shippingAddress} onChange={(e) => handleShippingChange(0, e)}></textarea>
//                   {errors.shippingAddress && <div className="text-danger small">{errors.shippingAddress}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Shipping Contact Name</label>
//                   <input type="text" className="form-control" name="shippingContactName" value={shippingInformation[0].shippingContactName} onChange={(e) => handleShippingChange(0, e)} />
//                   {errors.shippingContactName && <div className="text-danger small">{errors.shippingContactName}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Shipping Email</label>
//                   <input type="email" className="form-control" name="shippingEmail" value={shippingInformation[0].shippingEmail} onChange={(e) => handleShippingChange(0, e)} />
//                   {errors.shippingEmail && <div className="text-danger small">{errors.shippingEmail}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Shipping Phone</label>
//                   <input type="tel" className="form-control" name="shippingPhone" value={shippingInformation[0].shippingPhone} onChange={(e) => handleShippingChange(0, e)} maxLength={10} />
//                   {errors.shippingPhone && <div className="text-danger small">{errors.shippingPhone}</div>}
//                 </div> */}

//                 {/* <div className="col-md-6">
//                   <label className="form-label">Preferred Shipping Method</label>
//                   <select className="form-select" name="preferredShippingMethod" required value={shippingInformation[0].preferredShippingMethod} onChange={(e) => handleShippingChange(0, e)}>
//                     <option value="">Select Shipping Method</option>
//                     <option value="ground">Ground</option>
//                     <option value="standard">Standard</option>
//                     <option value="express">Express</option>
//                     <option value="overnight">Overnight</option>
//                   </select>
//                   {errors.preferredShippingMethod && <div className="text-danger small">{errors.preferredShippingMethod}</div>}
//                 </div> */}
//                 {/* <div className="col-md-6">
//                   <label className="form-label">Preferred Shipping Method</label>
//                   <CreatableSelect
//                     options={selectOptions.preferredShippingMethod}
//                     value={selectOptions.preferredShippingMethod.find((opt) => opt.value === formData.preferredShippingMethod)}
//                     onChange={(option) =>
//                       setFormData((prev) => ({ ...prev, preferredShippingMethod: option?.value || "" }))
//                     }
//                     onCreateOption={handleCreateOption('preferredShippingMethod')}
//                     isClearable

//                   />
//                 </div>


//                 <div className="col-md-12">
//                   <label className="form-label">Special Instructions</label>
//                   <textarea className="form-control" rows="3" name="specialInstructions" value={shippingInformation[0].specialInstructions} onChange={(e) => handleShippingChange(0, e)}></textarea>
//                   {errors.specialInstructions && <div className="text-danger small">{errors.specialInstructions}</div>}
//                 </div> */}

//                 {/* Financial Information */}
//                 {/* <h5 className="mb-3 mt-4">Financial Information</h5>
//                 <div className="col-md-6">
//                   <label className="form-label">Annual Revenue</label>
//                   <input type="number" className="form-control" name="annualRevenue" value={financialInformation[0].annualRevenue} onChange={(e) => handleFinancialChange(0, e)} />
//                   {errors.annualRevenue && <div className="text-danger small">{errors.annualRevenue}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Credit Rating</label>
//                   <input type="number" className="form-control" name="creditRating" value={financialInformation[0].creditRating} onChange={(e) => handleFinancialChange(0, e)} min={1} max={5} />
//                   {errors.creditRating && <div className="text-danger small">{errors.creditRating}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Bank Name</label>
//                   <input type="text" className="form-control" name="bankName" value={financialInformation[0].bankName} onChange={(e) => handleFinancialChange(0, e)} />
//                   {errors.bankName && <div className="text-danger small">{errors.bankName}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Account Number</label>
//                   <input type="text" className="form-control" name="accountNumber" value={financialInformation[0].accountNumber} onChange={(e) => handleFinancialChange(0, e)} />
//                   {errors.accountNumber && <div className="text-danger small">{errors.accountNumber}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Fiscal Year End</label>
//                   <input type="date" className="form-control" name="fiscalYearEnd" value={financialInformation[0].fiscalYearEnd} onChange={(e) => handleFinancialChange(0, e)} />
//                   {errors.fiscalYearEnd && <div className="text-danger small">{errors.fiscalYearEnd}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Financial Contact</label>
//                   <input type="text" className="form-control" name="financialContact" value={financialInformation[0].financialContact} onChange={(e) => handleFinancialChange(0, e)} />
//                   {errors.financialContact && <div className="text-danger small">{errors.financialContact}</div>}
//                 </div> */}

//                 {/* Ledger Information */}
//                 {/* <h5 className="mb-3 mt-4">Ledger Information</h5>
//                 <div className="col-md-6">
//                   <label className="form-label">Account Code</label>
//                   <input type="text" className="form-control" name="accountCode" value={ledgerInformation[0].accountCode} onChange={(e) => handleLedgerChange(0, e)} />
//                   {errors.accountCode && <div className="text-danger small">{errors.accountCode}</div>}
//                 </div> */}

//                 {/* <div className="col-md-6">
//                   <label className="form-label">Account Type</label>
//                   <select className="form-select" name="accountType" required value={ledgerInformation[0].accountType} onChange={(e) => handleLedgerChange(0, e)}>
//                     <option value="">Select Account Type</option>
//                     <option value="AccountsReceivable">AccountsReceivable</option>
//                     <option value="AccountsPayable">AccountsPayable</option>
//                   </select>
//                   {errors.accountType && <div className="text-danger small">{errors.accountType}</div>}
//                 </div> */}

//                 {/* <div className="col-md-6">
//                   <label className="form-label">Account Type</label>
//                   <CreatableSelect
//                     options={selectOptions.accountType}
//                     value={selectOptions.accountType.find((opt) => opt.value === formData.accountType)}
//                     onChange={(option) =>
//                       setFormData((prev) => ({ ...prev, accountType: option?.value || "" }))
//                     }
//                     onCreateOption={handleCreateOption('accountType')}
//                     isClearable

//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Opening Balance</label>
//                   <input type="number" className="form-control" name="openingBalance" value={ledgerInformation[0].openingBalance} onChange={(e) => handleLedgerChange(0, e)} />
//                   {errors.openingBalance && <div className="text-danger small">{errors.openingBalance}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Balance Date</label>
//                   <input type="date" className="form-control" name="balanceDate" value={ledgerInformation[0].balanceDate} onChange={(e) => handleLedgerChange(0, e)} />
//                   {errors.balanceDate && <div className="text-danger small">{errors.balanceDate}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Tax Category</label>
//                   <select className="form-select" name="taxCategory" value={ledgerInformation[0].taxCategory} onChange={(e) => handleLedgerChange(0, e)}>
//                     <option value="standard">Standard Rate</option>
//                     <option value="reduced">Reduced Rate</option>
//                     <option value="zero">Zero Rate</option>
//                   </select>
//                   {errors.taxCategory && <div className="text-danger small">{errors.taxCategory}</div>}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Cost Center</label>
//                   <input type="text" className="form-control" name="costCenter" value={ledgerInformation[0].costCenter} onChange={(e) => handleLedgerChange(0, e)} />
//                   {errors.costCenter && <div className="text-danger small">{errors.costCenter}</div>}
//                 </div> */}

//                 {/* Additional Information */}
//                 <h5 className="mb-3 mt-4">Additional Information</h5>
//                 <div className="col-md-6">
//                   <label className="form-label">Payment Terms</label>
//                   <select
//                     className="form-select"
//                     name="paymentTerms"
//                     value={additionalInformation.paymentTerms}
//                     onChange={handleAdditionalChange}
//                   >
//                     <option value="">Select Payment Terms</option>  {/* <-- placeholder */}
//                     <option value="net30">Net 30</option>
//                     <option value="net60">Net 60</option>
//                     <option value="net90">Net 90</option>
//                   </select>
//                   {errors.paymentTerms && <div className="text-danger small">{errors.paymentTerms}</div>}
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Credit Limit</label>
//                   <input type="number" className="form-control" name="creditLimit" value={additionalInformation.creditLimit} onChange={handleAdditionalChange} />
//                   {errors.creditLimit && <div className="text-danger small">{errors.creditLimit}</div>}
//                 </div>
//               </div>
//               <div className="col-md-12">
//                 <label className="form-label">Notes</label>
//                 <textarea className="form-control" rows="3" name="notes" value={additionalInformation.notes} onChange={handleAdditionalChange} placeholder="Additional notes"></textarea>
//                 {errors.notes && <div className="text-danger small">{errors.notes}</div>}
//               </div>



//               {/* Your form fields go here */}

//               <div className="col-12 d-flex justify-content-end gap-2 mt-4">
//                 <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)} >Cancel</button>

//                 {!(id || client?._id) ? (
//                   <>
//                     <button
//                       type="submit"
//                       className={`btn ${formData.button_Client_Suplier === 'Client' ? 'btn-primary' : 'btn-outline-primary'}`}
//                       onClick={() => setFormData({ ...formData, button_Client_Suplier: 'Client' })}
//                     >
//                       Client
//                     </button>

//                     <button
//                       type="submit"
//                       className={`btn ${formData.button_Client_Suplier === 'Supplier' ? 'btn-primary' : 'btn-outline-primary'}`}
//                       onClick={() => setFormData({ ...formData, button_Client_Suplier: 'Supplier' })}
//                     >
//                       Supplier
//                     </button>
//                   </>
//                 ) : (
//                   <button id="btn-All" type="submit" className="btn btn-primary">
//                     Update Client
//                   </button>
//                 )}
//               </div>




//               {/* <div className="col-12 d-flex justify-content-end gap-2 mt-4">
//                 <button type="button" className="btn btn-outline-secondary">Cancel</button>
//                 {!(id || client?._id) ? (
//                   <>
//                     <button type="submit" id="btn-All" className="btn btn-dark">Create Client</button>
//                     <button type="submit" id="btn-All" className="btn btn-dark">Create Supplier</button>
//                   </>
//                 ) : (
//                   <button type="submit" id="btn-All" className="btn btn-dark">Update Client</button>
//                 )}
//               </div> */}
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddClientManagement;


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { createClients, fetchClient, fetchClientsById, UpdateClients } from '../../../redux/slices/ClientSlice';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { apiUrl } from '../../../redux/utils/config';
import CreatableSelect from "react-select/creatable";
import { countries } from './countrydata';

// Add this function to format date for input fields
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

function AddClientManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // for edit mo
  const location = useLocation();
  const { client } = location.state || {};
  const _id = client?._id
  console.log("oo", _id);

  // Initial form state
  const [formData, setFormData] = useState({
    clientName: '',
    industry: '',
    website: '',
    clientAddress: '',
    TaxID_VATNumber: '',
    CSRCode: '',
    Status: '',
    button_Client_Suplier: '',
    countryCode: "+44",  // Add country code to form data
    phoneNumber: ""     // Add phone number to form data
  });

  // Contact persons state
  const [contactPersons, setContactPersons] = useState([
    {
      contactName: '',
      jobTitle: '',
      email: '',
      phone: '',
      department: '',
      salesRepresentative: ''
    }
  ]);

  // Billing information state
  const [billingInformation, setBillingInformation] = useState([
    {
      billingAddress: '',
      billingContactName: '',
      billingEmail: '',
      billingPhone: '',
      currency: '',
      preferredPaymentMethod: ''
    }
  ]);

  // Shipping information state
  const [shippingInformation, setShippingInformation] = useState([
    {
      shippingAddress: '',
      shippingContactName: '',
      shippingEmail: '',
      shippingPhone: '',
      preferredShippingMethod: '',
      specialInstructions: ''
    }
  ]);

  // Financial information state
  const [financialInformation, setFinancialInformation] = useState([
    {
      annualRevenue: '',
      creditRating: '',
      bankName: '',
      accountNumber: '',
      fiscalYearEnd: '',
      financialContact: ''
    }
  ]);

  // Ledger information state
  const [ledgerInformation, setLedgerInformation] = useState([
    {
      accountCode: '',
      accountType: '',
      openingBalance: '',
      balanceDate: '',
      taxCategory: '',
      costCenter: ''
    }
  ]);

  // Additional information state
  const [additionalInformation, setAdditionalInformation] = useState({
    paymentTerms: '',
    creditLimit: '',
    notes: ''
  });

  // Add state for errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const updateStates = (clientData) => {
      setFormData({
        clientName: clientData.clientName || '',
        industry: clientData.industry || '',
        website: clientData.website || '',
        clientAddress: clientData.clientAddress || '',
        TaxID_VATNumber: clientData.TaxID_VATNumber || '',
        CSRCode: clientData.CSRCode || '',
        Status: clientData.Status || '',
        button_Client_Suplier: clientData.button_Client_Suplier || '',
        countryCode: clientData.countryCode || "+44",  // Load country code
        phoneNumber: clientData.phoneNumber || ""      // Load phone number
      });

      setContactPersons(clientData.contactPersons || []);
      setBillingInformation(clientData.billingInformation || []);
      setShippingInformation(clientData.shippingInformation || []);
      setFinancialInformation(
        (clientData.financialInformation || []).map((item) => ({
          ...item,
          fiscalYearEnd: formatDate(item.fiscalYearEnd),
        }))
      );
      setLedgerInformation(
        (clientData.ledgerInformation || []).map((item) => ({
          ...item,
          balanceDate: formatDate(item.balanceDate),
        }))
      );
      setAdditionalInformation(clientData.additionalInformation || {
        paymentTerms: '',
        creditLimit: '',
        notes: ''
      });
    };

    if (client) {
      updateStates(client);
    } else if (id) {
      dispatch(fetchClientsById(id)).then((res) => {
        const fetchedclient = res.payload;
        if (fetchedclient) {
          updateStates(fetchedclient);
        }
      });
    }
  }, [id, dispatch, client]);

  // Handle basic form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle phone number changes
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phoneNumber') {
      newValue = newValue.replace(/\D/g, ""); // Only allow digits
      const selected = countries.find(c => c.code === formData.countryCode);
      const maxLength = selected?.length || 10;
      if (newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength); // Trim if too long
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  // Handle country code change
  const handleCountryCodeChange = (e) => {
    const newCode = e.target.value;
    const selected = countries.find(c => c.code === newCode);
    let newPhone = formData.phoneNumber;

    if (newPhone.length > (selected?.length || 10)) {
      newPhone = newPhone.slice(0, selected.length);
    }

    setFormData({
      ...formData,
      countryCode: newCode,
      phoneNumber: newPhone,
    });
  };

  // Handle contact person changes
  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    let newValue = value;

    const updatedContacts = [...contactPersons];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [name]: newValue
    };
    setContactPersons(updatedContacts);
  };

  // Handle billing information changes
  const handleBillingChange = (index, e) => {
    const { name, value } = e.target;
    let newValue = value;

    const updatedBilling = [...billingInformation];
    updatedBilling[index] = {
      ...updatedBilling[index],
      [name]: newValue
    };
    setBillingInformation(updatedBilling);
  };

  // Handle shipping information changes
  const handleShippingChange = (index, e) => {
    const { name, value } = e.target;
    let newValue = value;

    const updatedShipping = [...shippingInformation];
    updatedShipping[index] = {
      ...updatedShipping[index],
      [name]: newValue
    };
    setShippingInformation(updatedShipping);
  };

  // Handle financial information changes
  const handleFinancialChange = (index, e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'creditRating') {
      // Only allow numbers between 1 and 5
      let num = Number(newValue);
      if (newValue === '') {
        newValue = '';
      } else if (num < 1) {
        newValue = '1';
      } else if (num > 5) {
        newValue = '5';
      } else {
        newValue = String(num);
      }
    }

    const updatedFinancial = [...financialInformation];
    updatedFinancial[index] = {
      ...updatedFinancial[index],
      [name]: newValue
    };
    setFinancialInformation(updatedFinancial);
  };

  // Handle ledger information changes
  const handleLedgerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLedger = [...ledgerInformation];
    updatedLedger[index] = {
      ...updatedLedger[index],
      [name]: value
    };
    setLedgerInformation(updatedLedger);
  };

  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInformation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine country code and phone number for CSRCode if needed
    const fullData = {
      ...formData,
      contactPersons,
      billingInformation,
      shippingInformation,
      financialInformation,
      ledgerInformation,
      additionalInformation
    };

    console.log('Full Data Object:', fullData);

    if (_id) {
      dispatch(UpdateClients({ _id, data: fullData }))
        .unwrap()
        .then(() => {
          toast.success("Client updated successfully!");
          navigate("/admin/clientManagement");
          dispatch(fetchClient());
        })
        .catch(() => {
          toast.error("Failed to update client!");
        });
    } else {
      dispatch(createClients(fullData))
        .unwrap()
        .then(() => {
          toast.success("Client created successfully!");
          navigate("/admin/clientManagement");
          dispatch(fetchClient());
        })
        .catch(() => {
          toast.error("Error creating client");
        });
    }
  };

  // Keep the options in local state so we can push newly-created ones
  const [brandOptions, setBrandOptions] = useState([
    { value: "Coca-Cola", label: "Coca-Cola" },
    { value: "Pepsi", label: "Pepsi" },
  ]);

  // When the user creates a brand that isn't in the list yet
  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setBrandOptions((prev) => [...prev, newOption]);
    setFormData((prev) => ({ ...prev, brandName: inputValue }));
  };

  // Add state for select options
  const [selectOptions, setSelectOptions] = useState({
    industry: [],
    currency: [],
    preferredPaymentMethod: [],
    preferredShippingMethod: [],
    accountType: [],
  });

  // Fetch select options from API on mount
  useEffect(() => {
    axios.get(`${apiUrl}/client/selectclient`)
      .then(res => {
        if (res.data.success && res.data.data) {
          setSelectOptions({
            industry: (res.data.data.industry || []).map(v => ({ value: v, label: v })),
            currency: (res.data.data.currency || []).map(v => ({ value: v, label: v })),
            preferredPaymentMethod: (res.data.data.preferredPaymentMethod || []).map(v => ({ value: v, label: v })),
            preferredShippingMethod: (res.data.data.preferredShippingMethod || []).map(v => ({ value: v, label: v })),
            accountType: (res.data.data.accountType || []).map(v => ({ value: v, label: v })),
          });
        }
      });
  }, []);

  // Generic handler for creating new options
  const handleCreateOption = (field) => (inputValue) => {
    axios.post(`${apiUrl}/client/selectclient`, {
      [field]: [...selectOptions[field].map(opt => opt.value), inputValue]
    }).then(() => {
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
            <h2 className="mb-4">{id || client?._id ? "Edit client" : "New Company (Client)"}</h2>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className='col-md-3'>  <h6 className="mb-3">Client/Supplier Information</h6></div>
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input required type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="form-control" placeholder="Enter name" />
                {errors.clientName && <div className="text-danger small">{errors.clientName}</div>}
              </div>

              {/* industry */}
              <div className="col-md-6">
                <label className="form-label">Industry</label>
                <CreatableSelect
                  options={selectOptions.industry}
                  value={selectOptions.industry.find((opt) => opt.value === formData.industry)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, industry: option?.value || "" }))
                  }
                  onCreateOption={handleCreateOption('industry')}
                  isClearable
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Website</label>
                <input value={formData.website} name='website' onChange={handleChange} className="form-control" />
                {errors.website && <div className="text-danger small">{errors.website}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Client Address</label>
                <textarea required className="form-control" name="clientAddress" value={formData.clientAddress} onChange={handleChange}></textarea>
                {errors.clientAddress && <div className="text-danger small">{errors.clientAddress}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Tax ID/VAT Number</label>
                <input
                  required
                  type="text"
                  name="TaxID_VATNumber"
                  value={formData.TaxID_VATNumber}
                  onChange={handleChange}
                  className="form-control"
                  maxLength={15}
                  pattern="\d*"
                  inputMode="numeric"
                />
                {errors.TaxID_VATNumber && <div className="text-danger small">{errors.TaxID_VATNumber}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <div className="input-group">
                  <select
                    className="form-select"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleCountryCodeChange}
                  >
                    {countries.map((c, i) => (
                      <option key={i} value={c.code}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    className="form-control"
                    inputMode="numeric"
                    placeholder="Phone number"
                  />
                </div>
                {errors.phoneNumber && (
                  <div className="text-danger small">{errors.phoneNumber}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="Status"
                  required
                  value={formData.Status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.Status && <div className="text-danger small">{errors.Status}</div>}
              </div>

              {/* Contact Persons */}
              <div className='col-md-12 row'>
                <h5 className="mb-3 mt-4">Contact Persons</h5>
                {contactPersons.map((contact, index) => (
                  <div className="border p-3 mb-3" key={index}>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Contact Name</label>
                        <input
                          type="text"
                          name="contactName"
                          required
                          value={contact.contactName}
                          onChange={(e) => handleContactChange(index, e)}
                          className="form-control"
                          placeholder="Enter Contact Name"
                        />
                        {errors[`contactName_${index}`] && <div className="text-danger small">{errors[`contactName_${index}`]}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Job Title</label>
                        <input
                          type="text"
                          name="jobTitle"
                          required
                          value={contact.jobTitle}
                          onChange={(e) => handleContactChange(index, e)}
                          className="form-control"
                          placeholder="Enter Job Title"
                        />
                        {errors[`jobTitle_${index}`] && <div className="text-danger small">{errors[`jobTitle_${index}`]}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={contact.email}
                          onChange={(e) => handleContactChange(index, e)}
                          className="form-control"
                          placeholder="Enter Email"
                        />
                        {errors[`email_${index}`] && <div className="text-danger small">{errors[`email_${index}`]}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                          type="number"
                          name="phone"
                          required
                          value={contact.phone}
                          onChange={(e) => handleContactChange(index, e)}
                          className="form-control"
                          placeholder="Enter Phone"
                          maxLength={10}
                        />
                        {errors[`phone_${index}`] && <div className="text-danger small">{errors[`phone_${index}`]}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Department</label>
                        <input
                          type="text"
                          name="department"
                          required
                          value={contact.department}
                          onChange={(e) => handleContactChange(index, e)}
                          className="form-control"
                          placeholder="Enter Department"
                        />
                        {errors[`department_${index}`] && <div className="text-danger small">{errors[`department_${index}`]}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Sales Representative</label>
                        <input
                          type="text"
                          name="salesRepresentative"
                          required
                          value={contact.salesRepresentative}
                          onChange={(e) => handleContactChange(index, e)}
                          className="form-control"
                          placeholder="Enter Sales Representative"
                        />
                        {errors[`salesRepresentative_${index}`] && <div className="text-danger small">{errors[`salesRepresentative_${index}`]}</div>}
                      </div>
                      <div className="col-md-12 mt-2 d-flex justify-content-end">
                        {contactPersons.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              const updatedContacts = [...contactPersons];
                              updatedContacts.splice(index, 1);
                              setContactPersons(updatedContacts);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add More Button */}
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setContactPersons([
                        ...contactPersons,
                        {
                          contactName: '',
                          jobTitle: '',
                          email: '',
                          phone: '',
                          department: '',
                          salesRepresentative: ''
                        }
                      ]);
                    }}
                  >
                    + Add Another Contact
                  </button>
                </div>
              </div>

              {/* Additional Information */}
              <div className='col-md-12 row'>
                <h5 className="mb-3 mt-4">Additional Information</h5>
                <div className="col-md-6">
                  <label className="form-label">Payment Terms</label>
                  <select
                    className="form-select"
                    name="paymentTerms"
                    value={additionalInformation.paymentTerms}
                    onChange={handleAdditionalChange}
                  >
                    <option value="">Select Payment Terms</option>
                    <option value="net30">Net 30</option>
                    <option value="net60">Net 60</option>
                    <option value="net90">Net 90</option>
                  </select>
                  {errors.paymentTerms && <div className="text-danger small">{errors.paymentTerms}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Credit Limit</label>
                  <input type="number" className="form-control" name="creditLimit" value={additionalInformation.creditLimit} onChange={handleAdditionalChange} />
                  {errors.creditLimit && <div className="text-danger small">{errors.creditLimit}</div>}
                </div>
              </div>

              <div className="col-md-12">
                <label className="form-label">Notes</label>
                <textarea className="form-control" rows="3" name="notes" value={additionalInformation.notes} onChange={handleAdditionalChange} placeholder="Additional notes"></textarea>
                {errors.notes && <div className="text-danger small">{errors.notes}</div>}
              </div>

              {/* Submit buttons */}
              <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)} >Cancel</button>
                {!(id || client?._id) ? (
                  <>
                    <button
                      type="submit"
                      className={`btn ${formData.button_Client_Suplier === 'Client' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFormData({ ...formData, button_Client_Suplier: 'Client' })}
                    >
                      Client
                    </button>
                    <button
                      type="submit"
                      className={`btn ${formData.button_Client_Suplier === 'Supplier' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFormData({ ...formData, button_Client_Suplier: 'Supplier' })}
                    >
                      Supplier
                    </button>
                  </>
                ) : (
                  <button id="btn-All" type="submit" className="btn btn-primary">
                    Update Client
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddClientManagement;