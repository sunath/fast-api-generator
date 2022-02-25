import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiModelComponent } from './api-model.component';

describe('ApiModelComponent', () => {
  let component: ApiModelComponent;
  let fixture: ComponentFixture<ApiModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
