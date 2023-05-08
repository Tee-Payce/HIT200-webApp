import React, { useState } from "react";
import { TicketData } from "../types";

type Props = {
  ticket: TicketData;
  onSelect: (ticketId: string, slotType: string) => void;
};

const Ticket: React.FC<Props> = ({ ticket, onSelect }) => {
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const handleSelect = (slotType: string) => {
    setSelectedSlot(slotType);
    onSelect(ticket.ticketId, slotType);
  };

  return (
    <div className="card mb-3 ">
      <div className="card-body">
        {/* <h3>Ticket #{ticket.ticketId}</h3> */}
        <p className="card-text">Info: {ticket.ticketInfo}</p>
        {/* <p>Quantity: {ticket.quantity}</p> */}
        <p className="card-text">User: {ticket.user}</p>
        {ticket.slot ? (
          <p>Slot: {ticket.slot}</p>
        ) : (
          <>
            <p>Select a slot type:</p>
            <button
              className={`btn btn-primary me-2 ${
                selectedSlot === "Lunch" ? "btn-warning" : ""
              }`}
              onClick={() => handleSelect("Lunch")}
            >
              Lunch
            </button>
            <button
              className={`btn btn-primary  ${
                selectedSlot === "Dinner" ? "btn-warning" : ""
              }`}
              onClick={() => handleSelect("Dinner")}
            >
              Dinner
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Ticket;
