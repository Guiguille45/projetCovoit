import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BddAdminService {

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
  	let url: string = "http://localhost:8080/Admin/Utilisateurs";
  	let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
  	return observable;
  }

  closeUserAccount(id): Observable<any> {
  	let url: string = "http://localhost:8080/Admin/Utilisateurs/Close/" + id;
  	let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
  	return observable;
  }

  openUserAccount(id): Observable<any> {
  	let url: string = "http://localhost:8080/Admin/Utilisateurs/Open/" + id;
  	let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
  	return observable;
  }



  getAllTravel(): Observable<any> {
    let url: string = "http://localhost:8080/Admin/TrajetsType";
    let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
    return observable;
  }
  addTravel(params): Observable<any> {
    let url: string = "http://localhost:8080/Admin/TrajetsType/Add/" + params;
    let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
    return observable;
  }

}
