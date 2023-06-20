import { SearchCriteria, Booked } from '../models/booking-state.model';
import { DeskBooking } from '../schemas/desk-booking.schema';
import { Desk } from '../schemas/desk.schema';

export type DeskBookingState = {
    searchCriteria: SearchCriteria;
} & Booked & DeskBookingInfo;

export type DeskBookingInfo = {
    deskInfo: Desk;
    bookingInfo: DeskBooking;
}; 