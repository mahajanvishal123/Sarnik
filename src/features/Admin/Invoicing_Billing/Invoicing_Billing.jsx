// import React, { useEffect, useState } from 'react';
// import { Form, Table, InputGroup, Button, Dropdown } from 'react-bootstrap';
// import { FaSearch, FaSort, FaEdit, FaDownload } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { deleteInvoicingBilling, fetchInvoicingBilling } from '../../../redux/slices/InvoicingBillingSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosInstance from '../../../redux/utils/axiosInstance';
// import { apiUrl } from '../../../redux/utils/config';

// function Invoicing_Billing() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [dateRange, setDateRange] = useState({ from: '', to: '' });
//   const [selectedProject, setSelectedProject] = useState('All Projects');
//   const [selectedClient, setSelectedClient] = useState('All Clients');
//   const [sortField, setSortField] = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');
//   const [companyInfo, setCompanyInfo] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { invocing, loading, error } = useSelector((state) => state.InvoicingBilling);

//   useEffect(() => {
//     dispatch(fetchInvoicingBilling());
//   }, [dispatch]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${apiUrl}/user/685e6f6364a81f874cd99761`);
//         const data = await res.json();
//         setCompanyInfo(data.companyInfo || null);
//       } catch (e) {
//         console.error('Company info error:', e);
//       }
//     })();
//   }, []);

//   const getStatusClass = (status) => {
//     switch ((status || '').toLowerCase().trim()) {
//       case 'active': return 'bg-primary text-white';
//       case 'inactive': return 'bg-secondary text-white';
//       case 'completed': return 'bg-success text-white';
//       case 'pending': return 'bg-warning text-dark';
//       case 'overdue': return 'bg-danger text-white';
//       default: return 'bg-light text-dark';
//     }
//   };

//   const handleSort = (field) => {
//     const isAsc = sortField === field && sortDirection === 'asc';
//     setSortDirection(isAsc ? 'desc' : 'asc');
//     setSortField(field);
//   };

//   // -------- PDF HELPERS --------
//   const getImageBase64FromUrl = (url) =>
//     new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = 'anonymous';
//       img.onload = function () {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width; canvas.height = img.height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0);
//         resolve(canvas.toDataURL('image/png'));
//       };
//       img.onerror = reject;
//       img.src = url;
//     });

//   const numberToWordsUSD = (value) => {
//     const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const toWords = (n) => {
//       if (n === 0) return 'Zero';
//       let w = '';
//       const billions = Math.floor(n / 1_000_000_000); n %= 1_000_000_000;
//       const millions = Math.floor(n / 1_000_000); n %= 1_000_000;
//       const thousands = Math.floor(n / 1000); n %= 1000;
//       const hundreds = Math.floor(n / 100); n %= 100;
//       if (billions) w += toWords(billions) + ' Billion ';
//       if (millions) w += toWords(millions) + ' Million ';
//       if (thousands) w += toWords(thousands) + ' Thousand ';
//       if (hundreds) w += ones[hundreds] + ' Hundred ';
//       if (n >= 20) { w += tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : ''); }
//       else if (n > 0) { w += ones[n]; }
//       return w.trim();
//     };
//     const dollars = Math.floor(value);
//     const cents = Math.round((value - dollars) * 100);
//     let words = `US Dollars ${toWords(dollars)}`;
//     if (cents > 0) words += ` and ${String(cents).padStart(2, '0')}/100`;
//     return words + ' Only';
//   };

//   // EXACT-LIKE LAYOUT PDF
//   const generatePDFfromData = async (invoiceData) => {
//     const doc = new jsPDF('p', 'pt', 'a4');
//     const W = doc.internal.pageSize.width; // 595.28
//     const L = 40; // left margin
//     let y = 40;

//     // Company + defaults
//     const co = {
//       name: companyInfo?.name || 'Company Name',
//       address: companyInfo?.address || 'Address Line 1\nAddress Line 2, Country',
//       trn: companyInfo?.trn || '100000000000002',
//       email: companyInfo?.email || 'email@example.com',
//       phone: companyInfo?.phone || '+00-0000000000',
//       logo: companyInfo?.logoUrl?.[0] || null,
//       stamp: companyInfo?.stampUrl?.[0] || null,
//       bankAccountName: companyInfo?.bankAccountName || 'Company Name',
//       bankName: companyInfo?.bankName || 'Company Bank Name',
//       iban: companyInfo?.iban || 'XX000000000000000000001',
//       swiftCode: companyInfo?.swiftCode || 'XXXAAACC',
//     };

//     const meta = {
//       trn: co.trn,
//       date: invoiceData?.date ? new Date(invoiceData.date).toLocaleDateString('en-GB') : 'N/A',
//       inv: invoiceData?.InvoiceNo || 'N/A',
//     };

//     const clientObj = invoiceData?.clientId || invoiceData?.clients?.[0] || {};
//     const projObj = Array.isArray(invoiceData?.projectId) ? invoiceData.projectId[0] : invoiceData?.projects?.[0] || {};
//     const poNo = invoiceData?.ReceivablePurchaseId?.PONumber || invoiceData?.receivablePurchase?.PONumber || 'N/A';
//     const costEst = invoiceData?.CostEstimatesId?.estimateRef || invoiceData?.costEstimate?.estimateRef || 'N/A';
//     const projName = projObj?.projectName || 'N/A';

//     const itemsRaw = Array.isArray(invoiceData?.lineItems) ? invoiceData.lineItems : [];
//     const items = itemsRaw.length
//       ? itemsRaw.map((it, i) => [String(i + 1), it.description || '-', it.quantity || 0, it.rate || 0, (Number(it.amount) || 0).toFixed(2)])
//       : [['1', 'No items', 0, 0, '0.00']];

//     const subTotal = items.reduce((s, r) => s + Number(r[4]), 0);
//     const vatRate = 0.10; // as per screenshot
//     const vatAmt = subTotal * vatRate;
//     const grandTotal = subTotal + vatAmt;

//     // --- RED HEADER BAND (like screenshot) ---
//     doc.setFillColor(210, 16, 21);
//     doc.rect(L, y, W - L * 2, 38, 'F'); // band height
//     // Optional logo inside band (left)
//     if (co.logo) {
//       try {
//         const lg = await getImageBase64FromUrl(co.logo);
//         doc.addImage(lg, 'PNG', L + 8, y + 6, 140, 26); // ~ 524x65px mapped
//       } catch { }
//     }
//     // Title "Tax Invoice" (right)
//     doc.setFont('helvetica', 'bold');
//     doc.setFontSize(12);
//     doc.setTextColor(255, 255, 255);
//     doc.text('Tax Invoice', W - L - 10, y + 24, { align: 'right' });
//     doc.setTextColor(0, 0, 0);
//     y += 48;

//     // --- RIGHT META TABLE: TRN / Date / Invoice No ---
//     autoTable(doc, {
//       startY: y,
//       theme: 'grid',
//       styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//       head: [['TRN:', 'Date', 'Invoice No.']],
//       body: [[meta.trn, meta.date, meta.inv]],
//       headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//       columnStyles: {
//         0: { cellWidth: 170 },
//         1: { cellWidth: 90 },
//         2: { cellWidth: 90 },
//       },
//       margin: { left: W - L - (170 + 90 + 90) },
//       tableWidth: (170 + 90 + 90),
//     });
//     const metaBottom = doc.lastAutoTable.finalY;

//     // --- LEFT "Invoice To" PANEL (boxed) ---
//     const boxH = 86;
//     doc.rect(L, y, (W - L * 2) - (170 + 90 + 90) - 10, boxH); // leave some gap before meta
//     doc.setFontSize(10);
//     doc.setFont('helvetica', 'bold');
//     doc.text('Invoice To', L + 8, y + 16);
//     doc.setFontSize(9);
//     doc.setFont('helvetica', 'normal');

//     const invToX = L + 8; let invToY = y + 32;
//     const addrLines = (co.address || '').split('\n');
//     const cName = clientObj.clientName || 'Client Name';
//     doc.text(cName, invToX, invToY); invToY += 12;
//     doc.text(addrLines[0] || '-', invToX, invToY); invToY += 12;
//     if (addrLines[1]) { doc.text(addrLines[1], invToX, invToY); invToY += 12; }
//     doc.text(`Contact: ${(clientObj?.contactPersons?.[0]?.email) || '-'}`, invToX, invToY); invToY += 12;

//     y = Math.max(metaBottom, y + boxH) + 10;

//     // --- COST EST / P.O. / PROJECT STRIP (like the narrow row in screenshot) ---
//     autoTable(doc, {
//       startY: y,
//       theme: 'grid',
//       styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//       head: [['Cost Est. No.', 'P.O. No.', 'Project']],
//       body: [[costEst, poNo, projName]],
//       headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//       margin: { left: L, right: L },
//       columnStyles: {
//         0: { cellWidth: 140 },
//         1: { cellWidth: 140 },
//         2: { cellWidth: 'auto' },
//       }
//     });
//     y = doc.lastAutoTable.finalY + 6;

//     // --- BANK DETAILS TABLE (like screenshot small table above items) ---
//     autoTable(doc, {
//       startY: y,
//       theme: 'grid',
//       styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//       head: [['Bank Account Name', 'Bank Name', 'IBAN', 'Swift Code', 'Terms']],
//       body: [[co.bankAccountName, co.bankName, co.iban, co.swiftCode, 'Net 30']],
//       headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//       margin: { left: L, right: L },
//       columnStyles: {
//         0: { cellWidth: 150 },
//         1: { cellWidth: 140 },
//         2: { cellWidth: 130 },
//         3: { cellWidth: 90 },
//         4: { cellWidth: 70, halign: 'right' },
//       }
//     });
//     y = doc.lastAutoTable.finalY + 6;

