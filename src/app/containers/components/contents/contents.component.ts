import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Icontent, IdisplayImage, Ilock, IcontentImages } from '../../../models/iContest';
import * as fromContainers from '../../state/container.reducer';
import * as fromContainersActions from '../../state/container.actions';
import * as fromContainersSelectors from '../../state/container.selectors';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import * as utilities from '../../../shared/utilities';
import { isDefined } from '@angular/compiler/src/util';
import { DynamicDialogComponent } from '../../../dynamic-dialog/dynamic-dialog.component';
import { MatDialog } from '@angular/material';
import { BreakoutService } from '../../../services/breakout.service';
import * as fromApp from '../../../state/app.reducer';
import * as fromAppActions from '../../../state/app.actions';

@Component({
  selector: 'app-room-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {
  @Input() viewIndex = 0;
  viewItems: Icontent[];
  lockResult: any;
  lockValues: fromContainers.IlockValue[];

  constructor(
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private store: Store<fromContainers.ContainerState>,
    private appStore: Store<fromApp.State>,
    private data: BreakoutService) { }

  ngOnInit() {
    this.store.pipe(select(fromContainersSelectors.getCurrentViewId))
      .subscribe(c => {
        this.viewItems = this.data.contest.rooms[c.containerIndex]
          .contents.filter(content => content.viewIndex === this.viewIndex);
        this.lockValues = c.lockValues;
      }
      );
  }

  itemBackground(display: IdisplayImage): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(utilities.untrustedStyle(display));
  }

  imageBackground(content: Icontent): SafeStyle {
    if (!isDefined(content.background)) { return null; }
    return this.itemBackground(content.background[0]);
  }

  typeBackground(content: Icontent): SafeStyle {
    let condition = '';
    let lock: fromContainers.IlockValue;
    const images: IcontentImages = this.data.contest.images.find(il => il.type === content.type);
    if (content.lockId) {
      lock = this.lockValues.find(l => l.lockId === content.lockId);
      condition = 'closed';
      if (lock) {
        condition = lock.currentValue === lock.solution ? 'opened' : 'closed';
      }
    }
    const image = images.images.find(i => i.condition === condition);
    return this.sanitizer.bypassSecurityTrustStyle(utilities.untrustedStyle(image));
  }

  doSomething(item: Icontent): void {
    let handled = false;
    if (isDefined(item.lockId) && this.value(item, 'canBeOpened', true)) {
      const lockValue = this.lockValues.find(l => l.lockId === item.lockId);
      const lock = this.data.contest.locks.find(l => l.id === item.lockId);
      if (lockValue.currentValue !== lockValue.solution) {
        const dialogRef = this.dialog.open(DynamicDialogComponent, {});
        dialogRef.componentInstance['data'] = { comboLock: lock };
        dialogRef.afterClosed().subscribe(result => {
          this.lockResult = result;
        });
        handled = true;
      }
    }
    if (!handled) {
      switch (item.type) {
        case 'door':
          if (isDefined(item.data)) {
            this.store.dispatch(new fromContainersActions.SetCurrentContainer(item.data));
          }
          break;
        case 'chair':
          const lockValue = this.lockValues.find(l => l.lockId === item.data);
          lockValue.currentValue = lockValue.currentValue === lockValue.solution ?
            lockValue.currentValue = '0' :
            lockValue.currentValue = lockValue.solution;
          this.store.dispatch(new fromContainersActions.SetLock(lockValue));
          if (lockValue.currentValue === lockValue.solution) {
            this.appStore.dispatch(new fromAppActions.UserMessage(`Something opened!`));
            this.appStore.dispatch(new fromAppActions.UserMessage(``));
          }
          break;
        default:
          break;
      }
    }
  }

  value(item: any, property: string, defaultValue: boolean): boolean {
    let result = defaultValue;
    if (isDefined(item[property])) {
      result = item[property];
    }
    return result;
  }
}
