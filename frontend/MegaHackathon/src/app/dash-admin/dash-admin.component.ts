import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../header/header.component';

interface StatisticCard {
  title: string;
  value: number;
  icon: string;
}

interface SocialTraffic {
  platform: string;
  visitors: number;
  percentage: number;
}

interface RecentActivity {
  user: string;
  action: string;
  timestamp: Date;
}

@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dash-admin.component.html',
  styleUrl: './dash-admin.component.css'
})

export class DashAdminComponent implements OnInit {
  statisticCards: StatisticCard[] = [
    {
      title: 'Visitors',
      value: 1257,
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    // Add more statistic cards
  ];

  socialTraffic: SocialTraffic[] = [
    { platform: 'Facebook', visitors: 5480, percentage: 70 },
    { platform: 'Twitter', visitors: 3380, percentage: 40 },
    // Add more social traffic data
  ];

  recentActivities: RecentActivity[] = [
    {
      user: 'Nick Mark',
      action: 'mentioned Sara Smith in a new post',
      timestamp: new Date('2023-09-25T10:30:00')
    },
    // Add more recent activities
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch real data from a service if needed
  }

  // Add methods for handling dashboard actions, e.g., refreshData(), viewDetails(item), etc.
}
