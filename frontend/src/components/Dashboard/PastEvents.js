import { useEffect, useState } from 'react'
import Eventcard from '../../utils/Cards/Eventcard';

const PastEvents = () => {
    const [allPastEvents, setAllPastEvents] = useState();
    useEffect(() => {
        fetch("http://localhost:5000/event/pastevents")
            .then((response) => response.json())
            .then((data) => setAllPastEvents(data.doc))
            .catch((error) => console.log(error));
    }, []);
    if (allPastEvents?.length > 0) {
        return (
            <div class="container">
                <h1 class="text-center" >Past Events</h1>
                <hr class="hr hr-blurry" />
                <div class='row'>
                    {allPastEvents?.map(itm => (
                        <div class="col-lg-6 mt-2" >
                            <Eventcard eventName={itm.eventName} location={itm.location} date={itm.eventDate} img={itm.eventImageUrl} id={itm._id} isStanding={itm.isStanding} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    else {
        return (
            <h1>NO Data</h1>
        )
    }
}

export default PastEvents