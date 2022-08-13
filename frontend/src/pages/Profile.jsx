import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    return;
  }, [user, navigate, dispatch]);

  return (
    <>
      <section className="heading">
        <h1>Welkom {user && user.naam}</h1>
        <p>Profiel Dashboard</p>
      </section>
      <section className="userInfoContainer">
        <h2>Naam: {user && user.naam}</h2>
        <h2>Email: {user && user.email}</h2>
      </section>
    </>
  );
}

export default Profile;
