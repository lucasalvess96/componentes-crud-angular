import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormItemsComponent } from './create-form-items.component';

describe('CreateFormItemsComponent', () => {
  let component: CreateFormItemsComponent;
  let fixture: ComponentFixture<CreateFormItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
