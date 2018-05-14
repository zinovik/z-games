import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerudoComponent } from './perudo.component';

describe('PerudoComponent', () => {
  let component: PerudoComponent;
  let fixture: ComponentFixture<PerudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
