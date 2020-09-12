import { TestBed } from '@angular/core/testing';

import { IsloginService } from './islogin.service';

describe('IsloginService', () => {
  let service: IsloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
