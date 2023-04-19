import { Button, Navbar as NavbarBs, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <div>
      <NavbarBs sticky="top" className="nav text-white shadow-sm mb-3 ">
        <Container>
          <Nav className="me-auto ">
            <a className="navbar-brand text-white" href="#">
              <h5
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
                className="font-weight-bold"
              >
                {" "}
                CANTEEN E-TICKETING SYSTEM
              </h5>
            </a>

            <Nav.Link className="input2 text-white" to="/store" as={NavLink}>
              Store
            </Nav.Link>
            <Nav.Link className="input2 text-white" to="/login" as={NavLink}>
              Login
            </Nav.Link>
          </Nav>
          {cartQuantity > 0 && (
            <>
              {" "}
              <Button className="rounded-circle" onClick={openCart}>
                <img
                  src="svgs/cart.png"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    position: "relative",
                  }}
                  alt=""
                ></img>

                <div
                  className="rounded-circle bg-danger d-flex justify-content-center align-text-center"
                  style={{
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "absolute",
                    bottom: 0,
                    right: 121,
                    transform: "translate(25%,2%)",
                  }}
                >
                  {cartQuantity}
                </div>
              </Button>
            </>
          )}
        </Container>
      </NavbarBs>
    </div>
  );
}
