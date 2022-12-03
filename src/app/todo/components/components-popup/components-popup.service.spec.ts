import { TestBed } from '@angular/core/testing';
import { ComponentsPopupService } from './components-popup.service';

describe('ComponentsPopupService', () => {
  let service: ComponentsPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentsPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
