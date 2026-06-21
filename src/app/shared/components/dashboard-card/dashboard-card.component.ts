import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-dashboard-card',
    template: `
        <div
            class="bg-white rounded-lg p-6 flex items-center gap-4 shadow-md cursor-pointer"
            [routerLink]="cardStats.link"
        >
            <div
                class="inline-block mask-contain mask-no-repeat text-3xl shrink-0"
                [style.mask-image]="'url(' + cardStats.icon + ')'"
                [style.webkit-mask-image]="'url(' + cardStats.icon + ')'"
                [style.background-color]="'black'"
                [style.width.px]=48
                [style.height.px]=48
            ></div>
            <div class="flex flex-col gap-0.5">
                <span class="text-[32px] font-extrabold text-slate-800 leading-none">{{ cardStats.value }}</span>
                <span class="text-sm font-semibold text-gray-600">{{cardStats.label}}</span>
                @if(cardStats.StatusCount){
                        <span class="text-xs text-gray-400">{{ cardStats.StatusCount }} {{cardStats.FocusedStatus}}</span>
                }
                @else {
                        <span class="text-xs text-gray-400">{{cardStats.FocusedStatus}}</span>
                }
            </div>
        </div>
    `,
    
    imports: [RouterModule]
})

export class DashboardCard {
    colorMap: { [k: string]: string } = {
        blue: '#0d6efd',
        green: '#198754',
        orange: '#f59e0b',
        red: '#ea4343'
    };
    @Input() cardStats: DashboardCardStats = {
        icon: "patient.svg",
        value: 5,
        label: "Total Doctors",
        FocusedStatus: "Active",
        StatusCount: 4,
        cardColor: "blue",
        link: "/admin/doctors"
    };
}