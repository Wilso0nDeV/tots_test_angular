import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TOTS_CORE_PROVIDER, TotsBaseHttpService, TotsCoreConfig, TotsListResponse, TotsQuery } from '@tots/core';
import { catchError, Observable, retry } from 'rxjs';
import { ErrorService } from '../../../../shared/services/error-control.service';
import { ClientResponse } from '../interface/client.interface';
import { Client } from '../../../entities/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends TotsBaseHttpService<Client> {

  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected override config: TotsCoreConfig,
    protected override http: HttpClient,
    protected httpError : ErrorService
  ) {
    super(config, http);
    this.basePathUrl = 'client';
   
  }

  override list(query: TotsQuery): Observable<any> {
    return this.http.post<any>(`${this.config.baseUrl}${this.basePathUrl}/list?page=${query.page}&limit=${query.per_page}`,{})
  }

  override create(item: Client): Observable<any> {
    return this.http.post<any>(`${this.config.baseUrl}${this.basePathUrl}/save`,item)
  }

  override update(item: Client): Observable<any> {
    return this.http.post<any>(`${this.config.baseUrl}${this.basePathUrl}/save`,item)

  }

  override removeById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.config.baseUrl}${this.basePathUrl}/remove/${id}`)
  }
 
  }
  

