import { Row,Col } from "react-bootstrap";
import { Item } from "../components/Item";
import storeItems from "../data/items.json"

export function Homescreen() {
    return(
        <div>
            <h1 className="align-item-center">Menu</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems.map(item=>(
                <Col key={item.id}>
                    <Item {...item}/>

                </Col>))}
            </Row>
        </div>
    )
}