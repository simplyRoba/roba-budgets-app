import { Component, input } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FixedBottomContainerButtonGroupComponent } from './fixed-bottom-container-button-group/fixed-bottom-container-button-group.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'roba-fixed-bottom-container',
  imports: [
    NgClass,
  ],
  templateUrl: './fixed-bottom-container.component.html',
  styleUrl: './fixed-bottom-container.component.scss',
})
export class FixedBottomContainerComponent {
  noBorder = input(false, {
    transform: (v: boolean | string) => (typeof v === 'string' ? v === '' : v),
  });
}
