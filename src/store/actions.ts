/* tslint:disable no-empty no-console */
import { ActionTree } from "vuex";
import { State } from "./State";
import { Api } from "../api/Api";
import { SetRules, SendVoteorder } from "steem-wise-core";
import { SteemConnectApiHelper } from "../api/SteemConnectApiHelper";
import { SteemConnectData } from "../api/SteemConnectData";
import { Promise } from "bluebird";
import { Mutations } from "./mutations";

export const actions: ActionTree<State, State> = {
    setVoterUsername: ({ commit, dispatch, state }, voterUsername: string): void => {
        commit(Mutations.setVoterUsername, voterUsername);
        dispatch("checkRulesetsLoadedFor");
        dispatch("setVoteData", state.voteData); // reset
    },
    setDelegatorUsername: ({ commit, dispatch, state }, delegatorUsername: string): void => {
        commit(Mutations.setDelegatorUsername, delegatorUsername);
        dispatch("checkRulesetsLoadedFor");
        dispatch("setVoteData", state.voteData); // reset
    },
    setRulesetsLoadedFor: ({ commit, dispatch, state }, payload: {voter: string, delegator: string}): void => {
        commit(Mutations.setRulesetsLoadedFor, payload);
        dispatch("checkRulesetsLoadedFor");
    },
    checkRulesetsLoadedFor: ({ commit, dispatch, state }): void => {
        if (state.voterUsername !== state.rulesetsLoadedFor.voter
                || state.delegatorUsername !== state.rulesetsLoadedFor.delegator) {
            commit(Mutations.setRulesetsLoadedFor, { voter: "", delegator: "" });
            commit(Mutations.setRules, { rules: { rulesets: [] } });
            commit(Mutations.setSelectedRulesetName, "");
        }
    },
    loadRulesets: ({ commit, dispatch, state }): void => {
        commit(Mutations.setRulesetLoadingState, {
            inProggress: true, error: "", message: "Checking if accounts exist...",
        });
        const voterUsername = state.voterUsername;
        const delegatorUsername = state.delegatorUsername;
        Api.validateAccountsExistence(delegatorUsername, voterUsername)
        .then(() => {
            commit(Mutations.setRulesetLoadingState, {
                inProggress: true, error: "", message: "Accounts exist. Loading rulesets...",
            });
        })
        .then(Api.loadRulesets(delegatorUsername, voterUsername))
        .then((rules: SetRules) => {
            commit(Mutations.setRules, { rules: { rulesets: rules.rulesets }});
            dispatch("setSelectedRulesetName", (rules.rulesets.length > 0 ? rules.rulesets[0] : ""));
            commit(Mutations.setRulesetLoadingState, { inProggress: false, error: "", message: "" });
            commit(Mutations.setRulesetsLoadedFor, { voter: voterUsername, delegator: delegatorUsername });
        })
        .catch(error => {
            commit(Mutations.setRulesetLoadingState, { inProggress: false, error: error.message, message: ""});
        });
    },
    setSelectedRulesetName: ({ commit, dispatch, state }, payload: string): void => {
        commit(Mutations.setSelectedRulesetName, payload);
        dispatch("setVoteData", state.voteData);
    },
    setVoteData: ({ commit, dispatch, state },
                  payload: { author: string, permlink: string, weight: number, action: "upvote" | "flag" }): void => {
        commit(Mutations.setVoteData, payload);
        commit(Mutations.setSent, false);
        dispatch("setValidated", false);
    },
    validateVoteorder: ({ commit, dispatch, state }, payload: boolean): void => {
        commit(Mutations.setVoteorderValidationState, {
            inProggress: true, error: "", message: "Validating voteorder...",
        });
        commit(Mutations.setSent, false);
        const voteorder: SendVoteorder = {
            rulesetName: state.selectedRulesetName,
            author: state.voteData.author,
            permlink: state.voteData.permlink,
            weight: state.voteData.weight,
        };
        const delegator = state.delegatorUsername;
        Api.validateVoteorder(delegator, state.voterUsername, voteorder, (msg: string, proggress: number): void => {
            commit(Mutations.setVoteorderValidationState, { inProggress: true, error: "", message: msg });
        })
        .then(() => {
            commit(Mutations.setVoteorderValidationState, { inProggress: false, error: "", message: "" });
            commit(Mutations.setValidated, true);
            dispatch("updateBlockchainOps");
        })
        .catch(error => {
            commit(Mutations.setVoteorderValidationState, { inProggress: false, error: error.message, message: ""});
            commit(Mutations.setValidated, false);
        });
    },
    setValidated: ({ commit, dispatch, state }, payload: boolean): void => {
        commit(Mutations.setValidated, payload);
    },
    updateBlockchainOps: ({ commit, dispatch, state }): void => {
        const voteorder: SendVoteorder = {
            rulesetName: state.selectedRulesetName,
            author: state.voteData.author,
            permlink: state.voteData.permlink,
            weight: state.voteData.weight,
        };
        Api.generateVoteorderCustomJSON(state.voterUsername, state.delegatorUsername,
            voteorder, () => {}, true /* skip validation */)
            .then((ops: object []) => {
                commit(Mutations.setBlockchainOps, ops);
            })
            .catch((error: Error) => {
                commit(Mutations.setSendingState, {inProggress: false, error: error.message, message: ""});
                console.error(error);
            });
    },
    setSteemConnectData: ({ commit, dispatch, state }, payload: SteemConnectData): void => {
        commit(Mutations.setSteemConnectData, payload);
        if (payload.account) {
            dispatch("setVoterUsername", payload.account.name);
        }
    },
    initializeSteemConnect: ({ commit, dispatch, state }, payload: boolean): void => {
        SteemConnectApiHelper.initialize((result: SteemConnectData): void => {
            dispatch("setSteemConnectData", result);
        });
    },
    logoutFromSteemConnect: ({ commit, dispatch, state }, payload: boolean): void => {
        SteemConnectApiHelper.logout((result: SteemConnectData): void => {
            dispatch("setSteemConnectData", result);
        });
    },
    sendWISEVoteUsingPostingKey: ({ commit, dispatch, state }, payload: { postingWif: string }): void => {
        commit(Mutations.setSendingState, {inProggress: true, error: "", message: "Sending voteorder..."});
        commit(Mutations.setSent, false);
        const voteorder: SendVoteorder = {
            rulesetName: state.selectedRulesetName,
            author: state.voteData.author,
            permlink: state.voteData.permlink,
            weight: parseInt(state.voteData.weight + "", 10),
        };
        const delegator = state.delegatorUsername;
        Api.sendVoteorder(state.voterUsername, payload.postingWif, delegator, voteorder,
                (msg: string, proggress: number): void => {
            commit(Mutations.setSendingState, { inProggress: true, error: "", message: msg });
        })
        .then(() => {
            commit(Mutations.setSendingState, { inProggress: false, error: "", message: "" });
            commit(Mutations.setSent, true);
        })
        .catch((error: Error) => {
            commit(Mutations.setSendingState, { inProggress: false, error: error.message, message: ""});
            commit(Mutations.setSent, false);
        });
    },
    sendWISEVoteUsingSteemconnect: ({ commit, dispatch, state }, payload: boolean): void => {
        commit(Mutations.setSendingState, {inProggress: true, error: "", message: "Sending voteorder..."});
        commit(Mutations.setSent, false);
        const voteorder: SendVoteorder = {
            rulesetName: state.selectedRulesetName,
            author: state.voteData.author,
            permlink: state.voteData.permlink,
            weight: parseInt(state.voteData.weight + "", 10),
        };
        const delegator = state.delegatorUsername;
        Api.generateVoteorderCustomJSON(state.voterUsername, delegator, voteorder,
                (msg: string, proggress: number): void => {
            commit(Mutations.setSendingState, { inProggress: true, error: "", message: msg });
        }, false)
        .then((operations: object []) => {
            return new Promise((resolve, reject) => {
                SteemConnectApiHelper.broadcast(operations, (error: Error | undefined, result: any) => {
                    if (error) reject(error);
                    else resolve();
                });
            });
        })
        .then(() => {
            commit(Mutations.setSendingState, { inProggress: false, error: "", message: "" });
            commit(Mutations.setSent, true);
        })
        .catch((error: Error) => {
            commit(Mutations.setSendingState, { inProggress: false, error: error.message, message: ""});
            commit(Mutations.setSent, false);
        });
    },
};
