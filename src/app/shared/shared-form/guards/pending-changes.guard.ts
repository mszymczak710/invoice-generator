import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';

import { map } from 'rxjs';

import { commonStrings } from '@core/misc';

import { ConfirmDialogComponent } from '@shared/shared-confirm/components';
import { ConfirmDialogData } from '@shared/shared-confirm/types';
import { ComponentCanDeactivate } from '@shared/shared-form/types';

export const pendingChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = component => {
  if (!component.canDeactivate || component.canDeactivate()) {
    return true;
  }

  const dialog = inject(MatDialog);

  return dialog
    .open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, {
      data: {
        cancelLabel: commonStrings.no,
        confirmLabel: commonStrings.yes,
        confirm: {
          content: commonStrings.exitUnsaved.confirm.content,
          title: commonStrings.exitUnsaved.confirm.title
        }
      },
      width: '15rem'
    })
    .afterClosed()
    .pipe(map(Boolean));
};
