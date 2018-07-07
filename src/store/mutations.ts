import { State } from "./State";
import { SetRules } from "steem-wise-core";
import { SteemConnectData } from "../api/SteemConnectData";

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
    setRules(state: State, payload: { rules: SetRules }) {
        state.rules = payload.rules;
    },
    setRulesetLoadingState(state: State, payload: { inProggress: boolean, error: string, message: string }) {
        state.rulesetLoadingState = {
            inProggress: payload.inProggress, error: payload.error, message: payload.message,
        };
    },
    setSelectedRulesetIndex(state: State, index: number) {
        state.selectedRulesetIndex = index;
    },
    setVoteData(state: State,
                payload: { author: string, permlink: string, weight: number }) {
        state.voteData = {
            author: payload.author, permlink: payload.permlink, weight: payload.weight,
        };
    },
    setVoteorderValidationState(state: State, payload: { inProggress: boolean, error: string, message: string }) {
        state.voteorderValidationState = {
            inProggress: payload.inProggress, error: payload.error, message: payload.message,
        };
    },
    setValidated(state: State, payload: boolean) {
        state.validated = payload;
    },
    setPostingWif(state: State, payload: string) {
        state.postingWif = payload;
    },
    setSendingState(state: State, payload: { inProggress: boolean, error: string, message: string }) {
        state.sendingState = {
            inProggress: payload.inProggress, error: payload.error, message: payload.message,
        };
    },
    setSent(state: State, payload: boolean) {
        state.sent = payload;
    },
    setSteemConnectData(state: State, payload: SteemConnectData) {
        state.steemConnectData = payload;
    },
    setBlockchainOps(state: State, payload: object []) {
        state.blockchainOps = payload;
    },
};
