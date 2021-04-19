import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBiddingsComponent } from './all-biddings.component';

describe('AllBiddingsComponent', () => {
  let component: AllBiddingsComponent;
  let fixture: ComponentFixture<AllBiddingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBiddingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBiddingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
