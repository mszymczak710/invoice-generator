import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ClassExtender } from '@core/misc';

import { FormFieldSwitcherComponent, RequiredMarkComponent } from '@shared/shared-form/components';
import { RowSubmittedErrorStateMatcher, StringsLoader } from '@shared/shared-form/misc';
import { FormField, FormFieldInputData, FormFieldTypes, FormListAction, FormListColumnStyles } from '@shared/shared-form/types';

export interface FormListComponent extends StringsLoader {}

@Component({
  selector: 'klg-form-list',
  standalone: true,
  imports: [
    FormFieldSwitcherComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RequiredMarkComponent
  ],
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@ClassExtender([StringsLoader])
export class FormListComponent implements OnInit {
  @Input() actions: FormListAction[] = [];
  @Input() addButtonLabel: string;
  @Input() columnStyles: FormListColumnStyles = new Map();
  @Input() fieldsMap: Map<string, FormField>;
  @Input() formArrayName: string;
  @Input() items: any[] = [];
  @Input() listCaption: string;
  @Input() required: boolean;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() rowAdded = new EventEmitter<void>();

  form: UntypedFormGroup;

  private submittedRows = new Set<UntypedFormGroup>();

  rowErrorMatcher = new RowSubmittedErrorStateMatcher(row => !!row && this.submittedRows.has(row));

  get fields(): FormField[] {
    return Array.from(this.fieldsMap.values());
  }

  get formArray(): UntypedFormArray {
    return this.form.get(this.formArrayName) as UntypedFormArray;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.listCaption) {
      console.error('[ERROR] FormList requires a list caption');
      return;
    }
    this.initFormList();
    this.addRowsToFormArray();
  }

  getFormControl(fieldName: string, index: number): UntypedFormControl {
    return this.getFormGroup(index).get(fieldName) as UntypedFormControl;
  }

  getFormGroup(index: number): UntypedFormGroup {
    return this.formArray.at(index) as UntypedFormGroup;
  }

  private prepareFormGroup(values?: any): UntypedFormGroup {
    const formControls: { [key: string]: UntypedFormControl } = {};

    this.fields.forEach(field => {
      const validators = field.validators ? [...field.validators] : [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.type === FormFieldTypes.INPUT) {
        const fieldData = field.data as FormFieldInputData;

        if (fieldData && fieldData.minLength != null) {
          validators.push(Validators.minLength(fieldData.minLength));
        }

        if (fieldData && fieldData.maxLength != null) {
          validators.push(Validators.maxLength(fieldData.maxLength));
        }
      }

      const value = values ? values[field.name] : undefined;

      formControls[field.name] = new UntypedFormControl(value, { validators });
    });

    return new UntypedFormGroup(formControls);
  }

  private initFormList(): void {
    this.form = new UntypedFormGroup({});
    const formArray = new UntypedFormArray([], { validators: this.required ? Validators.required : null });
    this.form.addControl(this.formArrayName, formArray);
  }

  private addRowsToFormArray(): void {
    if (!this.items.length) {
      return;
    }

    this.items.forEach(item => this.addItem(item));
    this.cdr.markForCheck();
  }

  addItem(value: any): void {
    const group = this.prepareFormGroup(value);
    group.markAsDirty();
    this.formArray.push(group);
    this.rowAdded.emit();
  }

  removeRow(index: number): void {
    const row = this.formArray.at(index) as UntypedFormGroup;
    if (row) {
      this.submittedRows.delete(row);
    }
    this.formArray.removeAt(index);
  }

  private markCurrentRowsAsSubmitted(): void {
    this.formArray.controls.forEach(group => this.submittedRows.add(group as UntypedFormGroup));
  }

  onSubmit(): void {
    this.markCurrentRowsAsSubmitted();
    this.formSubmitted.emit();
  }
}
