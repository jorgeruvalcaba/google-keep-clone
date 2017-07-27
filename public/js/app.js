
angular.module('cardsApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .controller('cardsController', ['$scope', function($scope) {
    $scope.query = {};
    $scope.queryBy = '$';
    $scope.buttonOn = true;

    $scope.cards = [
      {id: 0, title:'Todo list', description: 'This list is for my job priorities', editing: false},
      {id: 1, title:'Google Keep Clone News', description: 'Welcome Google Keep Clone..', editing: false}
    ];

    $scope.colors = [
      {hex:'#71BEC7',text:'#40494A'},
      {hex:'#EDE240',text:'#40494A'},
      {hex:'#E6604E',text:'#40494A'},
      {hex:'#2B93A1',text:'#ebebeb'}
    ];

    $scope.toggle = function () {
      $scope.buttonOn = !$scope.buttonOn;
    };

    $scope.add = function () {
      $scope.cards.push({
        id: $scope.cards.length,
        title: $scope.title,
        description: $scope.description
      });
      $scope.id = '';
      $scope.title = '';
      $scope.description = '';
      $scope.editing = false;
      $scope.buttonOn = true;
      console.log($scope.cards);
    };

    // new edit
    $scope.editCard = function (card) {
      card.editing = true;
      card.backupTitle = angular.copy(card.title);
      card.backupDescription = angular.copy(card.description);
    };

    $scope.doneEditing = function (card) {
      card.editing = false;
      delete card.backupTitle;
      delete card.backupDescription;
        //dong some background ajax calling for persistence...
    };

    $scope.cancel = function (card) {
      card.editing = false;
      card.title = angular.copy(card.backupTitle);
      card.description = angular.copy(card.backupDescription);
      delete card.backupTitle;
      delete card.backupDescription;
    };

    // $scope.edit = function () {
    //   var index = getSelectedIndex($scope.id);
    //   console.log(index);
    //   $scope.cards[index].title = $scope.title;
    //   $scope.cards[index].description = $scope.description;
    // };

    $scope.selectEdit = function selectEdit(id) {
      var index = getSelectedIndex(id);
      var card = $scope.cards[index];
      $scope.title = card.title;
      $scope.description = card.description;

    };

    $scope.del = function(id) {
      var result = confirm('Are you sure?');

      if (result === true) {
        var index = getSelectedIndex(id);
        $scope.cards.splice(index, 1);
      }

    };

    $scope.editCard = function (card) {
        card.editing = true;
        card.backupName = angular.copy(card.title);
    };

    $scope.cancel = function (card) {
        card.editing = false;
        card.title = angular.copy(card.title);
        delete card.title;
    };

    function getSelectedIndex(id) {
      for (var i=0; i<$scope.cards.length; i++)
        if ($scope.cards[i].id == id)
          return i;
      return -1;
    }

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.cards, function(card) {
        count += card.done ? 0 : 1;
      });
      return count;
    };

    $scope.colour = function(obj) {
      $scope.myStyle = {
        background: obj.hex,
        color: obj.text
      };
    };
  }
]);
