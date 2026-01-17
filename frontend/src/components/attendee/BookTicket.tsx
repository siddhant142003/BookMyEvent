import { TicketAPI } from "@/lib/api/ticket.api";

export default function BookTicket({ eventId }: { eventId: number }) {
    const book = async () => {
        await TicketAPI.bookTicket(eventId, 2); // attendee user id
        alert("Ticket booked");
    };

    return <button onClick={book}>Book Ticket</button>;
}