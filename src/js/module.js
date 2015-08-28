
angular.module('elenApp', ['ui.bootstrap', 'ui.router', 'ngCookies', 'ngInputDate'])



.factory('db', ['dateFactory', function(dateFactory) {
	var factory = {};
	factory.saveObject= function(object, callback) {
		database.insert(object, function(err) {
			if (err) console.log(err);
			if(callback) {
				callback();
			}
		})
	}

	factory.find = function(criteria, callback) {
		return database.find(criteria, function(err, doc) {
			callback(err, doc);
		})
	}

	factory.findAllCours = function(callback) {
		this.find({}, function(err, docs) {console.log(err); callback(docs)});
	}

	factory.findCoursByDate = function(date, callback) {
		this.find({date: dateFactory.dateToString(date)}, function(err, docs) {
			if(err) console.log(err);
			return callback(docs);
		});
	}


	factory.addCours = function(cours, callback) {
		coursToSave = {name: cours.name, date: dateFactory.dateToString(cours.date)}
		this.saveObject(coursToSave, callback);
	}

    return factory;

}])

.factory('coursFactory', ['db', function(db) {
	var factory = {};

	factory.createCours = function(cours) {
		cours.repetition = 1;
		db.addCours(cours);
		cours.date.setDate(cours.date.getDate() +1);
		cours.repetition = 2;
		db.addCours(cours);
		cours.date.setDate(cours.date.getDate() +2);
		cours.repetition = 3;
		db.addCours(cours);
		cours.date.setDate(cours.date.getDate() +7);
		cours.repetition = 4;
		db.addCours(cours);
		cours.date.setDate(cours.date.getDate() +50);
		cours.repetition = 5;
		db.addCours(cours);
	}
	return factory;
}])

.factory('dateFactory', function() {
	var factory = {};
	factory.dateToString = function(date) {
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();

		var result = "";

		if (day < 10) {
			day = "0" + day;
		}

		if (month < 10) {
			month = "0" + month;
		}

		result += day + "/" + month + "/" + year;
		return result;

	}

	factory.stringToDate = function(str) {
		var array = str.split("/");
		var day = array[0], month = array[1], year = array[2];
		return new Date(year, month -1, day);
	}

	factory.firstDayOfWeek = function(date) {
		date2 = new Date(date);
		var day = date2.getDay();
		if (day == 0) {
			date2.setDate(date.getDate() - date.getDay() - 6 );
		}
		else date2.setDate(date.getDate() - date.getDay() +1 );

  		return date2;
	}

	return factory;
});


// Load native UI library
var gui = require('nw.gui');

var Datastore = require('nedb');
var database = new Datastore(
	{filename : getUserDataPath() + '/database.db', autoload: true}
);

function getUserDataPath() {  
    var path = require('path');
    return gui.App.dataPath;
}

