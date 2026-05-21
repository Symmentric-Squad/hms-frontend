import { TableAction, TableColumn } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig } from '../../../../shared/models/form.models';
import { SpecializationResponse } from '../../models/admin.model';

// ────────────────────────────────────────────────────────────────────────────
// TABLE CONFIGURATION
// ────────────────────────────────────────────────────────────────────────────

export const specializationColumns: TableColumn[] = [
  { key: 'specialization', label: 'Specialization' },
  { key: 'creationDate', label: 'Available From' },
];

export const specializationActions: TableAction[] = [];

// ────────────────────────────────────────────────────────────────────────────
// MODAL CONFIGURATIONS
// ────────────────────────────────────────────────────────────────────────────

export const addSpecializationModalConfig: ModalConfig = {
  title: 'Add Specialization',
  submitButtonText: 'Save Specialization',
  cancelButtonText: 'Cancel',
  size: 'small',
  mode: 'create',
};

export const editSpecializationModalConfig: ModalConfig = {
  title: 'Edit Specialization',
  submitButtonText: 'Update Specialization',
  cancelButtonText: 'Cancel',
  size: 'small',
  mode: 'edit',
};

// ────────────────────────────────────────────────────────────────────────────
// FORM FIELD BUILDERS
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build form fields for CREATE mode
 * - Empty fields ready for user input
 */
export function buildAddSpecializationFields(): FormField[] {
  return [
    {
      key: 'specialization',
      label: 'Specialization Name',
      type: 'text',
      required: true,
      placeholder: 'Enter specialization name',
    },
  ];
}

/**
 * Build form fields for EDIT mode
 * - Pre-populated with existing specialization data
 * - Makes creationDate read-only (informational only)
 */
export function buildEditSpecializationFields(
  specialization: SpecializationResponse
): FormField[] {
  return [
    {
      key: 'specialization',
      label: 'Specialization Name',
      type: 'text',
      required: true,
      value: specialization.specialization,
      placeholder: 'Enter specialization name',
    },
    {
      key: 'creationDate',
      label: 'Created On',
      type: 'text',
      required: false,
      value: specialization.creationDate,
      disabled: true,
      placeholder: 'Auto-generated',
    },
  ];
}