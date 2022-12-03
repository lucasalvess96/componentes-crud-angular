import { TestBed } from '@angular/core/testing';
import { ComponentsAlertsService } from './components-alerts.service';

describe('ComponentsAlertsService', () => {
  let service: ComponentsAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentsAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
