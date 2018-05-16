import { State } from "./State";

export const getters = {
    rulesSelectorFormEnabled: (state: State) => {
        return state.delegatorUsername.length > 0 && state.voterUsername.length > 0;
    },
    voteDataFormEnabled: (state: State) => getters.rulesSelectorFormEnabled(state)
                     && state.rulesets.length > 0 && state.selectedRulesetIndex > -1,
    validationButtonEnabled: (state: State) => getters.voteDataFormEnabled(state)
                    && state.voteData.author.length > 0
                    && state.voteData.permlink.length > 0
                    && state.voteData.action.length > 0
                    && state.voteData.weight > 0 && state.voteData.weight <= 10000
                    && ! state.voteorderValidationState.inProggress,
    sendFormEnabled: (state: State) => getters.validationButtonEnabled(state) && state.validated,
    sendButtonEnabled: (state: State) => getters.sendFormEnabled(state) && state.postingWif.length > 0
                    && !state.sendingState.inProggress,
};
