import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingNoteComponent } from './coaching-note.component';

describe('CoachingNoteComponent', () => {
  let component: CoachingNoteComponent;
  let fixture: ComponentFixture<CoachingNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachingNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
