import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFilaments } from '../shared/Models/Filaments';
import { IModelPrice } from '../shared/Models/modelPrice';
import { IModelToken } from '../shared/Models/modelToken';

@Injectable({
  providedIn: 'root'
})
export class CustomOrderService {
  baseUrl = environment.ApiUrl;
  constructor(private http: HttpClient) { }
  postFile(fileToUpload: File){
        console.log(fileToUpload);
        const formData: FormData = new FormData();
        formData.append('model', fileToUpload, fileToUpload.name);
        console.log('Oto formdata: ' + formData);
        const headerrs = new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        });
        return this.http.post(this.baseUrl + 'customorder', formData, {headers: headerrs}).pipe(map(
          (res: IModelToken) => {
            localStorage.setItem('modelName', fileToUpload.name.replace('.stl', ''));
            localStorage.setItem('modelId', res.token + fileToUpload.name);
            localStorage.setItem('modelToken', res.token);
            localStorage.setItem('id', res.userId);
          }
        ));
  }
  getFilaments(){
    return this.http.get(this.baseUrl + 'filaments').pipe(map(
      (res: IFilaments[]) => {
        return res;
      }
    ));
  }
  getPrice(filamentId: number, fillingPercent: number){
  const model: IModelPrice = {
    modelId: localStorage.getItem('modelId'),
    FilamentId: filamentId,
    fillingPercent
  };
  const headerrs = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });
  return this.http.post(this.baseUrl + 'customorder/price', model, {headers: headerrs}).pipe(map(
    (res: number) => {
      return res;
    }
  ));
  }

}
