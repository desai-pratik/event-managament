import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { toast } from "react-toastify";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}event/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEventDetails(data.doc);
      })
      .catch((err) => toast.error(`error :  ${err.message}`));
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${process.env.REACT_APP_API_KEY}event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 204) {
        toast.success("Event deleted successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Failed to delete the event");
      }
    } catch (error) {
        toast.error(`Error deleting event: ${error.message}`);
    }
  };

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="450"
        image="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_22/1725706/katy-perry-kb-main-210601.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {eventDetails?.eventName}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              Location
            </Grid>
            <Grid item xs={6}>
              {eventDetails?.location}
            </Grid>
          </Grid>
        </Box>
        <Box class="pt-2" sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              Event Date
            </Grid>
            <Grid item xs={6}>
              {eventDetails?.eventDate}
            </Grid>
          </Grid>
        </Box>

        {eventDetails?.isStanding === true ? (
          <>
            <p class="text-center pt-2">Standing Show</p>
            <Box className="mt-2" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  Price
                </Grid>
                <Grid item xs={6}>
                  Rs.{eventDetails?.standingPrice}
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <p class="text-center pt-4">Table Show</p>
            <h5>VVIP</h5>
            <Box className="mt-2" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  Price
                </Grid>
                <Grid item xs={6}>
                  Rs.{eventDetails?.vvip?.price}
                </Grid>
              </Grid>
            </Box>
            <Box className="mt-2" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  Max Seat
                </Grid>
                <Grid item xs={6}>
                  {eventDetails?.vvip?.maxSeat}
                </Grid>
              </Grid>
            </Box>
            <h5 class="mt-3">Left Wing</h5>
            <Box className="mt-2" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  Price
                </Grid>
                <Grid item xs={6}>
                  Rs.{eventDetails?.leftWing?.price}
                </Grid>
              </Grid>
            </Box>
            <Box className="mt-2" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  Max Seat
                </Grid>
                <Grid item xs={6}>
                  {eventDetails?.leftWing?.maxSeat}
                </Grid>
              </Grid>
            </Box>
            <h5 class="mt-3">Right Wing</h5>
            <Box className="mt-2" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  Price
                </Grid>
                <Grid item xs={6}>
                  Rs.{eventDetails?.rightWing?.price}
                </Grid>
              </Grid>
            </Box>
            <Box className="mt-2" sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  Max Seat
                </Grid>
                <Grid item xs={6}>
                  {eventDetails?.rightWing?.maxSeat}
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/dashboard/edit/${id}`)}>
          Edit
        </Button>
        <Button size="small" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
export default EventDetails;
