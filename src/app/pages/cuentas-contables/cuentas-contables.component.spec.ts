import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasContablesComponent } from './cuentas-contables.component';

describe('CuentasContablesComponent', () => {
  let component: CuentasContablesComponent;
  let fixture: ComponentFixture<CuentasContablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentasContablesComponent]
    });
    fixture = TestBed.createComponent(CuentasContablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
