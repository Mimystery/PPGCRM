import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanStage } from './kanban-stage';

describe('KanbanStage', () => {
  let component: KanbanStage;
  let fixture: ComponentFixture<KanbanStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanStage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanStage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
