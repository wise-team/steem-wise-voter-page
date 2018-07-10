import * as _ from "lodash";

import { State, initialState } from "./State";
import { SetRules } from "steem-wise-core";
import { SteemConnectData } from "../api/SteemConnectData";

export class Mutations {
    public static setVoterUsername = "setVoterUsername";
    public static setDelegatorUsername = "setDelegatorUsername";
    public static setRulesetsLoadedFor = "setRulesetsLoadedFor";
    public static setRules = "setRules";
    public static setRulesetLoadingState = "setRulesetLoadingState";
    public static setSelectedRulesetName = "setSelectedRulesetName";
    public static setVoteData = "setVoteData";
    public static setVoteorderValidationState = "setVoteorderValidationState";
    public static setValidated = "setValidated";
    public static setSendingState = "setSendingState";
    public static setSent = "setSent";
    public static setSteemConnectData = "setSteemConnectData";
    public static setBlockchainOps = "setBlockchainOps";
    public static setAutomaticSendUntilTime = "setAutomaticSendUntilTime";
    public static resetFormData = "resetFormData";
}

export const mutations = {
    [Mutations.setVoterUsername](
        state: State, voterUsername: string,
    ) {
        state.voterUsername = voterUsername;
    },

    [Mutations.setDelegatorUsername](
        state: State, delegatorUsername: string,
    ) {
        state.delegatorUsername = delegatorUsername;
    },

    [Mutations.setRulesetsLoadedFor](
        state: State, payload: {voter: string, delegator: string},
    ) {
        state.rulesetsLoadedFor = { voter: payload.voter, delegator: payload.delegator };
    },

    [Mutations.setRules](
        state: State, payload: { rules: SetRules },
    ) {
        state.rules = payload.rules;
    },

    [Mutations.setRulesetLoadingState](
        state: State, payload: { inProggress: boolean, error: string, message: string },
    ) {
        state.rulesetLoadingState = {
            inProggress: payload.inProggress, error: payload.error, message: payload.message,
        };
    },

    [Mutations.setSelectedRulesetName](state: State, name: string) {
        state.selectedRulesetName = name;
    },

    [Mutations.setVoteData](
        state: State, payload: { author: string, permlink: string, weight: number },
    ) {
        state.voteData = {
            author: payload.author, permlink: payload.permlink, weight: payload.weight,
        };
    },

    [Mutations.setVoteorderValidationState](
        state: State, payload: { inProggress: boolean, error: string, message: string },
    ) {
        state.voteorderValidationState = {
            inProggress: payload.inProggress, error: payload.error, message: payload.message,
        };
    },

    [Mutations.setValidated](
        state: State, payload: boolean,
    ) {
        state.validated = payload;
    },

    [Mutations.setSendingState](
        state: State, payload: { inProggress: boolean, error: string, message: string },
    ) {
        state.sendingState = {
            inProggress: payload.inProggress, error: payload.error, message: payload.message,
        };
    },

    [Mutations.setSent](
        state: State, payload: boolean,
    ) {
        state.sent = payload;
    },

    [Mutations.setSteemConnectData](
        state: State, payload: SteemConnectData,
    ) {
        state.steemConnectData = payload;
    },

    [Mutations.setBlockchainOps](
        state: State, payload: object [],
    ) {
        state.blockchainOps = payload;
    },

    [Mutations.setAutomaticSendUntilTime](
        state: State, payload: number,
    ) {
        state.automaticSendUntilTime = payload;
    },

    [Mutations.resetFormData](
        state: State,
    ) {
        const newState = _.cloneDeep(initialState);
        if (state.steemConnectData.loggedIn) { // do not reset steeemconnect data
            newState.steemConnectData = state.steemConnectData;
            newState.voterUsername = state.voterUsername;
        }
        _.assign(state, newState);
                    /* tslint:disable no-console */
        console.log("Reset form data done");
    },
};
