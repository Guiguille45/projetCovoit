import { Component, OnInit } from '@angular/core';
import { BddMembreService } from '../../service/bdd-membre.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css']
})
export class TrajetsComponent implements OnInit {

  private listeTrajets: Object[];
  private noData: boolean = true;
  private trajet: Object;

  constructor(private route: ActivatedRoute, private bddService: BddMembreService) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
      var dateSplit = params["DateDep"].split("-");
  	  this.trajet = {"VilleDep": params["VilleDep"], "VilleFin": params["VilleFin"], "DateDep":  dateSplit[2]+"/"+dateSplit[1]+"/"+dateSplit[0]};
  	  this.bddService.getAllTrajets("Recherche/" + params["VilleDep"] + "/" + params["VilleFin"] + "/" + params["DateDep"]).subscribe(res => {
  	  	this.listeTrajets = res;
  	  	if (this.listeTrajets != null && this.listeTrajets.length > 0) { this.noData = false; } else { this.noData = true; };
  	  });
    });
  }

}
