import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-dashboard-card',
    template: `
    <div class="stat-card {{cardStats.cardColor}}" [routerLink]="cardStats.link">
        <div class="stat-icon">{{cardStats.icon}}</div>
        <div class="stat-info">
            <span class="stat-value">{{ cardStats.value }}</span>
            <span class="stat-label">{{cardStats.label}}</span>
            @if(cardStats.StatusCount){
                <span class="stat-sub">{{ cardStats.StatusCount }} {{cardStats.FocusedStatus}}</span>
            }
            @else {
                <span class="stat-sub">{{cardStats.FocusedStatus}}</span>
            }
        </div>
    </div>
    `,
    styleUrl: 'dashboard-card.component.css',
    imports: [RouterModule]
})

export class DashboardCard {
    @Input() cardStats: DashboardCardStats = {
        icon: "🩺",
        value: 5,
        label: "Total Doctors",
        FocusedStatus: "Active",
        StatusCount: 4,
        cardColor: "blue",
        link: "/admin/doctors"
    };
}