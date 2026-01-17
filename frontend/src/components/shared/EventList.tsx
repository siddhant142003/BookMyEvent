import { useEffect, useState } from "react";
import { getAllEvents } from "@/lib/api/event.api";
import { Event } from "@/types";

export default function EventList() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        getAllEvents().then(res => setEvents(res.data));
    }, []);

    return (
        <div>
            {events.map(e => (
                <div key={e.id}>
                    <h3>{e.title}</h3>
                    <p>{e.location}</p>
                    <p>Available: {e.availableTickets}</p>
                </div>
            ))}
        </div>
    );
}