import { Button, Stack } from 'react-bootstrap'
import { useTicketPurchased } from '../context/TicketPurchasedContext'
import storeItems from '../data/items.json'
import { formatCurrency } from '../utilities/formatCurrency'

type PurchasedItemProps ={
    id: number
    quantity: number 
}

export function PurchasedItem({id, quantity}: PurchasedItemProps){
    const {removeFromTicket} = useTicketPurchased()
    const item = storeItems.find(i => i.id === id)
    if (item === null) return null

    return(
        <Stack direction='horizontal' gap={2} className="d-flex align-items-center">
            <img src={item?.image} style={{width:"125px",
        height:"75px" ,objectFit: "cover"}}/>
        <div className='me-auto text-dark'>
        <div>
            {item?.varient}{" "}
            {quantity>1 &&(
                <span className='text-muted ' style={{fontSize:".65rem"}}>x{quantity}</span>
            )}
        </div>
        <div className='text-muted' style={{fontSize:".75rem"}}>
            {formatCurrency (item?.price||0)}

        </div>
        <div >
            {formatCurrency((item?.price||0)*quantity)}
        </div>
        <Button variant='danger' style={{marginRight:"3px"}}>Generate Ticket</Button>
        <Button variant='outline-danger' size='sm' onClick={()=> removeFromTicket (item?.price||0)}>&times;</Button>
        </div>

        </Stack>
    )


} 