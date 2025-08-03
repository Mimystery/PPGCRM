import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedProjectCard } from './archived-project-card';

describe('ArchivedProjectCard', () => {
  let component: ArchivedProjectCard;
  let fixture: ComponentFixture<ArchivedProjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedProjectCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedProjectCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
