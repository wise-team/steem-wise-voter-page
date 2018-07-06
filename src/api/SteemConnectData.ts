
export interface SteemConnectData {
    account: { id: string; name: string; json_metadata: string; } | undefined;
    accessToken: string | undefined;
    loggedIn: boolean;
    error: string;
}
