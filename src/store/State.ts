import { smartvotes_ruleset } from "steem-smartvotes";

export interface State {
    voterUsername:  string;
    delegatorUsername:  string;
    voterThatExists: string;
    delegatorThatExists: string;
    rulesets: smartvotes_ruleset [];
}