import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelhistoryComponent } from './travelhistory.component';

describe('TravelhistoryComponent', () => {
  let component: TravelhistoryComponent;
  let fixture: ComponentFixture<TravelhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
