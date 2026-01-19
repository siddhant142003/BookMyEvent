import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

type Props = {
    onScan: (text: string) => void;
    onError?: (err: unknown) => void;
};

export default function QRCodeScanner({ onScan, onError }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const reader = new BrowserMultiFormatReader();
        let active = true;

        reader.decodeFromVideoDevice(
            null,
            videoRef.current!,
            (result, error) => {
                if (!active) return;

                if (result) {
                    onScan(result.getText());
                    active = false; // prevent duplicate scans
                }

                if (error && onError) {
                    onError(error);
                }
            }
        );

        // ✅ ONLY cleanup needed
        return () => {
            active = false;
        };
    }, [onScan, onError]);

    return (
        <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-xl"
            muted
            playsInline
        />
    );
}