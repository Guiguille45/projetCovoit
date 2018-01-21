import { Component, OnInit } from '@angular/core';
import { BddMembreService } from '../../service/bdd-membre.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info-trajet',
  templateUrl: './info-trajet.component.html',
  styleUrls: ['./info-trajet.component.css']
})
export class InfoTrajetComponent implements OnInit {

  private leTrajet: Object[];

  constructor(private location: Location, private route: ActivatedRoute, private bddService: BddMembreService) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  	  this.bddService.getAllTrajets("Info/" + params["id"]).subscribe(res => {
  	  	this.leTrajet = res;
  	  });
    });
  }

  goBack() {
  	this.location.back();
  }
}
