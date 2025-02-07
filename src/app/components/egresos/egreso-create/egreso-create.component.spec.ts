import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresoCreateComponent } from './egreso-create.component';

describe('EgresoCreateComponent', () => {
  let component: EgresoCreateComponent;
  let fixture: ComponentFixture<EgresoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EgresoCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EgresoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
