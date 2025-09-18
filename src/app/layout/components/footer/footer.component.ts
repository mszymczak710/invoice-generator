import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ClassExtender } from '@core/misc';

import { environmentBase } from '@environments/environment-base';

import { StringsLoader } from '@layout/misc';

export interface FooterComponent extends StringsLoader {}

@Component({
  selector: 'klg-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@ClassExtender([StringsLoader])
export class FooterComponent {
  get version(): string {
    return environmentBase.version;
  }
}
