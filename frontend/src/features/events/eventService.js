import axios from "axios";

const API_URL = "http://localhost:8000/api/events/";

const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, eventData, config);
  return res.data;
};

const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //const res = await axios.get(API_URL + "getClubs");
  const res = await axios.get(API_URL, config);
  return res.data;
};

const deleteEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(API_URL + eventId, config);
  return res.data;
};

const eventService = {
  createEvent,
  getEvents,
  deleteEvent,
};
export default eventService;
