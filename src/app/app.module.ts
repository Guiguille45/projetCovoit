import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';

// Import Component
import { AppComponent } from './app.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { TrajetsComponent } from './component/trajets/trajets.component';
import { MenuComponent } from './component/menu/menu.component';
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
import { BddAdminService } from './service/bdd-admin.service';
import { BddMembreService } from './service/bdd-membre.service';
import { BddUserService } from './service/bdd-user.service';
import { ConnexionService } from './service/connexion.service';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    TrajetsComponent,
    MenuComponent,
    ConnexionComponent,
    InscriptionComponent,
    AdminUsersComponent,
    AdminTrajetsTypeComponent,
    AdminMenuComponent,
    AddTrajetComponent,
    InfoTrajetComponent,
    MonProfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [BddAdminService, BddMembreService, BddUserService, ConnexionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
