declare module 'steemconnect' {
    export function Initialize(config: any): SteemConnectV2;

    export namespace Initialize {
        const prototype: {
        };
    }

    export class SteemConnectV2 {
        public setBaseURL(baseUrl: string): void;
        public setApp(app: any): void;
        public setCallbackURL(callbackUrl: string): void;
        public setAccessToken(accessToken: string): void;
        public removeAccessToken(): void;
        public setScope(scope: string []): void;
        public me(callback: (error: Error, result: { account: object, user_metadata: object }) => void): void;
        public revokeToken(callback: (error: Error, result: any) => void): void;
        public sign(name: string, params: string [], redirectUri: string): string;
        public broadcast(operations: object, callback: (error: Error | undefined, result: any) => void): void;
        public getLoginURL(state?: any): string;
    }
}

