import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (valid) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="loginContainer">
      <Navbar />
      <div className="videoContainer">
        <video loop autoPlay muted>
          <source src="/img/Login.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="formContainer">
        <div className="loginTitle">Ingresar</div>
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Correo electrónico"
            onChange={(ev) => setEmail(ev.target.value)}
            className="inputBox"
            type="email"
            aria-label="Correo electrónico"
            aria-required="true"
          />
          <label className="errorLabel" htmlFor="email">
            {emailError}
          </label>
        </div>
        <div className="inputContainer">
          <input
            value={password}
            placeholder="Ingresar contraseña"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
            type="password"
            aria-label="Contraseña"
            aria-required="true"
          />
          <div className="passwordExtras">
            <div className="forgotPassword">
              <Link to="/forgot-password" className="forgotPasswordLink">
                ¿Olvidaste la contraseña?
              </Link>
            </div>
            <div className="rememberMe">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Recuérdame
                </label>
              </div>
            </div>
          </div>
          <label className="errorLabel" htmlFor="password">
            {passwordError}
          </label>
        </div>
        <Button
          variant="primary"
          onClick={onButtonClick}
          className="loginButton"
        >
          Ingresar
        </Button>
        <div className="text-center">
          <p className="notMember">
            ¿No tienes usuario? <Link to="/register">Regístrate</Link>
          </p>
          <p className="orSignUp">o ingresar con</p>
          <div className="socialIcons">
            <ul className="list-inline">
              <li className="list-inline-item">
                <FaInstagram />
              </li>
              <li className="list-inline-item">
                <FaTwitter />
              </li>
              <li className="list-inline-item">
                <FaFacebook />
              </li>
              <li className="list-inline-item">
                <FaLinkedin />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
