import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './login-view.scss';
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const LoginView = ({onLoggedIn}) => {
  

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const logInToastSuccess = () => toast.success("Log in successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light"
    });
    const logInToastError = () => toast.error("Couldn't log in", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light"
    });
    const logInToastWarning = () => toast.warn("Incorrect username or password", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light"
    });

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();
        setIsLoading(true);
    
        const data = {
            Username : username,
            Password : password
        };
    
        fetch("https://myflix-movies.onrender.com/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
                logInToastSuccess();
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
                
            } else {
                logInToastWarning();
                setIsLoading(false);
            }
        })
        .catch((e)=>{
            logInToastError();
            setIsLoading(false);
            
        })
    };

    return (
      <div className="login-form-container">
      <h2> Log in</h2>            
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" controlId="formUsername">
          <Form.Label className="form-label">Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e)=> setUsername(e.target.value)}
            required
             />

        </Form.Group>

        <Form.Group className="form-group" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e)=> setPassword(e.target.value)}
            required
            />
        </Form.Group>
        <Button 
          className="login-btn" 
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
            "Sign in"
          )}
        </Button>
        <p> Already a member? <Link to={`/register`}> Sign in</Link></p>
      </Form>
      <ToastContainer />
      </div>

    );
  };