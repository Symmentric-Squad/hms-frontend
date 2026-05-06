import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../models/form.models';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-5 animate-[fadeIn_0.2s_ease]"
      (click)="onBackdropClick()"
    >
      <div
        class="bg-white rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-[slideUp_0.25s_ease] max-h-[90vh] flex flex-col w-full"
        [ngClass]="{
          'max-w-[450px]': (config.size || 'medium') === 'small',
          'max-w-[580px]': (config.size || 'medium') === 'medium',
          'max-w-[750px]': (config.size || 'medium') === 'large'
        }"
        (click)="$event.stopPropagation()"
      >

        <!-- Header -->
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <h3 class="text-[19px] font-bold text-slate-800 m-0">{{ config.title }}</h3>
          <button
            class="bg-gray-100 border-none w-8 h-8 rounded-full text-sm cursor-pointer text-gray-500 transition-colors duration-200 flex-shrink-0 hover:bg-red-100 hover:text-red-500"
            (click)="onCancel()"
          >✕</button>
        </div>

        <!-- Body -->
        <form
          class="px-6 py-5 overflow-y-auto flex-1"
          (ngSubmit)="onSubmit()"
        >
          <div class="grid grid-cols-2 gap-[14px]">
            <ng-container *ngFor="let field of fields; let last = last">

              <div
                class="flex flex-col gap-[5px]"
                [ngClass]="{ 'col-span-2': last && fields.length % 2 !== 0 }"
              >
                <!-- Label -->
                <label class="text-[13px] font-semibold text-gray-700">
                  {{ field.label }}
                  <span *ngIf="field.required" class="text-red-600">*</span>
                </label>

                <!-- Text / Email / Number / Date / Time -->
                <input
                  *ngIf="['text','email','number','date','time'].includes(field.type)"
                  class="px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-sm font-[inherit] outline-none transition-colors duration-200 bg-white text-gray-700 focus:border-[#0891B2] focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  [type]="field.type"
                  [(ngModel)]="field.value"
                  [name]="field.key"
                  [placeholder]="field.placeholder || ''"
                  [attr.disabled]="field.disabled || null"
                  [attr.required]="field.required || null"
                  [min]="field.min"
                  [max]="field.max"
                  [step]="field.step"
                  [attr.pattern]="field.pattern || null"
                />

                <!-- Select -->
                <select
                  *ngIf="field.type === 'select'"
                  class="px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-sm font-[inherit] outline-none transition-colors duration-200 bg-white text-gray-700 focus:border-[#0891B2] focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  [(ngModel)]="field.value"
                  [name]="field.key"
                  [attr.disabled]="field.disabled || null"
                  [attr.required]="field.required || null"
                >
                  <option value="">{{ field.placeholder || 'Select option' }}</option>
                  <option *ngFor="let opt of field.options" [value]="opt.value">
                    {{ opt.label }}
                  </option>
                </select>

                <!-- Textarea -->
                <textarea
                  *ngIf="field.type === 'textarea'"
                  class="px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-sm font-[inherit] outline-none transition-colors duration-200 bg-white text-gray-700 resize-y focus:border-[#0891B2] focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  [(ngModel)]="field.value"
                  [name]="field.key"
                  [placeholder]="field.placeholder || ''"
                  [attr.disabled]="field.disabled || null"
                  [attr.required]="field.required || null"
                  [rows]="field.rows || 3"
                ></textarea>
              </div>

            </ng-container>
          </div>
        </form>

        <!-- Footer -->
        <div class="flex gap-3 justify-end px-6 pt-4 pb-5 border-t border-gray-100">
          <button
            class="px-[22px] py-[10px] border-[1.5px] border-gray-200 bg-white rounded-lg text-sm font-semibold cursor-pointer text-gray-500 transition-all duration-200 hover:bg-gray-100"
            type="button"
            (click)="onCancel()"
          >
            {{ config.cancelButtonText || 'Cancel' }}
          </button>
          <button
            class="px-[26px] py-[10px] bg-gradient-to-r from-[#0d6efd] to-[#0a58ca] text-white border-none rounded-lg text-sm font-bold cursor-pointer transition-all duration-[220ms] shadow-[0_3px_10px_rgba(13,110,253,0.3)] hover:-translate-y-px hover:shadow-[0_5px_16px_rgba(13,110,253,0.4)]"
            type="button"
            (click)="onSubmit()"
          >
            {{ config.submitButtonText || 'Save' }}
          </button>
        </div>

      </div>
    </div>
  `,
})
export class ModalFormComponent {
  @Input() config: ModalConfig = {
    title: 'Modal',
    submitButtonText: 'Save',
    cancelButtonText: 'Cancel',
    size: 'medium',
    mode: 'create',
  };

  @Input() fields: FormField[] = [];
  @Input() isOpen = false;

  @Output() submitted = new EventEmitter<ModalSubmitEvent>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() backdropClicked = new EventEmitter<void>();

  onSubmit(): void {
    this.submitted.emit({
      formData: this.getFormData(),
      isValid: this.validateForm(),
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onBackdropClick(): void {
    this.backdropClicked.emit();
  }

  private getFormData(): Record<string, any> {
    return Object.fromEntries(this.fields.map(f => [f.key, f.value]));
  }

  private validateForm(): boolean {
    return this.fields.every(f => !f.required || !!f.value);  
  }
}