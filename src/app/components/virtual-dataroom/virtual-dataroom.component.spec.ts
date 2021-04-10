import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualDataroomComponent } from './virtual-dataroom.component';

describe('VirtualDataroomComponent', () => {
  let component: VirtualDataroomComponent;
  let fixture: ComponentFixture<VirtualDataroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualDataroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualDataroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
