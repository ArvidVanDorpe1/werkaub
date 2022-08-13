import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function About() {
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
        <h1>About this app</h1>
        <p>This is an app made with React and Node.js.</p>
        <p>In this app you can save all your prescious reminders.</p>
        <p>Because let us be honest, who has the time to think about them</p>
        <a
          className="gitLink"
          href="https://github.com/ArvidVanDorpe1/MernStackApp"
          target="_blank"
        >
          Explore the code on GitHub →
        </a>
      </section>
    </>
  );
}

export default About;
