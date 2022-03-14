
import logo from './logo.svg';
import './App.css';
import {useState} from "react"
import {Auth} from "aws-amplify";
import Button from "react-bootstrap/Button"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"


function App() {

  
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const exitSignUp = () => {
    setShowSignUp(false);
    setSignUpPassword("")
    setSignUpEmail("")
  } 


  const exitLogIn = () => {
    setShow(false);
    setLogInPassword("")
    setLogInEmail("")
  }

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
    
    console.log(logInEmail);
    console.log(logInPassword);
    signIn(logInEmail, logInPassword);
    setLogInPassword("")
    setLogInEmail("")


  }
  const handleShow = () => setShow(true);

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");

  const [showSignUp, setShowSignUp] = useState(false);

   const handleCloseSignUp = (e) => { 
    e.preventDefault();
    setShowSignUp(false);
   
    console.log(signUpEmail);
    console.log(signUpPassword);
    signUp(signUpEmail, signUpPassword);
    setSignUpPassword("")
    setSignUpEmail("")
  }

  const handleSignUpChange = (event) => {
      
  }
  
  const signIn = async(username, password) => {
    try {
      const user = await Auth.signIn(username, password);
      setLoggedIn(true)
  } catch (error) {
      console.log("error signing in", error);
  }

}

const signOut = async() => {
  try {
    await Auth.signOut();
    setLoggedIn(false)
} catch (error) {
    console.log('error signing out: ', error);
}
}

const signUp = async(username, password) => {
  try {
    const {user} = await Auth.signUp({
        username, 
        password
    });
    console.log(user);
} catch(error) {
    console.log("error signing up user: ", error);
}
}
  


  const handleShowSignUp = () => setShowSignUp(true);


  return (
    <div className="App">

<Navbar expand="lg" fixed="top">
  <Container>
    <Navbar.Brand href="#home">Kitchen Compiler</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>

      <Nav className="ms-auto">
        { !loggedIn ? /*<Nav.Link onClick={handleShowSignUp}> Sign Up </Nav.Link> */ 
        <Nav.Link onClick={handleShow}>Log In</Nav.Link> :
         <Nav.Link> Profile </Nav.Link>
         }
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

<Modal show={show} onHide={exitLogIn}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleClose}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={logInEmail} onChange={(e) => setLogInEmail(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={logInPassword} onChange={(e) => setLogInPassword(e.target.value)}/>

    <Modal.Footer>
          <Button variant="primary" type="submit">
           Log in
          </Button>
        </Modal.Footer>

  </Form.Group>
  </Form>

        </Modal.Body>
        
      </Modal>
      
{/* TODO: ADD VERIFICATION STEP */}
      <Modal show={showSignUp} onHide={exitSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form onSubmit={handleCloseSignUp}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)}/>
    
    <Modal.Footer>
          <Button variant="primary" type="submit" >
           Sign Up
          </Button>
        </Modal.Footer>
  </Form.Group>
  </Form>

        </Modal.Body>
        
      </Modal>


      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
    
  );
}

export default App;
