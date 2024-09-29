
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  onClickProfile(){}  // no hace nada

  // isDark: boolean = false;

  // constructor() { }

  // ngOnInit(): void {
  //   this.isDark = this.getInitialThe~~~me();
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
