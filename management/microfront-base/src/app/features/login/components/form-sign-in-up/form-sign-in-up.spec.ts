import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignInUp } from './form-sign-in-up';

describe('FormSignInUp', () => {
  let component: FormSignInUp;
  let fixture: ComponentFixture<FormSignInUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSignInUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSignInUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
