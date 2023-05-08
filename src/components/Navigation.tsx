import {
  Navbar as NavbarBs,
  Offcanvas,
  Nav,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useTicketPurchased } from "../context/TicketPurchasedContext";

export function Navigation() {
  const { openCart, cartQuantity } = useShoppingCart();
  const { openScreen } = useTicketPurchased();
  return (
    <div>
      {["md"].map((expand) => (
        <NavbarBs key={expand} expand={expand} className="nav text-white mb-3">
          <Container fluid>
            <NavbarBs.Brand
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginLeft: "1rem",
              }}
              href="#"
            >
              CANTEEN E TICKETING SYSTEM
            </NavbarBs.Brand>
            <NavbarBs.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
            />
            <NavbarBs.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Hello
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end  flex-grow-1 pe-3">
                  <Nav.Link
                    to="/home"
                    className="input2 text-white font-weight-bold"
                    as={NavLink}
                  >
                    Home
                  </Nav.Link>

                  <Nav.Link
                    to="/tickets"
                    className="input2 text-white font-weight-bold"
                    as={NavLink}
                  >
                    My Tickets
                  </Nav.Link>

                  <Nav.Link
                    to="/profile"
                    className="input2 text-white font-weight-bold"
                    as={NavLink}
                  >
                    My Profile
                  </Nav.Link>
                  <Nav.Link
                    to="/home"
                    className="input2 text-white font-weight-bold"
                    onClick={openCart}
                    as={NavLink}
                  >
                    Cart
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </NavbarBs.Offcanvas>
          </Container>
        </NavbarBs>
      ))}
    </div>
  );
}
