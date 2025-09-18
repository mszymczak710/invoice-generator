import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { sprintf } from 'sprintf-js';

import { ClassExtender } from '@core/misc';

import { RequiredMarkComponent } from '@shared/shared-form/components/required-mark/required-mark.component';
import { FieldComponentBase, StringsLoader } from '@shared/shared-form/misc';
import { FormFieldInputData } from '@shared/shared-form/types';

export interface InputFieldComponent extends StringsLoader {}

@Component({
  selector: 'klg-input-field',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, RequiredMarkComponent],
  templateUrl: './input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@ClassExtender([StringsLoader])
export class InputFieldComponent extends FieldComponentBase {
  get fieldData(): FormFieldInputData {
    return this.field?.data as FormFieldInputData;
  }

  get hint(): string {
    const length = this.control.value?.length || 0;
    return sprintf(this.strings.input.hint, length, this.maxLength);
  }

  get maxLength(): number {
    return this.fieldData?.maxLength;
  }

  get minLength(): number {
    return this.fieldData?.minLength;
  }
}
