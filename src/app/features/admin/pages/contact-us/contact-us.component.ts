import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ContactQueryDetailResponse, ContactQueryListResponse } from '../../models/admin.model';
import { AdminService } from '../../service/admin.service';
 
@Component({
  selector: 'app-query',
  standalone: false,
  template: `
    <div class="p-6 max-w-7xl mx-auto font-sans">
     
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">User Inquiries</h2>
        <p class="text-sm text-slate-500 mt-1">Track, manage, and address inbound support or patient submissions.</p>
      </div>
 
      <div *ngIf="loading()" class="text-center py-12 text-slate-400 font-medium animate-pulse">
        Loading inquiries from database...
      </div>
 
      <div *ngIf="error()" class="flex flex-col items-center justify-center space-y-4 p-6 text-center bg-red-50 rounded-lg border border-red-200">
        <h3 class="text-lg font-semibold text-red-900">Error Loading Inquiries</h3>
        <p class="text-sm text-red-700">{{ error() }}</p>
        <button 
          (click)="loadQueries()"
          class="mt-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition">
          Retry
        </button>
      </div>
 
      <div *ngIf="!loading() && !error()" class="gap-6 items-start">
       
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-base font-bold text-slate-800">Pending Review</h3>
            <span class="text-md font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-700">
              {{ notOpenedQueries().length }}
            </span>
          </div>
 
          <div class="space-y-4">
            <div *ngIf="notOpenedQueries().length === 0" class="text-center py-8 text-slate-400 text-sm">
              All clear! No pending inquiries.
            </div>
 
            <div *ngFor="let query of notOpenedQueries()" class="bg-white border border-slate-100 rounded-xl p-5 shadow-sm transition duration-200 hover:shadow-md">
              <div class="flex flex-col gap-3">
               
                <div>
                  <h4 class="font-semibold text-slate-800 text-xl">{{ query.fullName }}</h4>
                  <div class="text-md text-slate-500 mt-1 space-x-1">
                    <span><strong>Email:</strong> {{ query.email }}</span>
                    <span class="text-slate-300">|</span>
                    <span><strong>Phone:</strong> {{ query.contactNo }}</span>
                  </div>
                </div>
 
                <div class="bg-slate-50 border border-slate-100 p-3 rounded-lg text-slate-700 text-[13.5px] leading-relaxed">
                  {{ query.message }}
                </div>
 
                <div class="pt-3 border-t border-dashed border-slate-100">
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Resolution Remark</label>
                  <div class="flex gap-2 items-end">
                    <textarea
                      [(ngModel)]="remarksInputMap[query.contactQueryId]"
                      placeholder="Type response notes or dynamic resolution action details here..."
                      rows="2"
                      class="flex-1 text-md p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none transition">
                    </textarea>
                    <button
                      (click)="handleResolve(query)"
                      [disabled]="resolvingId() === query.contactQueryId"
                      class="px-4 py-2 rounded-lg text-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm h-full self-stretch flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                      {{ resolvingId() === query.contactQueryId ? 'Resolving...' : 'Resolve' }}
                    </button>
                  </div>
                </div>
 
                <div class="text-[11px] text-slate-400 mt-1">
                  Received: {{ formatDate(query.postingDate, 'dd-MM-yyyy, h:mm a', 'en-US') }}
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mt-6">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-base font-bold text-slate-800">Resolved History</h3>
            <span class="text-md font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
              {{ reviewedQueries().length }}
            </span>
          </div>
 
          <div class="space-y-4">
            <div *ngIf="reviewedQueries().length === 0" class="text-center py-8 text-slate-400 text-sm">
              No history items logged.
            </div>
 
            <div *ngFor="let query of reviewedQueries()" class="bg-slate-50 border border-slate-100 rounded-xl p-5 shadow-sm">
              <div class="flex flex-col gap-2.5">
               
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-slate-700 text-xl">{{ query.fullName }}</span>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800">Resolved</span>
                </div>
               
                <div class="text-md text-slate-500 space-x-1">
                  <span><strong>Email:</strong> {{ query.email }}</span>
                  <span class="text-slate-300">|</span>
                  <span><strong>Phone:</strong> {{ query.contactNo }}</span>
                </div>
 
                <div class="bg-white border border-slate-200/60 p-3 rounded-lg text-slate-600 text-[13.5px] leading-relaxed">
                  {{ query.message }}
                </div>
 
                <div *ngIf="getDetailRemark(query.contactQueryId)" class="p-3 bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-lg">
                  <span class="block text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-0.5">Admin Remark:</span>
                  <p class="text-md m-0 italic font-medium">"{{ getDetailRemark(query.contactQueryId) }}"</p>
                </div>
 
                <div class="text-[11px] text-slate-400 mt-1">
                  Archived: {{ formatDate(query.postingDate, 'dd-MM-yyyy, h:mm a', 'en-US') }}
                </div>
              </div>
            </div>
          </div>
        </div>
 
      </div>
    </div>
  `,
  // styleUrl: '../../../../../styles.css',
})
export class AdminContactUsPage implements OnInit {
  private readonly adminService = inject(AdminService);
 
