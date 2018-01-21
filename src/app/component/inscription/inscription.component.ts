import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnexionService } from "../../service/connexion.service";
import { Md5 } from 'ts-md5/dist/md5';
import { BddUserService } from "../../service/bdd-user.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

	private nouveau: Object = {"Nom": "", "Prenom": "", "Email": "", "Age": "", "Telephone": "", "Role": "0", "Etat": "1", "Password": ""};
	private error: string;
	private tmp: Object[];

  constructor(private route: ActivatedRoute, private router: Router, private auth: ConnexionService, private bddService: BddUserService) { }

  ngOnInit() {
  	if (this.auth.getUserLoggedIn()) { this.router.navigateByUrl("/"); }
  	this.route.params.subscribe(params => {
      this.error = params["Motif"];
    });
  }

  onSubmit() {
  	if ((this.nouveau["Nom"] != "") && (this.nouveau["Prenom"] != "") && (this.nouveau["Email"] != "") &&
  		(this.nouveau["Age"] != "") && (this.nouveau["Telephone"] != "") && (this.nouveau["Password"] != "")) {

  		this.bddService.getOneUserByMail(this.nouveau["Email"]).subscribe(res => {
  			this.tmp = res;
  			if (this.tmp !== undefined && this.tmp.length == 1) {
  				this.router.navigateByUrl("/Inscription/Utilise");
  			} else {
  				this.nouveau["Password"] = Md5.hashStr(this.nouveau["Password"]);
  				var param = this.nouveau["Nom"] + "/" + this.nouveau["Prenom"] + "/" + this.nouveau["Email"] + "/" + this.nouveau["Age"]
  				+ "/" + this.nouveau["Telephone"] + "/" + this.nouveau["Role"] + "/" + this.nouveau["Etat"] + "/" + this.nouveau["Password"];
  				this.bddService.addUser(param).subscribe(res => this.tmp = res);
  				this.router.navigateByUrl("/Connexion/InscriptionOk");
  			}
  		});
  	} else {
  		this.router.navigateByUrl("/Inscription/Invalid");
  	}

  }

}
