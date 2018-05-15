import { ActionTree } from "vuex";
import { State } from "./State";

export const actions: ActionTree<State, State> = {
    setVoterUsername: ({ commit, dispatch, state }, voterUsername: string): void => {
        commit("setVoterUsername", voterUsername);
        dispatch("checkRulesetsLoadedFor");
    },
    setDelegatorUsername: ({ commit, dispatch, state }, delegatorUsername: string): void => {
        commit("setDelegatorUsername", delegatorUsername);
        dispatch("checkRulesetsLoadedFor");
    },
    setRulesetsLoadedFor: ({ commit, dispatch, state }, payload: {voter: string, delegator: string}): void => {
        commit("setRulesetsLoadedFor", payload);
        dispatch("checkRulesetsLoadedFor");
    },
    checkRulesetsLoadedFor: ({ commit, dispatch, state }): void => {
        if (state.voterUsername !== state.rulesetsLoadedFor.voter
                || state.delegatorUsername !== state.rulesetsLoadedFor.delegator) {
            commit("setRulesetsLoadedFor", { voter: "", delegator: "" });
            commit("setRulesets", { rulesets: [] });
        }
    }
};
