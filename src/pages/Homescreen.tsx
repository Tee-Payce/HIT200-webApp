import { Row, Col } from "react-bootstrap";
import { Item } from "../components/Item";
import storeItems from "../data/items";

interface ItemGroup {
  comboName: string;
  items: typeof storeItems;
}

export function Homescreen() {
  // Group the items by comboname
  const itemsByComboName = storeItems.reduce<ItemGroup[]>((acc, item) => {
    const group = acc.find((g) => g.comboName === item.comboname);
    if (group) {
      group.items.push(item);
    } else {
      acc.push({ comboName: item.comboname, items: [item] });
    }
    return acc;
  }, []);

  return (
    <div>
      {itemsByComboName.map((group) => (
        <div key={group.comboName}>
          <h5
            style={{
              fontWeight: "bold",
              textAlign: "left",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            {group.comboName}
          </h5>
          <Row md={2} xs={1} lg={3} className="g-3">
            {group.items.map((item) => (
              <Col key={item.id}>
                <Item {...item} />
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}
