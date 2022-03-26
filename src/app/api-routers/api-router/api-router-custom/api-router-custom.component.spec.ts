import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRouterCustomComponent } from './api-router-custom.component';

describe('ApiRouterCustomComponent', () => {
  let component: ApiRouterCustomComponent;
  let fixture: ComponentFixture<ApiRouterCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRouterCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRouterCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
