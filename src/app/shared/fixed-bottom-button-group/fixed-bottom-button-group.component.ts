import { Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'roba-fixed-bottom-button-group',
  standalone: true,
  imports: [FaIconComponent, RouterLink],
  templateUrl: './fixed-bottom-button-group.component.html',
  styleUrl: './fixed-bottom-button-group.component.scss',
})
export class FixedBottomButtonGroupComponent {
  abortButtonLink = input('/');
  abortButtonIcon = input(faChevronLeft);
  mainButtonLink = input.required<string>();
  mainButtonText = input('Hinzufügen');
  mainButtonIcon = input(faPlus);
}
