import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesList } from './stages-list';

describe('StagesList', () => {
  let component: StagesList;
  let fixture: ComponentFixture<StagesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StagesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
