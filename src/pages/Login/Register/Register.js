import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { updateCurrentUser } from "firebase/auth";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { createUser, updateUserProfile, sendVerificationEmail } = useContext(AuthContext);
  const [accepted, setAccepted] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((retust) => {
        const user = retust.user;
        console.log(user);
        form.reset();
        navigate("/login");
        setError("");
        handleUpdateUserProfile(name, photoURL)
        handleEmailVerification()
        toast.success('Please verify your email address.')

      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const handleUpdateUserProfile = (name, photoURL)=>{
    const profile = {
        displayName: name,
        photoURL: photoURL,
    }
    updateUserProfile(profile)
    .then(()=>{})
    .catch(error => console.error(error))
  }

  const handleAccept =(event)=>{
    setAccepted(event.target.checked);
  }

  const handleEmailVerification =()=>{
    sendVerificationEmail()
    .then(()=>{})
    .catch(error => console.error(error))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter Your Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>photoURL</Form.Label>
        <Form.Control
          type="text"
          name="photoURL"
          placeholder="Enter Your photoURL"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check 
        type="checkbox" 
        onClick={handleAccept}
        
        label={<>Accept <Link to="/trams">Terms and Condition</Link> </> }
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!accepted}>
        Register
      </Button>

      <Form.Text className="text-danger">{error}</Form.Text>
    </Form>
  );
};

export default Register;
