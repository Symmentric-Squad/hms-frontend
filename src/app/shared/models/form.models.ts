export interface FormField {
  key: string;                                    // Object property key
  label: string;                                  // Field label
  type: 'text' | 'email' | 'number' | 'date' | 'time' | 'select' | 'textarea'; // Input type
  placeholder?: string;                           // Placeholder text
  value?: any;                                    // Current value (two-way binding)
  required?: boolean;                             // Is field required
  disabled?: boolean;                             // Is field disabled
  options?: { label: string; value: any }[];      // Options for select type
  min?: number;                                   // Min value for number type
  max?: number;                                   // Max value for number type
  step?: number;                                  // Step for number type
  rows?: number;                                  // Rows for textarea type
  pattern?: string;                               // Optional: Regex pattern for validation (use [attr.pattern] in template)
  width?: 'full' | 'half';                        // Column width (full = 1 col, half = 1/2 col)
}

export interface ModalConfig {
  title: string;                                  // Modal title
  submitButtonText?: string;                      // Submit button text (default: "Save")
  cancelButtonText?: string;                      // Cancel button text (default: "Cancel")
  size?: 'small' | 'medium' | 'large';            // Modal size (default: "medium")
  mode?: 'create' | 'edit';                       // Modal mode (default: "create")
}

export interface ModalSubmitEvent {
  formData: any;                                  // Submitted form data
  isValid: boolean;                               // Is form valid
}