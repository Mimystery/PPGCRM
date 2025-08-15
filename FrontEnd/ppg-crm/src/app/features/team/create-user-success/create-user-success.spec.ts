import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserSuccessComponent } from './create-user-success';

describe('CreateUserSuccessComponent', () => {
  let component: CreateUserSuccessComponent;
  let fixture: ComponentFixture<CreateUserSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
