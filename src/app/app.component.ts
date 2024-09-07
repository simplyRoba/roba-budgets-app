import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { faGear, faHome, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';

@Component({
  selector: 'roba-root',
  standalone: true,
  imports: [RouterOutlet, FaIconComponent, RouterLink, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly faWallet = faWallet;
  protected readonly faGear = faGear;
  protected readonly faHome = faHome;
}
