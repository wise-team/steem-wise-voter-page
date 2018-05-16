import { smartvotes_ruleset } from "steem-smartvotes";

export interface State {
    voterUsername: string;
    delegatorUsername: string;
    rulesetsLoadedFor: { voter: string, delegator: string };
    rulesetLoadingState: { inProggress: boolean, error: string, message: string };
    rulesets: smartvotes_ruleset [];
    selectedRulesetIndex: number;
    voteData: { author: string, permlink: string, weight: number, action: "upvote" | "flag" };
    validated: boolean;
    voteorderValidationState: { inProggress: boolean, error: string, message: string };
}

export const state: State = {
    voterUsername: "",
    delegatorUsername: "",
    rulesetsLoadedFor: { voter: "", delegator: "" },
    rulesetLoadingState: { inProggress: false, error: "", message: "" },
    rulesets: [],
    selectedRulesetIndex: -1,
    voteData: { author: "", permlink: "", weight: -1, action: "upvote" },
    validated: false,
    voteorderValidationState: { inProggress: false, error: "", message: "" },
};
