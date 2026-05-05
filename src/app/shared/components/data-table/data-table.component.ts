import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RowActionEvent, TableAction, TableColumn } from '../../models/data-table.models';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto rounded-lg border-[var(--brand-accent-hover)] bg-[var(--brand-surface)]">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-[var(--brand-accent)]">
            <th class="px-4 py-3 text-left font-bold text-gray-700">#</th>
            @for(col of columns; track $index) {
              <th
                class="px-4 py-3 text-left font-bold text-gray-700"
                [style]="{ 'width': col.width }"
              >
                {{ col.label }}
              </th>
            }
            @if(actions.length > 0){
              <th class="px-4 py-3 text-left font-bold text-gray-700">Actions</th>
            }
          </tr>
        </thead>

        <tbody>
          @for(row of data; track $index) {
             <tr
               class="border-b hover:bg-gray-50"
                [style]="{ 'border-bottom-color': 'var(--brand-accent-hover)' }"
              >
              <!-- Index Column -->
              <td class="px-4 py-3 font-semibold text-gray-600">{{ $index + 1 }}</td>

            <!-- Data Columns -->
             @for(col of columns;track $index) {
               <td class="px-4 py-3 text-gray-700" [style]="{ 'width': col.width }">
                 <!-- Text Column -->
                  @if(col.type === 'text' || !col.type) {
                    <span>{{ row[col.key] }}</span>
                  }
   
                 <!-- Tag/Badge Column -->
                  @if(col.type === 'tag' || col.type === 'badge'){
                    <span
                      class="inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                      [style]="{
                        'background-color': col.tagColors?.[row[col.key]]?.bg || 'var(--brand-accent)',
                        'color': col.tagColors?.[row[col.key]]?.text || '#374151'
                      }"
                    >
                      {{ row[col.key] }}
                    </span>
                  }
               </td>
             }
             
             <!-- Actions Column -->
              @if(actions.length > 0) {
             <td class="px-4 py-3">
               <div class="flex gap-2 flex-wrap">
                @for(action of actions; track $index) {
                  <button
                  class="px-3 py-1 rounded text-xs font-semibold border-none cursor-pointer whitespace-nowrap hover:opacity-80"
                  [ngClass]="getActionButtonClass(action.actionColor)"
                  (click)="onActionClick(action.id, row)"
                  >
                  @if(action.icon){
                    <span class="mr-1">{{ action.icon }}</span>
                  }
                  {{ action.label }}
                </button>
              }
              </div>
            </td>
              }
          </tr>
        }

          <!-- Empty State -->
           @if (data.length === 0) {
             <tr>
               <td [attr.colspan]="columns.length + (actions.length > 0 ? 2 : 1)" class="px-4 py-8 text-center text-gray-500">
                 {{ emptyStateMessage }}
               </td>
             </tr>
           }
        </tbody>
      </table>
    </div>
  `,
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() emptyStateMessage: string = 'No data available';

  @Output() actionTriggered = new EventEmitter<RowActionEvent>();

  onActionClick(actionId: string, rowData: any): void {
    this.actionTriggered.emit({
      action: actionId,
      rowData: rowData,
    });
  }

  getActionButtonClass(type: string = 'blue'): string {
  // Define full strings so Tailwind can "find" them during build time
  const themeMap: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-100 hover:bg-blue-50',
    red: 'text-red-600 bg-red-100 hover:bg-red-50',
    green: 'text-green-600 bg-green-100 hover:bg-green-50',
    yellow: 'text-yellow-600 bg-yellow-100 hover:bg-yellow-50',
    gray: 'text-gray-600 bg-gray-100 hover:bg-gray-50',
  };

  // Return the mapped classes, or a default if the type doesn't exist
  return themeMap[type] || themeMap['blue'];
}
}
