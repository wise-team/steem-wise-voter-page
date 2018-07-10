import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { State, state, persistentPaths } from "./State";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

declare const __VERSION__: string;
export const PERSISTENCE_LOCALSTORAGE_KEY = "steemwise_" + (__VERSION__ ? __VERSION__ : "");

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state,
  getters,
  actions,
  mutations,
  plugins: [
    createPersistedState({
      key: PERSISTENCE_LOCALSTORAGE_KEY,
      paths: persistentPaths,
    }),
  ],
});

