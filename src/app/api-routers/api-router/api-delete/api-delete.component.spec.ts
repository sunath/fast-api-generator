import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDeleteComponent } from './api-delete.component';

describe('ApiDeleteComponent', () => {
  let component: ApiDeleteComponent;
  let fixture: ComponentFixture<ApiDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
