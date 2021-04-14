import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeNCommitComponent } from './resume-n-commit.component';

describe('ResumeNCommitComponent', () => {
  let component: ResumeNCommitComponent;
  let fixture: ComponentFixture<ResumeNCommitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeNCommitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeNCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
