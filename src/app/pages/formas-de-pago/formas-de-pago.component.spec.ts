import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormasDePagoComponent } from './formas-de-pago.component';

describe('FormasDePagoComponent', () => {
  let component: FormasDePagoComponent;
  let fixture: ComponentFixture<FormasDePagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormasDePagoComponent]
    });
    fixture = TestBed.createComponent(FormasDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
