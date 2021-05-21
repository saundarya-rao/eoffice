import { TestBed } from '@angular/core/testing';

import { OnlinedatabaseService } from './onlinedatabase.service';

describe('OnlinedatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlinedatabaseService = TestBed.get(OnlinedatabaseService);
    expect(service).toBeTruthy();
  });
});
