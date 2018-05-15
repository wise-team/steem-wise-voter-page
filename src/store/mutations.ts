import { State } from "./State";
import { smartvotes_ruleset } from "steem-smartvotes";

export const mutations = {
    setVoterUsername(state: State, voterUsername: string) {
        state.voterUsername = voterUsername;
    },
    setDelegatorUsername(state: State, delegatorUsername: string) {
        state.delegatorUsername = delegatorUsername;
    },
    setRulesetsLoadedFor(state: State, payload: {voter: string, delegator: string}) {
        state.rulesetsLoadedFor = { voter: payload.voter, delegator: payload.delegator };
    },
    setRulesets(state: State, payload: { rulesets: smartvotes_ruleset [] }) {
        state.rulesets = payload.rulesets;
    },
    setRulesetLoadingState(state: State, payload: { inProggress: boolean, error: string, message: string }) {
        state.rulesetLoadingState = {
            inProggress: payload.inProggress, error: payload.error, message: payload.message
        };
    }
};
