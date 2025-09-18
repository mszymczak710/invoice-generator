import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { InputFieldComponent, InputNumberFieldComponent } from '@shared/shared-form/components/fields';
import { RowSubmittedErrorStateMatcher } from '@shared/shared-form/misc';
import { FormField, FormFieldTypes } from '@shared/shared-form/types';

@Component({
  selector: 'klg-form-field-switcher',
  standalone: true,
  imports: [InputFieldComponent, InputNumberFieldComponent],
  templateUrl: './form-field-switcher.component.html',
  styleUrl: './form-field-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldSwitcherComponent {
  @Input() control: UntypedFormControl;
  @Input() errorStateMatcher: RowSubmittedErrorStateMatcher;
  @Input() field: FormField;

  formFieldTypes = FormFieldTypes;
}
