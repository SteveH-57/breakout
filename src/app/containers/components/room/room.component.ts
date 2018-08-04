import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Store, select } from '@ngrx/store';

import * as fromContainer from '../../state/container.reducer';
import * as fromContainerSelectors from '../../state/container.selectors';
import * as utilities from '../../../shared/utilities';
import { takeWhile } from 'rxjs/operators';
import { BreakoutService } from '../../../services/breakout.service';
import { Iroom } from '../../../models/iContest';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  backgroundStyle: SafeStyle = null;
  componentActive = true;
  container: Iroom;

  constructor(
    private sanitizer: DomSanitizer,
    private store: Store<fromContainer.ContainerState>,
    private breakoutService: BreakoutService) { }

  ngOnInit() {
    this.store.pipe(select(fromContainerSelectors.getCurrentViewId),
      takeWhile(() => this.componentActive))
      .subscribe(c => {
        this.container = this.breakoutService.contest.rooms[c.containerIndex];
        const backGround = this.breakoutService.contest.rooms[c.containerIndex].background;
        this.backgroundStyle = this.sanitizer.bypassSecurityTrustStyle(utilities.untrustedStyle(backGround));
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
