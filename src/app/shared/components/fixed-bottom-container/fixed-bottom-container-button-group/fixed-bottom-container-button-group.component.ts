import { Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'roba-fixed-bottom-container-button-group',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './fixed-bottom-container-button-group.component.html',
  styleUrl: './fixed-bottom-container-button-group.component.scss',
})
export class FixedBottomContainerButtonGroupComponent {
  abortButtonLink = input('/');
  abortButtonIcon = input(faChevronLeft);
  mainButtonLink = input('/');
  mainButtonText = input('Hinzufügen');
  mainButtonIcon = input(faPlus);
  mainButtonDisabled = input(false, {
    transform: (v: boolean | string) => (typeof v === 'string' ? v === '' : v),
  });
  isFormSubmit = input(false, {
    transform: (v: boolean | string) => (typeof v === 'string' ? v === '' : v),
  });
}
