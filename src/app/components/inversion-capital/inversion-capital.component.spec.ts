import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InversionCapitalComponent } from './inversion-capital.component';

describe('InversionCapitalComponent', () => {
  let component: InversionCapitalComponent;
  let fixture: ComponentFixture<InversionCapitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InversionCapitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InversionCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
