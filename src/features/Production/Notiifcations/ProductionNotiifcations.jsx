// import React, { useState } from 'react';
// import { FaFileAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaUser, FaBell } from 'react-icons/fa';


// function Notiifcations() {
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       type: 'purchase',
//       title: 'New Purchase Order #PO-2024-089 requires your approval',
//       from: 'Client: ABC Corporation',
//       time: '2 hours ago',
//       read: false,
//       category: 'Today'
//     },
//     {
//       id: 2,
//       type: 'timesheet',
//       title: 'Timesheet submission reminder',
//       description: 'Please submit your timesheet for the week ending Jan 14',
//       time: '3 hours ago',
//       read: false,
//       category: 'Today'
//     },
//     {
//       id: 3,
//       type: 'project',
//       title: 'Project "Holiday Package Design" completed',
//       description: 'All deliverables have been approved',
//       time: 'Yesterday at 4:24 PM',
//       read: true,
//       category: 'Yesterday'
//     },
//     {
//       id: 4,
//       type: 'invoice',
//       title: 'Invoice #INV-2024-045 is overdue',
//       description: 'Payment was due on Jan 10, 2024',
//       time: 'Yesterday at 2:15 PM',
//       read: false,
//       category: 'Yesterday'
//     },
//     {
//       id: 5,
//       type: 'team',
//       title: 'New team member added to Project "Brand Guidelines"',
//       description: 'Sarah Johnson has joined as Junior Designer',
//       time: 'Jan 11, 2024',
//       read: false,
//       category: 'Earlier'
//     }
//   ]);

//   const [selectedCategory, setSelectedCategory] = useState('All Categories');

//   const markAllAsRead = () => {
//     setNotifications(notifications.map(notif => ({ ...notif, read: true })));
//   };

//   const removeNotification = (id) => {
//     setNotifications(notifications.filter(notif => notif.id !== id));
//   };

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case 'purchase':
//         return <FaFileAlt />;
//       case 'timesheet':
//         return <FaClock />;
//       case 'project':
//         return <FaCheckCircle />;
//       case 'invoice':
//         return <FaExclamationCircle />;
//       case 'team':
//         return <FaUser />;
//       default:
//         return <FaBell />;
//     }
//   };

//   const getNotificationClass = (type) => {
//     switch (type) {
//       case 'purchase':
//         return 'bg-primary bg-opacity-10';
//       case 'timesheet':
//         return 'bg-warning bg-opacity-10';
//       case 'project':
//         return 'bg-success bg-opacity-10';
//       case 'invoice':
//         return 'bg-danger bg-opacity-10';
//       case 'team':
//         return 'bg-info bg-opacity-10';
//       default:
//         return '';
//     }
//   };

//   const filteredNotifications = notifications.filter(notif =>
//     selectedCategory === 'All Categories' || notif.type === selectedCategory.toLowerCase()
//   );

//   const categories = ['All Categories', 'Purchase', 'Timesheet', 'Project', 'Invoice', 'Team'];

//   return (
//     <div className="container-fluid py-4">
//       <div className="notifications-container bg-white rounded shadow-sm p-4">
//         <div className="notification-header d-flex justify-content-between align-items-center mb-4">
//       <h3>Notiifcations</h3>
//           <div className="d-flex align-items-center">
//             <select
//               className="form-select me-3"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//           <button
//             className="btn btn-link text-decoration-none text-muted"
//             onClick={markAllAsRead}
//           >
//             Mark all as read
//           </button>
//         </div>

//         {['Today', 'Yesterday', 'Earlier'].map(category => {
//           const categoryNotifications = filteredNotifications.filter(n => n.category === category);
//           if (categoryNotifications.length === 0) return null;

//           return (
//             <div key={category} className="mb-4">
//               <h6 className="text-muted mb-3">{category}</h6>
//               {categoryNotifications.map(notification => (
//                 <div
//                   key={notification.id}
//                   className={`notification-card mb-3 p-3 bg-light rounded-3 position-relative ${!notification.read ? 'unread' : ''}`}
//                 >
//                   <div className="d-flex align-items-start">
//                     <div className={`notification-icon rounded-circle p-2 me-3 ${getNotificationClass(notification.type)}`}>
//                       <span className="fs-5">{getNotificationIcon(notification.type)}</span>
//                     </div>
//                     <div className="flex-grow-1">
//                       <h6 className="notification-title mb-1 fw-semibold">{notification.title}</h6>
//                       {notification.from && <p className="text-muted small mb-1">{notification.from}</p>}
//                       {notification.description && <p className="text-muted small mb-1">{notification.description}</p>}
//                       <span className="text-muted smaller d-block">{notification.time}</span>
//                     </div>
//                     <button
//                       className="btn-close position-absolute top-0 end-0 mt-2 me-2"
//                       onClick={() => removeNotification(notification.id)}
//                       aria-label="Close"
//                     ></button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Notiifcations;


