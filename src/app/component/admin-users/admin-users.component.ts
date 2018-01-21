import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BddAdminService } from '../../service/bdd-admin.service';
import { ConnexionService } from '../../service/connexion.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  private listeUsers: Object[];
  private tmp: Object[];

  constructor(private auth: ConnexionService, private bddService: BddAdminService, private router: Router) { }

  ngOnInit() {
    if (!this.auth.getUserLoggedIn()) {
      this.auth.setUserLoggedOf();
      this.router.navigateByUrl('/Connexion/NonConnecte');
    }
    if (!this.auth.estAdmin()) {
      this.auth.setUserLoggedOf();
      this.router.navigateByUrl('/Connexion/Permission');
    }
  	this.bddService.getAllUser().subscribe(res => this.listeUsers = res);
  }

  onClickFermerCompte(id) {
  	this.bddService.closeUserAccount(id).subscribe(res => this.tmp = res); // change l'etat du compte
  	this.bddService.getAllUser().subscribe(res => this.listeUsers = res); // reload les données
  }

  onClickOuvrirCompte(id) {
  	this.bddService.openUserAccount(id).subscribe(res => this.tmp = res);// change l'etat du compte
  	this.bddService.getAllUser().subscribe(res => this.listeUsers = res); // reload les données
  }

}
