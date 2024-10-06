import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_KEY}user/signIn`, formData);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
        toast.error(`Login failed! Please check your credentials. ${error.message}` );
    }
  };

  return (
    <>
      <section class="h-100 gradient-form">
        <div class="container py-5 h-100">
          <div class="g-0 row justify-content-center">
            <div class="col-lg-6 card">
              <div class="card-body p-md-5 mx-md-4">
                <div class="text-center">
                  <img src={logo} alt="logo" style={{ width: "185px" }} />
                  <h4 class="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>

                <form onSubmit={handleSubmit}>
                  <p>Please login to your account</p>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example11">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-lg"
                      id="email"
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                      placeholder="name@abc.com"
                      required
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example22">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-lg"
                      id="password"
                      value={formData.password}
                      name="password"
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div class=" pt-1 mb-5 pb-1">
                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">
                      Log in
                    </button>
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <Link to="/signup">Create new</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
