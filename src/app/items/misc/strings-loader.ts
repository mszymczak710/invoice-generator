import { CommonStrings, commonStrings } from '@core/misc';

import { ItemStrings, strings } from '@items/misc/strings';

export class StringsLoader {
  get commonStrings(): CommonStrings {
    return commonStrings;
  }

  get strings(): ItemStrings {
    return strings;
  }
}
