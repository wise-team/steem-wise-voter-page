import { ActionTree } from "vuex";
import { State } from "./State";
import { Api } from "../api/Api";
import { SetRules, SendVoteorder } from "steem-wise-core";

export const actions: ActionTree<State, State> = {
    setVoterUsername: ({ commit, dispatch, state }, voterUsername: string): void => {
        commit("setVoterUsername", voterUsername);
        dispatch("checkRulesetsLoadedFor");
        dispatch("setVoteData", state.voteData); // reset
    },
    setDelegatorUsername: ({ commit, dispatch, state }, delegatorUsername: string): void => {
        commit("setDelegatorUsername", delegatorUsername);
        dispatch("checkRulesetsLoadedFor");
        dispatch("setVoteData", state.voteData); // reset
    },
    setRulesetsLoadedFor: ({ commit, dispatch, state }, payload: {voter: string, delegator: string}): void => {
        commit("setRulesetsLoadedFor", payload);
        dispatch("checkRulesetsLoadedFor");
    },
    checkRulesetsLoadedFor: ({ commit, dispatch, state }): void => {
        if (state.voterUsername !== state.rulesetsLoadedFor.voter
                || state.delegatorUsername !== state.rulesetsLoadedFor.delegator) {
            commit("setRulesetsLoadedFor", { voter: "", delegator: "" });
            commit("setRules", { rules: { rulesets: [] } });
            commit("setSelectedRulesetIndex", -1);
        }
    },
    loadRulesets: ({ commit, dispatch, state }): void => {
        commit("setRulesetLoadingState", {inProggress: true, error: "", message: "Checking if accounts exist..."});
        const voterUsername = state.voterUsername;
        const delegatorUsername = state.delegatorUsername;
        Api.validateAccountsExistence(delegatorUsername, voterUsername)
        .then(() => {
            commit("setRulesetLoadingState", {
                inProggress: true, error: "", message: "Accounts exist. Loading rulesets...",
            });
        })
        .then(Api.loadRulesets(delegatorUsername, voterUsername))
        .then((rules: SetRules) => {
            commit("setRules", { rulesets: rules.rulesets });
            dispatch("setSelectedRulesetIndex", (rules.rulesets.length > 0 ? 0 : -1));
            commit("setRulesetLoadingState", { inProggress: false, error: "", message: "" });
            commit("setRulesetsLoadedFor", { voter: voterUsername, delegator: delegatorUsername });
        })
        .catch(error => {
            commit("setRulesetLoadingState", { inProggress: false, error: error.message, message: ""});
        });
    },
    setSelectedRulesetIndex: ({ commit, dispatch, state }, payload: number): void => {
        commit("setSelectedRulesetIndex", payload);
        dispatch("setVoteData", state.voteData);
    },
    setVoteData: ({ commit, dispatch, state },
                  payload: { author: string, permlink: string, weight: number, action: "upvote" | "flag" }): void => {
        commit("setVoteData", payload);
        commit("setSent", false);
        dispatch("setValidated", false);
    },
    validateVoteorder: ({ commit, dispatch, state }, payload: boolean): void => {
        commit("setVoteorderValidationState", {inProggress: true, error: "", message: "Validating voteorder..."});
        commit("setSent", false);
        const voteorder: SendVoteorder = {
            rulesetName: state.rules.rulesets[state.selectedRulesetIndex].name,
            author: state.voteData.author,
            permlink: state.voteData.permlink,
            weight: state.voteData.weight,
        };
        const delegator = state.delegatorUsername;
        Api.validateVoteorder(delegator, state.voterUsername, voteorder, (msg: string, proggress: number): void => {
            commit("setVoteorderValidationState", { inProggress: true, error: "", message: msg });
        })
        .then(() => {
            commit("setVoteorderValidationState", { inProggress: false, error: "", message: "" });
            commit("setValidated", true);
        })
        .catch(error => {
            commit("setVoteorderValidationState", { inProggress: false, error: error.message, message: ""});
            commit("setValidated", false);
        });
    },
    setValidated: ({ commit, dispatch, state }, payload: boolean): void => {
        commit("setValidated", payload);
    },
    sendSmartvote: ({ commit, dispatch, state }, payload: boolean): void => {
        commit("setSendingState", {inProggress: true, error: "", message: "Sending voteorder..."});
        commit("setSent", false);
        const voteorder: SendVoteorder = {
            rulesetName: state.rules.rulesets[state.selectedRulesetIndex].name,
            author: state.voteData.author,
            permlink: state.voteData.permlink,
            weight: parseInt(state.voteData.weight + "", 10),
        };
        const delegator = state.delegatorUsername;
        Api.sendVoteorder(state.voterUsername, state.postingWif, delegator, voteorder,
                (msg: string, proggress: number): void => {
            commit("setSendingState", { inProggress: true, error: "", message: msg });
        })
        .then(() => {
            commit("setSendingState", { inProggress: false, error: "", message: "" });
            commit("setSent", true);
        })
        .catch((error: Error) => {
            commit("setSendingState", { inProggress: false, error: error.message, message: ""});
            commit("setSent", false);
        });
    },
};
