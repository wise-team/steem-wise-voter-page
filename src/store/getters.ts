import { State } from "./State";

export const getters = {
    rulesSelectorFormEnabled: (state: State) => {
        return state.delegatorUsername.length > 0 && state.voterUsername.length > 0;
    },
    voteDataFormEnabled: (state: State) => getters.rulesSelectorFormEnabled(state)
                     && state.rules.rulesets.length > 0 && state.selectedRulesetName.length > 0,
    validationButtonEnabled: (state: State) => getters.voteDataFormEnabled(state)
                    && state.voteData.author.length > 0
                    && state.voteData.permlink.length > 0
                    && state.voteData.weight >= -10000 && state.voteData.weight <= 10000
                    && ! state.voteorderValidationState.inProggress,
    sendFormEnabled: (state: State) => getters.validationButtonEnabled(state) && state.validated,
    sendButtonEnabled: (state: State) => getters.sendFormEnabled(state) && !state.sendingState.inProggress,
    canSendAutomatically: (state: State) => state.voterUsername.length > 0
                            && state.delegatorUsername.length > 0
                            && state.selectedRulesetName.length > 0
                            && state.voteData.author.length > 0
                            && state.voteData.permlink.length > 0,
};
