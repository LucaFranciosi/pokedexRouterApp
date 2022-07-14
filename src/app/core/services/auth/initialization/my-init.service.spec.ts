import { TestBed } from '@angular/core/testing';

import { MyInitService } from './my-init.service';

describe('MyInitService', () => {
  let service: MyInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
