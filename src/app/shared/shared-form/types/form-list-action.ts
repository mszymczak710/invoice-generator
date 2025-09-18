import { FormListComponent } from '@shared/shared-form/components';

export interface FormListAction {
  action: (index: number, formListComp?: FormListComponent) => void;
  disabled?: (formListComp?: FormListComponent) => boolean;
  disabledLabel?: string;
  icon: string;
  label: string;
}
