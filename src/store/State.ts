import { SetRules } from "steem-wise-core";
import { SteemConnectApiHelper } from "../api/SteemConnectApiHelper";
import { SteemConnectData } from "../api/SteemConnectData";

export interface State {
    voterUsername: string;
    delegatorUsername: string;
    delegatorVotingPower: number;
    delegatorVotingPowerLoadingState: { inProggress: boolean, loaded: boolean, error: string };
    rulesetsLoadedFor: { voter: string, delegator: string };
    rulesetLoadingState: { inProggress: boolean, error: string, message: string };
    rules: SetRules;
    selectedRulesetIndex: number;
    voteData: { author: string, permlink: string, weight: number };
    validated: boolean;
    voteorderValidationState: { inProggress: boolean, error: string, message: string };
    postingWif: string;
    sendingState: { inProggress: boolean, error: string, message: string };
    sent: boolean;
    steemConnectData: SteemConnectData;
}

export const state: State = {
    voterUsername: "",
    delegatorUsername: "",
    delegatorVotingPower: 0,
    delegatorVotingPowerLoadingState: { inProggress: false, loaded: false, error: "" },
    rulesetsLoadedFor: { voter: "", delegator: "" },
    rulesetLoadingState: { inProggress: false, error: "", message: "" },
    rules: { rulesets: [] },
    selectedRulesetIndex: -1,
    voteData: { author: "", permlink: "", weight: 10000 },
    validated: false,
    voteorderValidationState: { inProggress: false, error: "", message: "" },
    postingWif: "",
    sendingState: { inProggress: false, error: "", message: "" },
    sent: false,
    steemConnectData: SteemConnectApiHelper.getInitialState(),
};
