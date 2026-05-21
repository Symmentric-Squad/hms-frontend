import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormField, ModalConfig, ModalSubmitEvent } from '../../models/form.models';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  @if(isOpen){
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
            type="button"
            (click)="onCancel()"
          >✕</button>
        </div>

        <!-- Body -->
        <div class="px-6 py-5 overflow-y-auto flex-1">
          <form [formGroup]="form">
            <div class="grid grid-cols-2 gap-[14px]">
              <ng-container *ngFor="let field of fields; let last = last">

                <div
                  class="flex flex-col gap-[5px]"
                  [ngClass]="{ 'col-span-2': last && fields.length % 2 !== 0 }"
                >
                  <label class="text-[13px] font-semibold text-gray-700">
                    {{ field.label }}
                    <span *ngIf="field.required" class="text-red-600">*</span>
                  </label>

                  <!-- text / email / number / date / time -->
                  <input
                    *ngIf="['text','email','number','date','time'].includes(field.type)"
                    class="px-[13px] py-[10px] border-[1.5px] rounded-lg text-sm font-[inherit] outline-none transition-colors duration-200 bg-white text-gray-700
                      focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]
                      disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    [ngClass]="{
                      'border-gray-200 focus:border-[#0891B2]': !(form.get(field.key)?.invalid && form.get(field.key)?.touched),
                      'border-red-400 focus:border-red-400 bg-red-50': form.get(field.key)?.invalid && form.get(field.key)?.touched
                    }"
                    [type]="field.type"
                    [formControlName]="field.key"
                    [placeholder]="field.placeholder || ''"
                    [min]="field.min"
                    [max]="field.max"
                    [step]="field.step"
                    [attr.pattern]="field.pattern || null"
                  />

                  <!-- select -->
                  <select
                    *ngIf="field.type === 'select'"
                    class="px-[13px] py-[10px] border-[1.5px] rounded-lg text-sm font-[inherit] outline-none transition-colors duration-200 bg-white text-gray-700
                      focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]
                      disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    [ngClass]="{
                      'border-gray-200 focus:border-[#0891B2]': !(form.get(field.key)?.invalid && form.get(field.key)?.touched),
                      'border-red-400 focus:border-red-400 bg-red-50': form.get(field.key)?.invalid && form.get(field.key)?.touched
                    }"
                    [formControlName]="field.key"
                  >
                    <option value="">{{ field.placeholder || 'Select option' }}</option>
                    <option *ngFor="let opt of field.options" [value]="opt.value">
                      {{ opt.label }}
                    </option>
                  </select>

                  <!-- textarea -->
                  <textarea
                    *ngIf="field.type === 'textarea'"
                    class="px-[13px] py-[10px] border-[1.5px] rounded-lg text-sm font-[inherit] outline-none transition-colors duration-200 bg-white text-gray-700 resize-y
                      focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]
                      disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    [ngClass]="{
                      'border-gray-200 focus:border-[#0891B2]': !(form.get(field.key)?.invalid && form.get(field.key)?.touched),
                      'border-red-400 focus:border-red-400 bg-red-50': form.get(field.key)?.invalid && form.get(field.key)?.touched
                    }"
                    [formControlName]="field.key"
                    [placeholder]="field.placeholder || ''"
                    [rows]="field.rows || 3"
                  ></textarea>

                  <!-- Validation errors -->
                  <div
                    *ngIf="form.get(field.key)?.invalid && form.get(field.key)?.touched"
                    class="text-[11px] text-red-500 mt-[2px] flex flex-col gap-[2px]"
                  >
                    <span *ngIf="form.get(field.key)?.errors?.['required']">This field is required.</span>
                    <span *ngIf="form.get(field.key)?.errors?.['email']">Enter a valid email address.</span>
                    <span *ngIf="form.get(field.key)?.errors?.['min']">
                      Value must be at least {{ form.get(field.key)?.errors?.['min'].min }}.
                    </span>
                    <span *ngIf="form.get(field.key)?.errors?.['max']">
                      Value must be at most {{ form.get(field.key)?.errors?.['max'].max }}.
                    </span>
                    <span *ngIf="form.get(field.key)?.errors?.['pattern']">Invalid format.</span>
                  </div>

                </div>
              </ng-container>
            </div>
          </form>
        </div>

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
            {{ config.submitButtonText || (config.mode === 'edit' ? 'Save Changes' : 'Add') }}
          </button>
        </div>

      </div>
    </div>
                  }
  `,
})
export class ModalFormComponent implements OnChanges {
  @Input() config: ModalConfig = {
    title: 'Modal',
    size: 'medium',
    mode: 'create',
  };

  @Input() fields: FormField[] = [];
  @Input() isOpen = false;

  @Output() submitted = new EventEmitter<ModalSubmitEvent>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() backdropClicked = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});

  ngOnChanges(changes: SimpleChanges): void {
    // Rebuild FormGroup whenever parent passes a new fields array (open create or edit)
    if (changes['fields'] || changes['isOpen']) {
      const controls: Record<string, FormControl> = {};

      for (const field of this.fields) {
        const validators = [];

        if (field.required) validators.push(Validators.required);
        if (field.type === 'email') validators.push(Validators.email);
        if (field.min != null) validators.push(Validators.min(+field.min));
        if (field.max != null) validators.push(Validators.max(+field.max));
        if (field.pattern) validators.push(Validators.pattern(field.pattern));

        controls[field.key] = new FormControl(
          { value: field.value ?? '', disabled: !!field.disabled },
          validators
        );
      }

      this.form = new FormGroup(controls);
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();  // reveals errors on every pristine field
    if (this.form.invalid) return;

    this.submitted.emit({
      formData: this.form.value,
      isValid: true,
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onBackdropClick(): void {
    this.backdropClicked.emit();
  }
}