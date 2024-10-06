import React from "react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "../style.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav class={`navbar navbar-expand-lg mt-0 ${offset < 90 ? "fixed-top" : "bg-dark fixed-top"}`}>
        <div class="container">
          <a class="navbar-brand text-white " href="index.html">
            <img src={logo} alt="" style={{ height: "6rem", width: "10rem" }} />
          </a>
          <Link to="/dashboard" class="btn custom-btn d-lg-none ms-auto me-4">
            Buy Ticket
          </Link>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
            </ul>
            <Link to="/dashboard" class="btn custom-btn d-lg-block d-none">
              Buy Ticket
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
