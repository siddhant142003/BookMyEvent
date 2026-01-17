import { useState } from "react";
import { TicketAPI } from "@/lib/api/ticket.api";

export default function ScanQR() {
    const [qr, setQr] = useState("");

    const scan = async () => {
        try {
            const message = await TicketAPI.validateTicket(qr);
            alert(message);
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Invalid QR Code");
            }
        }
    };

    return (
        <div>
            <input
                placeholder="QR Code"
                value={qr}
                onChange={(e) => setQr(e.target.value)}
            />
            <button onClick={scan}>Validate</button>
        </div>
    );
}