import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
/* NgRx */
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as containerActions from './container.actions';
@Injectable()
export class ContainerEffects {

    constructor(private actions$: Actions) {
         this.actions$.subscribe(t => console.log('container effects', t));
    }

}
