import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BddAdminService } from '../../service/bdd-admin.service';
import { ConnexionService } from '../../service/connexion.service';

@Component({
  selector: 'app-admin-trajets-type',
  templateUrl: './admin-trajets-type.component.html',
  styleUrls: ['./admin-trajets-type.component.css']
})
export class AdminTrajetsTypeComponent implements OnInit {

  private listeTrajets: Object[];
  private afficheForm: boolean;
  private tmp: Object[];
  private nouveau: Object;

  constructor(private auth: ConnexionService, private bddService: BddAdminService, private router: Router) { }

  ngOnInit() {
    if (!this.auth.getUserLoggedIn() || !this.auth.estAdmin()) {
      this.auth.setUserLoggedOf();
      this.router.navigateByUrl('');
    }
  	this.nouveau = {"VilleDep": "", "VilleFin": "", "Distance": "", "Prix": ""};
  	this.afficheForm = false;
  	this.bddService.getAllTravel().subscribe(res => this.listeTrajets = res);
  }

  ajouter() {
  	this.nouveau = {"VilleDep": "", "VilleFin": "", "Distance": "", "Prix": ""};
  	this.afficheForm = true;
  }

  onSubmit() {
  	this.afficheForm = false;
  	this.bddService.addTravel(this.nouveau["VilleDep"] + "/" + this.nouveau["VilleFin"] + "/" + this.nouveau["Distance"] + "/" + this.nouveau["Prix"]).subscribe(res => this.tmp = res);
  	this.bddService.getAllTravel().subscribe(res => this.listeTrajets = res);
  }

}
