import { smartvotes_ruleset } from "steem-smartvotes";

export interface State {
    voterUsername: string;
    delegatorUsername: string;
    rulesetsLoadedFor: { voter: string, delegator: string };
    rulesets: smartvotes_ruleset [];
}

export const state: State = {
    voterUsername: "",
    delegatorUsername: "",
    rulesetsLoadedFor: { voter: "", delegator: "" },
    rulesets: []
};
