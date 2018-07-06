import * as sc2 from "sc2-sdk";

export class SteemConnectApi {
    private static LS_ACCESS_TOKEN_KEY = "ec2accesstoken";
    private steemConnectV2: sc2.SteemConnectV2 | undefined = undefined;
    private account: string | undefined = undefined;
    private metadata: object | undefined = undefined;

    public initialize(): void {
        const accessToken = localStorage.getItem(SteemConnectApi.LS_ACCESS_TOKEN_KEY);

        this.steemConnectV2 = sc2.Initialize({
            app: "wise.vote",
            callbackURL: (location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
                "http://localhost:8000/" : "https://wise.vote/"),
            scope: ["custom_json"],
        });

        if (accessToken) {
            this.steemConnectV2.setAccessToken(accessToken);
            this.steemConnectV2.me((error: Error, result: { account: string, user_metadata: object }) => {
                if (!error) {
                  this.account = result.account;
                  this.metadata = result.user_metadata;
                }
                /*else {
                }*/
            });
        }
    }

    // TODO public getProfileImageUrl()
    // steemconnect.profile_image = JSON.parse(vm.$data.steemconnect.user.json_metadata)['profile']['profile_image'];
}
