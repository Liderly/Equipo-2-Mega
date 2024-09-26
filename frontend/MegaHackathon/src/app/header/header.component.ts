
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  isOpen: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  onClickProfile = () => {
    const profileDropdownList = this.element.nativeElement.querySelector(
      '.profile-dropdown-list'
    );
    this.renderer.setAttribute(profileDropdownList, 'aria-expanded', 'true');
  }
}
