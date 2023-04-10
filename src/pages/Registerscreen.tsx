import {Button, Container, Form}from 'react-bootstrap';


export function Registerscreen() {
  function register() {
    alert("The form was submitted");
  }
  
  return (
    
    <>
    <img
              className="headerimg mx-auto h-8 w-8"
              src={("/imgs/lock2.png")}
              alt="login"
            />
    <div className='header-col text-dark'>

<h3  style={{justifyContent:"top"}}>sign up your account</h3>
</div>
    <div className='boxx1 '>
     
 
    <Form  >
         <Form.Group className="row mb-3" controlId="formBasicUsername">
        <Form.Label className='text-dark'>First Name</Form.Label>
        <Form.Control className='bg-light' type="text" placeholder="Enter your first name" aria-required />
      </Form.Group>
      <Form.Group className="row mb-3" controlId="formBasicSurname">
        <Form.Label  className='text-dark'>Surname</Form.Label>
        <Form.Control className='bg-light' type="text" placeholder="Enter your surname" required />
      </Form.Group>
    <Form.Group className="row mb-3" controlId="formBasicID">
        <Form.Label  className='text-dark'>Student ID</Form.Label>
        <Form.Control className='bg-light' type="text" placeholder="enter Student ID" aria-required/>
      </Form.Group>

      <Form.Group className="row mb-3" controlId="formBasicPassword">
        <Form.Label  className='text-dark'>Password</Form.Label>
        <Form.Control className='bg-light' type="password" placeholder="Password" aria-required />
      </Form.Group>
      <Form.Group className="row mb-3" controlId="formBasicPassword">
        <Form.Label  className='text-dark'>Confirm Password</Form.Label>
        <Form.Control className='bg-light' type="password" placeholder="Re-enter Password" aria-required />
      </Form.Group>
      <Button variant="primary w-100" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </>
  );
}
