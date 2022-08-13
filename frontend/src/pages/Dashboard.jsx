import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EventForm from "../components/EventForm.jsx";
import Spinner from "../components/Spinner";
import { getEvents, reset } from "../features/events/eventSlice";
import EventItem from "../components/EventItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      console.log(user);
      dispatch(getEvents());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.naam}</h1>
        <p>Reminder Dashboard</p>
      </section>
      <EventForm />
      <section className="content">
        {events.length > 0 ? (
          <div className="events">
            {events.map((event) => (
              <EventItem key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <h3>No Reminders have been added yet!</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
