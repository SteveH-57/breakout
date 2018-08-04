import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { DialogItem } from './dialog-item';
import { ComboLockComponent } from '../challenges/combo-lock/combo-lock.component';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styles: []
})
export class DynamicDialogComponent implements OnInit {
  @Input() item: DialogItem;
  @Input() data: any;
  @ViewChild('payload', { read: ViewContainerRef }) payload;
  componentRef: ComponentRef<ComboLockComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    this.payload.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComboLockComponent);
    this.componentRef = this.payload.createComponent(componentFactory);
    if (this.data) {
      Object.keys(this.data).forEach(property => {
        this.componentRef.instance[property] = this.data[property];
      });
    }
  }
}
