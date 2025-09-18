import { ValidatorFn } from '@angular/forms';

import { FormFieldTypes } from './form-field-types';

export interface FormField {
  data?: FormFieldNumberData | FormFieldInputData;
  idPrefix: string;
  label?: string;
  labelledBy?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type: FormFieldTypes;
  validators?: ValidatorFn[];
}

export type FormFields = Map<string, FormField>;

export interface FormFieldInputData {
  maxLength?: number;
  minLength?: number;
}

export interface FormFieldNumberData {
  max?: number;
  min?: number;
  step?: number;
}

export interface FormFieldStyles {
  maxWidth?: string;
}
