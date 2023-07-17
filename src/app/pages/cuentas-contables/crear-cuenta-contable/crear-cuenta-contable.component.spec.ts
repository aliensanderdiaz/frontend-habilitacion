import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCuentaContableComponent } from './crear-cuenta-contable.component';

describe('CrearCuentaContableComponent', () => {
  let component: CrearCuentaContableComponent;
  let fixture: ComponentFixture<CrearCuentaContableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearCuentaContableComponent]
    });
    fixture = TestBed.createComponent(CrearCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
