import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpBaseService {
  private httpClient = inject(HttpClient);

  protected httpGet(API_URL: string, ENDPOINT: string): Observable<any> {
    return this.httpClient.get(`${API_URL}/${ENDPOINT}`);
  }

  protected httpGetById(
    API_URL: string,
    ENDPOINT: string,
    id: string,
  ): Observable<any> {
    return this.httpClient.get(`${API_URL}/${ENDPOINT}/${id}`);
  }

  protected httpPost(
    API_URL: string,
    ENDPOINT: string,
    body: any,
  ): Observable<any> {
    return this.httpClient.post(`${API_URL}/${ENDPOINT}`, body);
  }

  protected httpPut(
    API_URL: string,
    ENDPOINT: string,
    body: any,
  ): Observable<any> {
    return this.httpClient.put(`${API_URL}/${ENDPOINT}`, body);
  }

  protected httpDelete(API_URL: string, ENDPOINT: string): Observable<any> {
    return this.httpClient.delete(`${API_URL}/${ENDPOINT}`);
  }
}
