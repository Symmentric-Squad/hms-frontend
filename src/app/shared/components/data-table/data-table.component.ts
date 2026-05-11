import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RowActionEvent, TableAction, TableColumn } from '../../models/data-table.models';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bg-white rounded-[16px] px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-x-auto">
    <table class="w-full border-collapse text-sm">
      <thead>
        <tr class="bg-[#f8faff]">
          @for(col of columns; track $index) {
            <th
              class="px-[14px] py-3 text-left font-bold text-gray-700 text-[13px] border-b-2 border-[#e8f0fd]"
              [style]="{ 'width': col.width }"
            >
              {{ col.label }}
            </th>
          }
          @if(actions.length > 0) {
            <th class="px-[14px] py-3 text-left font-bold text-gray-700 text-[13px] border-b-2 border-[#e8f0fd]">
              Actions
            </th>
          }
        </tr>
      </thead>

      <tbody>
        @for(row of data; track $index) {
          <tr class="border-b border-[#f5f5f5] hover:bg-[#f8faff] transition-colors duration-150">

            @for(col of columns; track $index) {
              <td class="px-[14px] py-3 text-gray-600 align-middle" [style]="{ 'width': col.width }">

                @if(col.type === 'text' || !col.type) {
                  <span>{{ row[col.key] }}</span>
                }

                @if(col.type === 'tag' || col.type === 'badge') {
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

            @if(actions.length > 0) {
              <td class="px-[14px] py-3 align-middle">
                <div class="flex gap-2 flex-wrap">
                  @for(action of actions; track $index) {
                    <button
                      class="flex items-center gap-1 px-2 py-1 rounded text-xs font-bold border-none cursor-pointer whitespace-nowrap"
                      [ngClass]="getActionButtonClass(action.actionColor)"
                      (click)="onActionClick(action.id, row)"
                    >
                      @if(action.icon) {
                        <span
                          [style.mask-image]="'url(' + action.icon + ')'"
                          [style.webkit-mask-image]="'url(' + action.icon + ')'"
                          [style.background-color]="action.actionColor"
                          class="inline-block w-[14px] h-[14px] shrink-0"
                          style="
                            mask-size: contain;
                            mask-repeat: no-repeat;
                            mask-position: center;
                          "
                        ></span>
                      }
                      <span>{{ action.label }}</span>
                    </button>
                  }
                </div>
              </td>
            }

          </tr>
        }

        @if (data.length === 0) {
          <tr>
            <td
              [attr.colspan]="columns.length + (actions.length > 0 ? 1 : 0)"
              class="px-[14px] py-8 text-center text-gray-500"
            >
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
  const themeMap: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-100 hover:bg-blue-300',
    red: 'text-red-600 bg-red-100 hover:bg-red-300',
    green: 'text-green-600 bg-green-100 hover:bg-green-300',
    yellow: 'text-yellow-600 bg-yellow-100 hover:bg-yellow-300',
    gray: 'text-gray-600 bg-gray-100 hover:bg-gray-300',
    black: 'text-black-600 bg-black-300 hover:bg-black-300',
  };

  return themeMap[type] || themeMap['blue'];
}
}
