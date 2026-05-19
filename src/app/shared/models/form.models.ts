export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'time' | 'select' | 'textarea' | 'password';
  value?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: FieldOption[];
  rows?: number;
  min?: number | string;
  max?: number | string;
  step?: number;
  pattern?: string;
}

export interface ModalConfig {
  title: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  size?: 'small' | 'medium' | 'large';
  mode?: 'create' | 'edit';
}

export interface ModalSubmitEvent {
  formData: Record<string, any>;
  isValid: boolean;
}