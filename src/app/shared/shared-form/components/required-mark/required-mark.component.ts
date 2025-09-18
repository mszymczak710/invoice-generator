import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'klg-required-mark',
  standalone: true,
  templateUrl: './required-mark.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequiredMarkComponent {
  @Input() required: boolean;
}
