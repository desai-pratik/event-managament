import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Routes, Route, Link } from "react-router-dom";
import Addevent from "./Addevent";
import UpcomingEvents from "./UpcomingEvents";
import PastEvents from "./PastEvents";
import OngoingEvent from "./OngoingEvent";
import EventDetails from "../../utils/Cards/EventDetail";
import EditEvent from "./EditEvent";

function ResponsiveDrawer() {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-light border-right" style={{ width: "240px", height:"100vh"}}>
        <div className="sidebar-title text-center">
          <h4 className="p-3">Event Dashboard</h4>
        </div>
        <nav className="nav flex-column p-2">
          <Link className="nav-link" to="/dashboard/addevent">
            Add Event
          </Link>
          <Link className="nav-link" to="/dashboard/upcomingevent">
            Upcoming Events
          </Link>
          <Link className="nav-link" to="/dashboard/pastevent">
            Past Events
          </Link>
          <Link className="nav-link" to="/dashboard/ongoingevent">
            Ongoing Events
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 overflow-auto">
        <Routes>
          <Route path="/" element={<Addevent />} />
          <Route path="addevent" element={<Addevent />} />
          <Route path="upcomingevent" element={<UpcomingEvents />} />
          <Route path="pastevent" element={<PastEvents />} />
          <Route path="ongoingevent" element={<OngoingEvent />} />
          <Route path=":id" element={<EventDetails />} />
          <Route path="edit/:id" element={<EditEvent />} />
        </Routes>
      </div>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
