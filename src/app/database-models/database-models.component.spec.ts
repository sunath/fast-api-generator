import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseModelsComponent } from './database-models.component';

describe('DatabaseModelsComponent', () => {
  let component: DatabaseModelsComponent;
  let fixture: ComponentFixture<DatabaseModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
