import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTravelHistoryComponent } from './all-travel-history.component';

describe('AllTravelHistoryComponent', () => {
  let component: AllTravelHistoryComponent;
  let fixture: ComponentFixture<AllTravelHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTravelHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTravelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
