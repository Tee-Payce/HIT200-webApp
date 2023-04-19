import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export function Registerscreen() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // function register() {
  //   alert("The form was submitted");
  // }
  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [studentID, setStudentid] = useState("");
  const [password, setPassword] = useState("");

  const postDetails = (e: any) => {
    e.preventDefault();
    AuthService.register({
      fname: fname,
      sname: sname,
      studentID: studentID,
      password: password,
      role: "user",
    }).then((response) => {
      console.log(response.data);
      setLoading(false);
      navigate("/login");
    });
  };

  return (
    <>
      <img
        className="headerimg mx-auto h-8 w-8"
        src={"/imgs/lock2.png"}
        alt="login"
      />
      <div className="header-col text-dark">
        <h3 style={{ justifyContent: "top" }}>sign up your account</h3>
      </div>
      <div className="boxx1 ">
        <Form>
          <Form.Group className="row mb-3" controlId="formBasicUsername">
            <Form.Label className="text-dark">First Name</Form.Label>
            <Form.Control
              onChange={(e) => setFname(e.target.value)}
              className="bg-light"
              type="text"
              placeholder="Enter your first name"
              aria-required
            />
          </Form.Group>
          <Form.Group className="row mb-3" controlId="formBasicSurname">
            <Form.Label className="text-dark">Surname</Form.Label>
            <Form.Control
              onChange={(e) => setSname(e.target.value)}
              className="bg-light"
              type="text"
              placeholder="Enter your surname"
              required
            />
          </Form.Group>
          <Form.Group className="row mb-3" controlId="formBasicID">
            <Form.Label className="text-dark">Student ID</Form.Label>
            <Form.Control
              onChange={(e) => setStudentid(e.target.value)}
              className="bg-light"
              type="text"
              placeholder="enter Student ID"
              aria-required
            />
          </Form.Group>

          <Form.Group className="row mb-3" controlId="formBasicPassword">
            <Form.Label className="text-dark">Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              className="bg-light"
              type="password"
              placeholder="Password"
              aria-required
            />
          </Form.Group>
          <Form.Group className="row mb-3" controlId="formBasicPassword">
            <Form.Label className="text-dark">Confirm Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              className="bg-light"
              type="password"
              placeholder="Re-enter Password"
              aria-required
            />
          </Form.Group>
          <Button onClick={postDetails} variant="primary w-100">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
