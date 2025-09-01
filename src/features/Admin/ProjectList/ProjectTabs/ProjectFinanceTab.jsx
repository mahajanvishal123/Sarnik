import React from 'react';
import PurchaseOrder from './PurchaseOrder';
import ReceivablePurchaseOrders from './ReceivablePurchaseOrders';
import Invoicing_Billing from '../../Invoicing_Billing/Invoicing_Billing';
import ProjectInvoiceBilling from './ProjectInvoiceBilling';

function ProjectFinanceTab({ projectNO, budget, purchaseOrders }) {
  return (
    <div className="row g-4">
   
      {/* Purchase Orders */}
      <div className="col-12">
      <PurchaseOrder projectNO={projectNO}/>
      </div>

      {/* Received POs Section */}
      <div className="col-12">
        <ReceivablePurchaseOrders projectNO={projectNO}/>
      </div>

      {/* Financial Summary Charts */}
      <div className="col-12">
       <ProjectInvoiceBilling projectNO={projectNO}/>
      </div>

    </div>
  );
}

export default ProjectFinanceTab;