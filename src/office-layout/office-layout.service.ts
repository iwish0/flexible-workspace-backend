import { RoomOfficeLayoutSVGData, RoomSvgRectAttribut } from 'src/shared/models/room-office-layout.model';
import { DeskOfficeLayoutSVGData, DeskSvgRectAttribut } from 'src/shared/models/desk-office-layout.model';
import { ROOM_SVG_ATTRIBUTS, DESK_SVG_ATTRIBUTS } from '../shared/constants/office-layout.constant';
import { RoomBookingState } from 'src/shared/models/room-booking.model';
import { DeskBookingState } from 'src/shared/models/desk-booking.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OfficeLayoutService {

    public getRawDeskOfficeLayout(): DeskSvgRectAttribut[] {
        return DESK_SVG_ATTRIBUTS;
    }

    public getRawRoomOfficeLayout(): RoomSvgRectAttribut[] {
        return ROOM_SVG_ATTRIBUTS;
    }

    public getOfficeLayoutWithDeskBookingsState(listDeskBookingState: DeskBookingState[]): DeskOfficeLayoutSVGData[] {
        const listOfficeLayoutSVGData: DeskOfficeLayoutSVGData[] = this.getRawDeskOfficeLayout().map((svgRectAttribut: DeskSvgRectAttribut) => {
            const deskBookingState: DeskBookingState = listDeskBookingState.find(({ deskInfo }) => deskInfo.name === svgRectAttribut.id);
            return {
                deskBookingState,
                svgDrawAttribut: svgRectAttribut
            };
        })
        return listOfficeLayoutSVGData;
    }

    public getOfficeLayoutWithRoomBookingsState(listRoomBookingState: RoomBookingState[]): RoomOfficeLayoutSVGData[] {
        const listOfficeLayoutSVGData: RoomOfficeLayoutSVGData[] = this.getRawRoomOfficeLayout().map((svgRectAttribut: RoomSvgRectAttribut) => {
            const roomBookingState: RoomBookingState = listRoomBookingState.find(({ roomInfo }) => roomInfo.name === svgRectAttribut.id);
            return {
                roomBookingState,
                svgDrawAttribut: svgRectAttribut
            };
        })
        return listOfficeLayoutSVGData;
    }
}
