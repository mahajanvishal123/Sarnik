import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { OverviewProject } from '../../../../redux/slices/ProjectsSlice';

function ProjectOverviewTab({ projectData }) {
  const location = useLocation();
  const params = useParams();
  const id = location.state?.id || params.id;
  const dispatch = useDispatch()

  const { Overviewproject, loading, error } = useSelector((state) => state.projects);
  console.log("overview", Overviewproject);
 
  useEffect(() => {
    dispatch(OverviewProject(id));
  }, [dispatch]);

  return (
    <div className="row g-4">
      {/* Metrics Cards */}
      <div className="col-md-3">
        <div className="card h-100">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">In Progress</h6>
            <h2 className="card-title mb-0" >{Overviewproject?.inProgressJobs}</h2>
            <div className="progress mt-2" style={{ height: '4px' }}>
              <div
                id='All_btn'
                className="progress-bar"
                role="progressbar"
                style={{ width: `${Overviewproject?.progress}%` }}
                aria-valuenow={Overviewproject?.progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card h-100">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Days Remaining</h6>
            <h2 className="card-title mb-0">{Overviewproject?.daysRemaining}</h2>
            <p className="card-text text-muted">
              Due: {new Date(Overviewproject?.dueDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'numeric', year: '2-digit' })}
            </p>

          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card h-100">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Jobs Due Today</h6>
            <h2 className={`card-title mb-0 ${projectData.budget.isUnderBudget ? 'text-success' : 'text-danger'}`}>
              {Overviewproject?.jobsDueToday}
            </h2>
            <p className="card-text text-muted">{projectData.budget.actual}</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card h-100">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Total Hours</h6>
            <h2 className="card-title mb-0">{Overviewproject?.totalHours}</h2>
            <p className="card-text text-muted">Logged</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="col-md-6">
        <div className="card h-100">
          <div className="card-header">
            <h5 className="card-title mb-0">Recent Activity</h5>
          </div>
          <div className="card-body">
            <div className="list-group list-group-flush">

              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">Design phase completed</h6>
                  <small className="text-muted">{Overviewproject?.recentActivity?.completedJob}</small>
                </div>
              </div>
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">New purchase order created</h6>
                  <small className="text-muted">{Overviewproject?.recentActivity?.purchaseOrderCreated}</small>
                </div>
              </div>
              <div className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">New team member added</h6>
                  <small className="text-muted">{Overviewproject?.recentActivity?.assignment}</small>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Purchase Orders Summary */}
      <div className="col-md-6">
        <div className="card h-100">
          <div className="card-header">
            <h5 className="card-title mb-0">Purchase Orders</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-4">
                <div className="text-center">
                  <h3 className="mb-1">{Overviewproject?.purchaseOrders?.received}</h3>
                  <div className="text-muted">Received</div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <h3 className="mb-1">{Overviewproject?.purchaseOrders?.issued}</h3>
                  <div className="text-muted">Issued</div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <h3 className="mb-1">{Overviewproject?.purchaseOrders?.totalValue}$</h3>
                  <div className="text-muted">Total Value</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectOverviewTab;