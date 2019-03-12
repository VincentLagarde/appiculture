import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuchesRuchersComponent } from './ruches-ruchers.component';

describe('RuchesRuchersComponent', () => {
  let component: RuchesRuchersComponent;
  let fixture: ComponentFixture<RuchesRuchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuchesRuchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuchesRuchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
