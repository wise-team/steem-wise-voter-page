import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { State, state, persistentPaths } from "./State";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";


Vue.use(Vuex);

export default new Vuex.Store<State>({
  state,
  getters,
  actions,
  mutations,
  plugins: [
    createPersistedState({
      paths: persistentPaths,
    }),
  ],
});
