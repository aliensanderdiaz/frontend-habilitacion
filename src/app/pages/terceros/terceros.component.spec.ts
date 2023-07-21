import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TercerosComponent } from './terceros.component';

describe('TercerosComponent', () => {
  let component: TercerosComponent;
  let fixture: ComponentFixture<TercerosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TercerosComponent]
    });
    fixture = TestBed.createComponent(TercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
