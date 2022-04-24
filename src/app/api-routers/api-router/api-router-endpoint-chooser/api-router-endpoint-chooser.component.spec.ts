import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRouterEndpointChooserComponent } from './api-router-endpoint-chooser.component';

describe('ApiRouterEndpointChooserComponent', () => {
  let component: ApiRouterEndpointChooserComponent;
  let fixture: ComponentFixture<ApiRouterEndpointChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRouterEndpointChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRouterEndpointChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
