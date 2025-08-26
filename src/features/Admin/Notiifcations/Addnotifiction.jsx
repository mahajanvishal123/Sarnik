import React, { useState } from "react";

function Addnotifiction() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    image: "",
    name: "",
    scheduleOption: "now",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notification Data:", formData);
    alert("Notification Scheduled!");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", background: "#1e1e1e", color: "#fff", borderRadius: "10px" }}>
      <h2>Notification</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <label>Notification title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          style={inputStyle}
        />

        {/* Text */}
        <label>Notification text</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Enter text"
          style={inputStyle}
        />

        {/* Image */}
        <label>Notification image (optional)</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://yourapp.com/image.png"
          style={inputStyle}
        />

        {/* Name */}
        <label>Notification name (optional)</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          style={inputStyle}
        />

        {/* Scheduling */}
        <h3>Scheduling</h3>
        <select
          name="scheduleOption"
          value={formData.scheduleOption}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="now">Now</option>
          <option value="scheduled">Scheduled</option>
        </select>

        {formData.scheduleOption === "scheduled" && (
          <>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={inputStyle}
            />
          </>
        )}

        <button type="submit" style={btnStyle}>Send Notification</button>
      </form>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "5px",
  border: "1px solid #444",
  background: "#2a2a2a",
  color: "#fff"
};

const btnStyle = {
  padding: "10px 15px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px"
};

export default Addnotifiction;
