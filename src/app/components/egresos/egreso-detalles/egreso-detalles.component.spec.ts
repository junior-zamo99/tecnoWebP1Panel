import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresoDetallesComponent } from './egreso-detalles.component';

describe('EgresoDetallesComponent', () => {
  let component: EgresoDetallesComponent;
  let fixture: ComponentFixture<EgresoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EgresoDetallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EgresoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
