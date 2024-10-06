import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import SuccessModal from "../utils/modal/SuccessModal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      await axios.post(`${process.env.REACT_APP_API_KEY}user/register`, formData);
      navigate("/login");
      toast.success("register successful!");
    } catch (error) {
        toast.error(`error :  ${error.message}`);
    }
  };
  return (
    <>
      <Navbar />
      <section className="bg-gray-50" style={{ marginTop: "8rem" }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 rounded-lg">
                <div className="card-body p-4 p-sm-5">
                  <h1 className="h2 mb-4 fw-bold text-gray-900 text-center">Create an account</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label text-gray-900">
                        Name
                      </label>
                      <input
                        // type="string"
                        className="form-control rounded-lg"
                        id="name"
                        name="name"
                        // value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label text-gray-900">
                        Your email
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
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label text-gray-900">
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
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="terms" required />
                      <label className="form-check-label text-gray-900" htmlFor="terms">
                        I accept the Terms and Conditions
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg rounded-lg w-100">
                      Create an account
                    </button>
                    <p className="mt-3 text-center">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary">
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
