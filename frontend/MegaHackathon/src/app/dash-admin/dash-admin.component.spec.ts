import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAdminComponent } from './dash-admin.component';
import {HeaderComponent}from '../header/header.component'

describe('DashAdminComponent', () => {
  let component: DashAdminComponent;
  let fixture: ComponentFixture<DashAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
