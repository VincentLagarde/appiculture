import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencePositionRucherComponent } from './frequence-position-rucher.component';

describe('FrequencePositionRucherComponent', () => {
  let component: FrequencePositionRucherComponent;
  let fixture: ComponentFixture<FrequencePositionRucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequencePositionRucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencePositionRucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
