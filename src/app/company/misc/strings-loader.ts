import { CompanyStrings, strings } from '@company/misc/strings';

import { CommonStrings, commonStrings } from '@core/misc';

export class StringsLoader {
  get commonStrings(): CommonStrings {
    return commonStrings;
  }

  get strings(): CompanyStrings {
    return strings;
  }
}
