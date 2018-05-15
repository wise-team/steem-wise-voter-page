import { ActionTree } from "vuex";
import { State } from "./State";
import { Api } from "../api/Api";
import { smartvotes_ruleset } from "steem-smartvotes";

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
    },
    loadRulesets: ({ commit, dispatch, state }): void => {
        commit("setRulesetLoadingState", {inProggress: true, error: "", message: "Checking if accounts exist..."});
        const voterUsername = state.voterUsername;
        const delegatorUsername = state.delegatorUsername;
        Api.validateAccountsExistence(delegatorUsername, voterUsername)
        .then(() => {
            commit("setRulesetLoadingState", {
                inProggress: true, error: "", message: "Accounts exist. Loading rulesets..."
            });
        })
        .then(Api.loadRulesets(delegatorUsername, voterUsername))
        .then((rulesets: smartvotes_ruleset []) => {
            commit("setRulesets", rulesets);
            commit("setRulesetLoadingState", { inProggress: false, error: "", message: ""});
            commit("setRulesetsLoadedFor", { voter: voterUsername, delegator: delegatorUsername });
        })
        .catch(error => {
            commit("setRulesetLoadingState", { inProggress: false, error: error.message, message: ""});
        });
    }
};
