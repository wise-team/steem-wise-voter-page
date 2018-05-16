import { State } from "./State";

export const getters = {
    rulesSelectorFormEnabled: (state: State) => {
        return state.delegatorUsername.length > 0 && state.voterUsername.length > 0;
    },
    voteDataFormEnabled: (state: State) => state.rulesets.length > 0 && state.selectedRulesetIndex > -1,
    sendFormEnabled: (state: State) => false, // TODO
};
