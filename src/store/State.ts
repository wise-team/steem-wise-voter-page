import { SetRules } from "steem-wise-core";
import { SteemConnectApiHelper } from "../api/SteemConnectApiHelper";
import { SteemConnectData } from "../api/SteemConnectData";

export interface State {
    voterUsername: string;
    delegatorUsername: string;
    rulesetsLoadedFor: { voter: string, delegator: string };
    rulesetLoadingState: { inProggress: boolean, error: string, message: string };
    rules: SetRules;
    selectedRulesetName: string;
    voteData: { author: string, permlink: string, weight: number };
    validated: boolean;
    voteorderValidationState: { inProggress: boolean, error: string, message: string };
    sendingState: { inProggress: boolean, error: string, message: string };
    sent: boolean;
    steemConnectData: SteemConnectData;
    blockchainOps: object []; // for purpose of link generation
    automaticSendUntilTime: number; // if -1 => do not send automatically
}

export const persistentPaths: string [] = [
    "voterUsername",
    "delegatorUsername",
    "voteData",
    "selectedRulesetName",
    "rulesetsLoadedFor",
    "automaticSendUntilTime",
];

export const initialState: State = { // this is used for "form reset" button
    voterUsername: "",
    delegatorUsername: "",
    rulesetsLoadedFor: { voter: "", delegator: "" },
    rulesetLoadingState: { inProggress: false, error: "", message: "" },
    rules: { rulesets: [] },
    selectedRulesetName: "",
    voteData: { author: "", permlink: "", weight: 10000 },
    validated: false,
    voteorderValidationState: { inProggress: false, error: "", message: "" },
    sendingState: { inProggress: false, error: "", message: "" },
    sent: false,
    steemConnectData: SteemConnectApiHelper.getInitialState(),
    blockchainOps: [],
    automaticSendUntilTime: -1,
};

export const state: State = initialState;
