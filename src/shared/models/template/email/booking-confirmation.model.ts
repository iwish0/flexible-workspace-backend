type BookingType = 'desk' | 'room';

export type BookingConfirmationEmailTemplateData = {
    title: string;
    bookingObjectName: string;
    location?: string;
    checkInDate: string;
    checkOutDate: string;
    checkInTime?: string;
    checkOutTime?: string;
    bookingType: BookingType;
}