//     // --- LINE ITEMS TABLE (Sr., Description, Qty, Rate, Amount USD) ---
//     autoTable(doc, {
//       startY: y,
//       theme: 'grid',
//       styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//       head: [['Sr.', 'Description', 'Qty', 'Rate', 'Amount (USD)']],
//       body: items.map(r => [r[0], r[1], r[2], r[3], r[4]]),
//       headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//       margin: { left: L, right: L },
//       columnStyles: {
//         0: { cellWidth: 36, halign: 'left' },
//         1: { cellWidth: 'auto' },
//         2: { cellWidth: 46, halign: 'right' },
//         3: { cellWidth: 60, halign: 'right' },
//         4: { cellWidth: 90, halign: 'right' }
//       }
//     });
//     y = doc.lastAutoTable.finalY + 6;

//     // --- AMOUNT IN WORDS (left, light rule like screenshot) ---
//     doc.setFontSize(9);
//     doc.text(numberToWordsUSD(grandTotal), L, y + 12);

//     // --- TOTALS BOX (right) ---
//     const totalsW = 200;
//     const totalsX = W - L - totalsW;
//     autoTable(doc, {
//       startY: y,
//       theme: 'grid',
//       styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//       body: [
//         [{ content: 'Subtotal', styles: { fontStyle: 'bold' } }, { content: `USD ${subTotal.toFixed(2)}`, styles: { halign: 'right' } }],
//         [{ content: `VAT (${(vatRate * 100).toFixed(0)}%)`, styles: { fontStyle: 'bold' } }, { content: `USD ${vatAmt.toFixed(2)}`, styles: { halign: 'right' } }],
//         [{ content: 'Total', styles: { fontStyle: 'bold' } }, { content: `USD ${grandTotal.toFixed(2)}`, styles: { halign: 'right' } }],
//       ],
//       margin: { left: totalsX },
//       tableWidth: totalsW,
//       columnStyles: { 0: { cellWidth: totalsW * 0.6 }, 1: { cellWidth: totalsW * 0.4 } }
//     });
//     y = Math.max(y + 30, doc.lastAutoTable.finalY) + 12;

//     // --- FOOTER: For Company Name / Accounts Department (left); STAMP (center bottom like screenshot) ---
//     doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
//     doc.text('For Company Name', L, y);
//     doc.setFont('helvetica', 'normal'); doc.text('Accounts Department', L, y + 14);

//     // Stamp: if available use image; else draw red placeholder box with text (like screenshot)
//     const stampW = 170, stampH = 113; // pixels in screenshot, map roughly to pt here
//     const stampX = (W / 2) - (stampW / 2);
//     const stampY = y + 26;

//     if (companyInfo?.stampUrl?.[0]) {
//       try {
//         const st = await getImageBase64FromUrl(companyInfo.stampUrl[0]);
//         doc.addImage(st, 'PNG', stampX, stampY, stampW, stampH);
//       } catch {
//         doc.setFillColor(210, 16, 21); doc.rect(stampX, stampY, stampW, stampH, 'F');
//         doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(255, 255, 255);
//         doc.text('Stamp Image\n(169 x 113 px)\n(60mm x 40mm)', stampX + stampW / 2, stampY + stampH / 2, { align: 'center' });
//         doc.setTextColor(0, 0, 0);
//       }
//     } else {
//       doc.setFillColor(210, 16, 21); doc.rect(stampX, stampY, stampW, stampH, 'F');
//       doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(255, 255, 255);
//       doc.text('Stamp Image\n(169 x 113 px)\n(60mm x 40mm)', stampX + stampW / 2, stampY + stampH / 2, { align: 'center' });
//       doc.setTextColor(0, 0, 0);
//     }

//     // Terms (right, tiny)
//     doc.setFontSize(9);
//     doc.text('Terms: Net 30', W - L, y + 14, { align: 'right' });

//     doc.save(`Tax_Invoice_${meta.inv}.pdf`);
//   };

//   const handleDownloadPDF = async (row) => {
//     if (!row?._id) {
//       Swal.fire('Error', 'No invoice id found to generate PDF.', 'error');
//       return;
//     }
//     try {
//       const response = await axiosInstance.get(`/pdf/invoice?InvoiceBillingId=${row._id}`, { responseType: 'blob' });
//       const isJson = response?.data?.type === 'application/json';
//       if (isJson) {
//         const reader = new FileReader();
//         reader.onload = async () => {
//           try {
//             const json = JSON.parse(reader.result);
//             const data = json?.data?.[0] || json;
//             await generatePDFfromData(data);
//           } catch {
//             Swal.fire('Error', 'Invalid JSON received while generating PDF.', 'error');
//           }
//         };
//         reader.readAsText(response.data);
//       } else {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `${row.InvoiceNo || 'invoice'}.pdf`;
//         document.body.appendChild(a);
//         a.click(); a.remove();
//       }
//     } catch (e) {
//       console.warn('API PDF fallback to client render:', e?.message || e);
//       await generatePDFfromData(row);
//     }
//   };
//   // -----------------------------

//   // FILTER + PAGINATION
//   const filtered = invocing?.InvoicingBilling?.slice()?.reverse()?.filter((invoice) => {
//     const terms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
//     const fields = [
//       (invoice.InvoiceNo || '').toLowerCase(),
//       (invoice.clientId?.clientName || '').toLowerCase(),
//       (invoice.projectId?.[0]?.projectName || '').toLowerCase(),
//       (invoice.status || '').toLowerCase(),
//       String(invoice.lineItems?.[0]?.amount || '').toLowerCase(),
//     ];
//     const matchesSearch = terms.length === 0 || terms.every(t => fields.some(f => f.includes(t)));
//     const matchesProject = selectedProject === 'All Projects' || invoice.projectId?.[0]?.projectName === selectedProject;
//     const matchesClient = selectedClient === 'All Clients' || invoice.clientId?.clientName === selectedClient;

//     const d = invoice.date ? new Date(invoice.date) : null;
//     const from = dateRange.from ? new Date(dateRange.from) : null;
//     const to = dateRange.to ? new Date(dateRange.to) : null;
//     if (to) to.setHours(23, 59, 59, 999);
//     const matchesDate = (!from && !to) ||
//       (from && !to && d >= from) ||
//       (!from && to && d <= to) ||
//       (from && to && d >= from && d <= to);

//     return matchesSearch && matchesProject && matchesClient && matchesDate;
//   }) || [];

//   // Simple client-side sort
//   if (sortField) {
//     filtered.sort((a, b) => {
//       const dir = sortDirection === 'asc' ? 1 : -1;
//       const get = (obj) => {
//         switch (sortField) {
//           case 'invoiceNumber': return (obj.InvoiceNo || '').toString();
//           case 'project': return (obj.projectId?.[0]?.projectName || '');
//           case 'client': return (obj.clientId?.clientName || '');
//           case 'amount': return Number(obj.lineItems?.[0]?.amount || 0);
//           case 'status': return (obj.status || '');
//           case 'dueDate': return new Date(obj.date || 0).getTime();
//           default: return '';
//         }
//       };
//       const va = get(a), vb = get(b);
//       if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
//       return va.toString().localeCompare(vb.toString()) * dir;
//     });
//   }

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15;
//   const totalItems = filtered.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const page = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handleDelete = (_id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You want to mark this job as Cancelled?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, mark as Cancelled!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteInvoicingBilling(_id))
//           .unwrap()
//           .then(() => {
//             Swal.fire('Updated!', 'The job has been marked as Cancelled.', 'success');
//             dispatch(fetchInvoicingBilling());
//           })
//           .catch(() => Swal.fire('Error!', 'Something went wrong while updating.', 'error'));
//       }
//     });
//   };

//   const UpdateInvocing = (invoice) => {
//     navigate('/admin/AddInvoice', { state: { invoice } });
//   };

//   return (
//     <div className="p-4 m-3" style={{ backgroundColor: 'white', borderRadius: 10 }}>
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//         <h2>Invoicing &amp; Billing</h2>
//       </div>

//       <div className={`row g-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-md-flex'}`}>
//         <div className="col-md-3">
//           <div className="input-group">
//             <span className="input-group-text bg-white border-end-0">
//               <FaSearch className="text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control border-start-0"
//               placeholder="Search invoices..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="input-group">
//             <span className="input-group-text bg-white border-end-0">From</span>
//             <input
//               type="date"
//               className="form-control border-start-0"
//               value={dateRange.from}
//               onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="input-group">
//             <span className="input-group-text bg-white border-end-0">To</span>
//             <input
//               type="date"
//               className="form-control border-start-0"
//               value={dateRange.to}
//               onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="col-md-3 d-flex">
//           <Dropdown>
//             <Dropdown.Toggle variant="light" id="project-dropdown" className="w-100">
//               {selectedProject}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setSelectedProject('All Projects')}>All Projects</Dropdown.Item>
//               {[...new Set((invocing?.InvoicingBilling || []).map(inv => inv.projectId?.[0]?.projectName || 'N/A'))]
//                 .filter(v => v !== 'N/A')
//                 .map((projectName, i) =>
//                   <Dropdown.Item key={i} onClick={() => setSelectedProject(projectName)}>{projectName}</Dropdown.Item>
//                 )}
//             </Dropdown.Menu>
//           </Dropdown>

