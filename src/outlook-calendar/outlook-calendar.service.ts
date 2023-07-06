import { Injectable } from '@nestjs/common';
import { Client, AuthProvider } from "@microsoft/microsoft-graph-client";
import 'isomorphic-fetch';

@Injectable()
export class OutlookCalendarService {

    constructor() { }

    public async scheduleMeeting(payload: any): Promise<unknown> {

// https://learn.microsoft.com/fr-fr/azure/active-directory/develop/scenario-web-api-call-api-app-registration
// https://github.com/Azure-Samples/ms-identity-javascript-nodejs-tutorial/blob/main/2-Authorization/1-call-graph/README.md
// https://www.youtube.com/watch?v=elVrQSAVYT0
// https://learn.microsoft.com/en-us/graph/api/user-post-events?view=graph-rest-1.0&tabs=javascript#permissions
// https://developer.microsoft.com/en-us/graph/graph-explorer/?request=me%2Fevents&version=v1.0

        try {
            let userDetails = await Client.init({
                // Use the provided access token to authenticate
                // requests
                authProvider: (done) => {
                 done(null,'eyJ0eXAiOiJKV1QiLCJub25jZSI6Imxyd1h1YWUzeGl6Zl9lWXlrWEt2YzNSRHFST2s4cUE3QVRscEQtbEZkaDQiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mYzJiZTcxNS00YTk0LTQyZGQtODMyZC05ZDdkYmI3M2M3NTQvIiwiaWF0IjoxNjg3ODQ5NjYzLCJuYmYiOjE2ODc4NDk2NjMsImV4cCI6MTY4NzkzNjM2MywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQVA4dW1pdjRXUkVMWVo4UDE1dCtvN3JPZ3ZIVTVpSml3NEZ5bm9YSDdYVHpnZ1ZWK1FTVlBIK1dDc2EwS3BnVnEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkJSRVNTT04iLCJnaXZlbl9uYW1lIjoiQ0VEUklDIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiODUuMTY4LjI0My4xMjEiLCJuYW1lIjoiQ0VEUklDIEJSRVNTT04iLCJvaWQiOiIwOWI3MzllNC0zN2MyLTRkNjgtYjEwNi1hMTIzNWRkYThmMzgiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMTU4NzM2OTY2MS0yODc0MDg5MDAzLTM1NTU2NDIyOTktMTc3OSIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMDAwMEE1MkYyQ0E3IiwicmgiOiIwLkFTQUFGZWNyX0pSSzNVS0RMWjE5dTNQSFZBTUFBQUFBQUFBQXdBQUFBQUFBQUFEa0FMay4iLCJzY3AiOiJDYWxlbmRhcnMuUmVhZFdyaXRlIENoYXQuUmVhZCBDaGF0LlJlYWRCYXNpYyBDb250YWN0cy5SZWFkV3JpdGUgRGV2aWNlTWFuYWdlbWVudE1hbmFnZWREZXZpY2VzLlJlYWQuQWxsIERldmljZU1hbmFnZW1lbnRSQkFDLlJlYWQuQWxsIERldmljZU1hbmFnZW1lbnRTZXJ2aWNlQ29uZmlnLlJlYWQuQWxsIEZpbGVzLlJlYWRXcml0ZS5BbGwgR3JvdXAuUmVhZFdyaXRlLkFsbCBJZGVudGl0eVJpc2tFdmVudC5SZWFkLkFsbCBNYWlsLlJlYWQgTWFpbC5SZWFkV3JpdGUgTWFpbGJveFNldHRpbmdzLlJlYWRXcml0ZSBOb3Rlcy5SZWFkV3JpdGUuQWxsIG9wZW5pZCBQZW9wbGUuUmVhZCBQbGFjZS5SZWFkIFByZXNlbmNlLlJlYWQgUHJlc2VuY2UuUmVhZC5BbGwgUHJpbnRlclNoYXJlLlJlYWRCYXNpYy5BbGwgUHJpbnRKb2IuQ3JlYXRlIFByaW50Sm9iLlJlYWRCYXNpYyBwcm9maWxlIFJlcG9ydHMuUmVhZC5BbGwgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWRXcml0ZSBVc2VyLlJlYWRXcml0ZS5BbGwgZW1haWwiLCJzdWIiOiJXY25JaG04R2hDblpHemxsY3NYU0VkZTZ2cktqQ0hXRFBaM1RYSHMxMDZjIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiZmMyYmU3MTUtNGE5NC00MmRkLTgzMmQtOWQ3ZGJiNzNjNzU0IiwidW5pcXVlX25hbWUiOiJjLmJyZXNzb25AcHJveGlhZC5jb20iLCJ1cG4iOiJjLmJyZXNzb25AcHJveGlhZC5jb20iLCJ1dGkiOiI4WjdWaHgtU1kwU0Jzc0FGMXVzQ0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfc3NtIjoiMSIsInhtc19zdCI6eyJzdWIiOiJRMjZ3aFRFUnlCU3lFMExqX3Zmbzd1aW5aS1lkVUtwazRTem5lejhkTkVzIn0sInhtc190Y2R0IjoxNDgyMTUzOTU4LCJ4bXNfdGRiciI6IkVVIn0.QhuEOajxJiEjck_wQCt2g2E2_hC6hsq2mybuvK9ZUqlra5WIHSnBfzKVnZxoUbzuIw7Y8Z9lgEXZqISaQNKRRZOHR8mkr-FXTcmEvOJxY64oKP-m4wOK3AqPpV_wSdydK1S5d_u7CCrliq2oAiVypnIKwF8d0mY8Hqxy9RuryhsVUECMoUWVmO4CgDNH02JiqWnS9QC22IX2uSjgwKx5FhSbjZj4qllF7t70RK8qA9BEJeYdyrwZIekGzgq7V3jVR83LtXNx1pYF6iwEA6CWZVNlFjJbahGN4Dg2fCx8aUfi4oMvXcXbLGXvRAXqWYGr4LM7mB7U4H5taKU2tpKJFQ' );
                }
               }).api("/me/events").post({
                "subject": "My event test",
                "start": {
                    "dateTime": "2023-06-27T08:17:08.810Z",
                    "timeZone": "UTC"
                },
                "end": {
                    "dateTime": "2023-07-04T08:17:08.810Z",
                    "timeZone": "UTC"
                }
            });
            console.log(userDetails);
            return userDetails
        } catch (error) {
            throw error;
        }
        // const MSC_OUTLOOK_API:string='https://graph.microsoft.com/v1.0/me/events'

        // return Promise.resolve({age:40,...payload});
    }
}
