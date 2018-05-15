import Vue from 'vue'
import Vuex from 'vuex'
import { ActionTree } from 'vuex';
import { smartvotes_ruleset } from "steem-smartvotes";

import { State, state } from "./State";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters"


Vue.use(Vuex);

export default new Vuex.Store<State>({
  state,
  getters,
  actions,
  mutations
});