//           <Dropdown>
//             <Dropdown.Toggle variant="light" id="client-dropdown" className="w-100 ms-2">
//               {selectedClient}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setSelectedClient('All Clients')}>All Clients</Dropdown.Item>
//               {[...new Set((invocing?.InvoicingBilling || []).map(inv => inv.clientId?.clientName || 'N/A'))]
//                 .filter(v => v !== 'N/A')
//                 .map((clientName, i) =>
//                   <Dropdown.Item key={i} onClick={() => setSelectedClient(clientName)}>{clientName}</Dropdown.Item>
//                 )}
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>

//       <Table hover responsive>
//         <thead>
//           <tr>
//             <th onClick={() => handleSort('invoiceNumber')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Invoice #</th>
//             <th onClick={() => handleSort('project')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Project</th>
//             <th onClick={() => handleSort('client')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Client Name</th>
//             <th onClick={() => handleSort('amount')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Amount</th>
//             {/* <th onClick={() => handleSort('status')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Status</th> */}
//             <th onClick={() => handleSort('dueDate')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {page.map((invoice, idx) => (
//             <tr key={invoice._id || idx}>
//               <td style={{ whiteSpace: 'nowrap' }}>{invoice.InvoiceNo || 'N/A'}</td>
//               <td style={{ whiteSpace: 'nowrap' }}>{invoice.projectId?.[0]?.projectName || 'N/A'}</td>
//               <td style={{ whiteSpace: 'nowrap' }}>{invoice.clientId?.clientName || 'N/A'}</td>
//               <td style={{ whiteSpace: 'nowrap' }}>
//                 {invoice.currency || 'USD'} {Number(invoice.lineItems?.[0]?.amount || 0).toFixed(2)}
//               </td>
//               {/* <td>
//                 <span className={`badge ${getStatusClass(invoice.status)} px-2 py-1`}>
//                   {invoice.status}
//                 </span>
//               </td> */}
//               <td>{invoice.date ? new Date(invoice.date).toLocaleDateString('en-GB') : 'N/A'}</td>
//               <td>
//                 <div className="d-flex gap-2">
//                   <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateInvocing(invoice)}>
//                     <FaEdit />
//                   </button>
//                   <button className="btn btn-sm btn-outline-primary" onClick={() => handleDownloadPDF(invoice)}>
//                     <FaDownload />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {!loading && !error && (
//         <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//           <div className="text-muted small mb-2 mb-md-0">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
//           </div>
//           <ul className="pagination pagination-sm mb-0">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
//                 <span aria-hidden="true">&laquo;</span>
//               </button>
//             </li>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                 <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
//               </li>
//             ))}
//             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
//                 <span aria-hidden="true">&raquo;</span>
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Invoicing_Billing;

// ===================================

// import React, { useEffect, useState } from 'react';
// import { Form, Table, InputGroup, Button, Dropdown } from 'react-bootstrap';
// import { FaSearch, FaSort, FaEdit, FaDownload } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { deleteInvoicingBilling, fetchInvoicingBilling } from '../../../redux/slices/InvoicingBillingSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosInstance from '../../../redux/utils/axiosInstance';
// import { apiUrl } from '../../../redux/utils/config';

// function Invoicing_Billing() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [dateRange, setDateRange] = useState({ from: '', to: '' });
//   const [selectedProject, setSelectedProject] = useState('All Projects');
//   const [selectedClient, setSelectedClient] = useState('All Clients');
//   const [sortField, setSortField] = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');
//   const [companyInfo, setCompanyInfo] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { invocing, loading, error } = useSelector((state) => state.InvoicingBilling);

//   useEffect(() => {
//     dispatch(fetchInvoicingBilling());
//   }, [dispatch]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${apiUrl}/user/685e6f6364a81f874cd99761`);
//         const data = await res.json();
//         setCompanyInfo(data.companyInfo || null);
//       } catch (e) {
//         console.error('Company info error:', e);
//       }
//     })();
//   }, []);

//   const getStatusClass = (status) => {
//     switch ((status || '').toLowerCase().trim()) {
//       case 'active': return 'bg-primary text-white';
//       case 'inactive': return 'bg-secondary text-white';
//       case 'completed': return 'bg-success text-white';
//       case 'pending': return 'bg-warning text-dark';
//       case 'overdue': return 'bg-danger text-white';
//       default: return 'bg-light text-dark';
//     }
//   };

//   const handleSort = (field) => {
//     const isAsc = sortField === field && sortDirection === 'asc';
//     setSortDirection(isAsc ? 'desc' : 'asc');
//     setSortField(field);
//   };

//   // -------- PDF HELPERS --------
//   const getImageBase64FromUrl = (url) =>
//     new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = 'anonymous';
//       img.onload = function () {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width; canvas.height = img.height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0);
//         resolve(canvas.toDataURL('image/png'));
//       };
//       img.onerror = reject;
//       img.src = url;
//     });

//   const numberToWordsUSD = (value) => {
//     const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const toWords = (n) => {
//       if (n === 0) return 'Zero';
//       let w = '';
//       const billions = Math.floor(n / 1_000_000_000); n %= 1_000_000_000;
//       const millions = Math.floor(n / 1_000_000); n %= 1_000_000;
//       const thousands = Math.floor(n / 1000); n %= 1000;
//       const hundreds = Math.floor(n / 100); n %= 100;
//       if (billions) w += toWords(billions) + ' Billion ';
//       if (millions) w += toWords(millions) + ' Million ';
//       if (thousands) w += toWords(thousands) + ' Thousand ';
//       if (hundreds) w += ones[hundreds] + ' Hundred ';
//       if (n >= 20) { w += tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : ''); }
//       else if (n > 0) { w += ones[n]; }
//       return w.trim();
//     };
//     const dollars = Math.floor(value);
//     const cents = Math.round((value - dollars) * 100);
//     let words = `US Dollars ${toWords(dollars)}`;
//     if (cents > 0) words += ` and ${String(cents).padStart(2, '0')}/100`;
//     return words + ' Only';
//   };

//   // // EXACT-LIKE LAYOUT PDF
//   // const generatePDFfromData = async (invoiceData) => {
//   //   const doc = new jsPDF('p', 'pt', 'a4');
//   //   const W = doc.internal.pageSize.width; // 595.28
//   //   const L = 40; // left margin
//   //   const R = 40; // right margin
//   //   let y = 40;

//   //   // Company + defaults
//   //   const co = {
//   //     name: companyInfo?.name || 'Company Name',
//   //     address: companyInfo?.address || 'Address Line 1\nAddress Line 2, Country',
//   //     trn: companyInfo?.trn || '100000000000002',
//   //     email: companyInfo?.email || 'email@example.com',
//   //     phone: companyInfo?.phone || '+00-0000000000',
//   //     logo: companyInfo?.logoUrl?.[0] || null,
//   //     stamp: companyInfo?.stampUrl?.[0] || null,
//   //     bankAccountName: companyInfo?.bankAccountName || 'Company Name',
//   //     bankName: companyInfo?.bankName || 'Company Bank Name',
//   //     iban: companyInfo?.iban || 'XX000000000000000000001',
//   //     swiftCode: companyInfo?.swiftCode || 'XXXAAACC',
//   //   };

//   //   const meta = {
//   //     trn: co.trn,
//   //     date: invoiceData?.date ? new Date(invoiceData.date).toLocaleDateString('en-GB') : 'N/A',
//   //     inv: invoiceData?.InvoiceNo || 'N/A',
//   //   };

//   //   const clientObj = invoiceData?.clientId || invoiceData?.clients?.[0] || {};
//   //   const projObj = Array.isArray(invoiceData?.projectId) ? invoiceData.projectId[0] : invoiceData?.projects?.[0] || {};
//   //   const poNo = invoiceData?.ReceivablePurchaseId?.PONumber || invoiceData?.receivablePurchase?.PONumber || 'N/A';
//   //   const costEst = invoiceData?.CostEstimatesId?.estimateRef || invoiceData?.costEstimate?.estimateRef || 'N/A';
//   //   const projName = projObj?.projectName || 'N/A';

//   //   const itemsRaw = Array.isArray(invoiceData?.lineItems) ? invoiceData.lineItems : [];
//   //   const items = itemsRaw.length
//   //     ? itemsRaw.map((it, i) => [String(i + 1), it.description || '-', it.quantity || 0, it.rate || 0, (Number(it.amount) || 0).toFixed(2)])
//   //     : [['1', 'No items', 0, 0, '0.00']];

//   //   const subTotal = items.reduce((s, r) => s + Number(r[4]), 0);
//   //   const vatRate = 0.10; // as per screenshot
//   //   const vatAmt = subTotal * vatRate;
//   //   const grandTotal = subTotal + vatAmt;

//   //   // --- RED HEADER BAND ---
//   //   const bandH = 80; // thoda bada rakha to fit cleanly
//   //   doc.setFillColor(210, 16, 21);
//   //   doc.rect(L, y, W - L - R, bandH, 'F');

//   //   // --- LOGO inside band (centered horizontally, height fixed ~65px) ---
//   //   if (co.logo) {
//   //     try {
//   //       const lg = await getImageBase64FromUrl(co.logo);
//   //       const logoW = 522 * 0.4; // scale factor (40% so it fits nicely in A4)
//   //       const logoH = 65 * 0.4;  // proportional height
//   //       const logoX = (W - logoW) / 2; // center horizontally
//   //       const logoY = y + ((bandH - logoH) / 2); // center vertically
//   //       doc.addImage(lg, 'PNG', logoX, logoY, logoW, logoH);
//   //     } catch { }
//   //   }

