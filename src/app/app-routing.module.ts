import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Component
import { AccueilComponent } from './component/accueil/accueil.component';
import { TrajetsComponent } from './component/trajets/trajets.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { AddTrajetComponent } from './component/add-trajet/add-trajet.component';
import { InfoTrajetComponent } from './component/info-trajet/info-trajet.component';
import { MonProfilComponent } from './component/mon-profil/mon-profil.component';
// Admin component
import { AdminUsersComponent } from './component/admin-users/admin-users.component';
import { AdminTrajetsTypeComponent } from './component/admin-trajets-type/admin-trajets-type.component';
import { AdminMenuComponent } from './component/admin-menu/admin-menu.component';

// Import Service
import { ConnexionService } from './service/connexion.service';


// { path: 'Accueil', redirectTo: '', pathMatch: 'full' },
const routes: Routes = [
		{ path: '', component: AccueilComponent, pathMatch: 'full' },
		{ path: 'Connexion/:Motif', component: ConnexionComponent, pathMatch: 'full' },
		{ path: 'Inscription/:Motif', component: InscriptionComponent, pathMatch: 'full' },
		{ path: 'Trajets/:VilleDep/:VilleFin/:DateDep', component: TrajetsComponent, pathMatch: 'full' },
		{ path: 'Trajets/Info/:id', canActivate: [ConnexionService], component: InfoTrajetComponent, pathMatch: 'full' },
		{ path: 'Trajets/Add', canActivate: [ConnexionService], component: AddTrajetComponent, pathMatch: 'full' },
		{ path: 'Profil', canActivate: [ConnexionService], component: MonProfilComponent, pathMatch: 'full' },
		{ path: 'Admin', component: AdminMenuComponent, children: [
			{ path: 'Users', canActivate: [ConnexionService], component: AdminUsersComponent, pathMatch: 'full' },
			{ path: 'TrajetsType', canActivate: [ConnexionService], component: AdminTrajetsTypeComponent, pathMatch: 'full' },
		] }
	];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}