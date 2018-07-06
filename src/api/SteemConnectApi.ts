import * as sc2 from "sc2-sdk";

/*
Source: https://stackoverflow.com/a/979995/761265
*/
function parseQueryString(query: string) {
    const vars = query.split("&");
    const queryString: { [x: string]: any; } = {};
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      const key: string = decodeURIComponent(pair[0]);
      const value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof queryString[key] === "undefined") {
        queryString[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof queryString[key] === "string") {
        const arr = [queryString[key], decodeURIComponent(value)];
        queryString[key] = arr;
        // If third or later entry with this name
      } else {
        queryString[key].push(decodeURIComponent(value));
      }
    }
    return queryString;
  }

export class SteemConnectApi {
    private static LS_ACCESS_TOKEN_KEY = "ec2accesstoken";
    private static SC2_APP_ACCOUNT = "wisevote.app";

    public loginUrl: string;
    public loggedIn: boolean = false;
    public account: string | undefined = undefined;
    public error: string = "";

    private steemConnectV2: sc2.SteemConnectV2;
    private metadata: object | undefined = undefined;

    public constructor() {
        const accessToken = parseQueryString(window.location.search.substring(1)).access_token
            || localStorage.getItem(SteemConnectApi.LS_ACCESS_TOKEN_KEY);

        const callbackURL = (location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
        "http://localhost:8080/" : "https://wise.vote/");

        this.steemConnectV2 = sc2.Initialize({
            app: SteemConnectApi.SC2_APP_ACCOUNT,
            callbackURL: callbackURL,
            scope: ["custom_json"],
        });

        this.loginUrl = "https://steemconnect.com/oauth2/authorize"
            + "?client_id=" + SteemConnectApi.SC2_APP_ACCOUNT
            + "&redirect_uri=" + encodeURIComponent(callbackURL)
            + "&scope=custom_json";

        if (accessToken) {
            this.loggedIn = true;
            this.steemConnectV2.setAccessToken(accessToken);
            this.steemConnectV2.me((error: Error, result: { account: string, user_metadata: object }) => {
                if (!error) {
                  this.account = result.account;
                  this.metadata = result.user_metadata;
                  this.loggedIn = true;
                  this.error = "";
                  localStorage.setItem(SteemConnectApi.LS_ACCESS_TOKEN_KEY, accessToken);
                } else {
                    this.error = error.message;
                    this.loggedIn = false;
                }
            });
        }
    }
    // https://v2.steemconnect.com/api/oauth2/
    // authorize?client_id=wise.vote&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&scope=custom_json
    // https://steemconnect.com/api/oauth2/authorize

    //working:
    // https://steemconnect.com/oauth2/authorize?client_id=busy.app&redirect_uri=https%3A%2F%2Fsteemit.github.io%2Fexample-steemconnect-angular&scope=vote,comment

    // TODO public getProfileImageUrl()
    // steemconnect.profile_image = JSON.parse(vm.$data.steemconnect.user.json_metadata)['profile']['profile_image'];
}