//   //   // --- TITLE "Tax Invoice" just below red band (right aligned) ---
//   //   doc.setFont('helvetica', 'bold');
//   //   doc.setFontSize(14);
//   //   doc.setTextColor(0, 0, 0);
//   //   doc.text('Tax Invoice', W - R - 10, y + bandH + 20, { align: 'right' });

//   //   y += bandH + 40; // move content down after header


//   //   // --- RIGHT META TABLE: TRN / Date / Invoice No ---
//   //   autoTable(doc, {
//   //     startY: y,
//   //     theme: 'grid',
//   //     styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//   //     head: [['TRN:', 'Date', 'Invoice No.']],
//   //     body: [[meta.trn, meta.date, meta.inv]],
//   //     headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//   //     columnStyles: {
//   //       0: { cellWidth: 170 },
//   //       1: { cellWidth: 90 },
//   //       2: { cellWidth: 90 },
//   //     },
//   //     margin: { left: W - R - (170 + 90 + 90) },
//   //     tableWidth: (170 + 90 + 90),
//   //   });

//   //   const metaBottom = doc.lastAutoTable.finalY;

//   //   // --- LEFT "Invoice To" PANEL (boxed) ---
//   //   const boxW = (W - L - R) - (170 + 90 + 90) - 10; // leave some gap before meta
//   //   const boxH = 86;
//   //   doc.rect(L, y, boxW, boxH);

//   //   doc.setFontSize(10);
//   //   doc.setFont('helvetica', 'bold');
//   //   doc.text('Invoice To', L + 8, y + 16);

//   //   doc.setFontSize(9);
//   //   doc.setFont('helvetica', 'normal');
//   //   const invToX = L + 8;
//   //   let invToY = y + 32;
//   //   const addrLines = (co.address || '').split('\n');
//   //   const cName = clientObj.clientName || 'Client Name';

//   //   doc.text(cName, invToX, invToY); invToY += 12;
//   //   doc.text(addrLines[0] || '-', invToX, invToY); invToY += 12;
//   //   if (addrLines[1]) { doc.text(addrLines[1], invToX, invToY); invToY += 12; }
//   //   doc.text(`Contact: ${(clientObj?.contactPersons?.[0]?.email) || '-'}`, invToX, invToY); invToY += 12;

//   //   y = Math.max(metaBottom, y + boxH) + 10;

//   //   // --- COST EST / P.O. / PROJECT STRIP (like the narrow row in screenshot) ---
//   //   autoTable(doc, {
//   //     startY: y,
//   //     theme: 'grid',
//   //     styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//   //     head: [['Cost Est. No.', 'P.O. No.', 'Project']],
//   //     body: [[costEst, poNo, projName]],
//   //     headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//   //     margin: { left: L, right: R },
//   //     columnStyles: {
//   //       0: { cellWidth: 140 },
//   //       1: { cellWidth: 140 },
//   //       2: { cellWidth: 'auto' },
//   //     }
//   //   });

//   //   y = doc.lastAutoTable.finalY + 6;

//   //   // --- BANK DETAILS TABLE (fixed column widths) ---
//   //   // Calculate available width for the table
//   //   const availableWidth = W - L - R;

//   //   autoTable(doc, {
//   //     startY: y,
//   //     theme: 'grid',
//   //     styles: { fontSize: 8, cellPadding: 3, lineWidth: 0.6 },
//   //     head: [['Bank Account Name', 'Bank Name', 'IBAN', 'Swift Code', 'Terms']],
//   //     body: [[co.bankAccountName, co.bankName, co.iban, co.swiftCode, 'Net 30']],
//   //     headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//   //     margin: { left: L, right: R },
//   //     columnStyles: {
//   //       0: { cellWidth: availableWidth * 0.25 }, // 25% of available width
//   //       1: { cellWidth: availableWidth * 0.20 }, // 20% of available width
//   //       2: { cellWidth: availableWidth * 0.25 }, // 25% of available width
//   //       3: { cellWidth: availableWidth * 0.15 }, // 15% of available width
//   //       4: { cellWidth: availableWidth * 0.15, halign: 'right' }, // 15% of available width
//   //     }
//   //   });

//   //   y = doc.lastAutoTable.finalY + 6;

//   //   // --- LINE ITEMS TABLE (Sr., Description, Qty, Rate, Amount USD) ---
//   //   autoTable(doc, {
//   //     startY: y,
//   //     theme: 'grid',
//   //     styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//   //     head: [['Sr.', 'Description', 'Qty', 'Rate', 'Amount (USD)']],
//   //     body: items.map(r => [r[0], r[1], r[2], r[3], r[4]]),
//   //     headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//   //     margin: { left: L, right: R },
//   //     columnStyles: {
//   //       0: { cellWidth: 36, halign: 'left' },
//   //       1: { cellWidth: 'auto' },
//   //       2: { cellWidth: 46, halign: 'right' },
//   //       3: { cellWidth: 60, halign: 'right' },
//   //       4: { cellWidth: 90, halign: 'right' }
//   //     }
//   //   });

//   //   y = doc.lastAutoTable.finalY + 6;

//   //   // --- AMOUNT IN WORDS (left, light rule like screenshot) ---
//   //   doc.setFontSize(9);
//   //   doc.text(numberToWordsUSD(grandTotal), L, y + 12);

//   //   // --- TOTALS BOX (right) ---
//   //   const totalsW = 200;
//   //   const totalsX = W - R - totalsW;

//   //   autoTable(doc, {
//   //     startY: y,
//   //     theme: 'grid',
//   //     styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//   //     body: [
//   //       [{ content: 'Subtotal', styles: { fontStyle: 'bold' } }, { content: `USD ${subTotal.toFixed(2)}`, styles: { halign: 'right' } }],
//   //       [{ content: `VAT (${(vatRate * 100).toFixed(0)}%)`, styles: { fontStyle: 'bold' } }, { content: `USD ${vatAmt.toFixed(2)}`, styles: { halign: 'right' } }],
//   //       [{ content: 'Total', styles: { fontStyle: 'bold' } }, { content: `USD ${grandTotal.toFixed(2)}`, styles: { halign: 'right' } }],
//   //     ],
//   //     margin: { left: totalsX },
//   //     tableWidth: totalsW,
//   //     columnStyles: { 0: { cellWidth: totalsW * 0.6 }, 1: { cellWidth: totalsW * 0.4 } }
//   //   });

//   //   y = Math.max(y + 30, doc.lastAutoTable.finalY) + 12;

//   //   // --- FOOTER: For Company Name / Accounts Department (left); STAMP (center bottom like screenshot) ---
//   //   doc.setFont('helvetica', 'bold');
//   //   doc.setFontSize(9);
//   //   doc.text('For Company Name', L, y);
//   //   doc.setFont('helvetica', 'normal');
//   //   doc.text('Accounts Department', L, y + 14);

//   //   // Stamp: if available use image; else draw red placeholder box with text (like screenshot)
//   //   const stampW = 170, stampH = 113; // pixels in screenshot, map roughly to pt here
//   //   const stampX = (W / 2) - (stampW / 2);
//   //   const stampY = y + 26;

//   //   if (companyInfo?.stampUrl?.[0]) {
//   //     try {
//   //       const st = await getImageBase64FromUrl(companyInfo.stampUrl[0]);
//   //       doc.addImage(st, 'PNG', stampX, stampY, stampW, stampH);
//   //     } catch {
//   //       doc.setFillColor(210, 16, 21);
//   //       doc.rect(stampX, stampY, stampW, stampH, 'F');
//   //       doc.setFont('helvetica', 'bold');
//   //       doc.setFontSize(9);
//   //       doc.setTextColor(255, 255, 255);
//   //       doc.text('Stamp Image\n(169 x 113 px)\n(60mm x 40mm)', stampX + stampW / 2, stampY + stampH / 2, { align: 'center' });
//   //       doc.setTextColor(0, 0, 0);
//   //     }
//   //   } else {
//   //     doc.setFillColor(210, 16, 21);
//   //     doc.rect(stampX, stampY, stampW, stampH, 'F');
//   //     doc.setFont('helvetica', 'bold');
//   //     doc.setFontSize(9);
//   //     doc.setTextColor(255, 255, 255);
//   //     doc.text('Stamp Image\n(169 x 113 px)\n(60mm x 40mm)', stampX + stampW / 2, stampY + stampH / 2, { align: 'center' });
//   //     doc.setTextColor(0, 0, 0);
//   //   }

//   //   // Terms (right, tiny)
//   //   doc.setFontSize(9);
//   //   doc.text('Terms: Net 30', W - R, y + 14, { align: 'right' });

//   //   doc.save(`Tax_Invoice_${meta.inv}.pdf`);
//   // };

