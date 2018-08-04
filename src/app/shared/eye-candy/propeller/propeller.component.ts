import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-propeller',
  templateUrl: './propeller.component.html',
  styleUrls: ['./propeller.component.scss'],
  animations: [
    trigger('spin', [
      state('left', style({ transform: 'rotate(-360deg)' })),
      state('right', style({ transform: 'rotate(360deg)' })),
      state('reset', style({ transform: 'rotate(0deg)' })),
      transition('reset => left', animate('800ms')),
      transition('reset => right', animate('800ms')),
      transition('* => reset', animate('0ms'))
    ]
    )]
})
export class PropellerComponent implements OnInit {
  @Input() image = '';
  @Input() title = '';
  spinState = 'reset';
  @Output() action: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  spinLeft() {
    this.spinState = 'left';
    this.action.emit('L');
  }

  spinRight() {
    this.spinState = 'right';
    this.action.emit('R');
  }

  animationDone(event: AnimationEvent) {
    if (event['fromState'] === 'reset') {
      this.spinState = 'reset';
    }
  }

}
