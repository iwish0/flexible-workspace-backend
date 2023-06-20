export type BookingConfirmationEmailTemplateData = {
    title: string;
    bookingObjectName: string;
    location?: string;
    checkInDate: string;
    checkOutDate: string;
    checkInTime?: string;
    checkOutTime?: string;
}