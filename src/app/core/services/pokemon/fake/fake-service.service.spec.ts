import { HttpClient } from '@angular/common/http';
import { FakeService } from './fake-service.service';

describe('FakeService', () => {
  it('should create an instance', () => {
    expect(new FakeService()).toBeTruthy();
  });
});
