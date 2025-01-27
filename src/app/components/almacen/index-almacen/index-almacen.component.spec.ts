import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAlmacenComponent } from './index-almacen.component';

describe('IndexAlmacenComponent', () => {
  let component: IndexAlmacenComponent;
  let fixture: ComponentFixture<IndexAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexAlmacenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
