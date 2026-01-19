export interface UIEvent {
    id: number;
    name: string;
    description: string;
    venue: string;
    start: Date;
    end: Date;
    status: "published";
    ticketTypes: {
        id: number;
        name: string;
        price: number;
        totalAvailable: number;
        sold: number;
    }[];
}