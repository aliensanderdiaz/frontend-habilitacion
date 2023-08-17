import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFormarDePagoComponent } from './crear-formar-de-pago.component';

describe('CrearFormarDePagoComponent', () => {
  let component: CrearFormarDePagoComponent;
  let fixture: ComponentFixture<CrearFormarDePagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearFormarDePagoComponent]
    });
    fixture = TestBed.createComponent(CrearFormarDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
