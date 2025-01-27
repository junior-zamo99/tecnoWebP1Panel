import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlmacenComponent } from './create-almacen.component';

describe('CreateAlmacenComponent', () => {
  let component: CreateAlmacenComponent;
  let fixture: ComponentFixture<CreateAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAlmacenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
