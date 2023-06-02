import * as moment from 'moment';

export class DateUtils {

    public static getDateWithoutSecondAndMiilisecond(date: Date | string): Date {
        const dateFormated = typeof date === 'object' ? date.toISOString() : date;
        if (DateUtils.isDateValid(dateFormated)) {
            const newDate = moment(dateFormated).set('seconds', 0).set('milliseconds', 0).toDate();
            return newDate;
        }
        return new Date();
    }

    public static isDateValid(date: string): boolean {
        return moment(date).isValid();
    }
}