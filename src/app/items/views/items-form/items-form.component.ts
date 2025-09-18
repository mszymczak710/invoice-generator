import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Observable } from 'rxjs';

import { ClassExtender } from '@core/misc';
import { ToastService } from '@core/services';

import { StringsLoader } from '@items/misc';
import { ItemsFacade, ItemsService } from '@items/services';
import { Item } from '@items/types';

import { FormListComponent } from '@shared/shared-form/components';
import { FormCanDeactivate } from '@shared/shared-form/misc';
import {
  FormField,
  FormFieldInputData,
  FormFieldNumberData,
  FormFields,
  FormFieldStyles,
  FormFieldTypes,
  FormListAction
} from '@shared/shared-form/types';

type ValidationResult = { items: Item[]; hasWarnings: boolean };

export interface ItemsFormComponent extends StringsLoader {}

@Component({
  selector: 'klg-items-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormListComponent, MatCardModule],
  templateUrl: './items-form.component.html',
  styleUrl: './items-form.component.scss',
  providers: [ItemsFacade, ItemsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@ClassExtender([StringsLoader])
export class ItemsFormComponent extends FormCanDeactivate {
  @ViewChild(FormListComponent) formListComponent: FormListComponent;

  errorMessage: string;

  formListActions: FormListAction[] = [
    {
      action: (index: number, formListComp: FormListComponent): void => formListComp.removeRow(index),
      disabled: (formListComp: FormListComponent): boolean => formListComp.formArray.length === 1,
      disabledLabel: this.strings.form.action.delete.disabledLabel,
      icon: 'delete',
      label: this.strings.form.action.delete.label
    }
  ];

  formListColumnStyles = new Map<string, FormFieldStyles>([
    ['name', { maxWidth: '14rem' }],
    ['count', { maxWidth: '8.5rem' }],
    ['price', { maxWidth: '8.5rem' }]
  ]);

  get formArray(): UntypedFormArray {
    return this.formListComponent?.formArray;
  }

  get items(): Item[] {
    return this.itemsFacade.items;
  }

  constructor(
    private itemsFacade: ItemsFacade,
    private toastService: ToastService
  ) {
    super();
  }

  getFormListDef(): FormFields {
    const idPrefix = 'items-form';
    return new Map<string, FormField>([
      [
        'name',
        {
          data: {
            minLength: 3,
            maxLength: 30
          } as FormFieldInputData,
          idPrefix,
          label: this.strings.item.name,
          labelledBy: 'items-form-field-name',
          name: 'name',
          placeholder: this.strings.form.fields.name.placeholder,
          required: true,
          type: FormFieldTypes.INPUT
        }
      ],
      [
        'count',
        {
          data: {
            min: 0,
            max: 100
          } as FormFieldNumberData,
          idPrefix,
          label: this.strings.item.count,
          labelledBy: 'items-form-field-count',
          name: 'count',
          placeholder: this.strings.form.fields.count.placeholder,
          required: true,
          type: FormFieldTypes.INPUT_NUMBER
        }
      ],
      [
        'price',
        {
          data: {
            min: 0,
            max: 1000000
          } as FormFieldNumberData,
          idPrefix,
          label: this.strings.item.price,
          labelledBy: 'items-form-field-price',
          name: 'price',
          placeholder: this.strings.form.fields.price.placeholder,
          required: true,
          type: FormFieldTypes.INPUT_NUMBER
        }
      ]
    ]);
  }

  private areItemsSame(formItems: Item[], savedItems: Item[]): boolean {
    if (formItems.length !== savedItems.length) {
      return false;
    }

    for (let i = 0; i < formItems.length; i++) {
      const a = formItems[i];
      const b = savedItems[i];
      if (a.name !== b.name || a.count !== b.count || a.price !== b.price) {
        return false;
      }
    }
    return true;
  }

  private validateAndPrepareData(): ValidationResult {
    const validControls = [];
    const invalidIndexes: number[] = [];

    this.formArray?.controls.forEach((control, index) => {
      if (control.invalid) {
        control.markAllAsTouched();
        invalidIndexes.push(index);
      } else {
        validControls.push(control);
      }
    });

    return {
      items: validControls.map(control => control.value as Item),
      hasWarnings: invalidIndexes.length > 0
    };
  }

  submit(): void {
    if (!this.formArray.length) {
      this.errorMessage = this.strings.form.error.emptyList;
      return;
    }

    if (this.areItemsSame(this.formArray?.value, this.items)) {
      this.toastService.showInfoMessage(this.strings.form.error.noChanges);
      return;
    }

    const { items, hasWarnings } = this.validateAndPrepareData();
    this.itemsFacade.setItems(items);

    if (hasWarnings) {
      this.toastService.showWarningMessage(this.strings.form.warning);
    } else {
      this.toastService.showSuccessMessage(this.strings.form.success);
    }
  }

  onRowAdded(): void {
    this.errorMessage = '';
  }

  override canDeactivate(): boolean | Observable<boolean> {
    return !this.formListComponent.form.dirty;
  }
}
