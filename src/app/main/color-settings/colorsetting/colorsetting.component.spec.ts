import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsettingComponent } from './colorsetting.component';

describe('ColorsettingComponent', () => {
  let component: ColorsettingComponent;
  let fixture: ComponentFixture<ColorsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
