import { useState } from "react";
import { createEvent } from "@/lib/api/event.api";

export default function CreateEvent() {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [tickets, setTickets] = useState(1);

    const submit = async () => {
        await createEvent({
            title,
            location,
            eventDate: date,
            totalTickets: tickets,
            organizer: { id: 1 }, // organizer user id
        });

        alert("Event created");
    };

    return (
        <div>
            <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
            <input placeholder="Location" onChange={e => setLocation(e.target.value)} />
            <input type="datetime-local" onChange={e => setDate(e.target.value)} />
            <input type="number" onChange={e => setTickets(+e.target.value)} />
            <button onClick={submit}>Create Event</button>
        </div>
    );
}