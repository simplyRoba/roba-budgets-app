import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'roba-fixed-bottom-container-sum-row',
  standalone: true,
  imports: [CurrencyPipe, FaIconComponent, RouterLink],
  templateUrl: './fixed-bottom-container-sum-row.component.html',
  styleUrl: './fixed-bottom-container-sum-row.component.scss',
})
export class FixedBottomContainerSumRowComponent {
  templateLink = input<string>();
  sumString = input.required<string>();

  protected readonly faCopy = faCopy;
}
