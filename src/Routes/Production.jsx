import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../features/Layouts/Navbar.jsx";
import Sidebar from "../features/Layouts/Sidebar.jsx";
import Dashbord from '../features/Production/ProductionDashboard/Dashbord.jsx';
import Job_History from '../features/Production/ProductionJob_History/Job_History.jsx';
import ProjectList from '../features/Production/ProjectList/ProjectList.jsx';
import PickTask from '../features/Production/PickTask/PickTask.jsx';
import MyJobs from '../features/Production/ProductionJobs/MyJobs.jsx';
import ProtectedRoute from "../Protecuted/Protecuted.jsx";
import TimeLogs from '../features/Production/TimeLogs/TimeLogs.jsx';
import AddTimeLog from '../features/Production/TimeLogs/AddTimeLog.jsx';
import Notification from '../features/Production/Notiifcations/ProductionNotiifcations.jsx';
import Profile from '../features/Production/ProductionProfile/Profile.jsx';
import SettingsPage from '../features/Production/ProductionSettings/Settings.jsx';
import ChangePassword from '../features/Layouts/ChangePassword.jsx';
import UpdateProfile from '../features/Production/ProductionProfile/UpdateProfile.jsx';
import OvervieJobsTracker from '../features/Production/ProductionJobTracker/OvervieJobsTracker.jsx';
import Pluginss from '../assets/css/Pluginss/Pluginss.jsx';
import ProductionJobTrackers from '../features/Production/ProductionJobTrackers/ProductionJobTrackers.jsx';
import NewJobsList from '../features/Production/NewJobsList/NewJobsList.jsx';
import InProgress from '../features/Production/InProgress/InProgress.jsx';
import Completed_Jobs from '../features/Production/Completed_Jobs/Completed_Jobs.jsx';
import TimesheetWorklog from '../features/Production/TimesheetWorklog/TimesheetWorklog.jsx';



function Production() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();
  const hideLayout =
    location.pathname === "/" || location.pathname.toLowerCase() === "/signup";

  return (
    <div className="Main-App">
      {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}
      <div className={`Main-App-container ${hideLayout ? "no-sidebar" : ""}`}>
        {!hideLayout && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <div className="Main-App-Content">
          <Routes>
            <Route path="dashboard" element={<ProtectedRoute><Dashbord /></ProtectedRoute>} />
            <Route path="/jobhistory" element={<ProtectedRoute><Job_History /></ProtectedRoute>} />
            <Route path="/projectList" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
            <Route path="/picktask" element={<ProtectedRoute><PickTask /></ProtectedRoute>} />
            <Route path="/myJobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
            <Route path="/TimeTracking" element={<ProtectedRoute><TimeLogs /></ProtectedRoute>} />
            <Route path="/AddTimeLog" element={<ProtectedRoute><AddTimeLog /></ProtectedRoute>} />
            <Route path="/farhan" element={<ProtectedRoute><Pluginss/></ProtectedRoute>} />
            <Route path="/Notification" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
            <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/Settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/changePassword" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>} />
            <Route path="/UpdateProfile" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
            <Route path="/OvervieJobsTracker" element={<ProtectedRoute><OvervieJobsTracker/></ProtectedRoute>} />
            <Route path="/ProductionJobTrackers" element={<ProtectedRoute><ProductionJobTrackers/></ProtectedRoute>} />
            <Route path="/newJobsList" element={<ProtectedRoute><NewJobsList/></ProtectedRoute>} />
            <Route path="/inProgress" element={<ProtectedRoute><InProgress/></ProtectedRoute>} />
            <Route path="/completedJobs" element={<ProtectedRoute><Completed_Jobs/></ProtectedRoute>} />
            <Route path="/TimeTracking" element={<ProtectedRoute><TimeLogs/></ProtectedRoute>} />
            <Route path="/AddTimeLog" element={<ProtectedRoute><AddTimeLog/></ProtectedRoute>} />
            <Route path="/TimesheetWorklog" element={<ProtectedRoute><TimesheetWorklog/></ProtectedRoute>} />
            
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Production;
