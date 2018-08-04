import { Icontest, Ilock } from '../../models/iContest';

/* NgRx */
import { Action } from '@ngrx/store';
import { ContainerState, IlockValue } from './container.reducer';
export enum ContainerActionTypes {
    SetCurrentContainer = '[Container] Set Current Container',
    InitializeContest = '[Container] Initialize Contest',
    SomethingFailed = '[Container] Error',
    SetLock = '[Container] Set Lock'

}
export class SetCurrentContainer implements Action {
    readonly type = ContainerActionTypes.SetCurrentContainer;

    constructor(public payload: number) { }
}

export class InitializeContest implements Action {
    readonly type = ContainerActionTypes.InitializeContest;

    constructor(public payload: Icontest) { }
}
export class SomethingFailed implements Action {
    readonly type = ContainerActionTypes.SomethingFailed;

    constructor(public payload: any) { console.log('ERROR ->', payload); }
}

export class SetLock implements Action {
    readonly type = ContainerActionTypes.SetLock;
    constructor(public payload: IlockValue) { }
}

export type ContainerActions = SetCurrentContainer
    | SomethingFailed
    | InitializeContest
    | SetLock;
