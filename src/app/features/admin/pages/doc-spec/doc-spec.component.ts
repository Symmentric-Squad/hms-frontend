import { formatDate } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RowActionEvent } from '../../../../shared/models/data-table.models';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../../../shared/models/form.models';
import { SpecializationRequest, SpecializationResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';
import {
  addSpecializationModalConfig,
  editSpecializationModalConfig,
  specializationActions,
  specializationColumns,
  buildAddSpecializationFields,
  buildEditSpecializationFields,
} from './doc-spec.config';

@Component({
  selector: 'app-admin-doc-spec',
  standalone: false,
  templateUrl: './doc-spec.component.html',
  styleUrl: '../../../../../styles.css',
})
export class AdminSpecialisationPage {
  private readonly adminSpecializationService = inject(AdminService);

  // ────────────────────────────────────────────────────────────────────────────
  // SIGNALS & STATE
  // ────────────────────────────────────────────────────────────────────────────

  specializations = signal<SpecializationResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Modal state
  isModalOpen = false;
  modalConfig: ModalConfig = addSpecializationModalConfig;
  modalFields: FormField[] = [];
  private editingId: number | null = null;

  // Table configuration
  specializationColumns = specializationColumns;
  specializationActions = specializationActions;

  // ────────────────────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ────────────────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadSpecializations();
  }

  // ────────────────────────────────────────────────────────────────────────────
  // DATA LOADING
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Load all specializations from API
   */
  loadSpecializations(): void {
    console.log('📥 Loading specializations...');
    this.loading.set(true);
    this.error.set(null);

    this.adminSpecializationService.getAllSpecializations().subscribe({
      next: (data) => {
        console.log('✅ Specializations loaded successfully:', data);
        
        const formattedData = data.map((spec) => ({
          ...spec,
          creationDate: formatDate(spec.creationDate, 'dd-MM-yyyy', 'en-US'),
        }));
        
        this.specializations.set(formattedData);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load specializations:', err);
        this.error.set('Failed to Load Specializations');
        this.loading.set(false);
      },
    });
  }

  // ────────────────────────────────────────────────────────────────────────────
  // MODAL HANDLERS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Open modal in CREATE mode
   * - Uses addSpecializationModalConfig
   * - Builds empty form fields for new specialization entry
   */
  handleOpenCreate(): void {
    console.log('🔓 Opening Create Modal');
    this.editingId = null;
    this.modalConfig = addSpecializationModalConfig;
    this.modalFields = buildAddSpecializationFields();
    this.isModalOpen = true;
  }

  /**
   * Open modal in EDIT mode
   * - Uses editSpecializationModalConfig
   * - Builds form fields pre-populated with existing specialization data
   */
  handleOpenEdit(specialization: SpecializationResponse): void {
    console.log('🔓 Opening Edit Modal for specialization ID:', specialization.id, 'Data:', specialization);
    this.editingId = specialization.id;
    this.modalConfig = editSpecializationModalConfig;
    this.modalFields = buildEditSpecializationFields(specialization);
    this.isModalOpen = true;
  }

  /**
   * Handle form submission from modal
   * - Validates if this is a create or edit operation based on editingId
   * - Routes to appropriate service method
   */
  handleSubmit(event: ModalSubmitEvent): void {
    console.log('📤 Form Submit Handler Called');
    console.log('📋 Submit Event Data:', event);
    console.log('📋 Form Data:', event.formData);
    console.log('✔️ Is Valid:', event.isValid);

    if (!event.isValid) {
      console.warn('⚠️ Form is invalid, submission cancelled');
      return;
    }

    if (this.editingId === null) {
      // CREATE operation
      const createRequest = event.formData as SpecializationRequest;
      console.log('➕ Creating new specialization with data:', createRequest);
      this.addSpecialization(createRequest);
    } else {
      // UPDATE operation
      const updateRequest = event.formData as SpecializationRequest;
      console.log('✏️ Updating specialization ID:', this.editingId, 'with data:', updateRequest);
      this.editSpecialization(this.editingId, updateRequest);
    }

    this.closeModal();
  }

  /**
   * Handle modal cancellation
   */
  handleCancel(): void {
    console.log('❌ Modal cancelled');
    this.closeModal();
  }

  /**
   * Handle backdrop click
   */
  handleBackdropClick(): void {
    console.log('❌ Backdrop clicked - closing modal');
    this.closeModal();
  }

  // ────────────────────────────────────────────────────────────────────────────
  // CRUD OPERATIONS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * CREATE: Add a new specialization
   * - Calls AdminService.createSpecialization() with SpecializationRequest
   */
  addSpecialization(request: SpecializationRequest): void {
    console.log('🚀 addSpecialization() called with request:', request);
    this.loading.set(true);

    this.adminSpecializationService.createSpecialization(request).subscribe({
      next: (newSpecialization) => {
        console.log('✅ Specialization created successfully:', newSpecialization);
        
        const formattedSpec = {
          ...newSpecialization,
          creationDate: formatDate(newSpecialization.creationDate, 'dd-MM-yyyy', 'en-US'),
        };
        
        this.specializations.update((prev) => {
          console.log('📊 Previous specializations count:', prev.length);
          const updated = [...prev, formattedSpec];
          console.log('📊 Updated specializations list:', updated);
          return updated;
        });
        this.loading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        console.error('❌ Failed to create specialization:', err);
        this.error.set('Failed to Add Specialization');
        this.loading.set(false);
      },
    });
  }

  /**
   * UPDATE: Edit an existing specialization
   * - Calls AdminService.updateSpecialization() with SpecializationRequest
   */
  editSpecialization(id: number, request: SpecializationRequest): void {
    console.log('🚀 editSpecialization() called with ID:', id, 'Request:', request);
    this.loading.set(true);

    this.adminSpecializationService.updateSpecialization(id, request).subscribe({
      next: (updated) => {
        console.log('✅ Specialization updated successfully:', updated);
        
        const formattedSpec = {
          ...updated,
          creationDate: formatDate(updated.creationDate, 'dd-MM-yyyy', 'en-US'),
        };
        
        this.specializations.update((prev) => {
          console.log('📊 Previous specializations count:', prev.length);
          const updatedList = prev.map((s) => {
            if (s.id === id) {
              console.log('🔄 Replacing specialization ID:', id, 'with updated data');
              return formattedSpec;
            }
            return s;
          });
          console.log('📊 Updated specializations list:', updatedList);
          return updatedList;
        });
        this.loading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        console.error('❌ Failed to update specialization:', err);
        this.error.set('Failed to Update Specialization');
        this.loading.set(false);
      },
    });
  }

  /**
   * DELETE: Remove a specialization
   * - Calls AdminService.deleteSpecialization() when service is ready
   * - Currently commented out pending backend implementation
   */
  // handleDelete(id: number): void {
  //   console.log('🗑️ Deleting specialization ID:', id);
  //   this.loading.set(true);
  //
  //   this.adminSpecializationService.deleteSpecialization(id).subscribe({
  //     next: () => {
  //       console.log('✅ Specialization deleted successfully');
  //       this.specializations.update((current) => {
  //         const filtered = current.filter((spec) => spec.id !== id);
  //         console.log('📊 Updated specializations list after deletion:', filtered);
  //         return filtered;
  //       });
  //       this.loading.set(false);
  //       this.error.set(null);
  //     },
  //     error: (err) => {
  //       console.error('❌ Failed to delete specialization:', err);
  //       this.error.set('Failed to Delete Specialization');
  //       this.loading.set(false);
  //     },
  //   });
  // }

  // ────────────────────────────────────────────────────────────────────────────
  // TABLE ACTIONS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Handle table action events
   * - Routes edit action to handleOpenEdit()
   * - Ready for view and delete actions when needed
   */
  onTableAction(event: RowActionEvent): void {
    console.log('📍 Table action triggered:', event);
    const { action, rowData } = event;
    console.log('🎯 Action:', action, 'Row Data:', rowData);

    if (action === 'edit') {
      this.handleOpenEdit(rowData);
    }
    // Add these when ready:
    // if (action === 'view') this.handleViewSpecialization(rowData);
    // if (action === 'delete') this.handleDelete(rowData.id);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // HELPER METHODS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Close modal and reset state
   */
  private closeModal(): void {
    console.log('🔒 Closing modal');
    this.isModalOpen = false;
    this.editingId = null;
  }
}