import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosFinancierosComponent } from './estados-financieros.component';

describe('EstadosFinancierosComponent', () => {
  let component: EstadosFinancierosComponent;
  let fixture: ComponentFixture<EstadosFinancierosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadosFinancierosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadosFinancierosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
