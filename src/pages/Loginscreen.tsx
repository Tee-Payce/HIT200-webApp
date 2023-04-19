import { useState } from "react";
import { Button, Container, Form, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export function Loginscreen() {
  const navigate = useNavigate();
  const [studentID, setStudentid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const postData = (e: any) => {
    e.preventDefault();
    AuthService.login({ studentID: studentID, password: password }).then(
      (response: any) => {
        console.log(response.data);
        localStorage.setItem("user-token", response.data.token);
        setLoading(false);
        //  if status is 200 and role is user navigate to user dashboard
        if (response.status === 200 && response.data.role === "user") {
          navigate("/home");
        }
      }
    );
  };

  return (
    <>
      <img
        className="headerimg mx-auto h-8 w-8"
        src={"/imgs/lock2.png"}
        alt="login"
      />
      <div className=" text-dark">
        <h3 style={{ justifyContent: "top", fontWeight: "bolder" }}>
          sign into your account
        </h3>
      </div>

      <div className="boxx">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label className="text-left text-dark">Student ID</Form.Label>
            <Form.Control
              onChange={(e) => setStudentid(e.target.value)}
              className="bg-light"
              type="text"
              placeholder="enter Student ID"
              aria-required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-dark">Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              className="bg-light"
              type="password"
              placeholder="Password"
              aria-required
            />
          </Form.Group>

          <Button onClick={postData} variant="primary" className="w-100">
            {" "}
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <Nav.Link to="/home" as={NavLink}>
                Submit{" "}
              </Nav.Link>
            )}
          </Button>
          <div className="input2 align-items-center mt-5 ">
            <p
              className="align-items-center  text-dark
      "
            >
              {" "}
              <Nav.Link to="/register" as={NavLink}>
                Do not have an account click here to signup
              </Nav.Link>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
}
