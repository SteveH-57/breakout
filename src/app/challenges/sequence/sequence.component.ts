import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Ilock } from '../../models/iContest';
import { BreakoutService } from '../../services/breakout.service';
import { Store, select } from '../../../../node_modules/@ngrx/store';
import * as fromContainers from '../../containers/state/container.reducer';
import * as fromAppSelectors from '../../state/app.selector';
import { takeWhile } from '../../../../node_modules/rxjs/operators';

interface Iseq {
  key: string;
  count: number;
}

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss']
})
export class SequenceComponent implements OnInit, OnDestroy {
  @Input()lockId: number;
  lock: Ilock = null;
  result: Iseq[] = [];
  colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  componentActive = true;
  ngOnInit() {
    this.store.pipe(select(fromAppSelectors.getContest),
    takeWhile(() => this.componentActive))
      .subscribe(c => {
        if ( c ) {
          this.lock = this.data.contest.locks.find(l => l.id === this.lockId );
        }
      });
  }

  constructor( private data: BreakoutService,
               private store: Store<fromContainers.ContainerState>
  ) { }

  ngOnDestroy() {
    this.componentActive = false;
  }

  press(key: string) {
    if (this.result.length > 0 ) {
      const testItem = this.result[this.result.length - 1];
      if ( testItem.key === key ) {
        this.result[this.result.length - 1].count += 1;
      } else {
        this.result.push({ key: key, count: 1 });
      }
    } else {
      this.result.push({ key: key, count: 1 });
    }
  }

  finalResult(): string {
    return this.result.map(r => `${r.key}${r.count}`).join('');
  }
}

