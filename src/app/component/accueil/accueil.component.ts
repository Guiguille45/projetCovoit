import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private recherche: Object;
  private error: boolean;
  private dateJour: Date;

  constructor(private router: Router) {}

  ngOnInit() {
    this.dateJour = new Date();
  	this.error = false;
  	this.recherche = {"VilleDep": "", "VilleFin": "", "DateDep": ""};
  }

  onSubmit() {
  	if ((this.recherche["VilleDep"] != "") && (this.recherche["VilleFin"] != "") && (this.recherche["DateDep"] != "")) {
  		this.error = false;
  		this.router.navigateByUrl("/Trajets/" + this.recherche["VilleDep"] + "/" + this.recherche["VilleFin"] + "/" + this.recherche["DateDep"]);
  	} else {
  		this.error = true;
  	}
  }
}
