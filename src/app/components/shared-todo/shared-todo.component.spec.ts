import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTodoComponent } from './shared-todo.component';

describe('SharedTodoComponent', () => {
  let component: SharedTodoComponent;
  let fixture: ComponentFixture<SharedTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
