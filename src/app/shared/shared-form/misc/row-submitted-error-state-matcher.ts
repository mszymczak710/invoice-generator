import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class RowSubmittedErrorStateMatcher implements ErrorStateMatcher {
  constructor(private isRowSubmitted: (row: UntypedFormGroup) => boolean) {}

  isErrorState(control: UntypedFormControl): boolean {
    const row = control.parent as UntypedFormGroup;
    const submitted = this.isRowSubmitted(row);
    return control.invalid && submitted;
  }
}
