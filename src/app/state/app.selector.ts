import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from './app.reducer';

const getContestFeatureState = createFeatureSelector<fromApp.State>('Breakout');

export const getContests = createSelector(
    getContestFeatureState,
    state => state.contests
);

export const getContest = createSelector(
    getContestFeatureState,
    state => {
        const result = state.contests[state.currentContestIndex];
        return result;
    }
);

export const getUserMessage = createSelector(
    getContestFeatureState,
    state => {
        const result = state.userMessage;
        return result;
    }
);
