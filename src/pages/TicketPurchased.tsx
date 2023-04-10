import { Card, Offcanvas, Stack } from "react-bootstrap";
import { useTicketPurchased } from "../context/TicketPurchasedContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { PurchasedItem } from "../components/PurchasedItem";
 import storeItems from '../data/items.json'

 type TicketPurchasedProps={
    isOpen: boolean
 }
export function TicketPurchased({isOpen}:TicketPurchasedProps) {
    const {closeScreen,purchasedItems} = useTicketPurchased()
    return(
        <>
         <Offcanvas show= {isOpen} onHide={closeScreen} placement="end" responsive="sm">

  <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                   <h1 className="text-dark"> My Tickets</h1>
                </Offcanvas.Title>
            </Offcanvas.Header>    
            <Offcanvas.Body>
            <Card.Body className="d-flex flex-column">
                    {purchasedItems.map((item: JSX.IntrinsicAttributes & { id: number; quantity: number; }) => (
                        <PurchasedItem key={item.id} {...item}/>
                    ))}
                    <div className="ms-auto fw-bold fs-5 text-dark">
                        Total {formatCurrency(purchasedItems.reduce((total,
                            purchasedItem)=>{
                                const item = storeItems.find(i=> i.id === purchasedItem.id)
                                return total + (item?.price||0) * purchasedItem.quantity 
                            },0
                            ))}
                    </div>
                    
                </Card.Body>
                </Offcanvas.Body>   
      


            
        </Offcanvas>
        </>
    )
}
