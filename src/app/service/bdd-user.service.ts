import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BddUserService {

  constructor(private http: HttpClient) {}

  getOneUsers(params): Observable<any> {
  	let url: string = "http://localhost:8080/Profil/Perso/" + params;
  	let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
  	return observable;
  }

  getOneUserByMail(params): Observable<any> {
  	let url: string = "http://localhost:8080/Profil/Mail/" + params;
  	let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
  	return observable;
  }

  addUser(params): Observable<any> {
  	let url: string = "http://localhost:8080/Profil/Add/" + params;
  	let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
  	return observable;
  }

}