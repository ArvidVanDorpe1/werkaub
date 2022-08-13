import React from "react";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../features/events/eventSlice";
import { GrFormClose } from "react-icons/gr";

function EventItem({ event }) {
  const dispatch = useDispatch();

  return (
    <div className="event">
      <div>{new Date(event.createdAt).toLocaleString("nl-BE")}</div>
      <h2>{event.naam}</h2>
      <button
        className="close"
        onClick={() => dispatch(deleteEvent(event._id))}
      >
        <GrFormClose />
      </button>
    </div>
  );
}

export default EventItem;
