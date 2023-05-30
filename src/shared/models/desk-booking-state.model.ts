import { DeskBooking } from '../schemas/desk-booking.schema';
import { Desk } from '../schemas/desk.schema';

export type DeskBookingState = {
    deskInfo: Desk;
    bookingInfo: DeskBooking;
    isBooked: boolean;
}