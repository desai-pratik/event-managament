import { useEffect, useState } from "react";
import Eventcard from "../../utils/Cards/Eventcard";
import { toast } from "react-toastify";

const UpcomingEvents = () => {
  const [allUpcomingEvents, setAllUpcomingEvents] = useState();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}event/upcomingevents`)
      .then((response) => response.json())
      .then((data) => setAllUpcomingEvents(data.doc))
      .catch((error) => toast.error(`error :  ${error.message}`));
  }, []);
  if (allUpcomingEvents?.length > 0) {
    return (
      <div class="container">
        <h1 class="text-center">Upcoming Events</h1>
        <hr class="hr hr-blurry" />
        <div class="row">
          {allUpcomingEvents?.map((itm) => (
            <div class="col-lg-6 mt-2">
              <Eventcard eventName={itm.eventName} location={itm.location} date={itm.eventDate} img={itm.eventImageUrl} id={itm._id} />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>NO Data</h1>;
  }
};

export default UpcomingEvents;
