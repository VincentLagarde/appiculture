import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRuchersComponent } from './liste-ruchers.component';

describe('ListeRuchersComponent', () => {
  let component: ListeRuchersComponent;
  let fixture: ComponentFixture<ListeRuchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeRuchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRuchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
