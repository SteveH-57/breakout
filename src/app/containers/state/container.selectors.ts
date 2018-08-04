import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContainer from './container.reducer';

const getContainerFeatureState = createFeatureSelector<fromContainer.ContainerState>('containers');

export const getCurrentViewId = createSelector(
    getContainerFeatureState,
    state => {
        return {
            containerIndex: state.currentContainerIndex,
            lockValues: state.lockValues
        };
    }
);

export const getLock = (id: number) => createSelector(
    getContainerFeatureState,
    state => {
        return state.lockValues.find(l => l.lockId === id);
    }
);

