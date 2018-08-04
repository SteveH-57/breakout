import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboLockComponent } from './combo-lock.component';

describe('ComboLockComponent', () => {
  let component: ComboLockComponent;
  let fixture: ComponentFixture<ComboLockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboLockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