  allQueries = signal<ContactQueryListResponse[]>([]);
  detailsMap = signal<Map<number, ContactQueryDetailResponse>>(new Map());
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  resolvingId = signal<number | null>(null);
 
  remarksInputMap: { [key: number]: string } = {};
 
  notOpenedQueries = computed(() => {
    return this.allQueries().filter(q => !q.read);
  });
 
  reviewedQueries = computed(() => {
    return this.allQueries().filter(q => q.read);
  });
 
  ngOnInit(): void {
    this.loadQueries();
  }
 
  loadQueries(): void {
    this.loading.set(true);
    this.error.set(null);
 
    const unread$ = this.adminService.getUnreadQueries();
    const read$ = this.adminService.getReadQueries();
 
    forkJoin([unread$, read$]).subscribe({
      next: ([unreadList, readList]) => {
        // Combine both lists and mark read status
        const unreadWithStatus = (unreadList || []).map(q => ({ ...q, read: false }));
        const readWithStatus = (readList || []).map(q => ({ ...q, read: true }));
        const combinedQueries = [...unreadWithStatus, ...readWithStatus];
 
        this.allQueries.set(combinedQueries);
 
        // Fetch details for read queries to get adminRemark
        const detailRequests = readWithStatus.map(query =>
          this.adminService.getQueryById(query.contactQueryId).toPromise()
            .then(detail => {
              const newMap = new Map(this.detailsMap());
              newMap.set(query.contactQueryId, detail!);
              this.detailsMap.set(newMap);
            })
            .catch(() => {
              // Fail silently, just won't show remark
            })
        );
 
        Promise.all(detailRequests).finally(() => {
          this.loading.set(false);
        });
      },
      error: (err) => {
        console.error('Failed to load queries:', err);
        this.error.set('Failed to load inquiries. Please try again later.');
        this.loading.set(false);
      }
    });
  }
 
  handleResolve(query: ContactQueryListResponse): void {
    const adminRemarkText = this.remarksInputMap[query.contactQueryId]?.trim();
 
    if (!adminRemarkText) {
      alert('Please write an admin resolution remark before resolving the item.');
      return;
    }
 
    this.resolvingId.set(query.contactQueryId);
 
    this.adminService.addRemark(query.contactQueryId, { adminRemark: adminRemarkText }).subscribe({
      next: () => {
        this.updateLocalQueryState(query.contactQueryId, adminRemarkText);
        this.resolvingId.set(null);
      },
      error: (err) => {
        console.error('Failed to resolve query:', err);
        alert('Failed to resolve the inquiry. Please try again.');
        this.resolvingId.set(null);
      }
    });
  }
 
  getDetailRemark(contactQueryId: number): string {
    const detail = this.detailsMap().get(contactQueryId);
    return detail?.adminRemark || '';
  }
 
  private updateLocalQueryState(id: number, remark: string): void {
    // Update the query to mark as read
    this.allQueries.update((prev) =>
      prev.map((item) => item.contactQueryId === id
        ? { ...item, read: true }
        : item
      )
    );
 
    // Update details map with the new remark
    const newMap = new Map(this.detailsMap());
    const existingDetail = newMap.get(id) || {
      id: id,
      contactQueryId: id,
      fullName: '',
      email: '',
      contactNo: 0,
      message: '',
      postingDate: '',
      adminRemark: remark,
      lastUpdationDate: new Date().toISOString(),
      read: true,
    };
    existingDetail.adminRemark = remark;
    newMap.set(id, existingDetail as ContactQueryDetailResponse);
    this.detailsMap.set(newMap);
 
    delete this.remarksInputMap[id];
  }
 
  formatDate = formatDate;
}