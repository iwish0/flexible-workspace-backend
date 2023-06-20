import { DD_MM_YYYY } from '../constants/date.constant';
import * as moment from 'moment';

export class DateUtils {

    public static getDateWithoutSecondAndMiilisecond(date: Date | string): Date {
        const dateFormated = typeof date === 'object' ? date.toISOString() : date;
        if (DateUtils.isDateValid(dateFormated)) {
            const newDate = moment.utc(dateFormated).set('seconds', 0).set('milliseconds', 0).toDate();
            return newDate;
        }
        return new Date();
    }

    public static isDateValid(date: string | Date): boolean {
        return moment(date).isValid();
    }

    public static getFuturDate(
        date: Date | string,
        amount: moment.DurationInputArg1,
        unit: moment.unitOfTime.DurationConstructor
    ): Date {
        if (DateUtils.isDateValid(date)) {
            return moment.utc(date).add(amount, unit).toDate();
        }
        return new Date()
    }

    public static getPastDate(
        date: Date | string,
        amount: moment.DurationInputArg1,
        unit: moment.unitOfTime.DurationConstructor
    ): Date {
        if (DateUtils.isDateValid(date)) {
            return moment.utc(date).subtract(amount, unit).toDate();
        }
        return new Date()
    }

    public static dateToString(
        date: Date,
        format: string = DD_MM_YYYY
    ): string {
        const dateValid: Date = DateUtils.isDateValid(date) ? date : new Date();
        return moment.utc(dateValid).format(format);
    }

    public static stringToDate(date: string): Date {
        return DateUtils.isDateValid(date) ? moment.utc(date).toDate() : moment.utc().toDate();
    }

    /**
     * Return date with hours, minuts, seconds, milliseconds all set to 0
     * @param date 
     * @returns Date
     */
    public static getStartOfDay(date: Date | string): Date {
        const dateValid = DateUtils.isDateValid(date) ? date : new Date();
        return moment.utc(dateValid).startOf('days').toDate();
    }

    /**
     * Return date with 23 hours, 59 minuts, 59 seconds, 999 milliseconds 
     * @param date 
     * @returns Date
     */
    public static getEndOfDay(date: Date | string): Date {
        const dateValid = DateUtils.isDateValid(date) ? date : new Date();
        return moment.utc(dateValid).endOf('days').toDate();
    }

    public static getHourAndMinutFromDate(date: Date): string {
        if (!DateUtils.isDateValid(date)) {
            return '';
        }
        return `${date.getHours()}:${date.getMinutes()}`;
    }
}