//   // EXACT-LIKE LAYOUT PDF
//   const generatePDFfromData = async (invoiceData) => {
//     const doc = new jsPDF('p', 'pt', 'a4');
//     const W = doc.internal.pageSize.width; // 595.28
//     const L = 40; // left margin
//     const R = 40; // right margin
//     let y = 40;
//     // Company + defaults
//     const co = {
//       name: companyInfo?.name || 'Company Name',
//       address: companyInfo?.address || 'Address Line 1\nAddress Line 2, Country',
//       trn: companyInfo?.trn || '100000000000002',
//       email: companyInfo?.email || 'email@example.com',
//       phone: companyInfo?.phone || '+00-0000000000',
//       logo: companyInfo?.logoUrl?.[0] || null,
//       stamp: companyInfo?.stampUrl?.[0] || null,
//       bankAccountName: companyInfo?.bankAccountName || 'Company Name',
//       bankName: companyInfo?.bankName || 'Company Bank Name',
//       iban: companyInfo?.iban || 'XX000000000000000000001',
//       swiftCode: companyInfo?.swiftCode || 'XXXAAACC',
//     };
//     const meta = {
//       trn: co.trn,
//       date: invoiceData?.date ? new Date(invoiceData.date).toLocaleDateString('en-GB') : 'N/A',
//       inv: invoiceData?.InvoiceNo || 'N/A',
//     };
//     const clientObj = invoiceData?.clientId || invoiceData?.clients?.[0] || {};
//     const projObj = Array.isArray(invoiceData?.projectId) ? invoiceData.projectId[0] : invoiceData?.projects?.[0] || {};
//     const poNo = invoiceData?.ReceivablePurchaseId?.PONumber || invoiceData?.receivablePurchase?.PONumber || 'N/A';
//     const costEst = invoiceData?.CostEstimatesId?.estimateRef || invoiceData?.costEstimate?.estimateRef || 'N/A';
//     const projName = projObj?.projectName || 'N/A';
//     const itemsRaw = Array.isArray(invoiceData?.lineItems) ? invoiceData.lineItems : [];
//     const items = itemsRaw.length
//       ? itemsRaw.map((it, i) => [String(i + 1), it.description || '-', it.quantity || 0, it.rate || 0, (Number(it.amount) || 0).toFixed(2)])
//       : [['1', 'No items', 0, 0, '0.00']];
//     const subTotal = items.reduce((s, r) => s + Number(r[4]), 0);
//     const vatRate = 0.10; // as per screenshot
//     const vatAmt = subTotal * vatRate;
//     const grandTotal = subTotal + vatAmt;
//     // --- RED HEADER BAND ---
//     const bandH = 80; // thoda bada rakha to fit cleanly
//     doc.setFillColor(210, 16, 21);
//     doc.rect(L, y, W - L - R, bandH, 'F');
//     // --- LOGO inside band (centered horizontally, height fixed ~65px) ---
//     if (co.logo) {
//       try {
//         const lg = await getImageBase64FromUrl(co.logo);
//         const logoW = 522 * 0.4; // scale factor (40% so it fits nicely in A4)
//         const logoH = 65 * 0.4;  // proportional height
//         const logoX = (W - logoW) / 2; // center horizontally
//         const logoY = y + ((bandH - logoH) / 2); // center vertically
//         doc.addImage(lg, 'PNG', logoX, logoY, logoW, logoH);
//       } catch { }
//     }
//     // --- TITLE "Tax Invoice" just below red band (right aligned) ---
//     doc.setFont('helvetica', 'bold');
//     doc.setFontSize(14);
//     doc.setTextColor(0, 0, 0);
//     doc.text('Tax Invoice', W - R - 10, y + bandH + 20, { align: 'right' });
//     y += bandH + 40; // move content down after header

//     // --- RIGHT META TABLE: TRN / Date / Invoice No. ---
//     autoTable(doc, {
//       startY: y,
//       theme: 'grid',
//       styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//       head: [['TRN:', 'Date', 'Invoice No.']],
//       body: [[meta.trn, meta.date, meta.inv]],
//       headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//       columnStyles: {
//         0: { cellWidth: 170 },
//         1: { cellWidth: 90 },
//         2: { cellWidth: 90 },
//       },
//       margin: { left: W - R - (170 + 90 + 90) },
//       tableWidth: (170 + 90 + 90),
//     });
//     const metaBottom = doc.lastAutoTable.finalY;

//     // --- LEFT "Invoice To" PANEL (boxed) ---
//     const boxW = (W - L - R) - (170 + 90 + 90) - 10; // leave some gap before meta
//     const boxH = 86;
//     doc.rect(L, y, boxW, boxH);
//     doc.setFontSize(10);
//     doc.setFont('helvetica', 'bold');
//     doc.text('Invoice To', L + 8, y + 16);
//     doc.setFontSize(9);
//     doc.setFont('helvetica', 'normal');
//     const invToX = L + 8;
//     let invToY = y + 32;
//     const addrLines = (co.address || '').split('\n');
//     const cName = clientObj.clientName || 'Client Name';
//     doc.text(cName, invToX, invToY); invToY += 12;
//     doc.text(addrLines[0] || '-', invToX, invToY); invToY += 12;
//     if (addrLines[1]) { doc.text(addrLines[1], invToX, invToY); invToY += 12; }
//     doc.text(`Contact: ${(clientObj?.contactPersons?.[0]?.email) || '-'}`, invToX, invToY); invToY += 12;

//     // --- COST EST / P.O. / PROJECT STRIP (like the narrow row in screenshot) ---
//     autoTable(doc, {
//       startY: metaBottom, // Position directly below the meta table
//       theme: 'grid',
//       styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//       head: [['Cost Est. No.', 'P.O. No.', 'Project']],
//       body: [[costEst, poNo, projName]],
//       headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//       margin: { left: W - R - (170 + 90 + 90) }, // Align with the meta table
//       tableWidth: (170 + 90 + 90), // Same width as the meta table
//       columnStyles: {
//         0: { cellWidth: 140 },
//         1: { cellWidth: 140 },
//         2: { cellWidth: 'auto' },
//       }
//     });
//     const costEstBottom = doc.lastAutoTable.finalY;

//     // Update y to be the maximum of the costEstBottom and the bottom of the Invoice To panel
//     y = Math.max(costEstBottom, y + boxH) + 10;

//     // --- BANK DETAILS TABLE (fixed column widths) ---
//     // Calculate available width for the table
//     const availableWidth = W - L - R;
//     autoTable(doc, {
//       startY: y,
//       theme: 'grid',
//       styles: { fontSize: 8, cellPadding: 3, lineWidth: 0.6 },
//       head: [['Bank Account Name', 'Bank Name', 'IBAN', 'Swift Code', 'Terms']],
//       body: [[co.bankAccountName, co.bankName, co.iban, co.swiftCode, 'Net 30']],
//       headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//       margin: { left: L, right: R },
//       columnStyles: {
//         0: { cellWidth: availableWidth * 0.25 }, // 25% of available width
//         1: { cellWidth: availableWidth * 0.20 }, // 20% of available width
//         2: { cellWidth: availableWidth * 0.25 }, // 25% of available width
//         3: { cellWidth: availableWidth * 0.15 }, // 15% of available width
//         4: { cellWidth: availableWidth * 0.15, halign: 'right' }, // 15% of available width
//       }
//     });
//     y = doc.lastAutoTable.finalY + 6;

//     // --- LINE ITEMS TABLE (Sr., Description, Qty, Rate, Amount USD) ---
//     autoTable(doc, {
//       startY: y,
//       theme: 'grid',
//       styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//       head: [['Sr.', 'Description', 'Qty', 'Rate', 'Amount (USD)']],
//       body: items.map(r => [r[0], r[1], r[2], r[3], r[4]]),
//       headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
//       margin: { left: L, right: R },
//       columnStyles: {
//         0: { cellWidth: 36, halign: 'left' },
//         1: { cellWidth: 'auto' },
//         2: { cellWidth: 46, halign: 'right' },
//         3: { cellWidth: 60, halign: 'right' },
//         4: { cellWidth: 90, halign: 'right' }
//       }
//     });
//     y = doc.lastAutoTable.finalY + 6;

//     // --- AMOUNT IN WORDS (left, light rule like screenshot) ---
//     doc.setFontSize(9);
//     doc.text(numberToWordsUSD(grandTotal), L, y + 12);

//     // --- TOTALS BOX (right) ---
//     const totalsW = 200;
//     const totalsX = W - R - totalsW;
//     autoTable(doc, {
//       startY: y,
//       theme: 'grid',
//       styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.6 },
//       body: [
//         [{ content: 'Subtotal', styles: { fontStyle: 'bold' } }, { content: `USD ${subTotal.toFixed(2)}`, styles: { halign: 'right' } }],
//         [{ content: `VAT (${(vatRate * 100).toFixed(0)}%)`, styles: { fontStyle: 'bold' } }, { content: `USD ${vatAmt.toFixed(2)}`, styles: { halign: 'right' } }],
//         [{ content: 'Total', styles: { fontStyle: 'bold' } }, { content: `USD ${grandTotal.toFixed(2)}`, styles: { halign: 'right' } }],
//       ],
//       margin: { left: totalsX },
//       tableWidth: totalsW,
//       columnStyles: { 0: { cellWidth: totalsW * 0.6 }, 1: { cellWidth: totalsW * 0.4 } }
//     });
//     y = Math.max(y + 30, doc.lastAutoTable.finalY) + 12;

//     // --- FOOTER: For Company Name / Accounts Department (left); STAMP (center bottom like screenshot) ---
//     doc.setFont('helvetica', 'bold');
//     doc.setFontSize(9);
//     doc.text('For Company Name', L, y);
//     doc.setFont('helvetica', 'normal');
//     doc.text('Accounts Department', L, y + 14);

