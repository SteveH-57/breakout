import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Ilock } from '../../models/iContest';
import { Store } from '@ngrx/store';
import * as fromApp from '../../state/app.reducer';
import * as fromAppActions from '../../state/app.actions';
import * as fromContainers from '../../containers/state/container.reducer';
import * as fromContainerActions from '../../containers/state/container.actions';
import * as fromContainersSelectors from '../../containers/state/container.selectors';

@Component({
  selector: 'app-combo-lock',
  templateUrl: './combo-lock.component.html',
  styleUrls: ['./combo-lock.component.scss']
})

export class ComboLockComponent implements OnInit {
  @Input() comboLock: Ilock;
  currentReading: string;
  solution: string;
  tumbles: any[] = [];
  color: string;
  allowChanges = true;
  constructor(public dialogRef: MatDialogRef<ComboLockComponent>,
    private store: Store<fromContainers.ContainerState>,
    private appStore: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.store.select(fromContainersSelectors.getLock(this.comboLock.id))
      .subscribe(lockValue => {
        for (let i = 0; i < this.comboLock.tumblers; i++) {
          this.tumbles.push({
            options: this.comboLock.options,
            value: lockValue.currentValue.charAt(i),
            type: this.comboLock.type
          });
          this.currentReading = lockValue.currentValue;
          this.solution = lockValue.solution;
        }
      });
  }

  tumblerChange(index: number, evt) {
    const valueArray = this.currentReading.split('');
    valueArray[index] = evt;
    this.currentReading = valueArray.join('');
  }

  compare() {
    this.store.dispatch(new fromContainerActions
      .SetLock({ lockId: this.comboLock.id, currentValue: this.currentReading, solution: this.solution }));

    if (this.solution === this.currentReading) {
      this.color = 'green';
      this.allowChanges = false;
      this.appStore.dispatch(new fromAppActions.UserMessage(`Lock has been opened!`));
    }
  }

  close() {
    this.dialogRef.close(this.currentReading);
  }
}
