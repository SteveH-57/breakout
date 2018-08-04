import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tumbler',
  templateUrl: './tumbler.component.html',
  styleUrls: ['./tumbler.component.scss']
})
export class TumblerComponent implements OnInit, OnChanges {
  @Input() value: string;
  @Input() options: string[] = [];
  @Input() type = 'numeric';
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  currentOptions: string[];
  standardOptions = [
    { name: 'numeric', values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
    {
      name: 'alphabetic', values: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    },
    { name: 'even', values: ['0', '2', '4', '6', '8'] },
    { name: 'odd', values: ['1', '3', '5', '7', '9'] },

  ];
  currentIndex = 0;
  constructor() { }


  ngOnInit() {
    // this.reset();
  }
  ngOnChanges() {
    this.reset();
  }
  private reset() {
    if (!this.standardOptions) { return; }
    this.currentOptions = this.options && this.options.length > 0 ?
      this.options :
      this.standardOptions.find(x => x.name === this.type).values;
    this.currentIndex = this.currentOptions.findIndex(x => x === this.value);
    if (this.currentIndex === -1) {
      this.currentIndex = 0;
    }
    this.sendResult();
  }

  digit(offset: number): string {
    let idx = this.currentIndex + offset;
    if (idx < 0) { idx = this.currentOptions.length - 1; }
    if (idx >= this.currentOptions.length) { idx = 0; }
    return this.currentOptions[idx];
  }
  next() {
    this.currentIndex = this.currentIndex === this.currentOptions.length - 1 ? 0 : this.currentIndex + 1;
    this.sendResult();
  }
  previous() {
    this.currentIndex = this.currentIndex === 0 ? this.currentOptions.length - 1 : this.currentIndex - 1;
    this.sendResult();
  }
  sendResult() {
    this.change.emit(this.currentOptions[this.currentIndex]);
  }
}
