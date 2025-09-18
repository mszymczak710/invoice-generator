import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Company } from '@company/types';

import { environmentBase } from '@environments/environment-base';

@Injectable()
export class CompanyService {
  private url = environmentBase.apiUrl + '/company/';

  constructor(private http: HttpClient) {}

  getCompany(): Observable<Company> {
    return this.http.get<Company>(this.url);
  }
}