import React, { useEffect, useMemo, useState } from "react";
import {
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaUser,
  FaBell,
} from "react-icons/fa";

// Notifiction code
import { initMessaging, getFcmToken, onForegroundMessage } from "../../../firebase";
import { saveToken , sendTestNotification } from "../../Admin/Notiifcations/api";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../../../redux/slices/Notifiction";
import dayjs from "dayjs";


const VAPID_KEY = "BBrmFxSoxxTJSvX7C4cMqpeNg437_GvbxC9pPQ6rjbtii8lR8iqHy8CfWo-BLVIu7TN53LobGEi6clH6rXSG-nw"; // Firebase Console → Cloud Messaging → Web configuration


function Notiifcations() {
  const dispatch = useDispatch()

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "purchase",
      title: "New Purchase Order #PO-2024-089 requires your approval",
      from: "Client: ABC Corporation",
      time: "2 hours ago",
      read: false,
      category: "Today",
    },
    {
      id: 2,
      type: "timesheet",
      title: "Timesheet submission reminder",
      description: "Please submit your timesheet for the week ending Jan 14",
      time: "3 hours ago",
      read: false,
      category: "Today",
    },
    {
      id: 3,
      type: "project",
      title: 'Project "Holiday Package Design" completed',
      description: "All deliverables have been approved",
      time: "Yesterday at 4:24 PM",
      read: true,
      category: "Yesterday",
    },
    {
      id: 4,
      type: "invoice",
      title: "Invoice #INV-2024-045 is overdue",
      description: "Payment was due on Jan 10, 2024",
      time: "Yesterday at 2:15 PM",
      read: false,
      category: "Yesterday",
    },
    {
      id: 5,
      type: "team",
      title: 'New team member added to Project "Brand Guidelines"',
      description: "Sarah Johnson has joined as Junior Designer",
      time: "Jan 11, 2024",
      read: false,
      category: "Earlier",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    image: "",
    name: "",
    scheduleOption: "now",
    date: "",
    time: "",
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "purchase":
        return <FaFileAlt />;
      case "timesheet":
        return <FaClock />;
      case "project":
        return <FaCheckCircle />;
      case "invoice":
        return <FaExclamationCircle />;
      case "team":
        return <FaUser />;
      default:
        return <FaBell />;
    }
  };

  const getNotificationClass = (type) => {
    switch (type) {
      case "purchase":
        return "bg-primary bg-opacity-10";
      case "timesheet":
        return "bg-warning bg-opacity-10";
      case "project":
        return "bg-success bg-opacity-10";
      case "invoice":
        return "bg-danger bg-opacity-10";
      case "team":
        return "bg-info bg-opacity-10";
      default:
        return "";
    }
  };

  const filteredNotifications = notifications.filter(
    (notif) =>
      selectedCategory === "All Categories" ||
      notif.type === selectedCategory.toLowerCase()
  );

  const categories = [
    "All Categories",
    "Purchase",
    "Timesheet",
    "Project",
    "Invoice",
    "Team",
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newNotification = {
      id: notifications.length + 1,
      type: "custom",
      title: formData.title,
      description: formData.text,
      time:
        formData.scheduleOption === "now"
          ? "Just now"
          : `${formData.date} at ${formData.time}`,
      read: false,
      category: "Today",
    };
    setNotifications([newNotification, ...notifications]);
    setShowModal(false);
    setFormData({
      title: "",
      text: "",
      image: "",
      name: "",
      scheduleOption: "now",
      date: "",
      time: "",
    });
  };


  // Notifiction code 
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("Hello Farhan 👋");
  const [body, setBody] = useState("This is a test notification Saaranik Project");

  useEffect(() => {
    (async () => {
      const messaging = await initMessaging();
      if (!messaging) {
        console.warn("FCM not supported in this browser.");
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn("Notification permission not granted");
        return;
      }

      // Get + Save token initially
      const t = await getFcmToken(VAPID_KEY);
      if (t) {
        setToken(t);
        await saveToken(t);

        // Client → SW fallback postMessage (optional; if you use clients.matchAll in SW)
        if (navigator.serviceWorker?.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: "NEW_FCM_TOKEN",
            token: t,
          });
        }
      }

      // Foreground message listener
      onForegroundMessage((payload) => {
        console.log("Foreground message:", payload);
        const { title, body, icon } = payload.notification || {};

        // Show browser native notification
        if (Notification.permission === "granted") {
          new Notification(title, {
            body,
            icon: icon || "/favicon.ico", // icon optional
          });
        }
      });


      // Simple token refresh strategy:
      // Re-check token on every load (and daily/interval if you want)
      const recheck = async () => {
        const newTok = await getFcmToken(VAPID_KEY);
        if (newTok && newTok !== token) {
          setToken(newTok);
          await saveToken(newTok);
          if (navigator.serviceWorker?.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: "NEW_FCM_TOKEN",
              token: newTok,
            });
          }
        }
      };
      const interval = setInterval(recheck, 24 * 60 * 60 * 1000); // daily
      return () => clearInterval(interval);
    })();
  }, []);


  const { Notifiction, loading, error } = useSelector((state) => state.notifiction);
  console.log("jjjjjj", Notifiction);

  useEffect(() => {
    dispatch(getAllNotifications())
  }, [dispatch])
  const groupedNotifications = useMemo(() => {
    if (!Notifiction?.notifications) return {};

    const today = dayjs().startOf("day");
    const yesterday = dayjs().subtract(1, "day").startOf("day");

    return Notifiction.notifications.reduce((acc, n) => {
      const notifDate = dayjs(n.date);

      let category = "Earlier";
      if (notifDate.isAfter(today)) {
        category = "Today";
      } else if (notifDate.isAfter(yesterday)) {
        category = "Yesterday";
      }

      if (!acc[category]) acc[category] = [];
      acc[category].push({
        id: n.id,
        title: n.title,
        description: n.body,
        time: n.ago,
        category,
      });

      return acc;
    }, {});
  }, [Notifiction]);

  return (
    <div className="container-fluid py-4">
      <div className="notifications-container bg-white rounded shadow-sm p-4">
        <div className="notification-header d-flex justify-content-between align-items-center mb-4">
          <h3>Notifications</h3>
          <div className="d-flex align-items-center">
          
            <button
              className="btn btn-primary me-3"
              onClick={() => setShowModal(true)}
              style={{ whiteSpace: 'nowrap' }}
            >
              Send Notification
            </button>
          
          </div>
        </div>

        <div>
          {["Today", "Yesterday", "Earlier"].map((category) => {
            const categoryNotifications = groupedNotifications[category] || [];
            if (categoryNotifications.length === 0) return null;

            return (
              <div key={category} className="mb-4">
                <h6 className="text-muted mb-3">{category}</h6>
                {categoryNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-card mb-3 p-3 bg-light rounded-3 position-relative`}
                  >
                    <div className="d-flex align-items-start">
                      <div
                        className={`notification-icon rounded-circle p-2 me-3`}
                      >
                        <span className="fs-5">🔔</span>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="notification-title mb-1 fw-semibold">
                          {notification.title}
                        </h6>
                        {notification.description && (
                          <p className="text-muted small mb-1">
                            {notification.description}
                          </p>
                        )}
                        <span className="text-muted smaller d-block">
                          {notification.time}
                        </span>
                        <span className="text-muted smaller d-block">
                          {notification.date}
                        </span>
                      </div>
                      <button
                        className="btn-close position-absolute top-0 end-0 mt-2 me-2"
                        onClick={() => console.log("Remove", notification.id)}
                        aria-label="Close"
                      ></button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content  text-dark">
              <div className="modal-header">
                <h5 className="modal-title">Send Notification</h5>
                <button
                  type="button"
                  className="btn-close btn-close-dark"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <label>Notification title</label>
                  <input className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />

                  <label>Notification text</label>
                  <textarea className="form-control mb-2" value={body} onChange={(e) => setBody(e.target.value)} />

                  <label>Notification image (optional)</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    className="form-control mb-2"
                  />

                  <label>Notification name (optional)</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="form-control mb-2"
                  />

                  <label>Scheduling</label>
                  <select
                    name="scheduleOption"
                    value={formData.scheduleOption}
                    onChange={handleFormChange}
                    className="form-select mb-2"
                  >
                    <option value="now">Now</option>
                    <option value="scheduled">Scheduled</option>
                  </select>

                  {formData.scheduleOption === "scheduled" && (
                    <div className="d-flex gap-2">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleFormChange}
                        className="form-control mb-2"
                      />
                    </div>
                  )}
                  <button
                    style={{ marginTop: 16 }}
                    onClick={async (e) => {
                      e.preventDefault();

                      setTimeout(() => {
                        dispatch(getAllNotifications());
                      }, 3000);

                      // null bhejne ka matlab hai -> sabhi tokens par send hoga
                      const res = await sendTestNotification(null, title, body);
                      console.log("Notification response:", res);
                      alert(`Sent to all tokens: ${res.successCount} success, ${res.failureCount} failed`);
                    }}
                    id="All_btn"
                    type="button"
                    className="btn btn-success w-100"
                  >
                    Send
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notiifcations;

