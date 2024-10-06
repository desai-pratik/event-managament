import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    location: "",    
    eventDate: "", 
    isStanding: false,
    standingPrice: 0,
    vvip: { price: 0, maxSeat: 0 },
    leftWing: { price: 0, maxSeat: 0 },
    rightWing: { price: 0, maxSeat: 0 },
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/event/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEventDetails(data.doc);
      })
      .catch((err) => toast.error(`Error : ${err.message}`));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("vvip.") || name.startsWith("leftWing.") || name.startsWith("rightWing.")) {
      const [group, field] = name.split(".");
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        [group]: { ...prevDetails[group], [field]: value }, 
      }));
    } else {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(`http://localhost:5000/event/${id}`, eventDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/dashboard/"+id);
      toast.success("Event Edit successfully!");
    } catch (error) {
      toast.error(`Failed to delete the ${error.message}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Event Name"
          name="eventName"
          value={eventDetails.eventName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={eventDetails.location}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Event Date"
          type="date"
          name="eventDate"
          value={eventDetails.eventDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Standing Price"
          type="number"
          name="standingPrice"
          value={eventDetails.standingPrice}
          onChange={handleChange}
          margin="normal"
        />
        {/* Nested fields for VVIP */}
        <Typography variant="h6" gutterBottom>
          VVIP Seating
        </Typography>
        <TextField
          fullWidth
          label="VVIP Price"
          type="number"
          name="vvip.price"
          value={eventDetails.vvip.price}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="VVIP Max Seat"
          type="number"
          name="vvip.maxSeat"
          value={eventDetails.vvip.maxSeat}
          onChange={handleChange}
          margin="normal"
        />
        
        {/* Nested fields for Left Wing */}
        <Typography variant="h6" gutterBottom>
          Left Wing Seating
        </Typography>
        <TextField
          fullWidth
          label="Left Wing Price"
          type="number"
          name="leftWing.price"
          value={eventDetails.leftWing.price}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Left Wing Max Seat"
          type="number"
          name="leftWing.maxSeat"
          value={eventDetails.leftWing.maxSeat}
          onChange={handleChange}
          margin="normal"
        />

        <Typography variant="h6" gutterBottom>
          Right Wing Seating
        </Typography>
        <TextField
          fullWidth
          label="Right Wing Price"
          type="number"
          name="rightWing.price"
          value={eventDetails.rightWing.price}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Right Wing Max Seat"
          type="number"
          name="rightWing.maxSeat"
          value={eventDetails.rightWing.maxSeat}
          onChange={handleChange}
          margin="normal"
        />
        
        <Button variant="contained" color="primary" type="submit">
          Update Event
        </Button>
      </form>
    </Box>
  );
};

export default EditEvent;
