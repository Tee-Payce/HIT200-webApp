import { createContext, ReactNode, useContext, useState } from "react"

import { TicketPurchased } from "../pages/TicketPurchased";
import { useLocalStorage } from "../hooks/useLocalStorage"


type TicketPurchasedProviderProps={
    children : ReactNode
}
type PurchasedItem ={
    id : number
    quantity : number
}
type TicketPurchasedContext ={
    openScreen:()=> void
    closeScreen:()=> void
    getItemQuantity : (id: number)=> number
    increaseTicketQuantity: (id: number)=> void
    decreaseTicketQuantity:(id:number)=> void
    removeFromTicket:(id:number)=> void
    ticketQuantity: number
    purchasedItems: PurchasedItem[]
}
const TicketPurchasedContext = createContext({} as TicketPurchasedContext)


export function useTicketPurchased()
{
    return useContext(TicketPurchasedContext)

}
export function TicketPurchasedProvider({children}:
    TicketPurchasedProviderProps){
        const [isOpen, setIsOpen] = useState(false)
        const [purchasedItems, setPurchasedItems] = useLocalStorage<PurchasedItem[]>("My-Tickets",[])

        const openScreen=()=> setIsOpen(true)
        const closeScreen=()=> setIsOpen(false)

        const ticketQuantity = purchasedItems.reduce(
            (quantity, item)=> item.quantity + quantity, 
            0
        )

        function getItemQuantity(id:number) {
            return purchasedItems.find(item=>item.id === id)?.quantity|| 0
        }
        function increaseTicketQuantity(id:number) {
            setPurchasedItems(currItems=>{
                if (currItems.find(item=> item.id === id ) == null){
                    return [...currItems, {id, quantity : 1}]
                } else{
                    return currItems.map(item=>{
                        if(item.id === id){
                            return {...item, quantity: item.id + 1}
                        }else{
                            return item
                        }
                    })
                }
            })
        }
        function decreaseTicketQuantity(id:number) {
            setPurchasedItems(currItems=>{
                if (currItems.find(item=> item.id === id )?.quantity == 1){
                    return currItems.filter(item=> item.id !== id)
                } else{
                    return currItems.map(item=>{
                        if(item.id === id){
                            return {...item, quantity: item.id - 1}
                        }else{
                            return item
                        }
                    })
                }
            })
        }
        function removeFromTicket(id : number) {
            setPurchasedItems(currItems=>{
                return  currItems.filter(item=> item.id !== id)
            }
                )   
        }
        return(
            <TicketPurchasedContext.Provider value={{
                getItemQuantity,
                increaseTicketQuantity, 
                decreaseTicketQuantity, 
                removeFromTicket, 
                purchasedItems,
                ticketQuantity,
                openScreen,
                closeScreen }}>
            {children}
            <TicketPurchased isOpen={isOpen}  />
            </TicketPurchasedContext.Provider>
        )
    }