//     // Stamp: if available use image; else draw red placeholder box with text (like screenshot)
//     const stampW = 170, stampH = 113; // pixels in screenshot, map roughly to pt here
//     const stampX = (W / 2) - (stampW / 2);
//     const stampY = y + 26;
//     if (companyInfo?.stampUrl?.[0]) {
//       try {
//         const st = await getImageBase64FromUrl(companyInfo.stampUrl[0]);
//         doc.addImage(st, 'PNG', stampX, stampY, stampW, stampH);
//       } catch {
//         doc.setFillColor(210, 16, 21);
//         doc.rect(stampX, stampY, stampW, stampH, 'F');
//         doc.setFont('helvetica', 'bold');
//         doc.setFontSize(9);
//         doc.setTextColor(255, 255, 255);
//         doc.text('Stamp Image\n(169 x 113 px)\n(60mm x 40mm)', stampX + stampW / 2, stampY + stampH / 2, { align: 'center' });
//         doc.setTextColor(0, 0, 0);
//       }
//     } else {
//       doc.setFillColor(210, 16, 21);
//       doc.rect(stampX, stampY, stampW, stampH, 'F');
//       doc.setFont('helvetica', 'bold');
//       doc.setFontSize(9);
//       doc.setTextColor(255, 255, 255);
//       doc.text('Stamp Image\n(169 x 113 px)\n(60mm x 40mm)', stampX + stampW / 2, stampY + stampH / 2, { align: 'center' });
//       doc.setTextColor(0, 0, 0);
//     }

//     // Terms (right, tiny)
//     doc.setFontSize(9);
//     doc.text('Terms: Net 30', W - R, y + 14, { align: 'right' });

//     doc.save(`Tax_Invoice_${meta.inv}.pdf`);
//   };

//   const handleDownloadPDF = async (row) => {
//     if (!row?._id) {
//       Swal.fire('Error', 'No invoice id found to generate PDF.', 'error');
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(`/pdf/invoice?InvoiceBillingId=${row._id}`, { responseType: 'blob' });
//       const isJson = response?.data?.type === 'application/json';

//       if (isJson) {
//         const reader = new FileReader();
//         reader.onload = async () => {
//           try {
//             const json = JSON.parse(reader.result);
//             const data = json?.data?.[0] || json;
//             await generatePDFfromData(data);
//           } catch {
//             Swal.fire('Error', 'Invalid JSON received while generating PDF.', 'error');
//           }
//         };
//         reader.readAsText(response.data);
//       } else {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `${row.InvoiceNo || 'invoice'}.pdf`;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//       }
//     } catch (e) {
//       console.warn('API PDF fallback to client render:', e?.message || e);
//       await generatePDFfromData(row);
//     }
//   };

//   // -----------------------------
//   // FILTER + PAGINATION
//   const filtered = invocing?.InvoicingBilling?.slice()?.reverse()?.filter((invoice) => {
//     const terms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
//     const fields = [
//       (invoice.InvoiceNo || '').toLowerCase(),
//       (invoice.clientId?.clientName || '').toLowerCase(),
//       (invoice.projectId?.[0]?.projectName || '').toLowerCase(),
//       (invoice.status || '').toLowerCase(),
//       String(invoice.lineItems?.[0]?.amount || '').toLowerCase(),
//     ];

//     const matchesSearch = terms.length === 0 || terms.every(t => fields.some(f => f.includes(t)));
//     const matchesProject = selectedProject === 'All Projects' || invoice.projectId?.[0]?.projectName === selectedProject;
//     const matchesClient = selectedClient === 'All Clients' || invoice.clientId?.clientName === selectedClient;

//     const d = invoice.date ? new Date(invoice.date) : null;
//     const from = dateRange.from ? new Date(dateRange.from) : null;
//     const to = dateRange.to ? new Date(dateRange.to) : null;
//     if (to) to.setHours(23, 59, 59, 999);

//     const matchesDate = (!from && !to) ||
//       (from && !to && d >= from) ||
//       (!from && to && d <= to) ||
//       (from && to && d >= from && d <= to);

//     return matchesSearch && matchesProject && matchesClient && matchesDate;
//   }) || [];

//   // Simple client-side sort
//   if (sortField) {
//     filtered.sort((a, b) => {
//       const dir = sortDirection === 'asc' ? 1 : -1;
//       const get = (obj) => {
//         switch (sortField) {
//           case 'invoiceNumber': return (obj.InvoiceNo || '').toString();
//           case 'project': return (obj.projectId?.[0]?.projectName || '');
//           case 'client': return (obj.clientId?.clientName || '');
//           case 'amount': return Number(obj.lineItems?.[0]?.amount || 0);
//           case 'status': return (obj.status || '');
//           case 'dueDate': return new Date(obj.date || 0).getTime();
//           default: return '';
//         }
//       };
//       const va = get(a), vb = get(b);
//       if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
//       return va.toString().localeCompare(vb.toString()) * dir;
//     });
//   }

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15;
//   const totalItems = filtered.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const page = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handleDelete = (_id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You want to mark this job as Cancelled?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, mark as Cancelled!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteInvoicingBilling(_id))
//           .unwrap()
//           .then(() => {
//             Swal.fire('Updated!', 'The job has been marked as Cancelled.', 'success');
//             dispatch(fetchInvoicingBilling());
//           })
//           .catch(() => Swal.fire('Error!', 'Something went wrong while updating.', 'error'));
//       }
//     });
//   };

//   const UpdateInvocing = (invoice) => {
//     navigate('/admin/AddInvoice', { state: { invoice } });
//   };

//   return (
//     <div className="p-4 m-3" style={{ backgroundColor: 'white', borderRadius: 10 }}>
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//         <h2>Invoicing &amp; Billing</h2>
//       </div>

//       <div className={`row g-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-md-flex'}`}>
//         <div className="col-md-3">
//           <div className="input-group">
//             <span className="input-group-text bg-white border-end-0">
//               <FaSearch className="text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control border-start-0"
//               placeholder="Search invoices..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="input-group">
//             <span className="input-group-text bg-white border-end-0">From</span>
//             <input
//               type="date"
//               className="form-control border-start-0"
//               value={dateRange.from}
//               onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="input-group">
//             <span className="input-group-text bg-white border-end-0">To</span>
//             <input
//               type="date"
//               className="form-control border-start-0"
//               value={dateRange.to}
//               onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="col-md-3 d-flex">
//           <Dropdown>
//             <Dropdown.Toggle variant="light" id="project-dropdown" className="w-100">
//               {selectedProject}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setSelectedProject('All Projects')}>All Projects</Dropdown.Item>
//               {[...new Set((invocing?.InvoicingBilling || []).map(inv => inv.projectId?.[0]?.projectName || 'N/A'))]
//                 .filter(v => v !== 'N/A')
//                 .map((projectName, i) =>
//                   <Dropdown.Item key={i} onClick={() => setSelectedProject(projectName)}>{projectName}</Dropdown.Item>
//                 )}
//             </Dropdown.Menu>
//           </Dropdown>

//           <Dropdown>
//             <Dropdown.Toggle variant="light" id="client-dropdown" className="w-100 ms-2">
//               {selectedClient}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setSelectedClient('All Clients')}>All Clients</Dropdown.Item>
//               {[...new Set((invocing?.InvoicingBilling || []).map(inv => inv.clientId?.clientName || 'N/A'))]
//                 .filter(v => v !== 'N/A')
//                 .map((clientName, i) =>
//                   <Dropdown.Item key={i} onClick={() => setSelectedClient(clientName)}>{clientName}</Dropdown.Item>
//                 )}
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>

//       <Table hover responsive>
//         <thead>
//           <tr>
//             <th onClick={() => handleSort('invoiceNumber')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Invoice #</th>
//             <th onClick={() => handleSort('project')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Project</th>
//             <th onClick={() => handleSort('client')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Client Name</th>
//             <th onClick={() => handleSort('amount')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Amount</th>
//             <th onClick={() => handleSort('dueDate')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {page.map((invoice, idx) => (
//             <tr key={invoice._id || idx}>
//               <td style={{ whiteSpace: 'nowrap' }}>{invoice.InvoiceNo || 'N/A'}</td>
//               <td style={{ whiteSpace: 'nowrap' }}>{invoice.projectId?.[0]?.projectName || 'N/A'}</td>
//               <td style={{ whiteSpace: 'nowrap' }}>{invoice.clientId?.clientName || 'N/A'}</td>
//               <td style={{ whiteSpace: 'nowrap' }}>
//                 {invoice.currency || 'USD'} {Number(invoice.lineItems?.[0]?.amount || 0).toFixed(2)}
//               </td>
//               <td>{invoice.date ? new Date(invoice.date).toLocaleDateString('en-GB') : 'N/A'}</td>
//               <td>
//                 <div className="d-flex gap-2">
//                   <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateInvocing(invoice)}>
//                     <FaEdit />
//                   </button>
//                   <button className="btn btn-sm btn-outline-primary" onClick={() => handleDownloadPDF(invoice)}>
//                     <FaDownload />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {!loading && !error && (
//         <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//           <div className="text-muted small mb-2 mb-md-0">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
//           </div>
//           <ul className="pagination pagination-sm mb-0">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
//                 <span aria-hidden="true">&laquo;</span>
//               </button>
//             </li>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                 <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
//               </li>
//             ))}
//             <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
//                 <span aria-hidden="true">&raquo;</span>
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Invoicing_Billing;


// ================================

