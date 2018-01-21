var https = require('https');
var express = require('express');
var assert = require("assert");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;
var cors = require('cors');

var app = express();
app.use(cors());
var url = "mongodb://localhost:27017/";
// const option = {
// 	 VOIR le paragraphe https la plateforme nodejs
// et aussi page 245
// }



MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	const DBcovoit = db.db('Covoit');
	const COLLuser = "Users";
	const COLLtrajetstype = "TrajetsType";
	const COLLtrajets = "Trajets";
	// mettre les autres bases si besoin
	console.log("Connexion au serveur MongoDB réussi");

// - - - - - - - - - - Authentification des utilisateurs - - - - - - - - - -
	app.get('/Connexion/:login/:password', function(req, res) {
		console.log("Route /Connexion/" + req.params.login + "/" + req.params.password);
		var param = {"Email": req.params.login, "Password": req.params.password};
		getWithParam(DBcovoit, COLLuser, param, function(msg, doc) {
			res.setHeader("Content-Type", "application/json");
			var json = JSON.stringify(doc);
			res.end(json);
		});
	});




// - - - - - - - - - - Admin : gestion de l'utilisateur - - - - - - - - - -
	app.get('/Admin/Utilisateurs', function(req, res) {
		console.log("Route /Admin/Utilisateurs");
		getAll(DBcovoit, COLLuser, function(msg, doc) {
			res.setHeader("Content-Type", "application/json");
			var json = JSON.stringify(doc);
			res.end(json);
		});
	});

	app.get('/Admin/Utilisateurs/Close/:id', function(req, res) {
		console.log("Route /Admin/Utilisateurs/Close/" + req.params.id);
		closeUserAccount(DBcovoit, COLLuser, req.params.id);
		res.setHeader("Content-Type", "application/json");
		var json = JSON.stringify({"res": "OK"});
		res.end(json);
	});

	app.get('/Admin/Utilisateurs/Open/:id', function(req, res) {
		console.log("Route /Admin/Utilisateurs/Open/" + req.params.id);
		openUserAccount(DBcovoit, COLLuser, req.params.id);
		res.setHeader("Content-Type", "application/json");
		var json = JSON.stringify({"res": "OK"});
		res.end(json);
	});

// - - - - - - - - - - Admin : gestion des trajets type - - - - - - - - - -
	app.get('/Admin/TrajetsType', function(req, res) {
		console.log("Route /Admin/TrajetsType");
		getAll(DBcovoit, COLLtrajetstype, function(msg, doc) {
			res.setHeader("Content-Type", "application/json");
			var json = JSON.stringify(doc);
			res.end(json);
		});
	});

	app.get('/Admin/TrajetsType/Add/:villedep/:villefin/:distance/:prix', function(req, res) {
		console.log("Route /Admin/TrajetsType/Add/"+ req.params.villedep + "/" + req.params.villefin + "/" + req.params.distance + "/" + req.params.prix);
		addTrajetType(DBcovoit, COLLtrajetstype, req.params.villedep, req.params.villefin, req.params.distance, req.params.prix);
		res.setHeader("Content-Type", "application/json");
		var json = JSON.stringify({"res": "OK"});
		res.end(json);
	});




