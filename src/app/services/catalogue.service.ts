import { environment } from './../../environments/environment';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  public host: String = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
  public getResource(url: any) {
    return this.http.get(this.host + url);
  }

  uploadPhotoProduct(file: File,idProduct:number): Observable<HttpEvent<{}>> {
    let formaData: FormData = new FormData();
    formaData.append('file', file);
    const req = new HttpRequest('POST', this.host + '/uploadPhoto/'+idProduct, formaData, {
      reportProgress: true,
      responseType: 'text',
    });
    return this.http.request(req);
  }
}