import React, { useEffect, useState } from 'react';
import { Form, Table, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { FaSearch, FaSort, FaEdit, FaDownload } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import { deleteInvoicingBilling, fetchInvoicingBilling } from '../../../redux/slices/InvoicingBillingSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../../redux/utils/axiosInstance';
import { apiUrl } from '../../../redux/utils/config';

// Add this component for the HTML invoice template with exact formatting
const InvoiceTemplate = ({ invoiceData, companyInfo, refProp }) => {
  // Calculate values
  const itemsRaw = Array.isArray(invoiceData?.lineItems) ? invoiceData.lineItems : [];
  const items = itemsRaw.length
    ? itemsRaw.map((it, i) => ({ ...it, id: i + 1 }))
    : [{ id: 1, description: 'No items', quantity: 0, rate: 0, amount: '0.00' }];

  const subTotal = items.reduce((s, it) => s + Number(it.amount || 0), 0);
  const vatRate = 0.10; // as per screenshot
  const vatAmt = subTotal * vatRate;
  const grandTotal = subTotal + vatAmt;

  const clientObj = invoiceData?.clientId || invoiceData?.clients?.[0] || {};
  const projObj = Array.isArray(invoiceData?.projectId) ? invoiceData.projectId[0] : invoiceData?.projects?.[0] || {};
  const poNo =
    invoiceData?.ReceivablePurchaseId?.PONumber ||
    invoiceData?.receivablePurchase?.PONumber ||
    'N/A';

  const costEst =
    invoiceData?.ReceivablePurchaseId?.CostEstimatesId?.[0]?.estimateRef ||
    invoiceData?.receivablePurchase?.CostEstimatesId?.[0]?.estimateRef ||
    'N/A';

  const projName = projObj?.projectName || 'N/A';

  const co = {
    name: companyInfo?.name || 'Company Name',
    address: companyInfo?.address || 'Address Line 1\nAddress Line 2, Country',
    trn: companyInfo?.trn || '100000000000002',
    email: companyInfo?.email || 'email@example.com',
    phone: companyInfo?.phone || '+00-0000000000',
    logo: companyInfo?.logoUrl?.[0] || null,
    stamp: companyInfo?.stampUrl?.[0] || null,
    bankAccountName: companyInfo?.bankAccountName || 'Company Name',
    bankName: companyInfo?.bankName || 'Company Bank Name',
    iban: companyInfo?.iban || 'XX000000000000000000001',
    swiftCode: companyInfo?.swiftCode || 'XXXAAACC',
  };

  const meta = {
    trn: co.trn,
    date: invoiceData?.date ? new Date(invoiceData.date).toLocaleDateString('en-GB') : 'N/A',
    inv: invoiceData?.InvoiceNo || 'N/A',
  };

  // Function to convert number to words
  const numberToWordsUSD = (value) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const toWords = (n) => {
      if (n === 0) return 'Zero';
      let w = '';
      const billions = Math.floor(n / 1_000_000_000); n %= 1_000_000_000;
      const millions = Math.floor(n / 1_000_000); n %= 1_000_000;
      const thousands = Math.floor(n / 1000); n %= 1000;
      const hundreds = Math.floor(n / 100); n %= 100;
      if (billions) w += toWords(billions) + ' Billion ';
      if (millions) w += toWords(millions) + ' Million ';
      if (thousands) w += toWords(thousands) + ' Thousand ';
      if (hundreds) w += ones[hundreds] + ' Hundred ';
      if (n >= 20) { w += tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : ''); }
      else if (n > 0) { w += ones[n]; }
      return w.trim();
    };
    const dollars = Math.floor(value);
    const cents = Math.round((value - dollars) * 100);
    let words = `US Dollars ${toWords(dollars)}`;
    if (cents > 0) words += ` and ${String(cents).padStart(2, '0')}/100`;
    return words + ' Only';
  };

  // Split address into lines
  const addrLines = (co.address || '').split('\n');

  return (
    <div ref={refProp} className="invoice-template" style={{
      width: '210mm',
      backgroundColor: 'white',
      fontFamily: 'Helvetica, Arial, sans-serif',
      padding: '40px',
      boxSizing: 'border-box'
    }}>
      {/* RED HEADER BAND */}
      <div style={{
        backgroundColor: '#D21015',
        height: '80px',
        width: '100%',
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {co.logo && (
          <img
            src={co.logo}
            alt="Company Logo"
            style={{ height: '65px', width: '522px' }}
          />
        )}
      </div>

      {/* TITLE "Tax Invoice" just below red band (right aligned) */}
      <div style={{ textAlign: 'right', marginBottom: '40px' }}>
        <h2 style={{
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          fontSize: '14pt',
          margin: 0
        }}>
          Tax Invoice
        </h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        {/* LEFT "Invoice To" PANEL (boxed) */}
        <div style={{
          width: 'calc(100% - 350px)',
          border: '1px solid #000',
          padding: '16px 8px 8px 8px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '10pt',
            marginBottom: '16px'
          }}>
            Invoice To
          </div>
          <div style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '9pt',
            lineHeight: '1.3'
          }}>
            <div style={{ marginBottom: '12px' }}>{clientObj.clientName || 'Client Name'}</div>
            <div style={{ marginBottom: '12px' }}>{addrLines[0] || '-'}</div>
            {addrLines[1] && <div style={{ marginBottom: '12px' }}>{addrLines[1]}</div>}
            <div>Contact: {(clientObj?.contactPersons?.[0]?.email) || '-'}</div>
          </div>
        </div>

        {/* RIGHT META TABLE: TRN / Date / Invoice No. */}
        <div style={{ width: '350px' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '9pt'
          }}>
            <thead>
              <tr>
                <th style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  width: '170px',
                  backgroundColor: '#fff',
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'left'
                }}>TRN:</th>
                <th style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  width: '90px',
                  backgroundColor: '#fff',
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'left'
                }}>Date</th>
                <th style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  width: '90px',
                  backgroundColor: '#fff',
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'left'
                }}>Invoice No.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px'
                }}>{meta.trn}</td>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px'
                }}>{meta.date}</td>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px'
                }}>{meta.inv}</td>
              </tr>
            </tbody>
          </table>

          {/* COST EST / P.O. / PROJECT STRIP (positioned directly below meta table) */}
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '9pt',
            marginTop: '6px'
          }}>
            <thead>
              <tr>
                <th style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  width: '140px',
                  backgroundColor: '#fff',
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'left'
                }}>Cost Est. No.</th>
                <th style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  width: '140px',
                  backgroundColor: '#fff',
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'left'
                }}>P.O. No.</th>
                <th style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  backgroundColor: '#fff',
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'left'
                }}>Project</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px'
                }}>{costEst}</td>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px'
                }}>{poNo}</td>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px'
                }}>{projName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* BANK DETAILS TABLE */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '8pt',
        marginTop: '16px',
        marginBottom: '6px'
      }}>
        <thead>
          <tr>
            <th style={{
              border: '0.6px solid #000',
              padding: '3px',
              width: '25%',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'left'
            }}>Bank Account Name</th>
            <th style={{
              border: '0.6px solid #000',
              padding: '3px',
              width: '20%',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'left'
            }}>Bank Name</th>
            <th style={{
              border: '0.6px solid #000',
              padding: '3px',
              width: '25%',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'left'
            }}>IBAN</th>
            <th style={{
              border: '0.6px solid #000',
              padding: '3px',
              width: '15%',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'left'
            }}>Swift Code</th>
            <th style={{
              border: '0.6px solid #000',
              padding: '3px',
              width: '15%',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'right'
            }}>Terms</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{
              border: '0.6px solid #000',
              padding: '3px'
            }}>{co.bankAccountName}</td>
            <td style={{
              border: '0.6px solid #000',
              padding: '3px'
            }}>{co.bankName}</td>
            <td style={{
              border: '0.6px solid #000',
              padding: '3px'
            }}>{co.iban}</td>
            <td style={{
              border: '0.6px solid #000',
              padding: '3px'
            }}>{co.swiftCode}</td>
            <td style={{
              border: '0.6px solid #000',
              padding: '3px',
              textAlign: 'right'
            }}>Net 30</td>
          </tr>
        </tbody>
      </table>

      {/* LINE ITEMS TABLE */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '9pt',
        marginTop: '6px',
        marginBottom: '6px'
      }}>
        <thead>
          <tr>
            <th style={{
              border: '0.6px solid #000',
              padding: '5px',
              width: '36px',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'left'
            }}>Sr.</th>
            <th style={{
              border: '0.6px solid #000',
              padding: '5px',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'left'
            }}>Description</th>
            <th style={{
              border: '0.6px solid #000',
              padding: '5px',
              width: '46px',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'right'
            }}>Qty</th>
            <th style={{
              border: '0.6px solid #000',
              padding: '5px',
              width: '60px',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'right'
            }}>Rate</th>
            <th style={{
              border: '0.6px solid #000',
              padding: '5px',
              width: '90px',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'right'
            }}>Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={{
                border: '0.6px solid #000',
                padding: '5px',
                textAlign: 'left'
              }}>{item.id}</td>
              <td style={{
                border: '0.6px solid #000',
                padding: '5px',
                textAlign: 'left'
              }}>{item.description}</td>
              <td style={{
                border: '0.6px solid #000',
                padding: '5px',
                textAlign: 'right'
              }}>{item.quantity}</td>
              <td style={{
                border: '0.6px solid #000',
                padding: '5px',
                textAlign: 'right'
              }}>{item.rate}</td>
              <td style={{
                border: '0.6px solid #000',
                padding: '5px',
                textAlign: 'right'
              }}>{Number(item.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
        {/* LEFT - AMOUNT IN WORDS */}
        <div style={{
          width: 'calc(100% - 200px)',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '9pt',
          paddingTop: '12px'
        }}>
          {numberToWordsUSD(grandTotal)}
        </div>

        {/* RIGHT - TOTALS BOX */}
        <div style={{ width: '200px' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '9pt'
          }}>
            <tbody>
              <tr>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  width: '60%',
                  fontWeight: 'bold'
                }}>Subtotal</td>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  width: '40%',
                  textAlign: 'right'
                }}>USD {subTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  fontWeight: 'bold'
                }}>VAT ({(vatRate * 100).toFixed(0)}%)</td>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  textAlign: 'right'
                }}>USD {vatAmt.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  fontWeight: 'bold'
                }}>Total</td>
                <td style={{
                  border: '0.6px solid #000',
                  padding: '5px',
                  textAlign: 'right'
                }}>USD {grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: '42px'
      }}>
        {/* LEFT - For Company Name / Accounts Department */}
        <div>
          <div style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '9pt',
            marginBottom: '4px'
          }}>
            For Company Name
          </div>
          <div style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '9pt'
          }}>
            Accounts Department
          </div>
        </div>

        {/* CENTER - STAMP */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '26px'
        }}>
          {co.stamp ? (
            <img
              src={co.stamp}
              alt="Company Stamp"
              style={{ width: '170px', height: '113px' }}
            />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center text-white fw-bold"
              style={{
                backgroundColor: '#D21015',
                width: '170px',
                height: '113px',
                fontSize: '9pt',
                textAlign: 'center',
                lineHeight: '1.3'
              }}
            >
              Stamp Image<br />(169 x 113 px)<br />(60mm x 40mm)
            </div>
          )}
        </div>

        {/* RIGHT - Terms */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '9pt'
          }}>
            Terms: Net 30
          </div>
        </div>
      </div>
    </div>
  );
};

