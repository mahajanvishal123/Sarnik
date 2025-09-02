import React, { useEffect, useState } from 'react';
import ProjectOverviewTab from './ProjectTabs/ProjectOverviewTab';
import ProjectJobsTab from './ProjectTabs/ProjectJobsTab';
import ProjectFinanceTab from './ProjectTabs/ProjectFinanceTab';
import ProjectDocumentsTab from './ProjectTabs/ProjectDocumentsTab';
import ProjectTeamTab from './ProjectTabs/ProjectTeamTab';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProjectOverview() {
  const location = useLocation();
  const { id, openTab, projectDatah, projectNo, projectName, clientName } = location.state || {};
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openTab) {
      setActiveTab(location.state.openTab);
    }
  }, [location.state]);

  // 定义状态样式函数
  const getStatusClass = (status) => {
    switch (status) {
      case 'Active Project':
        return 'bg-success';
      case 'Completed':
        return 'bg-primary';
      case 'On Hold':
        return 'bg-warning text-dark';
      case 'Cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  // 修改处理编辑的函数，确保传递projectDatah
  const handleUpdate = (project) => {
    navigate(`/admin/AddProjectList`, { state: { project: project || projectDatah } });
  };

  const projectData = {
    title: 'Saaranik',
    projectId: '0001',
    client: 'Tesco PLC',
    progress: 60,
    daysRemaining: 45,
    dueDate: 'Jan 30, 2025',
    budget: {
      status: '15',
      isUnderBudget: true,
      estimated: '',
      actual: ''
    },
    teamSize: 8,
    jobList: [
      { phase: 'Design Phase', status: 'Complete', type: 'UI/UX Design' },
      { phase: 'Development', status: 'In Progress', type: 'Frontend & Backend' },
      { phase: 'Testing', status: 'Pending', type: 'QA & UAT' }
    ],
    recentActivity: [
      { action: 'Design phase completed', time: '2 hours ago' },
      { action: 'New purchase order created', time: 'Yesterday' },
      { action: 'New team member added', time: '2 days ago' }
    ],
    teamMembers: [
      { name: 'Sarah Johnson', role: 'Project Manager' },
      { name: 'Michael Chen', role: 'Lead Developer' },
      { name: 'Emily Wilson', role: 'UI/UX Designer' }
    ],
    purchaseOrders: {
      received: 3,
      issued: 5,
      totalValue: '$35,000'
    }
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverviewTab projectData={projectData} />;
      case 'jobs':
        return <ProjectJobsTab jobList={projectData.jobList} />;
      case 'finance':
        return <ProjectFinanceTab projectNO={projectDatah?._id} budget={projectData.budget} purchaseOrders={projectData.purchaseOrders} />;
      case 'documents':
        return <ProjectDocumentsTab />;
      case 'team':
        return <ProjectTeamTab teamMembers={projectData.teamMembers} />;
      default:
        return <ProjectOverviewTab projectData={projectData} />;
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Project Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h4 className="mb-1">{projectDatah?.projectNo}-{projectDatah?.projectName}</h4>
          <div className="text-muted">
            Client: {projectDatah?.clientId?.clientName}
          </div>
        </div>
        <div className="mt-3 mt-md-0 d-flex flex-wrap gap-2 justify-content-md-end">
          <Link to="/admin/projectList">
            <button className="btn btn-outline-secondary">← Back to Projects</button>
          </Link>
        </div>
      </div>

      {/* Tabs for Desktop */}
      <ul className="nav nav-tabs mb-4 d-none d-md-flex">
        {['overview', 'jobs', 'finance', 'documents', 'team'].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ color: "#0d6efd", borderColor: "#0d6efd" }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Dropdown for Mobile */}
      <div className="d-block d-md-none mb-4">
        <div className="dropdown">
          <button
            className="btn btn-outline-primary dropdown-toggle w-100"
            type="button"
            id="tabDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </button>
          <ul className="dropdown-menu w-100" aria-labelledby="tabDropdown">
            <li>
              <button className="dropdown-item" onClick={() => setActiveTab('overview')}>Overview</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => setActiveTab('jobs')}>Jobs</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => setActiveTab('finance')}>Finance</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => setActiveTab('documents')}>Documents</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => setActiveTab('team')}>Team</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Project Details Table */}
      <div className="mb-4">
        <h5 className="mb-3">Project Details</h5>
        <Table responsive className="project-table">
          <thead>
            <tr>
              <th style={{ whiteSpace: 'nowrap' }}>Project No</th>
              <th style={{ textWrap: 'nowrap' }}>Project Name</th>
              <th style={{ whiteSpace: 'nowrap' }}>Start Date</th>
              <th style={{ whiteSpace: 'nowrap' }}>End Date</th>
              <th>Client</th>
              <th style={{ whiteSpace: 'nowrap' }}>Project Requirements</th>
              <th style={{ whiteSpace: 'nowrap' }}>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectDatah && (
              <tr>
                <td>{projectDatah.projectNo}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{projectDatah.projectName}</td>
                <td>
                  {projectDatah.startDate
                    ? new Date(projectDatah.startDate).toLocaleDateString('en-GB').replace(/\/20/, '/')
                    : 'N/A'}
                </td>
                <td>
                  {projectDatah.endDate
                    ? new Date(projectDatah.endDate).toLocaleDateString('en-GB').replace(/\/20/, '/')
                    : 'N/A'}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{projectDatah?.clientId?.clientName || 'N/A'}</td>
                <td>
                  {projectDatah.projectRequirements && projectDatah.projectRequirements.length > 0
                    ? Object.entries(projectDatah.projectRequirements[0])
                      .filter(([_, value]) => value === true)
                      .map(([key]) => key)
                      .join(', ')
                    : 'N/A'}
                </td>
                <td>{projectDatah.projectPriority || 'N/A'}</td>
                <td>
                  <span className={`badge ${getStatusClass(projectDatah.status)} px-2 py-1`}>
                    {projectDatah.status || 'N/A'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons d-flex">
                    {/* 修改这里：传递projectDatah参数 */}
                    <Button
                      style={{ color: "#0d6efd" }}
                      variant="link"
                      className="p-0 me-2"
                      onClick={() => handleUpdate(projectDatah)}
                    >
                      <FaEdit />
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProjectOverview;