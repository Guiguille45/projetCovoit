import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class ConnexionService {

  private isLoggedIn: boolean;
  private userMail: string;
  private userNom: string;
  private userPrenom: string
  private userId: string;
  private userRole: number;
  // role: number = 2;

  constructor(private router: Router, private http: HttpClient) {
    // this.isLoggedIn = false;
  }

  setUserLoggedIn(mail, nom, prenom, id, role) {
    this.isLoggedIn = true;
    this.userMail = mail;
    this.userNom = nom;
    this.userPrenom = prenom;
    this.userId = id;
    this.userRole = role;
  }
  setUserLoggedOf() {
    this.isLoggedIn = false;
    this.userMail = null;
    this.userNom = null;
    this.userPrenom = null;
    this.userId = null;
    this.userRole = null;
  }

  getUserLoggedIn() {
    return this.isLoggedIn;
  }
  getUserPrenom() {
    return this.userPrenom;
  }
  getUserId() {
    return this.userId;
  }


  estAdmin(): boolean {
    if (this.isLoggedIn && this.userRole == 1) {
      return true;
    } else {
      return false;
    }
  }





  connect(login, password): Observable<any> {
  	let url: string = "http://localhost:8080/Connexion/" + login + "/" + password;
  	let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
  	return observable;
  }

  canActivate(): boolean {
  	if (this.isLoggedIn) { return true; }
  	this.router.navigateByUrl('/Connexion/NonConnecte');
  	return false;
  }

  // getAllTrajets(params): Observable<any> {
  // 	let url: string = "http://localhost:8080/Trajets/" + params;
  // 	let observable: Observable<any> = this.http.get(url).map((res: Response) => res);
  // 	return observable;
  // }

}
