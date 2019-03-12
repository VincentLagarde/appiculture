import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteRucherComponent } from './visite-rucher.component';

describe('VisiteRucherComponent', () => {
  let component: VisiteRucherComponent;
  let fixture: ComponentFixture<VisiteRucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteRucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteRucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
