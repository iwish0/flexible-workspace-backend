import { Room } from '../schemas/room.schema';
import { RoomBooking } from '../schemas/room-booking.schema';
import { SearchCriteria, Booked } from './booking-state.model';

export type RoomBookingState = {
    searchCriteria: SearchCriteria;
} & Booked & RoomBookingInfo;

export type RoomBookingInfo = {
    roomInfo: Room;
    bookingInfo: RoomBooking;
};