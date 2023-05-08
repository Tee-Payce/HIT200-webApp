import React, { useState } from "react";
import axios from "axios";

export default function TicketForm() {
  const [tickets, setTickets] = useState([
    { ticketInfo: "", quantity: 0, user: "" },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/tickets", {
        tickets: [
          {
            ticketInfo: "Spaghetti",
            quantity: 2,
            user: "John Doe",
          },
          {
            ticketInfo: "Burger",
            quantity: 1,
            user: "Jane Smith",
          },
        ],
      });
      console.log(res.data);
      // Handle successful response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  const handleTicketChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...tickets];
    list[index][name] = value;
    setTickets(list);
  };

  const addTicket = () => {
    setTickets([...tickets, { ticketInfo: "", quantity: 0, user: "" }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {tickets.map((ticket, index) => (
        <div key={index}>
          <label>Ticket {index + 1} Info:</label>
          <input
            type="text"
            name="ticketInfo"
            value={ticket.ticketInfo}
            onChange={(e) => handleTicketChange(e, index)}
          />
          <label>Ticket {index + 1} Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={ticket.quantity}
            onChange={(e) => handleTicketChange(e, index)}
          />
          <label>Ticket {index + 1} User:</label>
          <input
            type="text"
            name="user"
            value={ticket.user}
            onChange={(e) => handleTicketChange(e, index)}
          />
        </div>
      ))}
      <button type="button" onClick={addTicket}>
        Add Ticket
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}
