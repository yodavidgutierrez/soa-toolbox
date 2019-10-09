import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbuilderComponent } from './dashbuilder.component';

describe('DashbuilderComponent', () => {
  let component: DashbuilderComponent;
  let fixture: ComponentFixture<DashbuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
