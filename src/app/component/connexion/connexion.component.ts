import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnexionService } from '../../service/connexion.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Location } from '@angular/common';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  private listeUser: Object[];
  private error: string;

  constructor(private location: Location, private route: ActivatedRoute, private router: Router, private auth: ConnexionService) { }

  ngOnInit() {
    if (this.auth.getUserLoggedIn()) { this.router.navigateByUrl("/"); }
    this.route.params.subscribe(params => {
      this.error = params["Motif"];
    });
  }

  onSubmit(e) {
  	e.preventDefault();
  	var username = e.target.elements[0].value;
  	var password = Md5.hashStr(e.target.elements[1].value);
  	this.auth.connect(username, password).subscribe(res => {
  		this.listeUser = res;
  		if (this.listeUser !== undefined && this.listeUser.length == 1) {
        if (this.listeUser[0]["Etat"] == 1) {
    			this.auth.setUserLoggedIn(this.listeUser[0]["Mail"], this.listeUser[0]["Nom"], this.listeUser[0]["Prenom"], this.listeUser[0]["_id"], this.listeUser[0]["Role"]);
          this.location.back();
        } else {
          this.auth.setUserLoggedOf();
        this.router.navigateByUrl('/Connexion/Bloque');
        }
  		} else {
  			this.auth.setUserLoggedOf();
        this.router.navigateByUrl('/Connexion/Invalid');
  		}
  	});
  }

  goBack() {
    this.location.back();
  }
}
