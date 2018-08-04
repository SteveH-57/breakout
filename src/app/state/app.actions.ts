import { Icontest } from '../models/iContest';

/* NgRx */
import { Action } from '@ngrx/store';
export enum BreakoutActionTypes {
    LoadSuccess = '[Breakout] Load Success',
    SetCurrentContest = '[Breakout] Set Current Contest',
    GetContests = '[Breakout] Get Available Contests',
    SaveContestState = '[Breakout] Save Contest State',
    SomethingFailed = '[Breakout] Error',
    UserMessage = '[Breakout] User Message'
}

export class SetCurrentContest implements Action {
    readonly type = BreakoutActionTypes.SetCurrentContest;

    constructor(public payload: number) { }
}
export class GetContests implements Action {
    readonly type = BreakoutActionTypes.GetContests;
}
export class SaveContestState implements Action {
    readonly type = BreakoutActionTypes.SaveContestState;

    constructor(public payload: number) { }
}
export class SomethingFailed implements Action {
    readonly type = BreakoutActionTypes.SomethingFailed;

    constructor(public payload: any) { }
}

export class LoadSuccess implements Action {
    readonly type = BreakoutActionTypes.LoadSuccess;
    constructor(public payload: Icontest[]) { }
}

export class UserMessage implements Action {
    readonly type = BreakoutActionTypes.UserMessage;
    constructor(public payload: string) { }
}

export type BreakoutActions = SetCurrentContest
    | LoadSuccess
    | GetContests
    | SaveContestState
    | UserMessage
    | SomethingFailed;
