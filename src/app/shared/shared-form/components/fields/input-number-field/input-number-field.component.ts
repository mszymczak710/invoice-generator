import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { RequiredMarkComponent } from '@shared/shared-form/components/required-mark/required-mark.component';
import { FieldComponentBase } from '@shared/shared-form/misc';
import { FormFieldNumberData } from '@shared/shared-form/types';

@Component({
  selector: 'klg-input-number-field',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RequiredMarkComponent],
  templateUrl: './input-number-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputNumberFieldComponent extends FieldComponentBase {
  get fieldData(): FormFieldNumberData {
    return this.field?.data as FormFieldNumberData;
  }

  get max(): number {
    return this.fieldData?.max;
  }

  get min(): number {
    return this.fieldData?.min;
  }

  get step(): number {
    return this.fieldData?.step;
  }
}
