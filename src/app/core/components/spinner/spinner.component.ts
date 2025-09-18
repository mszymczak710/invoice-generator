import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'klg-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  @Input() size: 'small' | 'big' = 'small';
  @Input() visible: boolean;

  getSize(): number {
    switch (this.size) {
      case 'small': {
        return 25;
      }
      case 'big': {
        return 50;
      }
    }
  }
}
