import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepportingPage } from './repporting.page';

describe('RepportingPage', () => {
  let component: RepportingPage;
  let fixture: ComponentFixture<RepportingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepportingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepportingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
