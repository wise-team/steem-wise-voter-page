import Vue from 'vue'
import Vuex from 'vuex'
import { ActionTree } from 'vuex';
import { smartvotes_ruleset } from "steem-smartvotes";

import { State } from "./State";

Vue.use(Vuex);

export const state: State = {
    voterUsername: '' as string,
    delegatorUsername: '' as string,
    rulesetsLoadedFor: { voter: '', delegator: '' },
    rulesets: [] as smartvotes_ruleset []
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
    setVoterUsername (state: State, voterUsername: string) {
        state.voterUsername = voterUsername;
    },
    setDelegatorUsername (state: State, delegatorUsername: string) {
        state.delegatorUsername = delegatorUsername;
    },
    setRulesetsLoadedFor (state: State, payload: {voter: string, delegator: string}) {
        state.rulesetsLoadedFor = { voter: payload.voter, delegator: payload.delegator };
    },
    setRulesets (state: State, payload: { rulesets: smartvotes_ruleset [] }) {
        state.rulesets = payload.rulesets;
    },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions: ActionTree<State, State> = {
    setVoterUsername: ({ commit, dispatch, state }, voterUsername: string): void => {
        commit('setVoterUsername', voterUsername);
        dispatch('checkRulesetsLoadedFor');
    },
    setDelegatorUsername: ({ commit, dispatch, state }, delegatorUsername: string): void => {
        commit('setDelegatorUsername', delegatorUsername);
        dispatch('checkRulesetsLoadedFor');
    },
    setRulesetsLoadedFor: ({ commit, dispatch, state }, payload: {voter: string, delegator: string}): void => {
        commit('setRulesetsLoadedFor', payload);
        dispatch('checkRulesetsLoadedFor');
    },
    checkRulesetsLoadedFor: ({ commit, dispatch, state }): void => {
        if (state.voterUsername !== state.rulesetsLoadedFor.voter || state.delegatorUsername !== state.rulesetsLoadedFor.delegator) {
            commit('setRulesetsLoadedFor', { voter: '', delegator: '' });
            commit('setRulesets', { rulesets: [] });
        }
    }
};

// getters are functions
const getters = {
    rulesSelectorFormEnabled: (state: State) => { return state.delegatorUsername.length > 0 && state.voterUsername.length > 0; },
    voteDataFormEnabled: (state: State) => state.rulesets.length > 0,
    sendFormEnabled: (state: State) => false, // TODO
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store<State>({
  state,
  getters,
  actions,
  mutations
});