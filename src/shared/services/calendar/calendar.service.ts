import { Injectable } from '@nestjs/common';
import { Client, AuthProvider } from "@microsoft/microsoft-graph-client";
import 'isomorphic-fetch';

// Autorisation de serveur à serveur (Client Credentials Grant)
// https://oa.dnc.global/-Autorisation-de-serveur-a-serveur-Client-Credentials-Grant-.html
@Injectable()
export class CalendarService {

    constructor() { }
    // https://learn.microsoft.com/en-us/graph/api/user-post-events?view=graph-rest-1.0&tabs=javascript
    public async scheduleMeeting(payload: any): Promise<unknown> {
        console.log('id:',payload.id);
        const id=payload.id;

        console.log('scheduleMeeting!!!')
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
                    done(null,
                        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly80OGIzMGU5ZS1kZjQ3LTRhNjUtOGY5NC1mMTRmMTUwY2EwNmUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mYzJiZTcxNS00YTk0LTQyZGQtODMyZC05ZDdkYmI3M2M3NTQvIiwiaWF0IjoxNjg5MTc0OTQzLCJuYmYiOjE2ODkxNzQ5NDMsImV4cCI6MTY4OTE3ODg0MywiYWlvIjoiRTJaZ1lDaXpkdUczUGVaejdXci9tVStMd2c3bUF3QT0iLCJhcHBpZCI6IjEyOTQyMmJjLTM0OGItNDkwZi1iNDVlLWUzMWFjY2NiNjc2YSIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2ZjMmJlNzE1LTRhOTQtNDJkZC04MzJkLTlkN2RiYjczYzc1NC8iLCJvaWQiOiJlNjg3ZmVlNS00NTVkLTQ2OTgtYjIwYi0zZjcwN2NmZDg0MGIiLCJyaCI6IjAuQVNBQUZlY3JfSlJLM1VLRExaMTl1M1BIVko0T3MwaEgzMlZLajVUeFR4VU1vRzdrQUFBLiIsInN1YiI6ImU2ODdmZWU1LTQ1NWQtNDY5OC1iMjBiLTNmNzA3Y2ZkODQwYiIsInRpZCI6ImZjMmJlNzE1LTRhOTQtNDJkZC04MzJkLTlkN2RiYjczYzc1NCIsInV0aSI6IjR1TDUzbWJ3YVVTZVI5VFh3N2tNQUEiLCJ2ZXIiOiIxLjAifQ.Nm8TNvbXiyEpRZ1fwdRuvqlvPPHGluY6jNlKl8P5C23ybJJGiIr3IYBc2Nu9vK-1JfIy8-kgry4ifDdUTWOXBTKG53SMJTHrYYwe_4ixJTDn1oMmXFpgsJnWKYukogTfyH5LaDOYdPdUp8fYjItK9Hq4aCrVGade_ot5xwjgfqCAKNHDbkMSek8lqlRK62m7U48PyyM8DILEfXIw5CPcDW4bM2eTecUlB8c5BRHLEf7LhoYErAA6Cjs0q02PP3TrZ5DsylYqMlydnfg9P20Sj8Gokll81kfNhHTzO5I__7AepTmalG2wf5jdD26uYtoJNcVxSj4yapC9HafKzb4hmA'
             ) }
            }).api(`users/${id}/events`).post({
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
            //            console.log(userDetails);
            return userDetails
        } catch (error) {
            throw error;
        }
        // const MSC_OUTLOOK_API:string='https://graph.microsoft.com/v1.0/me/events'

        // return Promise.resolve({age:40,...payload});
    }
}
