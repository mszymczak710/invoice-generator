import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogData } from '@shared/shared-confirm/types';

@Component({
  selector: 'klg-confirm-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public confirmData: ConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }
}
