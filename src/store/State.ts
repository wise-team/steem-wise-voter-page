import { smartvotes_ruleset } from "steem-smartvotes";

export interface State {
    voterUsername:  string;
    delegatorUsername:  string;
    voterExists: boolean;
    delegatorExists: boolean;
    rulesets: smartvotes_ruleset [];
}