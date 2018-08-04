import { ContainerActions, ContainerActionTypes } from './container.actions';

export interface ContainerState {
    currentContainerIndex: number | null;
    error: string;
    lockValues: IlockValue[];
}

export const initialContainerState: ContainerState = {
    currentContainerIndex: null,
    error: '',
    lockValues: []
};

export interface IlockValue {
    lockId: number;
    currentValue: string;
    solution: string;
}

export function containerReducer(state = initialContainerState, action: ContainerActions): ContainerState {
    let lv = state.lockValues;
    switch (action.type) {
        case ContainerActionTypes.SetCurrentContainer:
            return {
                ...state,
                currentContainerIndex: action.payload
            };
        case ContainerActionTypes.SetLock:
            const idx = lv.findIndex(l => l.lockId === action.payload.lockId);
            lv[idx].currentValue = action.payload.currentValue;
            return {
                ...state,
                lockValues: lv
            };

        case ContainerActionTypes.InitializeContest:
            lv = action.payload.locks.map(l => ({lockId: l.id, currentValue: l.currentValue, solution: l.solution}));
            return {
                ...state,
                currentContainerIndex: 0,
                lockValues: lv,
                error: ''
            };
        default:
            return state;
    }
}

