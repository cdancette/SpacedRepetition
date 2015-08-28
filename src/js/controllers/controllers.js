/**
 * Master Controller
 */

angular.module('elenApp')
    .controller('MasterCtrl', ['$scope', '$cookieStore', MasterCtrl]);

function MasterCtrl($scope, $cookieStore) {
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

  db.findCoursByDate(new Date(), function(data) {
      $scope.cours = data;
      $scope.$apply();
  });

  var date = new Date("12/23/2015");
  strDate = dateFactory.dateToString(date);
}])



//*********PlanningCtrl
.controller('PlanningCtrl', ['$scope', 'db', 'dateFactory', 
  function($scope, db, dateFactory) {

  $scope.date = new Date();

  console.log($scope.date.toLocaleString("fr-FR"));

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
    coursFactory.createCours(cours);
    $state.go('index');
  }
}]);