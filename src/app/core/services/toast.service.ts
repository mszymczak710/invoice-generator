import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
  constructor(private toastrService: ToastrService) {}

  private showMessage(type: 'error' | 'info' | 'success' | 'warning', message: string): void {
    if (type === 'success') {
      this.toastrService.success(message);
    } else if (type === 'warning') {
      this.toastrService.warning(message);
    } else if (type === 'info') {
      this.toastrService.info(message);
    } else {
      this.toastrService.error(message);
    }
  }

  showSuccessMessage(message: string): void {
    this.showMessage('success', message);
  }

  showErrorMessage(message: string): void {
    this.showMessage('error', message);
  }

  showInfoMessage(message: string): void {
    this.showMessage('info', message);
  }

  showWarningMessage(message: string): void {
    this.showMessage('warning', message);
  }
}
