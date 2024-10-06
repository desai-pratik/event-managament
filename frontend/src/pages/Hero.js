import React from "react";
import Navbar from "../components/Navbar";
import "../style.css";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <Navbar />
      <section class="hero-section" id="section_1">
        <div class="section-overlay"></div>

        <div class="container d-flex justify-content-center align-items-center">
          <div class="col-12 mb-5 text-center">
            <small>Event Management</small>

            <h1 class="text-white mb-5">Night Live 2024</h1>

            <Link class="btn custom-btn smoothscroll" to="/dashboard">
              Let's begin
            </Link>
          </div>
        </div>

        <div class="video-wrap">
          <video autoPlay loop muted class="custom-video" poster="">
            <source src="video/pexels-2022395.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </>
  );
};

export default Hero;
