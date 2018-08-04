import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select, State } from '@ngrx/store';

import * as fromAppSelectors from './state/app.selector';
import * as fromAppActions from './state/app.actions';
import * as fromContainers from './containers/state/container.reducer';
import * as fromContainerActions from './containers/state/container.actions';

import { MatDialog, MatSnackBar } from '@angular/material';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Icontest } from './models/iContest';
import { BreakoutService } from './services/breakout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  componentActive = true;
  title = 'Breakout';
  lockResult: string;
  ready = false;
  contests$: Observable<Icontest[]>;
  containerNames: string[];

  constructor(
    private store: Store<fromContainers.ContainerState>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private data: BreakoutService
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromAppActions.GetContests());
    this.contests$ = this.store.pipe(select( fromAppSelectors.getContests ));
    // ToDo remove this code
    this.contests$.subscribe( c => {
      this.pickContest(0);
    });
    // end todo
    this.store.pipe(select(fromAppSelectors.getContest),
    takeWhile(() => this.componentActive))
      .subscribe(c => {
        if ( c ) {
          this.store.dispatch(new fromContainerActions.InitializeContest(c));
          this.data.contest = c;
          console.log('appcommonent', c);
          this.containerNames = c.rooms.map( x => x.name);
          this.ready = true;
        }
      });

      this.store.pipe(select(fromAppSelectors.getUserMessage),
      takeWhile(() => this.componentActive))
      .subscribe( message => {
        if ( message ) {
          this.snackBar.open(message, 'X', {duration: 2500});
        }
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  pickContest( index: number) {
    this.store.dispatch(new fromAppActions.SetCurrentContest(index));
  }

  pickContainer( index: number) {
    this.store.dispatch(new fromContainerActions.SetCurrentContainer( index));
  }

}

