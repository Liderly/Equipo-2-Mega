import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBoardComponent } from './side-board.component';

describe('SideBoardComponent', () => {
  let component: SideBoardComponent;
  let fixture: ComponentFixture<SideBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
