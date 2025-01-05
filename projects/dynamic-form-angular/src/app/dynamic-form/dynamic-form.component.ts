import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import configData from '../../assets/configData.json';
import { Field } from './dynamic-form.enum';

@Component({
  selector: 'app-dynamic-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  formDefinition: Field[] = [];
  form: FormGroup;
  formData: Object = {};

  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.formDefinition = configData.data;
    this.buildForm();
  }

  buildForm() {
    this.formDefinition.forEach(field => {
      const validators = this.getValidators(field?.validator);
      this.form.addControl(field.name, this.fb.control("", validators));
    });
  }

  getValidators(validators: string[] | undefined) {
    const formValidators = [];
    if (validators?.includes('required')) {
      formValidators.push(Validators.required);
    }
    return formValidators;
  }

  onSubmit() {
    if (this.form.valid) {
      this.formData = this.form.value;
      console.log('Form Data:', this.formData);
    } else {
      console.log('Form is invalid');
    }
  }

  shouldDisplayField(field: any): boolean {
    if (!field.condition) return true;
    if (field.name === 'OrderedInfo') {
      if (this.form.get('OrderedDate')?.value != '') {
        return true;
      }
    } else if (field.name === 'Address') {
      if (this.form.get('Order No')?.value >= 100 || this.form.get('Price')?.value <= 100) {
        return true;
      }
    }
    return false;
  }
}
