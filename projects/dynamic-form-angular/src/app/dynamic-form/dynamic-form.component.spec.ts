import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import configData from '../../assets/configData.json';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DynamicFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.formDefinition = configData.data;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form with the correct controls', () => {
    expect(component.form.controls).toBeDefined();
    expect(Object.keys(component.form.controls).length).toBe(component.formDefinition.length);
  });

  it('should validate required fields', () => {
    const requiredField = component.formDefinition.find(field => field.validator?.includes('required'));
    if (requiredField) {
      const control = component.form.get(requiredField.name);
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
      control?.setValue('Test Value');
      expect(control?.valid).toBeTruthy();
    }
  });

  it('should submit valid form data', () => {
    component.form.get('Order No')?.setValue('Snitch100');
    component.form.get('OrderedDate')?.setValue('06/06/2024');
    component.form.get('OrderedInfo')?.setValue('asd');
    component.form.get('Price')?.setValue('200');
    component.form.get('Refurbished')?.setValue('No');
    component.onSubmit();
    expect(component.formData).toEqual(component.form.value);
  });

  it('should not submit invalid form', () => {
    const invalidField = component.formDefinition.find(field => field.validator?.includes('required'));
    if (invalidField) {
      component.form.get(invalidField.name)?.setValue('');
      component.onSubmit();
      expect(component.formData).toEqual({});
    }
  });

  it('should display fields based on conditions', () => {
    const fieldOrderNo = { name: 'Order No' };
    expect(component.shouldDisplayField(fieldOrderNo)).toBeTruthy();
    const field = { name: 'OrderedInfo', condition: true };
    component.form.addControl('OrderedDate', component.fb.control('2023-01-01'));
    expect(component.shouldDisplayField(field)).toBeFalsy();
    const addressField = { name: 'Address', condition: true };
    component.form.addControl('Order No', component.fb.control(150));
    component.form.addControl('Price', component.fb.control(50));
    expect(component.shouldDisplayField(addressField)).toBeTruthy();
  });
});
