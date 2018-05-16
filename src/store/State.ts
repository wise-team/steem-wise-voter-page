import { smartvotes_ruleset } from "steem-smartvotes";

export interface State {
    voterUsername: string;
    delegatorUsername: string;
    rulesetsLoadedFor: { voter: string, delegator: string };
    rulesetLoadingState: { inProggress: boolean, error: string, message: string };
    rulesets: smartvotes_ruleset [];
    selectedRulesetIndex: number;
    voteorderValidationState: { inProggress: boolean, error: string, message: string };
}

export const state: State = {
    voterUsername: "",
    delegatorUsername: "",
    rulesetsLoadedFor: { voter: "", delegator: "" },
    rulesetLoadingState: { inProggress: false, error: "", message: "" },
    rulesets: [],
    selectedRulesetIndex: -1,
    voteorderValidationState: { inProggress: false, error: "", message: "" },
};
