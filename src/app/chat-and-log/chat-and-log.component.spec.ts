import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAndLogComponent } from './chat-and-log.component';

describe('ChatAndLogComponent', () => {
  let component: ChatAndLogComponent;
  let fixture: ComponentFixture<ChatAndLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAndLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAndLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
