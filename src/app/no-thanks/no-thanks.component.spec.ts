import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoThanksComponent } from './no-thanks.component';

describe('NoThanksComponent', () => {
  let component: NoThanksComponent;
  let fixture: ComponentFixture<NoThanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoThanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
