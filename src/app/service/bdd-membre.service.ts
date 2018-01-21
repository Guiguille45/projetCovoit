import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BddMembreService {

  constructor(private http: HttpClient) {}

  getAllTrajets(params): Observable<any> {
  	let url: string = "http://localhost:8080/Trajets/" + params;
  	let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
  	return observable;
  }

  getVilleDep(): Observable<any> {
  	let url: string = "http://localhost:8080/TrajetType/GetVilleDep";
  	let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
  	return observable;
  }

  getVilleFin(params): Observable<any> {
    let url: string = "http://localhost:8080/TrajetType/GetVilleFin/" + params;
    let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
    return observable;
  }

  getTrajetType(params): Observable<any> {
    let url: string = "http://localhost:8080/TrajetType/" + params;
    let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
    return observable;
  }

  addTrajet(params) {
    let url: string = "http://localhost:8080/Trajet/Add/" + params;
    let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
    return observable;
  }

}
