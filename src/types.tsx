declare namespace MyAppTypes {
  // Define types here
  type User = {
    id: number;
    name: string;
    email: string;
  };

  type Ticket = {
    id: string;
    ticketInfo: string;
    quantity: number;
    user: User;
    slot: string | null;
    used: boolean;
  };

  // Export types here
  export type { User, Ticket };
}
