import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseModelComponent } from './database-model.component';

describe('DatabaseModelComponent', () => {
  let component: DatabaseModelComponent;
  let fixture: ComponentFixture<DatabaseModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
