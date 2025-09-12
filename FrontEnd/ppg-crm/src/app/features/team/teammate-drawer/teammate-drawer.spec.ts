import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammateDrawerComponent } from './teammate-drawer';

describe('TeammateDrawerComponent', () => {
  let component: TeammateDrawerComponent;
  let fixture: ComponentFixture<TeammateDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeammateDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeammateDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
