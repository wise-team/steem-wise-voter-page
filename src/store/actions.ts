/* tslint:disable no-empty no-console */
import { ActionTree } from "vuex";
import { State } from "./State";
import { Api } from "../api/Api";
import { SetRules, SendVoteorder } from "steem-wise-core";
import { SteemConnectApiHelper } from "../api/SteemConnectApiHelper";
import { SteemConnectData } from "../api/SteemConnectData";
import { Promise } from "bluebird";
import { Mutations } from "./mutations";

export class Actions {
    public static setVoterUsername = "setVoterUsername";
    public static setDelegatorUsername = "setDelegatorUsername";
    public static setRulesetsLoadedFor = "setRulesetsLoadedFor";
    public static checkRulesetsLoadedFor = "checkRulesetsLoadedFor";
    public static loadRulesets = "loadRulesets";
    public static setSelectedRulesetName = "setSelectedRulesetName";
    public static setVoteData = "setVoteData";
    public static validateVoteorder = "validateVoteorder";
    public static setValidated = "setValidated";
    public static updateBlockchainOps = "updateBlockchainOps";
    public static setSteemConnectData = "setSteemConnectData";
    public static initializeSteemConnect = "initializeSteemConnect";
    public static logoutFromSteemConnect = "logoutFromSteemConnect";
    public static sendWISEVoteUsingPostingKey = "sendWISEVoteUsingPostingKey";
    public static sendWISEVoteUsingSteemconnect = "sendWISEVoteUsingSteemconnect";
}

export const actions: ActionTree<State, State> = {
    [Actions.setVoterUsername]: (
        { commit, dispatch, state }, voterUsername: string,
    ): void => {
        commit(Mutations.setVoterUsername, voterUsername);
        dispatch(Actions.checkRulesetsLoadedFor);
        dispatch(Actions.setVoteData, state.voteData); // reset
    },

    [Actions.setDelegatorUsername]: (
        { commit, dispatch, state }, delegatorUsername: string,
    ): void => {
        commit(Mutations.setDelegatorUsername, delegatorUsername);
        dispatch(Actions.checkRulesetsLoadedFor);
        dispatch(Actions.setVoteData, state.voteData); // reset
    },

    [Actions.setRulesetsLoadedFor]: (
        { commit, dispatch, state }, payload: {voter: string, delegator: string},
    ): void => {
        commit(Mutations.setRulesetsLoadedFor, payload);
        dispatch(Actions.checkRulesetsLoadedFor);
    },

    [Actions.checkRulesetsLoadedFor]: (
        { commit, dispatch, state },
    ): void => {
        if (state.voterUsername !== state.rulesetsLoadedFor.voter
                || state.delegatorUsername !== state.rulesetsLoadedFor.delegator) {
            commit(Mutations.setRulesetsLoadedFor, { voter: "", delegator: "" });
            commit(Mutations.setRules, { rules: { rulesets: [] } });
            commit(Mutations.setSelectedRulesetName, "");
        }
    },

    [Actions.loadRulesets]: (
        { commit, dispatch, state },
    ): void => {
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
            dispatch(Actions.setSelectedRulesetName, (rules.rulesets.length > 0 ? rules.rulesets[0].name : ""));
            commit(Mutations.setRulesetLoadingState, { inProggress: false, error: "", message: "" });
            commit(Mutations.setRulesetsLoadedFor, { voter: voterUsername, delegator: delegatorUsername });
        })
        .catch(error => {
            commit(Mutations.setRulesetLoadingState, { inProggress: false, error: error.message, message: ""});
        });
    },

    [Actions.setSelectedRulesetName]: (
        { commit, dispatch, state }, payload: string,
    ): void => {
        commit(Mutations.setSelectedRulesetName, payload);
        dispatch(Actions.setVoteData, state.voteData);
    },

    [Actions.setVoteData]: (
        { commit, dispatch, state },
        payload: { author: string, permlink: string, weight: number, action: "upvote" | "flag" },
    ): void => {
        commit(Mutations.setVoteData, payload);
        commit(Mutations.setSent, false);
        dispatch(Actions.setValidated, false);
    },

    [Actions.validateVoteorder]: (
        { commit, dispatch, state },
    ): void => {
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
            dispatch(Actions.updateBlockchainOps);
        })
        .catch(error => {
            commit(Mutations.setVoteorderValidationState, { inProggress: false, error: error.message, message: ""});
            commit(Mutations.setValidated, false);
        });
    },

    [Actions.setValidated]: (
        { commit, dispatch, state }, payload: boolean,
    ): void => {
        commit(Mutations.setValidated, payload);
    },

    [Actions.updateBlockchainOps]: (
        { commit, dispatch, state },
    ): void => {
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

    [Actions.setSteemConnectData]: (
        { commit, dispatch, state }, payload: SteemConnectData,
    ): void => {
        commit(Mutations.setSteemConnectData, payload);
        if (payload.account) {
            dispatch(Actions.setVoterUsername, payload.account.name);
        }
    },

    [Actions.initializeSteemConnect]: (
        { commit, dispatch, state },
    ): void => {
        SteemConnectApiHelper.initialize((result: SteemConnectData): void => {
            dispatch(Actions.setSteemConnectData, result);
        });
    },

    [Actions.logoutFromSteemConnect]: (
        { commit, dispatch, state },
    ): void => {
        SteemConnectApiHelper.logout((result: SteemConnectData): void => {
            dispatch(Actions.setSteemConnectData, result);
        });
    },

    [Actions.sendWISEVoteUsingPostingKey]: (
        { commit, dispatch, state }, payload: { postingWif: string },
    ): void => {
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

    [Actions.sendWISEVoteUsingSteemconnect]: (
        { commit, dispatch, state },
    ): void => {
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
