import { RoomBookingState } from './room-booking.model';

export type RoomSvgRectAttribut = {
    id: RoomName;
    height: string;
    width: string;
    x: string;
    y: string;
}

export type RoomOfficeLayoutSVGData = {
    svgDrawAttribut: RoomSvgRectAttribut;
    roomBookingState: RoomBookingState;
}

export type RoomName =
    'R1' | 'R2' | 'R3' |
    'R4' | 'R5' | 'R6';