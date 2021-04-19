import { TestBed } from '@angular/core/testing';
import { SelectDropdownService } from './select-dropdown.service';

describe('SingleSelectDropdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectDropdownService = TestBed.get(SelectDropdownService);
    expect(service).toBeTruthy();
  });
});
