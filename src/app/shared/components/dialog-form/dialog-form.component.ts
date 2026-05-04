import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../models/form.models';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" (click)="onBackdropClick()">
      <div 
        class="modal-box"
        [ngClass]="'modal-' + (config.size || 'medium')"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Header -->
        <div class="modal-header">
          <h3>{{ config.title }}</h3>
          <button class="modal-close" (click)="onCancel()">✕</button>
        </div>

        <!-- Modal Body -->
        <form class="modal-body" (ngSubmit)="onSubmit()">
          <!-- Dynamic Form Fields -->
          <ng-container *ngFor="let field of fields">
            <!-- Full Width Field -->
            <div *ngIf="field.width === 'full' || !field.width" class="form-field full-width">
              <label>
                {{ field.label }}
                <span *ngIf="field.required" class="required">*</span>
              </label>

              <!-- Text Input -->
              <input
                *ngIf="field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'date' || field.type === 'time'"
                [type]="field.type"
                [(ngModel)]="field.value"
                [name]="field.key"
                [placeholder]="field.placeholder || ''"
                [attr.disabled]="field.disabled"
                [attr.required]="field.required"
                [min]="field.min"
                [max]="field.max"
                [step]="field.step"
                [attr.pattern]="field.pattern"
              />

              <!-- Select Input -->
              <select
                *ngIf="field.type === 'select'"
                [(ngModel)]="field.value"
                [name]="field.key"
                [attr.disabled]="field.disabled"
                [attr.required]="field.required"
              >
                <option value="">{{ field.placeholder || 'Select option' }}</option>
                <option *ngFor="let opt of field.options" [value]="opt.value">
                  {{ opt.label }}
                </option>
              </select>

              <!-- Textarea -->
              <textarea
                *ngIf="field.type === 'textarea'"
                [(ngModel)]="field.value"
                [name]="field.key"
                [placeholder]="field.placeholder || ''"
                [attr.disabled]="field.disabled"
                [attr.required]="field.required"
                [rows]="field.rows || 3"
              ></textarea>
            </div>

            <!-- Half Width Field (in row with next field) -->
            <div *ngIf="field.width === 'half'" class="form-row">
              <div class="form-field">
                <label>
                  {{ field.label }}
                  <span *ngIf="field.required" class="required">*</span>
                </label>

                <!-- Text Input -->
                <input
                  *ngIf="field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'date' || field.type === 'time'"
                  [type]="field.type"
                  [(ngModel)]="field.value"
                  [name]="field.key"
                  [placeholder]="field.placeholder || ''"
                  [attr.disabled]="field.disabled"
                  [attr.required]="field.required"
                  [min]="field.min"
                  [max]="field.max"
                  [step]="field.step"
                  [attr.pattern]="field.pattern"
                />

                <!-- Select Input -->
                <select
                  *ngIf="field.type === 'select'"
                  [(ngModel)]="field.value"
                  [name]="field.key"
                  [attr.disabled]="field.disabled"
                  [attr.required]="field.required"
                >
                  <option value="">{{ field.placeholder || 'Select option' }}</option>
                  <option *ngFor="let opt of field.options" [value]="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
            </div>
          </ng-container>
        </form>

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button class="cancel-btn" (click)="onCancel()">
            {{ config.cancelButtonText || 'Cancel' }}
          </button>
          <button class="save-btn" (click)="onSubmit()">
            {{ config.submitButtonText || 'Save' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --brand-primary: #0891B2;
      --brand-surface: #F8FAFC;
      --brand-accent-hover: #E2E8F0;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal-box {
      background: white;
      border-radius: 18px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      animation: slideUp 0.25s ease;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .modal-small {
      max-width: 450px;
    }

    .modal-medium {
      max-width: 580px;
    }

    .modal-large {
      max-width: 750px;
    }

    @keyframes slideUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px 16px;
      border-bottom: 1px solid #eee;
    }

    .modal-header h3 {
      font-size: 19px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .modal-close {
      background: #f1f1f1;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      font-size: 14px;
      cursor: pointer;
      color: #555;
      transition: background 0.2s;
      flex-shrink: 0;
    }

    .modal-close:hover {
      background: #fee2e2;
      color: #ea4343;
    }

    .modal-body {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      overflow-y: auto;
      flex: 1;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .form-field.full-width {
      grid-column: 1 / -1;
    }

    .form-field label {
      font-size: 13px;
      font-weight: 600;
      color: #374151;
    }

    .required {
      color: #dc2626;
    }

    .form-field input,
    .form-field select,
    .form-field textarea {
      padding: 10px 13px;
      border: 1.5px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
      background: white;
      color: #333;
    }

    .form-field input:focus,
    .form-field select:focus,
    .form-field textarea:focus {
      border-color: var(--brand-primary);
      box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1);
    }

    .form-field input:disabled,
    .form-field select:disabled,
    .form-field textarea:disabled {
      background: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }

    .form-field textarea {
      resize: vertical;
      font-family: inherit;
    }

    .modal-footer {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      padding: 16px 24px 20px;
      border-top: 1px solid #eee;
    }

    .cancel-btn {
      padding: 10px 22px;
      border: 1.5px solid #e0e0e0;
      background: white;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      color: #555;
      transition: all 0.2s;
    }

    .cancel-btn:hover {
      background: #f5f5f5;
    }

    .save-btn {
      padding: 10px 26px;
      background: linear-gradient(90deg, #0d6efd, #0a58ca);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.22s;
      box-shadow: 0 3px 10px rgba(13, 110, 253, 0.3);
    }

    .save-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 5px 16px rgba(13, 110, 253, 0.4);
    }

    @media (max-width: 700px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .modal-small,
      .modal-medium,
      .modal-large {
        max-width: 100%;
      }
    }
    
  `]
})
export class ModalFormComponent {
  @Input() config: ModalConfig = {
    title: 'Modal',
    submitButtonText: 'Save',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create'
  };

  @Input() fields: FormField[] = [];
  @Input() isOpen: boolean = false;

  @Output() submitted = new EventEmitter<ModalSubmitEvent>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() backdropClicked = new EventEmitter<void>();

  onSubmit(): void {
    const formData = this.getFormData();
    const isValid = this.validateForm();

    this.submitted.emit({
      formData,
      isValid
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onBackdropClick(): void {
    this.backdropClicked.emit();
  }

  private getFormData(): any {
    const data: any = {};
    this.fields.forEach(field => {
      data[field.key] = field.value;
    });
    return data;
  }

  private validateForm(): boolean {
    return this.fields.every(field => {
      if (field.required && !field.value) {
        return false;
      }
      return true;
    });
  }
}