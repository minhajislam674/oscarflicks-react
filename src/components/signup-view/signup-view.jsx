import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup-view.scss';
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const signupSuccess = () => toast.success("Sign up successful! Please log in to continue!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light"
  });

  const signupError = () => toast.error("Signup failed!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light"
  });

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
    
        const data = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        };
    
        fetch("https://myflix-movies.onrender.com/users/", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if (response.ok) {
            signupSuccess();
            setTimeout(() => {
              window.open('/login', '_self');
            }, 2000);
            
          } else {
            setIsLoading(false);
            signupError();
          }
        });
      };

    return (
      <>
        <div className="sign-up-container"> 

          <Form className="signup-form-container" onSubmit={handleSubmit}>
            <h2> Sign up now</h2>
            <FormGroup className="form-group">
              <FormLabel className="form-label">Username: </FormLabel>
              <FormControl
                className="form-control"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                />
            </FormGroup>
            <FormGroup className="form-group">
              <FormLabel className="form-label">Password: </FormLabel>
              <FormControl
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </FormGroup>
            <FormGroup className="form-group">
              <FormLabel className="form-label">Email: </FormLabel>
              <FormControl
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </FormGroup>
            <FormGroup className="form-group">
              <FormLabel className="form-label">Date of Birth: </FormLabel>
              <FormControl
                className="form-control"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                />
            </FormGroup>
            <Button
              className="signup-btn"
              type="submit"
              disabled={isLoading}
              >
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> 
              ) : (
                "Sign up"
              )}
            </Button>
            </Form>
        </div>

      </>


    );
  };