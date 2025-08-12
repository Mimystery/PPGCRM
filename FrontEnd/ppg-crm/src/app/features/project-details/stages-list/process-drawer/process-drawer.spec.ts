import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDrawer } from './process-drawer';

describe('ProcessDrawer', () => {
  let component: ProcessDrawer;
  let fixture: ComponentFixture<ProcessDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
