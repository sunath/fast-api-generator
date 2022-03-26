import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSchemaResultComponent } from './custom-schema-result.component';

describe('CustomSchemaResultComponent', () => {
  let component: CustomSchemaResultComponent;
  let fixture: ComponentFixture<CustomSchemaResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSchemaResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSchemaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
