import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCodeCanvas from "qrcode.react";

interface TicketData {
  ticketId: string;
  ticketInfo: string;
  quantity: number;
  user: string;
  slot: string | null;
  used: boolean;
}

interface Props {
  slotType: string;
}

const TicketList: React.FC<Props> = ({ slotType }) => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [mealName, setMealName] = useState<string>("");
  const [mealType, setMealType] = useState<string>("Lunch");
  const handleSelect = (ticketId: string, slotType: string) => {
    setSelectedTickets([ticketId]);

    setMealName(
      tickets.find((ticket) => ticket.ticketId === ticketId)?.ticketInfo || ""
    );
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.get("http://127.0.0.1:5001/tickets");
      setTickets(response.data.tickets);
    };
    fetchTickets();
  }, []);

  const handleProceedClick = async () => {
    if (selectedTickets.length !== 1) {
      alert("Please select one ticket");
      return;
    }
    try {
      const response = await axios.get(
        `http://127.0.0.1:5001/tickets/${selectedTickets[0]}?slotType=${mealType}`
      );
      setTimeSlot(response.data.ticket.slot);
    } catch (error) {
      alert("Failed to get time slot");
    }
  };

  const handleTicketUse = async () => {
    if (selectedTickets.length === 0) {
      alert("Please select at least one ticket");
      return;
    }
    try {
      const response = await axios.post("/api/tickets/use", {
        ticketIds: selectedTickets,
        slotType,
      });
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          selectedTickets.includes(ticket.ticketId)
            ? { ...ticket, used: true, slot: response.data.ticket.slot }
            : ticket
        )
      );
      setSelectedTickets([]);
      setTimeSlot(null);
      alert("Tickets used successfully");
    } catch (error) {
      alert("Failed to use tickets");
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qrcode");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "QR Code.png";
    link.click();
  };
  const handleMealSelect = (ticketId: string, event: any) => {
    console.log(event.target.value);
    setMealType(event.target.value);
    setSelectedTickets([ticketId]);

    setMealName(
      tickets.find((ticket) => ticket.ticketId === ticketId)?.ticketInfo || ""
    );
  };

  return (
    <div>
      <h2>Ticket List</h2>
      <button className="btn btn-primary" onClick={handleProceedClick}>
        Redeem Ticket
      </button>
      {timeSlot && (
        <div className="mb-2 mt-2">
          {/* show qrcode */}
          <QRCodeCanvas
            value={
              // put an object here
              JSON.stringify({
                ticketId: selectedTickets[0],
                mealName,
                mealType,
                timeSlot,
              })
            }
            size={256}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            renderAs={"canvas"}
            id="qrcode"
          />
          <h5 className="text-success mt-2">Collect your meal at {timeSlot}</h5>
          <div className="">
            <button className="btn btn-primary" onClick={downloadQRCode}>
              Download QR Code
            </button>
          </div>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Ticket Name</th>
            <th>Meal</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.ticketId}>
              <td>{ticket.ticketId}</td>
              <td>{ticket.ticketInfo}</td>
              <td>
                <select
                  onChange={(event) => handleMealSelect(ticket.ticketId, event)}
                >
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Supper</option>
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleSelect(ticket.ticketId, slotType)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
