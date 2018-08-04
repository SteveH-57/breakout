import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TumblerComponent } from './tumbler.component';

describe('TumblerComponent', () => {
  let component: TumblerComponent;
  let fixture: ComponentFixture<TumblerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TumblerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TumblerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
