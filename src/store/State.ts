import { SetRules } from "steem-wise-core";

export interface State {
    voterUsername: string;
    delegatorUsername: string;
    rulesetsLoadedFor: { voter: string, delegator: string };
    rulesetLoadingState: { inProggress: boolean, error: string, message: string };
    rules: SetRules;
    selectedRulesetIndex: number;
    voteData: { category:string, author: string, permlink: string, weight: number };
    validated: boolean;
    voteorderValidationState: { inProggress: boolean, error: string, message: string };
    postingWif: string;
    sendingState: { inProggress: boolean, error: string, message: string };
    sent: boolean;
}

export const state: State = {
    voterUsername: "",
    delegatorUsername: "",
    rulesetsLoadedFor: { voter: "", delegator: "" },
    rulesetLoadingState: { inProggress: false, error: "", message: "" },
    rules: { rulesets: [] },
    selectedRulesetIndex: -1,
    voteData: { category: "", author: "", permlink: "", weight: 10000 },
    validated: false,
    voteorderValidationState: { inProggress: false, error: "", message: "" },
    postingWif: "",
    sendingState: { inProggress: false, error: "", message: "" },
    sent: false,
};
