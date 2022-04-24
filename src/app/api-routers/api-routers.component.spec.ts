import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRoutersComponent } from './api-routers.component';

describe('ApiRoutersComponent', () => {
  let component: ApiRoutersComponent;
  let fixture: ComponentFixture<ApiRoutersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRoutersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRoutersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
