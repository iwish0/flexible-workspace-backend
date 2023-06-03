import { OfficeLayoutSVGData, SvgRectAttribut } from 'src/shared/models/office-layout.models';
import { DeskBookingState } from 'src/shared/models/desk-booking.model';
import { SVG_ATTRIBUTS } from '../shared/constants/office-layout.constant';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OfficeLayoutService {

    public getRawOfficeLayout(): SvgRectAttribut[] {
        return SVG_ATTRIBUTS;
    }

    public getOfficeLayoutWithDeskBookingsState(listDeskBookingState: DeskBookingState[]): OfficeLayoutSVGData[] {
        const listOfficeLayoutSVGData: OfficeLayoutSVGData[] = this.getRawOfficeLayout().map((svgRectAttribut: SvgRectAttribut) => {
            const deskBookingState: DeskBookingState = listDeskBookingState.find(({ deskInfo }) => deskInfo.name === svgRectAttribut.id);
            return {
                deskBookingState,
                svgDrawAttribut: svgRectAttribut
            };
        })
        return listOfficeLayoutSVGData;
    }
}
