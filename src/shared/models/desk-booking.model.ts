import { DeskBooking } from '../schemas/desk-booking.schema';
import { Desk } from '../schemas/desk.schema';

export type DeskBookingState = {
    searchCriteria: SearchCriteria;
    isBooked: boolean;
} & DeskBookingInfo;

export type SearchCriteria = {
    checkInDateTime: string;
    checkOutDateTime: string;
};

export type DeskBookingInfo = {
    deskInfo: Desk;
    bookingInfo: DeskBooking;
};