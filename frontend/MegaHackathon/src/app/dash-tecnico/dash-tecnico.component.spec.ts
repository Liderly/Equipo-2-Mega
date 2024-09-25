import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTecnicoComponent } from './dash-tecnico.component';

describe('DashTecnicoComponent', () => {
  let component: DashTecnicoComponent;
  let fixture: ComponentFixture<DashTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashTecnicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
