import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteRuchersComponent } from './carte-ruchers.component';

describe('CarteRuchersComponent', () => {
  let component: CarteRuchersComponent;
  let fixture: ComponentFixture<CarteRuchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteRuchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteRuchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
