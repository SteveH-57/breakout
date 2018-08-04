import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { BreakoutService } from '../../../services/breakout.service';
import * as fromApp from '../../../state/app.reducer';
import * as fromContainers from '../../state/container.reducer';
import * as fromContainersSelectors from '../../state/container.selectors';
import { Icontent, IsubContents } from '../../../models/iContest';
import * as utilities from '../../../shared/utilities';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-sub-contents',
  templateUrl: './sub-contents.component.html',
  styleUrls: ['./sub-contents.component.scss']
})
export class SubContentsComponent implements OnInit, OnDestroy {
  @Input() item: Icontent;
  viewItems: IsubContents[];
  componentActive = true;
  constructor(private sanitizer: DomSanitizer,
    private store: Store<fromContainers.ContainerState>,
    private appStore: Store<fromApp.State>,
    private data: BreakoutService) { }

  ngOnInit() {
    this.store.pipe(select(fromContainersSelectors.getCurrentViewId),
    takeWhile( () => this.componentActive))
      .subscribe(c => {
        if (this.item.lockId) {
          const lockValues = c.lockValues.find(l => l.lockId === this.item.lockId);
          if (lockValues.solution === lockValues.currentValue) {
            this.viewItems = this.item.contents;
          } else {
            this.viewItems = null;
          }
        }
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  imageBackground(content: IsubContents): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(utilities.untrustedStyle(content.image));
  }

  doSomething (content: IsubContents) {

  }
}
