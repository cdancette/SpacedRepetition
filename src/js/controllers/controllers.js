/**
 * Master Controller
 */

angular.module('elenApp')
    .controller('MasterCtrl', ['$scope', '$cookieStore','$state', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $state) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

}

//*****************Controlleurs maison


angular.module('elenApp')


/////////HomeCtrl
.controller('HomeCtrl', ['$scope', 'db', 'dateFactory', function($scope, db, dateFactory) {

  $scope.title = "Accueil";

  $scope.date = new Date();

  $scope.load = function() {
    db.findCoursByDate($scope.date, function(data) {
      $scope.list = data;
      $scope.$apply();
    })
  }

  $scope.load();

  $scope.changeDay = function(number) {
    $scope.date.setDate($scope.date.getDate() + number);
    $scope.load();
  }

  $scope.today = function() {
    $scope.date = new Date();
    $scope.load();
  }

}])



//*********PlanningCtrl
.controller('PlanningCtrl', ['$scope', 'db', 'dateFactory', 
  function($scope, db, dateFactory) {

  $scope.title = "Planning";

  $scope.dragging = false;

  $scope.start = function() {
    $scope.dragging = true;
    $scope.$apply();
  }

  $scope.stop = function() {
    $scope.dragging = false;
  }

  $scope.dropped = function(){
    angular.forEach($scope.arrCours, function(day, key) {
      angular.forEach(day, function(cours, key2) {
        db.updateCoursDate(cours, key);
      })
    });

    $scope.load();
    $scope.$apply();

  }

  $scope.date = new Date();

  $scope.nextWeek = function() {
    $scope.date.setDate($scope.date.getDate() + 7);
    $scope.load();
  }

  $scope.prevWeek = function() {
    $scope.date.setDate($scope.date.getDate() - 7);
    $scope.load();
  }

  $scope.today = function() { 
    $scope.date = new Date();
    $scope.load();
  }

  $scope.load = function() {
     $scope.string = $scope.date.toLocaleString("fr-FR", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
    $scope.arrCours = [];
    var firstDay = dateFactory.firstDayOfWeek($scope.date);
     for(i = 0; i <= 6; i++) {
      getCoursForDay(nextDay(firstDay,i),i);
    }
  }

  $scope.load();


  function nextDay(date,i) {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() +i);
    return newDate;
  }

  function getCoursForDay(day,i) {
    db.findCoursByDate(day, function(val) {
      $scope.arrCours[i] = val;
      $scope.$apply();
    });
  }

}])


//*********AddCtrl
.controller('AddCtrl', ['$scope', '$state', 'coursFactory', function($scope, $state, coursFactory) {
  $scope.cours = {}
  $scope.cours.date = new Date();
  $scope.addCours = function(cours) {
    coursFactory.createCours(cours, function() {$state.go('index')});
  }

}])

.controller('EditCtrl', ['$scope','db', '$stateParams', '$state', '$ngBootbox', function($scope, db, $stateParams, $state, $ngBootbox) {

  $scope.load = function() {

  db.findOne({_id: $stateParams.id}, function(err, data) {
    $scope.cours = data;
    if(data) {
      db.find({name: $scope.cours.name}, function(err, data) {
        $scope.list = data;
        $scope.$apply();
      });
    }
  })
  }

  $scope.load();

  $scope.deleteOne = function(cours) {
    $ngBootbox.confirm('Vraiment supprimer?')
    .then(function() {
      db.deleteOneCours(cours, function(err, docs) {
        $scope.load();
        $scope.$apply();
      });
    });

  }


  $scope.supprimer = function() {
    database.remove({name: $scope.cours.name},{multi: true}, function(err, n) {
      if(err) console.log(err);
      $state.go('index');
    });
  };

  $scope.showForm = false;

  $scope.addForm = function() {
    $scope.newCours = {name: $scope.cours.name};
    $scope.newCours.date = new Date();
    $scope.showForm = true;
  }

  $scope.hideForm = function() {
     $scope.showForm = false;
  }

  $scope.toogleEdit = function(cours) {
    if (cours.editing) cours.editing = false;
    else cours.editing = true;
  }

  $scope.updateCours =  function(cours) {
    db.updateCours(cours, function() {
      $scope.load();
      $scope.$apply();
    });
  }

  $scope.addCours = function(cours) {
    db.addCours(cours, function() {
      $scope.showForm = false;
      $scope.load();
      $scope.$apply();
    });
  }


}])

.controller('ParametersCtrl', ['$scope', function($scope){
    
  $scope.load = function() {
    paramdb.find({})
    .sort({duration: 1})
    .exec(function(err, docs) {
      $scope.parameters = docs;
      $scope.$apply();
    })
  }

  $scope.load();

  $scope.toogleEdit = function(param) {
    if (param.editing) param.editing = false;
    else param.editing = true;
  }

  $scope.addForm = function() {
    $scope.newParam = {duration: 0};
    $scope.showForm = true;
  }

  $scope.hideForm = function() {
     $scope.showForm = false;
  }

  $scope.addParam = function(param) {
    paramdb.insert(param, function() {
      $scope.showForm = false;
      $scope.load();
      $scope.$apply();
    })
  }

  $scope.deleteParam = function(param) {
    paramdb.remove({_id: param._id}, function() {
      $scope.load();
      $scope.$apply();
    })
  }

  $scope.updateParam = function(param) {
    paramdb.update({_id: param._id}, {$set: {duration: param.duration}}, function() {
      $scope.load();
      param.editing = false;
      $scope.$apply();
    })
  }

}])