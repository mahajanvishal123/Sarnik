import ProjectInvoiceBilling from "../../../Production/ProjectList/ProjectTabs/ProjectInvoiceBilling";
import PurchaseOrder from "../../../Production/ProjectList/ProjectTabs/PurchaseOrder";
import ReceivablePurchaseOrders from "../../../Production/ProjectList/ProjectTabs/ReceivablePurchaseOrders";


function ProjectFinanceTab({ projectNO, budget, purchaseOrders }) {
  return (
    <div className="row g-4">

      {/* Purchase Orders */}
      <div className="col-12">
        <PurchaseOrder projectNO={projectNO} />
      </div>

      {/* Received POs Section */}
      <div className="col-12">
        <ReceivablePurchaseOrders projectNO={projectNO} />
      </div>

      {/* Financial Summary Charts */}
      <div className="col-12">
        <ProjectInvoiceBilling projectNO={projectNO} />
      </div>

    </div>
  );
}

export default ProjectFinanceTab;