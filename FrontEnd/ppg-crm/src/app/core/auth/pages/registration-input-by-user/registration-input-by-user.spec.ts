import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationInputByUserComponent } from './registration-input-by-user';

describe('RegistrationInputByUser', () => {
  let component: RegistrationInputByUserComponent;
  let fixture: ComponentFixture<RegistrationInputByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationInputByUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationInputByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
