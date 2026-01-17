import { useState } from "react";
import { createUser } from "@/lib/api/user.api";

export default function CreateUser({ role }: { role: "ORGANIZER" | "ATTENDEE" }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const submit = async () => {
        await createUser({ name, email, role });
        alert("User created");
    };

    return (
        <div>
            <input placeholder="Name" onChange={e => setName(e.target.value)} />
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <button onClick={submit}>Create {role}</button>
        </div>
    );
}
