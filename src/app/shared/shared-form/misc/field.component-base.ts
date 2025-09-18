import { Directive, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { sprintf } from 'sprintf-js';

import { commonStrings } from '@core/misc';

import { RowSubmittedErrorStateMatcher } from '@shared/shared-form/misc';
import { FormField } from '@shared/shared-form/types';

@Directive()
export class FieldComponentBase {
  @Input() control: UntypedFormControl;
  @Input() errorStateMatcher: RowSubmittedErrorStateMatcher;
  @Input() field: FormField;

  get errors(): string | null {
    return this.getErrorMessageFromControl(this.control);
  }

  getFieldId(): string {
    return `${this.field.idPrefix}-field-${this.field.name}`;
  }

  private getErrorMessageFromControl(control: UntypedFormControl): string | null {
    if (!control || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return commonStrings.errors.form.required;
    }
    if (control.errors['max']) {
      return sprintf(commonStrings.errors.form.max, control.getError('max').max);
    }
    if (control.errors['maxlength']) {
      return sprintf(commonStrings.errors.form.maxLength, control.getError('maxlength').requiredLength);
    }
    if (control.errors['min']) {
      return sprintf(commonStrings.errors.form.min, control.getError('min').min);
    }
    if (control.errors['minlength']) {
      return sprintf(commonStrings.errors.form.minLength, control.getError('minlength').requiredLength);
    }
    return null;
  }
}
