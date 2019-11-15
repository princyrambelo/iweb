import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignePage } from './assigne.page';

describe('AssignePage', () => {
  let component: AssignePage;
  let fixture: ComponentFixture<AssignePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
