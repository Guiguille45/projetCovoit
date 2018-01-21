import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../../service/connexion.service';
import { BddMembreService } from '../../service/bdd-membre.service';
import { BddUserService } from '../../service/bdd-user.service';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})
export class MonProfilComponent implements OnInit {

  private listeTrajets: Object[];
  private mesInfo: Object = {"Nom": "", "Prenom": "", "Email": "", "Age": "", "Telephone": "", "Role": ""};
  private noData: boolean = true;

  constructor(private bddMService: BddMembreService, private bddUService: BddUserService, private auth: ConnexionService) { }

  ngOnInit() {
  	this.bddUService.getOneUsers(this.auth.getUserId()).subscribe(res => {
  		this.mesInfo = res[0];
  	});


  	this.bddMService.getAllTrajets("Perso/" + this.auth.getUserId()).subscribe(res => {
  	  this.listeTrajets = res;
  	  if (this.listeTrajets != null && this.listeTrajets.length > 0) { this.noData = false; } else { this.noData = true; };
  	});
  }

}
