import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVisiteComponent } from './details-visite.component';

describe('DetailsVisiteComponent', () => {
  let component: DetailsVisiteComponent;
  let fixture: ComponentFixture<DetailsVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
