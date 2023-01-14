import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './login-view.scss';
export const LoginView = ({onLoggedIn}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();
    
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
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("no such user");
            }
        })
        .catch((e)=>{
            alert("something went wrong!")
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
        <Button className="login-btn" type="submit">Sign in</Button>
      </Form>
      </div>

    );
  };