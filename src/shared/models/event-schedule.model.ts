export type EventScheduleMSGraphRest = {
    subject: string;
    start: DateTimeInfo;
    end: DateTimeInfo;
}

type DateTimeInfo = {
    dateTime: string;
    timeZone: string;
}

export type EventScheduleDetail = {
    userId: string;
    subject: string;
    startDateTime: string;
    endDateTime: string;
}