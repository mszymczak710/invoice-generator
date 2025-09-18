import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { delay } from 'rxjs';

import { StringsLoader } from '@company/misc';
import { CompanyFacade, CompanyService } from '@company/services';
import { Company } from '@company/types';

import { SpinnerComponent } from '@core/components';
import { ClassExtender } from '@core/misc';

export interface CompanyInfoComponent extends StringsLoader {}

@Component({
  selector: 'klg-company-info',
  standalone: true,
  imports: [CommonModule, MatCardModule, SpinnerComponent],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss',
  providers: [CompanyService, CompanyFacade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@ClassExtender([StringsLoader])
export class CompanyInfoComponent implements OnInit {
  company: Company;
  errorMessage: string;
  loading: boolean;

  get phones(): string {
    return this.company.phones.join(', ');
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private companyFacade: CompanyFacade
  ) {}

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany(): void {
    this.loading = true;
    this.companyFacade
      .getCompany()
      // Added artificial delay to ensure the loading spinner is visible
      // and to better reflect the real-world application state.
      // Note: This is not a best practice for production code and should
      // only be used for demonstration or testing purposes.
      .pipe(delay(300))
      .subscribe({
        next: company => {
          this.company = company;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: error => {
          console.error('[ERROR] Failed to fetch company data:', error);
          this.errorMessage = error.error || error.statusText;
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }
}
