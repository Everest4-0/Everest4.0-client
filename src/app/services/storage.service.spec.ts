import { TestBed } from '@angular/core/testing';

import { StorageServices } from './storage.service';

describe('StorageService', () => {
  let service: StorageServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
