import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { AuthProviderService } from '../auth-provider/auth-provider.service';
import { EventScheduleMSGraphRest, EventScheduleDetail } from 'src/shared/models/event-schedule.model';
import { msGraphUsersEventsURL } from 'src/shared/constants/url.constant';
import { Client } from "@microsoft/microsoft-graph-client";
import { UTC } from 'src/shared/constants/date.constant';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarService {

    constructor(private authProviderService: AuthProviderService) { }

    public scheduleEvent(
        eventScheduleDetail: EventScheduleDetail
    ): Promise<unknown> {
        const authProvider: TokenCredentialAuthenticationProvider = this.authProviderService.getAuthProviderClientSecretCredential();
        const graphClient: Client = Client.initWithMiddleware({ authProvider: authProvider });
        const { userId, subject, startDateTime, endDateTime } = eventScheduleDetail;
        const eventSchedule: EventScheduleMSGraphRest = {
            subject,
            start: {
                dateTime: startDateTime,
                timeZone: UTC
            },
            end: {
                dateTime: endDateTime,
                timeZone: UTC
            }
        };
        return graphClient.api(msGraphUsersEventsURL(userId)).post(eventSchedule);
    }
}
