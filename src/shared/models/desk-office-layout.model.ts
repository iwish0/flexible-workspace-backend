import { DeskBookingState } from './desk-booking.model';

export type DeskSvgRectAttribut = {
    id: DeskName;
    height: string;
    width: string;
    x: string;
    y: string;
}

export type DeskOfficeLayoutSVGData = {
    svgDrawAttribut: DeskSvgRectAttribut;
    deskBookingState: DeskBookingState;
}

export type DeskName =
    'A1' | 'A2' | 'A3' |
    'B1' | 'B2' | 'B3';