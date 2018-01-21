import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../../service/connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private estConnecte: boolean;

  constructor(private router: Router, private auth: ConnexionService) { }

  ngOnInit() {
  }

  logOut() {
  	this.auth.setUserLoggedOf();
  	this.router.navigateByUrl('');
  }

}
