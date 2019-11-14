import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionagentPage } from './gestionagent.page';

describe('GestionagentPage', () => {
  let component: GestionagentPage;
  let fixture: ComponentFixture<GestionagentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionagentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionagentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
