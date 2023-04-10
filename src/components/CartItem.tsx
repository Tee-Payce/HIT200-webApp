import React, { useState } from 'react'
import { Button, Modal, Stack } from 'react-bootstrap'
import QRCode from 'react-qr-code'
import { useShoppingCart } from '../context/ShoppingCartContext'
import storeItems from '../data/items.json'
import { formatCurrency } from '../utilities/formatCurrency'

type CartItemProps ={
    id: number
    quantity: number 
}

export function CartItem({id, quantity}: CartItemProps){
    const {removeFromCart} = useShoppingCart()
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false);

    const item = storeItems.find(i => i.id === id)
    if (item === null) return null
    const [url, setUrl] = React.useState("");
    const downloadQRCode = (evt:React.FormEvent)=>{
        evt.preventDefault();

        setUrl("")
    };
    const qrCode =(
        <QRCode
        id = "qrCodeId"
        size={500}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={(item?.varient)}
        viewBox={`0 0 256 256`}
        bgColor = "white"
        fgColor = "orange"
        level='Q'
        includeMargin 
    />
    )
    return(
    <>

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
        <Button variant='danger' onClick={handleShow} style={{marginRight:"3px"}}>Generate Ticket</Button>

        <Button variant='outline-danger' size='sm' onClick={()=> removeFromCart (item?.price||0)}>&times;</Button>
        </div>
        
      

        </Stack>
          <div className=''>
          <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Generated Ticket</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      {qrCode}
      </Modal.Body>

      <Modal.Footer>
       <button className="btn" onClick={handleClose}>CLOSE</button>
      </Modal.Footer>
    </Modal>
       
      </div>
      </>
    )


} 