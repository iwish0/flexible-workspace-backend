import { DeskBookingState } from "./desk-booking-state.model";

export type SvgRectAttribut = {
    id: DeskName;
    height: string;
    width: string;
    x: string;
    y: string;
}

export type OfficeLayoutSVGData = {
    svgDrawAttribut: SvgRectAttribut;
    deskBookingState: DeskBookingState;
}

export type DeskName =
    'A1' | 'A2' | 'A3' |
    'B1' | 'B2' | 'B3';