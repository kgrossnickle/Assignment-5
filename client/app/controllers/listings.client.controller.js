angular.module('listings').controller('ListingsController', ['$scope', '$location', '$stateParams', '$state', 'Listings', 
  function($scope, $location, $stateParams, $state, Listings){
    $scope.find = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the listings, then bind it to the scope */
      Listings.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.listings = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve listings!\n' + error;
      });
    };



    $scope.findOne = function() {
      debugger;
      $scope.loading = true;

      /*
        Take a look at 'list-listings.client.view', and find the ui-sref attribute that switches the state to the view 
        for a single listing. Take note of how the state is switched: 

          ui-sref="listings.view({ listingId: listing._id })"

        Passing in a parameter to the state allows us to access specific properties in the controller.

        Now take a look at 'view-listing.client.view'. The view is initialized by calling "findOne()". 
        $stateParams holds all the parameters passed to the state, so we are able to access the id for the 
        specific listing we want to find in order to display it to the user. 
       */

      var id = $stateParams.listingId;

      Listings.read(id)
              .then(function(response) {
                $scope.listing = response.data;
                $scope.loading = false;
              }, function(error) {  
                $scope.error = 'Unable to retrieve listing with id "' + id + '"\n' + error;
                $scope.loading = false;
              });
    };  



    $scope.create = function(isValid) {
      $scope.error = null;

      /* 
        Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
       */
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      /* Create the listing object */
      var listing = {
        name: $scope.name, 
        code: $scope.code, 
        address: $scope.address
      };
      Listings.create(listing)
              .then(function(response) {
                $state.go('listings.list', { successMessage: 'Listing created!' });
              }, function(error) {
                $scope.error = 'cant save listing!\n' + error;
              });
    };

    $scope.update = function(isValid) {
      /*
        Fill in this function that should update a listing if the form is valid. Once the update has 
        successfully finished, navigate back to the 'listing.list' state using $state.go(). If an error 
        occurs, pass it to $scope.error. 
       */


    if (!isValid) {
            $scope.$broadcast('show-errors-check-validity', 'articleForm');

            return false;
        }
        var id = $stateParams.listingId;
        var listing = $scope.listing;

        Listings.update(id, listing)
            .then(function(response) {
                //if the object is successfully updated redirect back to the list page
                $state.go('listings.list', { successMessage: 'Listing updated!' });
            }, function(error) {
                //otherwise display the error
                $scope.error = 'cant update listing!\n' + error;
            });
    };

    //};

    $scope.remove = function() {
      /*
        Implement the remove function. If the removal is successful, navigate back to 'listing.list'. Otherwise, 
        display the error. 
       */

      var id = $stateParams.listingId;

        /* Update the article using the Listings factory */
        Listings.delete(id)
            .then(function(response) {
                //if the object is successfully removed redirect back to the list page
                $state.go('listings.list', { successMessage: 'Listing removed!' });
            }, function(error) {
                //otherwise display the error
                $scope.error = 'Cant remove listing, theres an error!\n' + error;
            });
    };

    /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }

    /* Map properties */
    $scope.map = {
      center: {
        latitude: 29.65163059999999,
        longitude: -82.3410518
      }, 
      zoom: 14
    }


    $scope.createMap = function () {

      Listings.getAll().then(function(response) {
        $scope.listings = response.data;
        var markers = [];
        for(var i in $scope.listings){
            if($scope.listings[i].coordinates != null){
              //alert($scope.listings[i].coordinates );
                markers.push(createMarker(i, $scope.listings[i]));
            }
        }
        $scope.placeMarkers = markers;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'cant get listings\n' + error;
      });
    }

    var createMarker = function(listingKey, listing, idKey){
          if (idKey == null) {
              idKey = "id";
          }

          var resultMarker = {
              code: listing.code,
              name: listing.name,
              address: listing.address,
              latitude: listing["coordinates"]["latitude"],
              longitude: listing["coordinates"]["longitude"]
          };

          resultMarker[idKey] = listingKey;
          return resultMarker;
      }

  }





]);