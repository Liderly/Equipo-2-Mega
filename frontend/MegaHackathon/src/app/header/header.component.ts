
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  //arreglar local storage error
  user = JSON.parse(localStorage.getItem('userData') || '{}')

  OnInit() {
    const isLocalStorageAvailable = typeof localStorage !== 'undefined';
    if(isLocalStorageAvailable != null) {
      const user = localStorage.getItem('userData') || '{}'
      const obj = JSON.parse(user)
      console.log(obj);
    }
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