// - - - - - - - - - - Membre : recherche des trajets - - - - - - - - - -
	app.get('/Trajets/Recherche/:villeDep/:villeFin/:DateDep', function(req, res) {
		console.log("Route /Trajets/" + req.params.villeDep +"/" + req.params.villeFin + "/" + req.params.DateDep);
		var param = {"VilleDep": req.params.villeDep, "VilleFin": req.params.villeFin};
		var dateRecherche = new Date(req.params.DateDep + "T00:00:00Z");
		DBcovoit.collection(COLLtrajets).aggregate([
			{ $match: param },
			{ $sort: { DateDep: 1 } },
			{ $lookup: {from: "Users", localField: "Conducteur", foreignField: "_id", as: "NomConducteur"}},
			{ $project: {"NomConducteur.Age": 0, "NomConducteur.Telephone":0, "NomConducteur.Role": 0, "NomConducteur.Etat": 0, "NomConducteur.Password": 0} }
		]).toArray(function(err, doc) {
			var sortie = [];
			var dateDuJour = new Date();
			dateDuJour.setHours(1, 0, 0, 0);
			for (var i in doc) {
				var dateTrajet = new Date(doc[i].DateDep);
				if ((dateTrajet.getTime() >= dateRecherche.getTime()) && (dateTrajet.getTime() >= dateDuJour.getTime()))  {
					doc[i].DateDep = doc[i].DateDep.getDate() + "/" + doc[i].DateDep.getMonth()+1 + "/" + doc[i].DateDep.getFullYear();
					sortie.push(doc[i]);
				}
			}
			if (err) var json = JSON.stringify("");
			else var json = JSON.stringify(sortie);
			res.setHeader("Content-Type", "application/json");
			res.end(json);
		});
	});

	app.get('/Trajets/Info/:id', function(req, res) {
		console.log("Route /Trajets/Info/" + req.params.id);
		var param = {"_id": ObjectId(req.params.id)};
		DBcovoit.collection(COLLtrajets).aggregate([
			{ $match: param },
			{ $sort: { DateDep: 1 } },
			{ $lookup: {from: "Users", localField: "Conducteur", foreignField: "_id", as: "NomConducteur"}},
			{ $project: {"NomConducteur.Role": 0, "NomConducteur.Etat": 0, "NomConducteur.Password": 0} }
		]).toArray(function(err, doc) {
			doc[0].DateDep = doc[0].DateDep.getDate() + "/" + doc[0].DateDep.getMonth()+1 + "/" + doc[0].DateDep.getFullYear();
			if (err) var json = JSON.stringify("");
			else var json = JSON.stringify(doc);
			res.setHeader("Content-Type", "application/json");
			res.end(json);
		});
	});

	app.get('/Trajets/Perso/:id', function(req, res) {
		console.log("Route /Trajets/Perso/" + req.params.id);
		getWithParam(DBcovoit, COLLtrajets, {"Conducteur": ObjectId(req.params.id)}, function(msg, doc) {
			for (var i in doc) {
				doc[i].DateDep = doc[i].DateDep.getDate() + "/" + doc[i].DateDep.getMonth()+1 + "/" + doc[i].DateDep.getFullYear();
			}
			res.setHeader("Content-Type", "application/json");
			var json = JSON.stringify(doc);
			res.end(json);
		});
	});




	app.get('/Profil/Perso/:id', function(req, res) {
		console.log("Route /Profil/Perso/" + req.params.id);
		getWithParam(DBcovoit, COLLuser, {"_id": ObjectId(req.params.id)}, function(msg, doc) {
			res.setHeader("Content-Type", "application/json");
			var json = JSON.stringify(doc);
			res.end(json);
		});
	});

	app.get('/Profil/Mail/:Mail', function(req, res) {
		console.log("Route /Profil/Mail/" + req.params.Mail);
		getWithParam(DBcovoit, COLLuser, {"Email": req.params.Mail}, function(msg, doc) {
			res.setHeader("Content-Type", "application/json");
			var json = JSON.stringify(doc);
			res.end(json);
		});
	});

	app.get('/Profil/Add/:Nom/:Prenom/:Email/:Age/:Telephone/:Role/:Etat/:Password', function(req, res) {
		console.log("Route /Profil/Add/" + req.params.Nom + "/" + req.params.Prenom + "/" + req.params.Email + "/" + req.params.Age + "/"
			+ req.params.Telephone + "/" + req.params.Role + "/" + req.params.Etat + "/" + req.params.Password);
		var nouveau = {"Nom": req.params.Nom, "Prenom": req.params.Prenom, "Email": req.params.Email, "Age": req.params.Age,
			"Telephone": req.params.Telephone, "Role": req.params.Role, "Etat": req.params.Etat, "Password": req.params.Password};
		DBcovoit.collection(COLLuser).insert(nouveau);
	});




	app.get('/TrajetType/GetVilleDep', function(req, res) {
		console.log("Route /TrajetType/GetVilleDep");
		DBcovoit.collection(COLLtrajetstype).distinct("VilleDep", function(err, doc) {
			var tmp = [];
			for (var s in doc) {
				tmp.push({"VilleDep": doc[s]});
			}
			var json = JSON.stringify(tmp);
			res.setHeader("Content-Type", "application/json");
			res.end(json);
		});
	});

	app.get('/TrajetType/GetVilleFin/:VilleDep', function(req, res) {
		console.log("Route /TrajetType/GetVilleFin/" + req.params.VilleDep);
		DBcovoit.collection(COLLtrajetstype).distinct("VilleFin", {"VilleDep": req.params.VilleDep}, function(err, doc) {
			var tmp = [];
			for (var s in doc) {
				tmp.push({"VilleFin": doc[s]});
			}
			var json = JSON.stringify(tmp);
			res.setHeader("Content-Type", "application/json");
			res.end(json);
		});
	});

	app.get('/TrajetType/All/:VilleDep/:VilleFin', function(req, res) {
		console.log("Route /TrajetType/All/" + req.params.VilleDep + "/" + req.params.VilleFin);
		DBcovoit.collection(COLLtrajetstype).find({"VilleDep": req.params.VilleDep, "VilleFin": req.params.VilleFin}).toArray(function(err, doc) {
			if (err) var json = JSON.stringify("");
			else var json = JSON.stringify(doc);
			res.setHeader("Content-Type", "application/json");
			res.end(json);
		});
	});

	app.get('/Trajet/Add/:VilleDep/:VilleFin/:DateDep/:Distance/:Prix/:NbPlace/:Conducteur', function(req, res) {
		console.log("Route /Trajet/Add/" + req.params.VilleDep + "/" + req.params.VilleFin + "/" + req.params.DateDep + "/" + req.params.Distance + "/" + req.params.Prix + "/" + req.params.NbPlace + "/" + req.params.Conducteur);
		var nouveau = {"VilleDep": req.params.VilleDep, "VilleFin": req.params.VilleFin, "DateDep": new Date(req.params.DateDep+"T00:00:00Z"),
						"Distance": req.params.Distance, "Prix": req.params.Prix, "NbPlace": req.params.NbPlace, "Conducteur": ObjectId(req.params.Conducteur)};
		DBcovoit.collection(COLLtrajets).insert(nouveau);
	});

});

app.listen(8080);



// - - - - - - - - - - Recupère toutes les données d'une base et table passé en paramètre
var getAll = function(db, coll, callback) {
	db.collection(coll).find().toArray(function(err, doc) {
		if (err) callback(err, []);
		else callback("OK", doc);
	});
};

// - - - - - - - - - - Récupère d'une base et table passé en paramètre avec un filtre (objet json)
var getWithParam = function(db, coll, params, callback) {
	db.collection(coll).find(params).toArray(function(err, doc) {
		if (err) callback(err, []);
		else callback("OK", doc);
	});
};


var closeUserAccount = function(db, coll, id) {
	db.collection(coll).update({"_id": ObjectId(id)}, {$set: {"Etat": "0"}});
};
var openUserAccount = function(db, coll, id) {
	db.collection(coll).update({"_id": ObjectId(id)}, {$set: {"Etat": "1"}});
};
var addTrajetType = function(db, coll, vdep, vfin, dist, prix) {
	db.collection(coll).insert({"VilleDep": vdep, "VilleFin": vfin, "Distance": dist, "Prix": prix});
};