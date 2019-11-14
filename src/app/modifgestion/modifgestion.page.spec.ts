import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifgestionPage } from './modifgestion.page';

describe('ModifgestionPage', () => {
  let component: ModifgestionPage;
  let fixture: ComponentFixture<ModifgestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifgestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifgestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
