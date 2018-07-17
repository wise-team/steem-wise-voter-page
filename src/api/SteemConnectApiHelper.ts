/* tslint:disable member-ordering no-console */
import * as sc2 from "sc2-sdk";
import { SteemConnectData } from "./SteemConnectData";
import { queryParams } from "../util/url-util";

export class SteemConnectApiHelper {
    private static LS_ACCESS_TOKEN_KEY = "ec2accesstoken";
    private static SC2_APP_ACCOUNT = "wisevote.app";
    private static SC2_CALLBACK_URL: string = (location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
                                            "http://localhost:8080/" : "https://wise.vote/");
    private static SC2_SCOPE: string [] = ["custom_json"];

    public static getLoginUrl(): string {
        return "https://steemconnect.com/oauth2/authorize"
        + "?client_id=" + SteemConnectApiHelper.SC2_APP_ACCOUNT
        + "&redirect_uri=" + encodeURIComponent(SteemConnectApiHelper.SC2_CALLBACK_URL)
        + "&scope=" + SteemConnectApiHelper.SC2_SCOPE.join(",");
    }

    public static getInitialState(): SteemConnectData {
        const accessToken = this.getAccessToken();
        return {
            account: undefined,
            accessToken: accessToken ? accessToken : "",
            loggedIn: !!accessToken,
            error: "",
        };
    }

    public static initialize(callback: (result: SteemConnectData) => void) {
        const accessToken = this.getAccessToken();
        if (queryParams.access_token && accessToken) {
            localStorage.setItem(SteemConnectApiHelper.LS_ACCESS_TOKEN_KEY, accessToken);
            window.location.search = "";
        }

        if (accessToken) {
            const steemConnectV2 = SteemConnectApiHelper.getSteemConnectObject();
            steemConnectV2.setAccessToken(accessToken);
            steemConnectV2.me((error: Error, result: { account: object, user_metadata: object }) => {
                if (!error) {
                    localStorage.setItem(SteemConnectApiHelper.LS_ACCESS_TOKEN_KEY, accessToken);
                    const loggedInResult: SteemConnectData = {
                        account: result.account as { id: string, name: string, json_metadata: string },
                        accessToken: accessToken,
                        loggedIn: true,
                        error: "",
                    };
                    callback(loggedInResult);
                } else {
                    const errorResult: SteemConnectData = {
                        account: undefined,
                        accessToken: accessToken,
                        loggedIn: false,
                        error: error.message,
                    };
                    console.error(error);
                    callback(errorResult);
                }
            });
        } else {
            const loggedOutResult: SteemConnectData = {
                account: undefined,
                accessToken: "",
                loggedIn: false,
                error: "",
            };
            callback(loggedOutResult);
        }
    }

    public static logout(callback: (result: SteemConnectData) => void) {
        const accessToken = this.getAccessToken();
        if (accessToken) {
            const steemConnectV2 = SteemConnectApiHelper.getSteemConnectObject();
            steemConnectV2.setAccessToken(accessToken);
            steemConnectV2.revokeToken((error: Error | undefined, result: any) => {
                if (error) {
                    const errorResult: SteemConnectData = {
                        account: undefined,
                        accessToken: accessToken,
                        loggedIn: false,
                        error: error.message,
                    };
                    console.error(error);
                    callback(errorResult);
                } else {
                    localStorage.removeItem(SteemConnectApiHelper.LS_ACCESS_TOKEN_KEY);
                    const loggedOutResult = {
                        account: undefined,
                        accessToken: "",
                        loggedIn: false,
                        error: "",
                    };
                    callback(loggedOutResult);
                    window.location.href = SteemConnectApiHelper.SC2_CALLBACK_URL;
                }
            });
        }
    }

    public static broadcast(operations: object [], callback: (error: Error | undefined, result: any) => void) {
        const accessToken = this.getAccessToken();
        if (accessToken) {
            const steemConnectV2 = SteemConnectApiHelper.getSteemConnectObject();
            steemConnectV2.setAccessToken(accessToken);
            steemConnectV2.broadcast(operations, (error: Error | undefined, result: any) => {
                if (error) callback(error, undefined);
                else callback(undefined, result);
            });
        } else {
            callback(new Error("Not logged in to SteemConnect."), undefined);
        }
    }

    private static getSteemConnectObject(): sc2.SteemConnectV2 {
        return sc2.Initialize({
            app: SteemConnectApiHelper.SC2_APP_ACCOUNT,
            callbackURL: SteemConnectApiHelper.SC2_CALLBACK_URL,
            scope: SteemConnectApiHelper.SC2_SCOPE,
        });
    }

    private static getAccessToken(): string | null {
        return queryParams.access_token
            || localStorage.getItem(SteemConnectApiHelper.LS_ACCESS_TOKEN_KEY);
    }
}
