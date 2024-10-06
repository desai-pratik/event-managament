import { useEffect, useState } from "react";
import Eventcard from "../../utils/Cards/Eventcard";
import { toast } from "react-toastify";

const OngoingEvent = () => {
  const [allOngoingEvents, setAllOngoingEvents] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/event/ongoingevent")
      .then((response) => response.json())
      .then((data) => setAllOngoingEvents(data.doc))
      .catch((error) => {
        toast.error(`error :  ${error.message}`);
      });
  }, []);

  if (allOngoingEvents?.length > 0) {
    return (
      <div class="container">
        <h1 class="text-center">Ongoing Events</h1>
        <hr class="hr hr-blurry" />
        <div class="row">
          {allOngoingEvents?.map((itm) => (
            <div class="col-lg-6 mt-2">
              <Eventcard
                eventName={itm.eventName}
                location={itm.location}
                date={itm.eventDate}
                img={itm.eventImageUrl}
                id={itm._id}
                isStanding={itm.isStanding}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>NO Data</h1>;
  }
};

export default OngoingEvent;
