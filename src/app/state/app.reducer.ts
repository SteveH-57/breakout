import { Icontest } from '../models/iContest';
import { BreakoutActions, BreakoutActionTypes } from './app.actions';
import { ContainerState, initialContainerState } from '../containers/state/container.reducer';

export interface State {
    currentContestIndex: number | null;
    contests: Icontest[];
    error: string;
    currentContest: ContainerState;
    userMessage: string;
}

const initialState: State = {
    currentContestIndex: null,
    contests: [],
    error: '',
    currentContest: initialContainerState,
    userMessage: ''
};

export function reducer(state = initialState, action: BreakoutActions): State {
    switch (action.type) {
        case BreakoutActionTypes.SetCurrentContest:
            return {
                ...state,
                currentContestIndex: action.payload
            };
        case BreakoutActionTypes.GetContests:
            return state;
        case BreakoutActionTypes.LoadSuccess:
            return {
                ...state,
                contests: action.payload
            };
        case BreakoutActionTypes.UserMessage:
            return {
                ...state,
                userMessage: action.payload
            };
        case BreakoutActionTypes.SaveContestState:
            return state;
        case BreakoutActionTypes.SomethingFailed:
            return state;
        default:
            return state;
    }

}
