import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CompanyService } from '@company/services/company.service';
import { Company } from '@company/types';

@Injectable()
export class CompanyFacade {
  constructor(private companyService: CompanyService) {}

  getCompany(): Observable<Company> {
    return this.companyService.getCompany();
  }
}
