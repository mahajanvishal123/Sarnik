// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import ProjectsReducer from './slices/ProjectsSlice';
import jobsReducer from "./slices/JobsSlice"
import ClientReducer from "../redux/slices/ClientSlice"
import userReducer from "../redux/slices/userSlice"
import costEstimatesReducer from "../redux/slices/costEstimatesSlice"
import receivablePurchaseReducer from "../redux/slices/receivablePurchaseSlice"
import TimeLogsReducer from "../redux/slices/TimeLogsSlice"
import TimesheetWorklogReducer from "../redux/slices/TimesheetWorklogSlice"
import InvoicingBillingReducer from "../redux/slices/InvoicingBillingSlice"
import AssignReducer from "../redux/slices/AssignSlice"
import ReportsReducer from "../redux/slices/ReportsSlice"
// Employee
import MyJobsReducer from "../redux/slices/Employee/MyJobsSlice"

import notifictionReducer from "../redux/slices/Notifiction"
export const store = configureStore({
  reducer: {
    projects:ProjectsReducer,
    jobs:jobsReducer,
    client:ClientReducer,
    user:userReducer,
    costEstimates:costEstimatesReducer,
    receivablePurchases: receivablePurchaseReducer,
    TimeLogss: TimeLogsReducer,
    TimesheetWorklogs:TimesheetWorklogReducer,
    InvoicingBilling:InvoicingBillingReducer,
    Assign:AssignReducer,
    reportss:ReportsReducer,
    //Employee
    MyJobs:MyJobsReducer,

    notifiction:notifictionReducer,
}
});
