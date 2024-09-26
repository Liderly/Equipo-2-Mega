
import { Component, OnInit } from '@angular/core';

interface MenuItem {
  name: string;
  icon: string;
  route: string;
  badge?: {
    text: string;
    class: string;
  };
}

@Component({
  selector: 'app-side-board',
  standalone: true,
  imports: [],
  templateUrl: './side-board.component.html',
  styleUrl: './side-board.component.css'
})


export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      route: '/dashboard'
    },
    {
      name: 'Board',
      icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4',
      route: '/board',
      badge: {
        text: 'New',
        class: 'bg-indigo-50 text-blue-500'
      }
    },
    // Add more menu items as needed
  ];

  constructor() { }

  ngOnInit(): void { }
}