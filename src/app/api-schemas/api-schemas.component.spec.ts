import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSchemasComponent } from './api-schemas.component';

describe('ApiSchemasComponent', () => {
  let component: ApiSchemasComponent;
  let fixture: ComponentFixture<ApiSchemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiSchemasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSchemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
