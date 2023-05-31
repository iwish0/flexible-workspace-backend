import * as moment from 'moment';

export class DateUtils {

    public static getDateWithoutSecondAndMiilisecond(date: string): Date {
        if (DateUtils.isDateValid(date)) {
            const newDate = moment(date).set('seconds', 0).set('milliseconds', 0).toDate();
            return newDate;
        }
        return new Date();
    }

    public static isDateValid(date: string): boolean {
        return moment(date).isValid();
    }
}