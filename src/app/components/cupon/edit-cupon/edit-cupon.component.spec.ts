import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCuponComponent } from './edit-cupon.component';

describe('EditCuponComponent', () => {
  let component: EditCuponComponent;
  let fixture: ComponentFixture<EditCuponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCuponComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCuponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
