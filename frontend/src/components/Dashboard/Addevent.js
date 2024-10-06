import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Addevent = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    location: "",
    eventDetails: "",
    standingPrice: "",
    isStanding: false,
    vvipPrice: "",
    vvipMaxSeat: "",
    leftWingPrice: "",
    leftWingMaxSeat: "",
    rightWingPrice: "",
    rightWingMaxSeat: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      isStanding: !prevData.isStanding,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("eventName", formData.eventName);
    formDataToSend.append("eventDate", formData.eventDate);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("eventDetails", formData.eventDetails);
    formDataToSend.append("standingPrice", formData.standingPrice);
    formDataToSend.append("isStanding", formData.isStanding);

    if (!formData.isStanding) {
      formDataToSend.append("vvipPrice", formData.vvipPrice);
      formDataToSend.append("vvipMaxSeat", formData.vvipMaxSeat);
      formDataToSend.append("leftWingPrice", formData.leftWingPrice);
      formDataToSend.append("leftWingMaxSeat", formData.leftWingMaxSeat);
      formDataToSend.append("rightWingPrice", formData.rightWingPrice);
      formDataToSend.append("rightWingMaxSeat", formData.rightWingMaxSeat);
    }

    if (file) {
      formDataToSend.append("file", file);
    }

    try {
      const response = await axios.post("http://localhost:5000/event/addevent", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      setFormData({
        eventName: "",
        eventDate: "",
        location: "",
        eventDetails: "",
        standingPrice: "",
        isStanding: false,
        vvipPrice: "",
        vvipMaxSeat: "",
        leftWingPrice: "",
        leftWingMaxSeat: "",
        rightWingPrice: "",
        rightWingMaxSeat: "",
      });
      setFile(null);
      toast.success("Created event successful!");
    } catch (error) {
      alert("Error creating event");
      toast.error(`Error creating event. ${error.message}` );
    }
  };

  return (
    <div className="container">
      <img src="/images/nicholas-green-unsplash-blur.jpg" style={{objectFit: "cover"}} height="200px" width="100%" alt="back" />
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="eventName" className="form-label">
              Event Name
            </label>
            <input type="text" className="form-control" id="eventName" name="eventName" value={formData.eventName} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label htmlFor="eventDate" className="form-label">
              Event Date
            </label>
            <input type="date" className="form-control" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label htmlFor="eventDetails" className="form-label">
              Event Details
            </label>
            <input type="text" className="form-control" id="eventDetails" name="eventDetails" value={formData.eventDetails} onChange={handleChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="standingPrice" className="form-label">
              Standing Price
            </label>
            <input
              type="number"
              className="form-control"
              id="standingPrice"
              name="standingPrice"
              value={formData.standingPrice}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="file" className="form-label">
              Event Image
            </label>
            <input type="file" className="form-control" id="file" onChange={handleFileChange} />
          </div>
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="isStanding" checked={formData.isStanding} onChange={handleCheckboxChange} />
          <label className="form-check-label" htmlFor="isStanding">
            Is Standing Event?
          </label>
        </div>

        {!formData.isStanding && (
          <>
            <h5>VVIP Pricing</h5>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="vvipPrice" className="form-label">
                  VVIP Price
                </label>
                <input type="number" className="form-control" id="vvipPrice" name="vvipPrice" value={formData.vvipPrice} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="vvipMaxSeat" className="form-label">
                  VVIP Max Seat
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="vvipMaxSeat"
                  name="vvipMaxSeat"
                  value={formData.vvipMaxSeat}
                  onChange={handleChange}
                />
              </div>
            </div>
            <h5>Left Wing Pricing</h5>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="leftWingPrice" className="form-label">
                  Left Wing Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="leftWingPrice"
                  name="leftWingPrice"
                  value={formData.leftWingPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="leftWingMaxSeat" className="form-label">
                  Left Wing Max Seat
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="leftWingMaxSeat"
                  name="leftWingMaxSeat"
                  value={formData.leftWingMaxSeat}
                  onChange={handleChange}
                />
              </div>
            </div>
            <h5>Right Wing Pricing</h5>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="rightWingPrice" className="form-label">
                  Right Wing Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="rightWingPrice"
                  name="rightWingPrice"
                  value={formData.rightWingPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="rightWingMaxSeat" className="form-label">
                  Right Wing Max Seat
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="rightWingMaxSeat"
                  name="rightWingMaxSeat"
                  value={formData.rightWingMaxSeat}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default Addevent;
