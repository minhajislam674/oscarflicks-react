import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import './signup-view.scss';
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    
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
            alert("Signup successful");
            window.location.reload();
          } else {
            alert("Signup failed");
          }
        });
      };

    return (
      <>
        <div className="sign-up-container"> 
          <h2> Don't have an account?</h2>
          <span>Sign up with your email and password</span>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Username: </FormLabel>
              <FormControl
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password: </FormLabel>
              <FormControl
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email: </FormLabel>
              <FormControl
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </FormGroup>
            <FormGroup>
              <FormLabel>Date of Birth: </FormLabel>
              <FormControl
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                />
            </FormGroup>
            <Button className="signup-btn" type="submit">Submit</Button>
            </Form>
        </div>

      </>


    );
  };