import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammateDrawer } from './teammate-drawer';

describe('TeammateDrawer', () => {
  let component: TeammateDrawer;
  let fixture: ComponentFixture<TeammateDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeammateDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeammateDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