function Invoicing_Billing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [selectedClient, setSelectedClient] = useState('All Clients');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [companyInfo, setCompanyInfo] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const invoiceRef = React.useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { invocing, loading, error } = useSelector((state) => state.InvoicingBilling);

  useEffect(() => {
    dispatch(fetchInvoicingBilling());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/user/685e6f6364a81f874cd99761`);
        const data = await res.json();
        setCompanyInfo(data.companyInfo || null);
      } catch (e) {
        console.error('Company info error:', e);
      }
    })();
  }, []);

  const getStatusClass = (status) => {
    switch ((status || '').toLowerCase().trim()) {
      case 'active': return 'bg-primary text-white';
      case 'inactive': return 'bg-secondary text-white';
      case 'completed': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-dark';
      case 'overdue': return 'bg-danger text-white';
      default: return 'bg-light text-dark';
    }
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  // New PDF generation function using HTML
  const generatePDFfromHTML = async (invoiceData) => {
    if (!invoiceRef.current) return;

    setIsGeneratingPDF(true);

    try {
      // Create a clone of the invoice template to avoid modifying the original
      const element = invoiceRef.current.cloneNode(true);

      // Hide the element from view while we render it
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      document.body.appendChild(element);

      // Use html2canvas to create an image from the HTML
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true, // Allow cross-origin images
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Remove the temporary element
      document.body.removeChild(element);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // If the image is longer than one page, add more pages
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      const invoiceNo = invoiceData?.InvoiceNo || 'invoice';
      pdf.save(`Tax_Invoice_${invoiceNo}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      Swal.fire('Error', 'Failed to generate PDF. Please try again.', 'error');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadPDF = async (row) => {
    if (!row?._id) {
      Swal.fire('Error', 'No invoice id found to generate PDF.', 'error');
      return;
    }

    try {
      const response = await axiosInstance.get(`/pdf/invoice?InvoiceBillingId=${row._id}`, { responseType: 'blob' });
      const isJson = response?.data?.type === 'application/json';

      if (isJson) {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const json = JSON.parse(reader.result);
            const data = json?.data?.[0] || json;
            await generatePDFfromHTML(data);
          } catch {
            Swal.fire('Error', 'Invalid JSON received while generating PDF.', 'error');
          }
        };
        reader.readAsText(response.data);
      } else {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = `${row.InvoiceNo || 'invoice'}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (e) {
      console.warn('API PDF fallback to client render:', e?.message || e);
      await generatePDFfromHTML(row);
    }
  };

  // -----------------------------
  // FILTER + PAGINATION
  const filtered = invocing?.InvoicingBilling?.slice()?.reverse()?.filter((invoice) => {
    const terms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const fields = [
      (invoice.InvoiceNo || '').toLowerCase(),
      (invoice.clientId?.clientName || '').toLowerCase(),
      (invoice.projectId?.[0]?.projectName || '').toLowerCase(),
      (invoice.status || '').toLowerCase(),
      String(invoice.lineItems?.[0]?.amount || '').toLowerCase(),
    ];
    const matchesSearch = terms.length === 0 || terms.every(t => fields.some(f => f.includes(t)));
    const matchesProject = selectedProject === 'All Projects' || invoice.projectId?.[0]?.projectName === selectedProject;
    const matchesClient = selectedClient === 'All Clients' || invoice.clientId?.clientName === selectedClient;
    const d = invoice.date ? new Date(invoice.date) : null;
    const from = dateRange.from ? new Date(dateRange.from) : null;
    const to = dateRange.to ? new Date(dateRange.to) : null;
    if (to) to.setHours(23, 59, 59, 999);
    const matchesDate = (!from && !to) ||
      (from && !to && d >= from) ||
      (!from && to && d <= to) ||
      (from && to && d >= from && d <= to);
    return matchesSearch && matchesProject && matchesClient && matchesDate;
  }) || [];

  // Simple client-side sort
  if (sortField) {
    filtered.sort((a, b) => {
      const dir = sortDirection === 'asc' ? 1 : -1;
      const get = (obj) => {
        switch (sortField) {
          case 'invoiceNumber': return (obj.InvoiceNo || '').toString();
          case 'project': return (obj.projectId?.[0]?.projectName || '');
          case 'client': return (obj.clientId?.clientName || '');
          case 'amount': return Number(obj.lineItems?.[0]?.amount || 0);
          case 'status': return (obj.status || '');
          case 'dueDate': return new Date(obj.date || 0).getTime();
          default: return '';
        }
      };
      const va = get(a), vb = get(b);
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return va.toString().localeCompare(vb.toString()) * dir;
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const page = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to mark this job as Cancelled?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark as Cancelled!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteInvoicingBilling(_id))
          .unwrap()
          .then(() => {
            Swal.fire('Updated!', 'The job has been marked as Cancelled.', 'success');
            dispatch(fetchInvoicingBilling());
          })
          .catch(() => Swal.fire('Error!', 'Something went wrong while updating.', 'error'));
      }
    });
  };

  const UpdateInvocing = (invoice) => {
    navigate('/admin/AddInvoice', { state: { invoice } });
  };

  // Get current invoice data for the template (this will be hidden)
  const currentInvoiceData = page[0]; // Just for rendering the template, not visible

  return (
    <div className="p-4 m-3" style={{ backgroundColor: 'white', borderRadius: 10 }}>
      {/* Hidden invoice template - this is what we'll convert to PDF */}
      <div style={{ display: 'none' }}>
        {currentInvoiceData && (
          <InvoiceTemplate
            invoiceData={currentInvoiceData}
            companyInfo={companyInfo}
            refProp={invoiceRef}
          />
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2>Invoicing &amp; Billing</h2>
      </div>

      <div className={`row g-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-md-flex'}`}>
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">From</span>
            <input
              type="date"
              className="form-control border-start-0"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">To</span>
            <input
              type="date"
              className="form-control border-start-0"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="project-dropdown" className="w-100">
              {selectedProject}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedProject('All Projects')}>All Projects</Dropdown.Item>
              {[...new Set((invocing?.InvoicingBilling || []).map(inv => inv.projectId?.[0]?.projectName || 'N/A'))]
                .filter(v => v !== 'N/A')
                .map((projectName, i) =>
                  <Dropdown.Item key={i} onClick={() => setSelectedProject(projectName)}>{projectName}</Dropdown.Item>
                )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="client-dropdown" className="w-100 ms-2">
              {selectedClient}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedClient('All Clients')}>All Clients</Dropdown.Item>
              {[...new Set((invocing?.InvoicingBilling || []).map(inv => inv.clientId?.clientName || 'N/A'))]
                .filter(v => v !== 'N/A')
                .map((clientName, i) =>
                  <Dropdown.Item key={i} onClick={() => setSelectedClient(clientName)}>{clientName}</Dropdown.Item>
                )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Table hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort('invoiceNumber')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Invoice #</th>
            <th onClick={() => handleSort('project')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Project</th>
            <th onClick={() => handleSort('client')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Client Name</th>
            <th onClick={() => handleSort('amount')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Amount</th>
            <th onClick={() => handleSort('dueDate')} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {page.map((invoice, idx) => (
            <tr key={invoice._id || idx}>
              <td style={{ whiteSpace: 'nowrap' }}>{invoice.InvoiceNo || 'N/A'}</td>
              <td style={{ whiteSpace: 'nowrap' }}>{invoice.projectId?.[0]?.projectName || 'N/A'}</td>
              <td style={{ whiteSpace: 'nowrap' }}>{invoice.clientId?.clientName || 'N/A'}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                {invoice.currency || 'USD'} {Number(invoice.lineItems?.[0]?.amount || 0).toFixed(2)}
              </td>
              <td>{invoice.date ? new Date(invoice.date).toLocaleDateString('en-GB') : 'N/A'}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateInvocing(invoice)}>
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleDownloadPDF(invoice)}
                    disabled={isGeneratingPDF}
                  >
                    {isGeneratingPDF ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      <FaDownload />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
          <div className="text-muted small mb-2 mb-md-0">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </div>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Invoicing_Billing;