import { ValidatorFn } from '@angular/forms';

export type FieldType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: any }[]; // for select
  validators?: ValidatorFn[];
}

export interface DynamicFormConfig {
  fields: FormField[];
  submitLabel?: string;
}