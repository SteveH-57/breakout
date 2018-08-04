import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
/* NgRx */
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as appActions from './app.actions';
import { BreakoutService } from '../services/breakout.service';

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private breakoutService: BreakoutService,
    ) {
        this.actions$.subscribe(t => console.log('effects', t));
    }

    @Effect()
    loadContest$ = this.actions$.pipe(
        ofType(appActions.BreakoutActionTypes.GetContests),
        mergeMap(action =>
            this.breakoutService.getContests().pipe(
                map(contests => {
                    this.breakoutService.contests = contests;
                    return new appActions.LoadSuccess(contests);
                }
                ),
                catchError(err => of(new appActions.SomethingFailed(err)))
            )
        )
    );
}
