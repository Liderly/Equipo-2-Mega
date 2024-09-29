import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {};

  user: any;

  private getUserData(): any {
    if(isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : {};
    }
    return {};
  };

  ngOnInit() {
    this.user = this.getUserData();
  }

  onClickProfile(){}  // no hace nada

  // isDark: boolean = false;

  // constructor() { }

  // ngOnInit(): void {
  //   this.isDark = this.getInitialTheme();
  // }

  // toggleTheme(): void {
  //   this.isDark = !this.isDark;
  //   localStorage.setItem('isDarkTheme', this.isDark.toString());
  //   this.updateTheme();
  // }

  // private getInitialTheme(): boolean {
  //   const savedTheme = localStorage.getItem('isDarkTheme');
  //   return savedTheme ? JSON.parse(savedTheme) : false;
  // }

  // private updateTheme(): void {
  //   if (this.isDark) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }
}
