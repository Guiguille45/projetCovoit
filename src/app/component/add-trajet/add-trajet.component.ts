import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BddMembreService } from '../../service/bdd-membre.service';
import { ConnexionService } from '../../service/connexion.service';

@Component({
  selector: 'app-add-trajet',
  templateUrl: './add-trajet.component.html',
  styleUrls: ['./add-trajet.component.css']
})
export class AddTrajetComponent implements OnInit {

  private nouveau: Object;
  private trajetType: Object;
  private listeVilleDep: Object[];
  private listeVilleFin: Object[];
  private messageVilleFin: string;
  private error: boolean;
  private tmp: Object[];

  constructor(private auth: ConnexionService, private bddService: BddMembreService, private router: Router) { }

  ngOnInit() {
  	this.error = false;
  	this.messageVilleFin = "Choisissez d'abord la ville de départ...";
  	this.nouveau = {"VilleDep": "Choisissez une ville...", "VilleFin": "Choisissez d'abord la ville de départ...", "DateDep": "", "Distance": "", "Prix": "", "NbPlace": 0, "Conducteur": this.auth.getUserId()};
  	this.bddService.getVilleDep().subscribe(res => this.listeVilleDep = res);

  	// {"VilleDep": "Montpellier", "VilleFin": "Paris", "DateDep": new Date("2018-01-02T00:00:00Z"), "Distance": "750", "Prix": "110", "NbPlace": "2", "Conducteur": ObjectId("5a634b6bb3383a62c3749c87")}
  }

  onSubmit() {
  	if ((this.nouveau["VilleDep"] != "") && (this.nouveau["VilleDep"] != "Choisissez une ville...") &&(this.nouveau["DateDep"] != "") &&
  		(this.nouveau["VilleFin"] != "") && (this.nouveau["VilleFin"] != "Choisissez une ville...") && (this.nouveau["VilleFin"] != "Choisissez d'abord la ville de départ...") &&
  		(this.nouveau["Distance"] != "") && (this.nouveau["Prix"] != "") && (this.nouveau["NbPlace"] != "") && (this.nouveau["Conducteur"] != "")) {
  		var param = this.nouveau["VilleDep"] + "/" + this.nouveau["VilleFin"] + "/" + this.nouveau["DateDep"] + "/" + this.nouveau["Distance"] + "/" + this.nouveau["Prix"] + "/" + this.nouveau["NbPlace"] + "/" + this.nouveau["Conducteur"];
  		this.bddService.addTrajet(param).subscribe(res => this.tmp = res);
      this.router.navigateByUrl('/Profil');
  	} else {
  		this.error = true;
  	}

  }

  selectNewVilleDep() {
  	if (this.nouveau["VilleDep"] != "Choisissez une ville...") {
  		this.messageVilleFin = "Choisissez une ville...";
  	}
  	this.bddService.getVilleFin(this.nouveau["VilleDep"]).subscribe(res => this.listeVilleFin = res);
  }

  selectNewVilleFin() {
  	this.bddService.getTrajetType("All/" + this.nouveau["VilleDep"] + "/" + this.nouveau["VilleFin"]).subscribe(res => {
  		this.trajetType = res[0];
  		this.nouveau["Distance"] = this.trajetType["Distance"];
  		this.nouveau["Prix"] = this.trajetType["Prix"];
  		console.log(this.nouveau);
  	});
  }

}
