import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventAPI } from "@/lib/api/event.api";
import type { User } from "@/types/backend";

export default function CreateEvent() {
    const navigate = useNavigate();

    const user: User | null = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        totalTickets: 100,
        price: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!user) return;

        try {
            const eventDateISO = `${form.date}T10:00:00`;
            await EventAPI.createEvent({
                title: form.title,
                description: form.description,
                location: form.location,
                eventDate: eventDateISO,
                startDate: eventDateISO,
                endDate: eventDateISO,
                totalTickets: Number(form.totalTickets),
                availableTickets: Number(form.totalTickets),
                organizerId: user.id,
            });

            navigate("/organizer");
        } catch (err) {
            console.error("Create event failed", err);
            alert("Failed to create event");
        }
    };

    return (
        <div className="container py-8 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Create New Event</h1>

            <input name="title" placeholder="Title" onChange={handleChange} />
            <input name="location" placeholder="Location" onChange={handleChange} />
            <input type="date" name="date" onChange={handleChange} />
            <input
                type="number"
                name="totalTickets"
                placeholder="Total Tickets"
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>Create Event</button>
        </div>
    );
}