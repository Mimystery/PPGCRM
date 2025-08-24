import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDrawerComponent } from './process-drawer';

describe('ProcessDrawerComponent', () => {
  let component: ProcessDrawerComponent;
  let fixture: ComponentFixture<ProcessDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
