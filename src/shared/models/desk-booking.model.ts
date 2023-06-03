import { DeskBooking } from '../schemas/desk-booking.schema';
import { Desk } from '../schemas/desk.schema';

export type DeskBookingState = {
    searchCriteria: SearchCriteria;
    deskInfo: Desk;
    bookingInfo: DeskBooking;
    isBooked: boolean;
}

export type SearchCriteria = {
    checkInDateTime: string;
    checkOutDateTime: string;
};