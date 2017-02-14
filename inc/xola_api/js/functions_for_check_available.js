(function () {
    "use strict";
    var wqs_xola_check = angular.module("wqs_xola_check", ['ngAnimate','angular.filter']);


// config
    wqs_xola_check.config(['$httpProvider', function( $httpProvider) {
              $httpProvider.defaults.useXDomain = true;
              //$httpProvider.defaults.withCredentials = true;
              delete $httpProvider.defaults.headers.common["X-Requested-With"];
              $httpProvider.defaults.headers.common["Accept"] = "application/json";
              $httpProvider.defaults.headers.common["Content-Type"] = "application/json; charset=UTF-8";
         }
    ]);


// controler
    wqs_xola_check.controller('wqs_search_controller', function ($scope, $http, $q, dataServiceAjax, dataServiceXolaAjax, dataServiceXolaAjaxMore, dataServiceXolaAjaxMoreNext, dataServiceXolaAjaxMorePrev, dataServiceAjaxmore, $timeout, $filter, $window, dataServiceAjaxNext, dataServiceAjaxPrev, dataServiceXola) {
    	//console.log('load wqs_search_controller');
	// load cpt product
	    var wqs_api_url = jQuery('#wqs_api_url').val(); 
	      $http.get(wqs_api_url)
	        .then(function(response){
	        	var cpt_product ={};
	        	cpt_product = response.data;
	            $scope.cpt_product = response.data;
	            return cpt_product;
	    });

	// load option
	$scope.integrate = {};
	$scope.integrate.integrate_rezdy = js_var.integrate_rezdy;
	$scope.integrate.integrate_xola = js_var.integrate_xola;

	// var
		var data = {};
        var promises = [];
		var promises_click = [];

	// check avalable 
	var wqs_productcode = $('#wqs_productcode').val();
	$scope.wqs_productcode = wqs_productcode;

	// load api key
        //console.log(js_var.apikey);

    // enable load animations
         $scope.loading = true;
	
	// get XOLA product list 

	//https://silent.xola.com/api/experiences/56098357cf8b9cc6348b45f0/availability?_format=json
	//https://silent.xola.com/api/experiences/56098357cf8b9cc6348b45f0/availability?_format=json&start=2016-11-26&end=2016-11-26
	//https://silent.xola.com/api/availability?_format=json&seller=5605b264926705ac758b45c8&start=2016-11-26&end=2016-11-26

		$http.get('https://cors-anywhere.herokuapp.com/https://silent.xola.com/api/experiences?_format=json&seller='+js_var.userid_key+'')
			// load api_products_xola
		    .then(function(response){
		        var api_products_xola = {};
		        $scope.api_products_xola = {};
		        
		        api_products_xola = response.data.data;
		        $scope.api_products_xola.products = api_products_xola;
		        return api_products_xola;
		   	}).then(function(api_products_xola){
		         angular.forEach(api_products_xola, function(products, key) {
		            var promiseObj_xola=dataServiceXola.getData(products.id);
		            promiseObj_xola.then(function(value, products) { 

		            });
		            // check available 
		            if (wqs_productcode == products.id) {
		            	promises.push(promiseObj_xola);
		            }
		            // promises.push(promiseObj_xola);
		        });
	          
			// promise api_availability
		        $q.all(promises).then(function(e){
		        	//console.log(e);
		          $scope.api_availability_xola = e;
					$timeout(function(){
			            $scope.loading = false;
			        },2000);

					// init seats available for first time
					$scope.initAvailable();

					
		        });//end promises

		}); //end then
		console.log($scope);

		$scope.initAvailable = function() {
			console.log('initAvailable');
			// init seats available for first time
				$scope.timeSelected = '';
				angular.forEach($scope.api_availability_xola, function(api_availability, key) {
		        	angular.forEach(api_availability, function(api_availability2, key) {
		        		//console.log(key);
		        		if(key != 'productCode') {
		        			var index = 0;
		        			angular.forEach(api_availability2, function(seats, key) {
		        				if(index == 0){
		        					$scope.timeSelected = seats;
		        					//console.log(key);
		        				}
		        				//console.log(seats);
		        				index = index + 1;
		        			});
		        			//console.log($filter('objLength')(api_availability2));
		        			var minheight = $filter('objLength')(api_availability2);
		        			$('.availability_checker_options').css('min-height', 33*minheight);
		        		}
		        	 });
		        });//end init
		        //  $(".timeSelected_options").attr('selected','');
		        //  $(".timeSelected_options").first().attributes('selected').val('selected');
		        // console.log( $(".timeSelected_options").first().attributes('selected').val('selected') );
		}

	    $scope.parseFloat = function(value) {
	        return parseFloat(value/100).toFixed(2);
	    }
	    $scope.getTotal = function(time){
		    var total = 0;
		    for(var i = 0; i < $scope.api_availability_xola.length; i++){
		        var product = $scope.api_availability_xola[i];
		        total += (product.seats);
		    }
		    return total;
		}

		$scope.changedValue = function(item){
	    	$scope.loading = true;       
		   console.log(item);
		   $scope.timeSelected = item;
		   //console.log($scope.timeSelected);
			$timeout(function(){
		        $scope.loading = false;
		    },1000);

		   console.log($scope);
		}
	    $scope.changedValueNext = function(item, time = 0){
	    	$scope.loading = true;       
		   console.log(item);
		    // correct time
		    var correct = new Date(item);
		    correct.setDate(correct.getDate() + time);
	        correct =  $filter('date')(new Date(correct), 'yyyy-MM-dd', 'UTC');
	        console.log(correct);
	        $('#startTime_check').val(correct);

		   // $scope.timeSelected = item;
		   $scope.timeSelected = correct;
		   //console.log($scope.timeSelected);
		   $scope.check_availability_xola();
			$timeout(function(){
				
		        $scope.loading = false;
		    },2000);
		   

		   console.log($scope);
		}
	    //duration 
	    $scope.duration = function(start, end ) {
			var timestamp1 = new Date(start).getTime();
			var timestamp2 = new Date(end).getTime();
			var diff = timestamp1 - timestamp2
			return $filter('date')(new Date(diff), 'h', 'UTC');
		}
		$scope.duration_to_hours = function(hours ) {
			var hours = hours/60;
			return hours;
		}
		$scope.get_seatrow = function(array) {
			var row_time = [];
			var row_seat = [];
			angular.forEach(array, function(arrays, key) {
				if(arrays !=0) {
					row_time.push(key);
					row_seat.push(arrays);
				}
			});
			//return row_time;
			return row_seat;
		}
		$scope.get_timerow = function(array) {
			var row_time = [];
			var row_seat = [];
			angular.forEach(array, function(arrays, key) {
				if(arrays !=0) {
					row_time.push(key);
					row_seat.push(arrays);
				}
			});
			return row_time;
			//return row_seat;
		}
		$scope.get_all_seat = function(array) {
			var row_time = [];
			var row_seat = [];
			var all_seat = 0;
			angular.forEach(array, function(arrays, key) {
				// key ==0 only for first
				if(arrays !=0) {
					all_seat += parseInt(arrays);
				}
			});
			return all_seat;
			//return row_seat;
		}

    // click availability use factory dataServiceAjax.getData
    $scope.check_availability_xola= function() {
    	console.log('click xola');
    	$(".timeSelected option:eq(0)").prop('selected', true);
    	var promises_click = [];
		$scope.loading = true;
		//$scope.api_availability_xola = null; // clear
    	$http.get('https://cors-anywhere.herokuapp.com/https://silent.xola.com/api/experiences?_format=json&seller='+js_var.userid_key+'')
			// load api_products_xola
		    .then(function(response){
		        var api_products_xola = {};
		        $scope.api_products_xola = {};
		        
		        api_products_xola = response.data.data;
		        $scope.api_products_xola.products = api_products_xola;
		        return api_products_xola;
		   	}).then(function(api_products_xola){
		         angular.forEach(api_products_xola, function(products, key) {
		            var promiseObj_xola=dataServiceXolaAjax.getData(products.id);
		            promiseObj_xola.then(function(value, products) { 

		            });
		            
		            //promises_click.push(promiseObj_xola);

		            // check available 
		            if (wqs_productcode == products.id) {
		            	promises_click.push(promiseObj_xola);
		            }

					

		        });
	          
			// promise api_availability

		        $q.all(promises_click).then(function(e){
		        	console.log(e);
		          $scope.api_availability_xola = e;
					$timeout(function(){
			            $scope.loading = false;
			        },2000);

			        $scope.initAvailable();
			        // $(".timeSelected option:eq(0)").prop('selected', true);
					
		        });

		}); //end then
		console.log($scope);
	};
	//end click check_availability_xola

	// click availability use factory dataServiceAjaxMore.getData
    $scope.check_availability_xola_more= function() {
    	console.log('load more');
    	var promises_click = [];
		$scope.loading = true;
		//$scope.api_availability_xola = null; // clear
    	$http.get('https://cors-anywhere.herokuapp.com/https://silent.xola.com/api/experiences?_format=json&seller='+js_var.userid_key+'')
			// load api_products_xola
		    .then(function(response){
		        var api_products_xola = {};
		        $scope.api_products_xola = {};
		        
		        api_products_xola = response.data.data;
		        $scope.api_products_xola.products = api_products_xola;
		        return api_products_xola;
		   	}).then(function(api_products_xola){
		         angular.forEach(api_products_xola, function(products, key) {
		            var promiseObj_xola=dataServiceXolaAjaxMore.getData(products.id);
		            promiseObj_xola.then(function(value, products) { 

		            });
		            
		            promises_click.push(promiseObj_xola);
		        });
	          
			// promise api_availability

		        $q.all(promises_click).then(function(e){
		        	console.log(e);
		          $scope.api_availability_xola_more = e;
					$timeout(function(){
			            $scope.loading = false;
			        },2000);
					
		        });

		}); //end then
		console.log($scope);
	};
	//end click check_availability_xola

    // next xola click availability use factory dataServiceAjaxNext.getData
		$scope.check_availability_angular_next_xola= function() {
		    console.log('click next xola');
		    var promises_click = [];

		    $scope.loading = true;

			    	$http.get('https://cors-anywhere.herokuapp.com/https://silent.xola.com/api/experiences?_format=json&seller='+js_var.userid_key+'')
			// load api_products_xola
		    .then(function(response){
		        var api_products_xola = {};
		        $scope.api_products_xola = {};
		        
		        api_products_xola = response.data.data;
		        $scope.api_products_xola.products = api_products_xola;
		        return api_products_xola;
		   	}).then(function(api_products_xola){
		         angular.forEach(api_products_xola, function(products, key) {
		            var promiseObj_xola=dataServiceXolaAjaxMoreNext.getData(products.id);
		            promiseObj_xola.then(function(value, products) { 

		            });
		            
		            promises_click.push(promiseObj_xola);
		        });
	          
			// promise api_availability

		        $q.all(promises_click).then(function(e){
		        	console.log(e);
		          $scope.api_availability_xola = e;
					$timeout(function(){
			            $scope.loading = false;
			        },2000);
					
		        

					var startTime_next = $("#datepicker-from-input").val();
					startTime_next = new Date(startTime_next);
					startTime_next.setDate(startTime_next.getDate() + 1);
					startTime_next = $filter('date')(new Date(startTime_next), 'yyyy-MM-dd');
					$("#datepicker-from-input").val(startTime_next);
					$("#datepicker-to-input").val(startTime_next);

			        });
			    }); //end then
			console.log($scope);
		}; 
	//end next xola click check_availability_angular

    // prev xola click availability use factory dataServiceAjaxNext.getData
		$scope.check_availability_angular_prev_xola= function() {
		    console.log('click prev xola');
		    var promises_click = [];

		    $scope.loading = true;

			    	$http.get('https://cors-anywhere.herokuapp.com/https://silent.xola.com/api/experiences?_format=json&seller='+js_var.userid_key+'')
			// load api_products_xola
		    .then(function(response){
		        var api_products_xola = {};
		        $scope.api_products_xola = {};
		        
		        api_products_xola = response.data.data;
		        $scope.api_products_xola.products = api_products_xola;
		        return api_products_xola;
		   	}).then(function(api_products_xola){
		         angular.forEach(api_products_xola, function(products, key) {
		            var promiseObj_xola=dataServiceXolaAjaxMorePrev.getData(products.id);
		            promiseObj_xola.then(function(value, products) { 

		            });
		            
		            promises_click.push(promiseObj_xola);
		        });
	          
			// promise api_availability

		        $q.all(promises_click).then(function(e){
		        	console.log(e);
		          $scope.api_availability_xola = e;
					$timeout(function(){
			            $scope.loading = false;
			        },2000);
					
		        

					var startTime_next = $("#datepicker-from-input").val();
					startTime_next = new Date(startTime_next);
					startTime_next.setDate(startTime_next.getDate() - 1);
					startTime_next = $filter('date')(new Date(startTime_next), 'yyyy-MM-dd');
					$("#datepicker-from-input").val(startTime_next);
					$("#datepicker-to-input").val(startTime_next);

			        });
			    }); //end then
			console.log($scope);
		}; 
	//end prev xola click check_availability_angular





		$scope.check_availability_angular= function() {
		    console.log('click');
		    var promises_click = [];

		    $scope.loading = true;

			$http.get('https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/categories/924/products?limit=100&apiKey='+js_var.apikey+'')
			    .then(function(response){
			        var api_products = {};
			        api_products = response.data;
			        $scope.api_products = api_products;
			        return api_products;
			    }).then(function(api_products){
			         angular.forEach(api_products.products, function(products, key) {
			            var promiseObj2=dataServiceAjax.getData(products.productCode);
			            promiseObj2.then(function(value) { 
			            });
			            promises_click.push(promiseObj2);
			        });
		          

			        $q.all(promises_click).then(function(e){
			          $scope.api_availability = e;
						$timeout(function(){
				            $scope.loading = false;
				        },2000);
			        });
			    }); //end then
			console.log($scope);
		}; 
	//end click check_availability_angular

    // click availability use factory dataServiceAjaxNext.getData
		$scope.check_availability_angular_next= function() {
		    console.log('click next');
		    var promises_click = [];

		    $scope.loading = true;

			$http.get('https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/categories/924/products?limit=100&apiKey='+js_var.apikey+'')
			    .then(function(response){
			        var api_products = {};
			        api_products = response.data;
			        $scope.api_products = api_products;
			        return api_products;
			    }).then(function(api_products){
			         angular.forEach(api_products.products, function(products, key) {
			            var promiseObj2=dataServiceAjaxNext.getData(products.productCode);
			            promiseObj2.then(function(value) { 
			            });
			            promises_click.push(promiseObj2);
			        });
		          

			        $q.all(promises_click).then(function(e){
			          $scope.api_availability = e;
						$timeout(function(){
				            $scope.loading = false;
				        },2000);

					var startTime_next = $("#datepicker-from-input").val();
					startTime_next = new Date(startTime_next);
					startTime_next.setDate(startTime_next.getDate() + 1);
					startTime_next = $filter('date')(new Date(startTime_next), 'yyyy-MM-dd');
					$("#datepicker-from-input").val(startTime_next);
					$("#datepicker-to-input").val(startTime_next);

			        });
			    }); //end then
			console.log($scope);
		}; 
	//end click check_availability_angular

    // click availability use factory dataServiceAjaxPrev.getData
		$scope.check_availability_angular_prev= function() {
		    console.log('click prev');
		    var promises_click = [];

		    $scope.loading = true;

			$http.get('https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/categories/924/products?limit=100&apiKey='+js_var.apikey+'')
			    .then(function(response){
			        var api_products = {};
			        api_products = response.data;
			        $scope.api_products = api_products;
			        return api_products;
			    }).then(function(api_products){
			         angular.forEach(api_products.products, function(products, key) {
			            var promiseObj2=dataServiceAjaxPrev.getData(products.productCode);
			            promiseObj2.then(function(value) { 
			            });
			            promises_click.push(promiseObj2);
			        });
		          

			        $q.all(promises_click).then(function(e){
			          $scope.api_availability = e;
						$timeout(function(){
				            $scope.loading = false;
				        },2000);

					var startTime_next = $("#datepicker-from-input").val();
					startTime_next = new Date(startTime_next);
					startTime_next.setDate(startTime_next.getDate() - 1);
					startTime_next = $filter('date')(new Date(startTime_next), 'yyyy-MM-dd');
					$("#datepicker-from-input").val(startTime_next);
					$("#datepicker-to-input").val(startTime_next);

			        });
			    }); //end then
			console.log($scope);
		}; 
	//end click check_availability_angular

	// infinite loadmore availability use factory dataServiceAjaxmore.getData
		$scope.check_availability_angular_more= function() {
		    console.log('check_availability_angular_more');
		    var promises_click = [];

		    $scope.loading = true;

			$http.get('https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/categories/924/products?limit=100&apiKey='+js_var.apikey+'')
			    .then(function(response){
			        var api_products = {};
			        api_products = response.data;
			        $scope.api_products = api_products;
			        return api_products;
			    }).then(function(api_products){
			         angular.forEach(api_products.products, function(products, key) {
			            var promiseObj2=dataServiceAjaxmore.getData(products.productCode);
			            promiseObj2.then(function(value) { 
			            });
			            promises_click.push(promiseObj2);
			        });
		          

			        $q.all(promises_click).then(function(e){
			          $scope.api_availability_more = e;
						$timeout(function(){
				            $scope.loading = false;
				        },2000);
			        });
			    }); //end then
			//console.log($scope);
			scrollLoad = true;
		}; 
	//end infinite check_availability_angular_more

    //infinite scroll js
        var scrollLoad = true;
        var scrollindex = 0;
        $scope.scrollindex = 1;
        
        var load = 1;

        // $scope.scrollPos = 0;

        // $window.onscroll = function(){
        //     $scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
        //     $scope.$apply(); //or simply $scope.$digest();
        // };


		        // helper getUrlParameter 
			    var getUrlParameter = function getUrlParameter(sParam) {
			        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			            sURLVariables = sPageURL.split('&'),
			            sParameterName,
			            i;

			        for (i = 0; i < sURLVariables.length; i++) {
			            sParameterName = sURLVariables[i].split('=');

			            if (sParameterName[0] === sParam) {
			                return sParameterName[1] === undefined ? true : sParameterName[1];
			            }
			        }
			    }

  //       $(window).scroll(function (){

		// var type_search= getUrlParameter('type_search');
  //       	//console.log(type_search);

  //       $timeout(function(){

  //       	// console.log($(window).scrollTop());
  //       	// console.log($('#mainContentAng').height() -400);

		//       if ( ( $(window).scrollTop() >=  $('#mainContentAng').height() -400 && load ) && (type_search != 'one_date') ) {
		// 	      	console.log('infinite js');
			      	
		// 	      	//show loadmore block
		// 	      	//$('.timearrayLoadmore').show();

		// 	      	$scope.loading = true;
		// 	        scrollLoad = false;

		// 	        $scope.check_availability_xola_more(); // check available 
		// 	        //$('#ang_moreloading').trigger('click'); // load template



		// 	        //setup next start and end time
		// 	        //$scope.timearrayLoadmore.push();

		// 	        var start = $scope.timearrayLoadmore[0];
		// 	        var next = $scope.timearrayLoadmore[0];
		// 	        next = new Date(next);
		// 	        next.setDate(next.getDate() + 10*$scope.scrollindex);
		// 	        //next =  $filter('date')(new Date(next), 'yyyy-MM-dd');
		// 			var new_timearrayLoadmore = [];
		// 			for (var d = new Date(start); d <= next; d.setDate(d.getDate() + 1)) {
		// 			    new_timearrayLoadmore.push( $filter('date')(new Date(d), 'yyyy-MM-dd') );
		// 			}
		// 			$scope.timearrayLoadmore = new_timearrayLoadmore;

		// 			scrollindex = $scope.scrollindex + 1;
		// 	        $scope.scrollindex = scrollindex;

		// 	        console.log($scope);
		//        }

  //       },3000);
		

  //       });



    // end infinite js
	    
	// load template for infinite   
	    var searchtemplate = [
	      "search_result_list.php.html"
	    ];
	    
	   $scope.displayedtemplate = [];
	    
	   $scope.addTemplate = function(formIndex) {
	      $scope.displayedtemplate.push(searchtemplate[formIndex]);
		    $timeout(function(){
	            $scope.loading = false;
	        },2000);
	    }
	// end template


    });
//end controler

/*factory*/

//dataService starttime and endtime get URLparametr Xola
    wqs_xola_check.factory('dataServiceXola', function($http, $q, $filter){
        return{
            getData: function(productCode,startTime,endTime){
                var deferred = $q.defer();
        
		        // helper getUrlParameter 
			    var getUrlParameter = function getUrlParameter(sParam) {
			        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			            sURLVariables = sPageURL.split('&'),
			            sParameterName,
			            i;

			        for (i = 0; i < sURLVariables.length; i++) {
			            sParameterName = sURLVariables[i].split('=');

			            if (sParameterName[0] === sParam) {
			                return sParameterName[1] === undefined ? true : sParameterName[1];
			            }
			        }
			    };

			    var search_tour_cat = getUrlParameter('search_tour_cat');
			    if (search_tour_cat) {
			    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = search_tour_cat;
			    }else {
			    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = 'all';
			    }

			    // startTime
			    //var startTime = getUrlParameter('startTime');
			    
			    // new startTime
			    var startTime = getUrlParameter('check_date');
			    //console.log(startTime+' startTime');
			    
			    if(!startTime){
			    	//console.log('startTime undefined');
			    	startTime = $('#startTime_check').val();
			    } else {
			    	$('#startTime_check').val(startTime);
			    }
			    //console.log(startTime+' startTime2');

			    startTime = $filter('date')(new Date(startTime), 'yyyy-MM-dd');

			    var type_search = getUrlParameter('type_search');


			    startTime = $filter('date')(new Date(startTime), 'yyyy-MM-dd');
			    


			    // endTime
			    var endTime = startTime;
				endTime = $filter('date')(new Date(endTime), 'yyyy-MM-dd');
			    
			    // endTime + 1
			    var endTime_plus1 = new Date(endTime);
			    endTime_plus1.setDate(endTime_plus1.getDate() + 1);
 				endTime_plus1 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');

 				// load timearray
			    var now = new Date(endTime);
				var daysOfYear = [];
				for (var d = new Date(startTime); d <= now; d.setDate(d.getDate() + 1)) {
				    daysOfYear.push( $filter('date')(new Date(d), 'yyyy-MM-dd') );
				}
				angular.element('[ng-controller=wqs_search_controller]').scope().timearray = daysOfYear;

				// load timearray for Loadmore 
				var daysOfYearMore = [];
				var endTime_plus2 = new Date(endTime_plus1);
				endTime_plus2.setDate(endTime_plus2.getDate() + 1);
				//daysOfYearMore.push( endTime );
				daysOfYearMore.push( endTime_plus1 );
				angular.element('[ng-controller=wqs_search_controller]').scope().timearrayLoadmore = daysOfYearMore;

				//hide loadmore
				//$('.timearrayLoadmore').hide();

				// get
                //$http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/availability?limit=100&offset=0&productCode='+productCode+'&startTime='+startTime+'&endTime='+endTime_plus1+'&apiKey='+js_var.apikey}).
                $http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://silent.xola.com/api/experiences/'+productCode+'/availability?_format=json&start='+startTime+'&end='+startTime+''}).
                 success(function(data, status, headers, config) {
                 	var code = {productCode:productCode}
                 	data = angular.extend({}, data, code);
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            }

        }
    });

// Xola dataServiceAjax for click Xola
    wqs_xola_check.factory('dataServiceXolaAjax', function($http, $q, $filter){
        return{
            getData: function(productCode,startTime,endTime){
                var deferred = $q.defer();
        

	        //var datepicker_from = $("#datepicker-from-input").val();
	        var datepicker_from = $('#startTime_check').val();
	        var datepicker_to = $("#datepicker-to-input").val();
	        var tour_cat_arr = $(".checkbox_term:checked").map(function() {
	            return $(this).val();         
	        }).get();

	        //console.log(tour_cat_arr);
		    //var search_tour_cat = getUrlParameter('search_tour_cat');
		    if (tour_cat_arr && tour_cat_arr != 0) {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = tour_cat_arr;
		    }else {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = 'all';
		    }

			    
			    //var startTime = getUrlParameter('startTime');
			    var startTime = datepicker_from;
			    //console.log(startTime);
			    startTime = $filter('date')(new Date(startTime), 'yyyy-MM-dd');

			    
			    //var endTime = getUrlParameter('endTime');
				//var endTime = datepicker_to;
				var endTime = startTime;
				//console.log(endTime);
			    
			    var endTime_plus1 = new Date(endTime);
			    endTime_plus1.setDate(endTime_plus1.getDate() + 1);
 				endTime_plus1 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');

			    var now = new Date(endTime);
				var daysOfYear = [];
				for (var d = new Date(startTime); d <= now; d.setDate(d.getDate() + 1)) {
				    daysOfYear.push( $filter('date')(new Date(d), 'yyyy-MM-dd') );
				}




                //$http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/availability?limit=100&offset=0&productCode='+productCode+'&startTime='+startTime+'&endTime='+endTime_plus1+'&apiKey='+js_var.apikey}).
                $http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://silent.xola.com/api/experiences/'+productCode+'/availability?_format=json&start='+startTime+'&end='+endTime+''}).
                 success(function(data, status, headers, config) {
                    //deferred.resolve(data.sessions);

                    // xola update
                    var code = {productCode:productCode}
                 	data = angular.extend({}, data, code);
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });
				// angular.element('[ng-controller=wqs_search_controller]').scope().start = startTime;
				// angular.element('[ng-controller=wqs_search_controller]').scope().end = endTime;
				angular.element('[ng-controller=wqs_search_controller]').scope().timearray = daysOfYear;
                return deferred.promise;
            }
        }
    });
// dataServiceAjaxmore for infinite Xola
    wqs_xola_check.factory('dataServiceXolaAjaxMore', function($http, $q, $filter){
        return{
            getData: function(productCode,startTime,endTime){
                var deferred = $q.defer();
        	
        	console.log('factory dataServiceAjaxmore xola');

        	// load category
		        var tour_cat_arr = $(".checkbox_term:checked").map(function() {
		            return $(this).val();         
		        }).get();

			    if (tour_cat_arr && tour_cat_arr != 0) {
			    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = tour_cat_arr;
			    }else {
			    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = 'all';
			    }
			// end category

			// load start time
			    var startTime = angular.element('[ng-controller=wqs_search_controller]').scope().timearrayLoadmore[0];
			    console.log(startTime);
			    //startTime = $filter('date')(new Date(startTime), 'yyyy-MM-dd');

			// load endtime
			    var length = angular.element('[ng-controller=wqs_search_controller]').scope().timearrayLoadmore.length;
				var endTime = angular.element('[ng-controller=wqs_search_controller]').scope().timearrayLoadmore[length-1];
				console.log(endTime);
			    
			    var endTime_plus1 = new Date(endTime);
			    endTime_plus1.setDate(endTime_plus1.getDate() + 1);
 				endTime_plus1 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');

			// get
                //$http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/availability?limit=100&offset=0&productCode='+productCode+'&startTime='+startTime+'&endTime='+endTime_plus1+'&apiKey='+js_var.apikey}).
                $http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://silent.xola.com/api/experiences/'+productCode+'/availability?_format=json&start='+startTime+'&end='+endTime+''}).
                 success(function(data, status, headers, config) {
                    //deferred.resolve(data.sessions);

                    // xola update
                    var code = {productCode:productCode}
                 	data = angular.extend({}, data, code);
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            }
        }
    });
// dataServiceAjax for click NEXT Xola
    wqs_xola_check.factory('dataServiceXolaAjaxMoreNext', function($http, $q, $filter){
        return{
            getData: function(productCode,startTime,endTime){
                var deferred = $q.defer();
        

	        var datepicker_from = $("#datepicker-from-input").val();
	        var datepicker_to = $("#datepicker-to-input").val();
	        var tour_cat_arr = $(".checkbox_term:checked").map(function() {
	            return $(this).val();         
	        }).get();

	        //console.log(tour_cat_arr);
		    //var search_tour_cat = getUrlParameter('search_tour_cat');
		    if (tour_cat_arr && tour_cat_arr != 0) {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = tour_cat_arr;
		    }else {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = 'all';
		    }

			    
			    //var startTime = getUrlParameter('startTime');
			    var startTime = datepicker_from;
			    var startTime11 = datepicker_from;
			    //console.log(startTime);
			    startTime = new Date(startTime);
				startTime.setDate(startTime.getDate() + 1);
				startTime = $filter('date')(new Date(startTime), 'yyyy-MM-dd');
				console.log('startTime '+startTime);
			    
			    //var endTime = getUrlParameter('endTime');
				var endTime = datepicker_to;
				console.log('endTime '+endTime);
				endTime = $filter('date')(new Date(endTime), 'yyyy-MM-dd');
			    
			    var endTime_plus1 = new Date(endTime);

			    endTime_plus1.setDate(endTime_plus1.getDate() + 2);
 				endTime_plus1 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');
 				//console.log(endTime_plus1);

 				var endTime_plus11 = new Date(endTime);
			    endTime_plus11.setDate(endTime_plus11.getDate() + 1);
 				endTime_plus11 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');
 				console.log('endTime_plus11 '+endTime_plus11);

			    var now = new Date(startTime);
				var daysOfYear = [];
				for (var d = new Date(startTime); d <= now; d.setDate(d.getDate() + 1)) {
				    daysOfYear.push( $filter('date')(new Date(d), 'yyyy-MM-dd') );
				}
				console.log('daysOfYear '+daysOfYear);

				// $("#datepicker-from-input").val(startTime);
	   //      	$("#datepicker-to-input").val(endTime_plus11);


                //$http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/availability?limit=100&offset=0&productCode='+productCode+'&startTime='+startTime11+'&endTime='+endTime_plus11+'&apiKey='+js_var.apikey}).
                $http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://silent.xola.com/api/experiences/'+productCode+'/availability?_format=json&start='+startTime11+'&end='+endTime_plus11+''}).
                 success(function(data, status, headers, config) {
                    //deferred.resolve(data.sessions);
                    // xola update
                    var code = {productCode:productCode}
                 	data = angular.extend({}, data, code);
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });
				// angular.element('[ng-controller=wqs_search_controller]').scope().start = startTime;
				// angular.element('[ng-controller=wqs_search_controller]').scope().end = endTime;
				angular.element('[ng-controller=wqs_search_controller]').scope().timearray = daysOfYear;
                return deferred.promise;
            }
        }
    });
// dataServiceAjax for click  PREV Xola
    wqs_xola_check.factory('dataServiceXolaAjaxMorePrev', function($http, $q, $filter){
        return{
            getData: function(productCode,startTime,endTime){
                var deferred = $q.defer();
        

	        var datepicker_from = $("#datepicker-from-input").val();
	        var datepicker_to = $("#datepicker-to-input").val();
	        var tour_cat_arr = $(".checkbox_term:checked").map(function() {
	            return $(this).val();         
	        }).get();

	        //console.log(tour_cat_arr);
		    //var search_tour_cat = getUrlParameter('search_tour_cat');
		    if (tour_cat_arr && tour_cat_arr != 0) {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = tour_cat_arr;
		    }else {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = 'all';
		    }

			    
			    //var startTime = getUrlParameter('startTime');
			    var startTime = datepicker_from;
			    var startTime11 = datepicker_from;
			    //console.log(startTime);
			    startTime = new Date(startTime);
				startTime.setDate(startTime.getDate() - 1);
				startTime = $filter('date')(new Date(startTime), 'yyyy-MM-dd');
				console.log('startTime '+startTime);
			    
			    //var endTime = getUrlParameter('endTime');
				var endTime = datepicker_to;
				console.log('endTime '+endTime);
			    
			    var endTime_plus1 = new Date(endTime);
			    endTime_plus1.setDate(endTime_plus1.getDate() + 2);
 				endTime_plus1 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');
 				//console.log(endTime_plus1);

 				var endTime_plus11 = new Date(endTime);
			    endTime_plus11.setDate(endTime_plus11.getDate() + 1);
 				endTime_plus11 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');
 				//console.log('endTime_plus11 '+endTime_plus11);

			    var now = new Date(startTime);
				var daysOfYear = [];
				for (var d = new Date(startTime); d <= now; d.setDate(d.getDate() + 1)) {
				    daysOfYear.push( $filter('date')(new Date(d), 'yyyy-MM-dd') );
				}
				console.log('daysOfYear '+daysOfYear);

				// $("#datepicker-from-input").val(startTime);
	   //      	$("#datepicker-to-input").val(endTime_plus11);


                //$http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/availability?limit=100&offset=0&productCode='+productCode+'&startTime='+startTime+'&endTime='+endTime+'&apiKey='+js_var.apikey}).
                $http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://silent.xola.com/api/experiences/'+productCode+'/availability?_format=json&start='+startTime+'&end='+endTime+''}).
                 success(function(data, status, headers, config) {
                    //deferred.resolve(data.sessions);
                                        // xola update
                    var code = {productCode:productCode}
                 	data = angular.extend({}, data, code);
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });
				// angular.element('[ng-controller=wqs_search_controller]').scope().start = startTime;
				// angular.element('[ng-controller=wqs_search_controller]').scope().end = endTime;
				angular.element('[ng-controller=wqs_search_controller]').scope().timearray = daysOfYear;
                return deferred.promise;
            }
        }
    });


// dataServiceAjax for click (!not cleare)
    wqs_xola_check.factory('dataServiceAjax', function($http, $q, $filter){
        return{
            getData: function(productCode,startTime,endTime){
                var deferred = $q.defer();
        

	        var datepicker_from = $("#datepicker-from-input").val();
	        var datepicker_to = $("#datepicker-to-input").val();
	        var tour_cat_arr = $(".checkbox_term:checked").map(function() {
	            return $(this).val();         
	        }).get();

	        //console.log(tour_cat_arr);
		    //var search_tour_cat = getUrlParameter('search_tour_cat');
		    if (tour_cat_arr && tour_cat_arr != 0) {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = tour_cat_arr;
		    }else {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = 'all';
		    }

			    
			    //var startTime = getUrlParameter('startTime');
			    var startTime = datepicker_from;
			    //console.log(startTime);
			    startTime = $filter('date')(new Date(startTime), 'yyyy-MM-dd');

			    
			    //var endTime = getUrlParameter('endTime');
				var endTime = datepicker_to;
				//console.log(endTime);
			    
			    var endTime_plus1 = new Date(endTime);
			    endTime_plus1.setDate(endTime_plus1.getDate() + 1);
 				endTime_plus1 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');

			    var now = new Date(endTime);
				var daysOfYear = [];
				for (var d = new Date(startTime); d <= now; d.setDate(d.getDate() + 1)) {
				    daysOfYear.push( $filter('date')(new Date(d), 'yyyy-MM-dd') );
				}




                $http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/availability?limit=100&offset=0&productCode='+productCode+'&startTime='+startTime+'&endTime='+endTime_plus1+'&apiKey='+js_var.apikey}).
                 success(function(data, status, headers, config) {
                    deferred.resolve(data.sessions);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });
				// angular.element('[ng-controller=wqs_search_controller]').scope().start = startTime;
				// angular.element('[ng-controller=wqs_search_controller]').scope().end = endTime;
				angular.element('[ng-controller=wqs_search_controller]').scope().timearray = daysOfYear;
                return deferred.promise;
            }
        }
    });

// dataServiceAjax for click NEXT 
    wqs_xola_check.factory('dataServiceAjaxNext', function($http, $q, $filter){
        return{
            getData: function(productCode,startTime,endTime){
                var deferred = $q.defer();
        

	        var datepicker_from = $("#datepicker-from-input").val();
	        var datepicker_to = $("#datepicker-to-input").val();
	        var tour_cat_arr = $(".checkbox_term:checked").map(function() {
	            return $(this).val();         
	        }).get();

	        //console.log(tour_cat_arr);
		    //var search_tour_cat = getUrlParameter('search_tour_cat');
		    if (tour_cat_arr && tour_cat_arr != 0) {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = tour_cat_arr;
		    }else {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = 'all';
		    }

			    
			    //var startTime = getUrlParameter('startTime');
			    var startTime = datepicker_from;
			    var startTime11 = datepicker_from;
			    //console.log(startTime);
			    startTime = new Date(startTime);
				startTime.setDate(startTime.getDate() + 1);
				startTime = $filter('date')(new Date(startTime), 'yyyy-MM-dd');
				console.log('startTime '+startTime);
			    
			    //var endTime = getUrlParameter('endTime');
				var endTime = datepicker_to;
				console.log('endTime '+endTime);
			    
			    var endTime_plus1 = new Date(endTime);
			    endTime_plus1.setDate(endTime_plus1.getDate() + 2);
 				endTime_plus1 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');
 				//console.log(endTime_plus1);

 				var endTime_plus11 = new Date(endTime);
			    endTime_plus11.setDate(endTime_plus11.getDate() + 1);
 				endTime_plus11 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');
 				console.log('endTime_plus11 '+endTime_plus11);

			    var now = new Date(startTime);
				var daysOfYear = [];
				for (var d = new Date(startTime); d <= now; d.setDate(d.getDate() + 1)) {
				    daysOfYear.push( $filter('date')(new Date(d), 'yyyy-MM-dd') );
				}
				console.log('daysOfYear '+daysOfYear);

				// $("#datepicker-from-input").val(startTime);
	   //      	$("#datepicker-to-input").val(endTime_plus11);


                $http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/availability?limit=100&offset=0&productCode='+productCode+'&startTime='+startTime11+'&endTime='+endTime_plus11+'&apiKey='+js_var.apikey}).
                 success(function(data, status, headers, config) {
                    deferred.resolve(data.sessions);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });
				// angular.element('[ng-controller=wqs_search_controller]').scope().start = startTime;
				// angular.element('[ng-controller=wqs_search_controller]').scope().end = endTime;
				angular.element('[ng-controller=wqs_search_controller]').scope().timearray = daysOfYear;
                return deferred.promise;
            }
        }
    });

// dataServiceAjax for click  PREV
    wqs_xola_check.factory('dataServiceAjaxPrev', function($http, $q, $filter){
        return{
            getData: function(productCode,startTime,endTime){
                var deferred = $q.defer();
        

	        var datepicker_from = $("#datepicker-from-input").val();
	        var datepicker_to = $("#datepicker-to-input").val();
	        var tour_cat_arr = $(".checkbox_term:checked").map(function() {
	            return $(this).val();         
	        }).get();

	        //console.log(tour_cat_arr);
		    //var search_tour_cat = getUrlParameter('search_tour_cat');
		    if (tour_cat_arr && tour_cat_arr != 0) {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = tour_cat_arr;
		    }else {
		    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = 'all';
		    }

			    
			    //var startTime = getUrlParameter('startTime');
			    var startTime = datepicker_from;
			    var startTime11 = datepicker_from;
			    //console.log(startTime);
			    startTime = new Date(startTime);
				startTime.setDate(startTime.getDate() - 1);
				startTime = $filter('date')(new Date(startTime), 'yyyy-MM-dd');
				console.log('startTime '+startTime);
			    
			    //var endTime = getUrlParameter('endTime');
				var endTime = datepicker_to;
				console.log('endTime '+endTime);
			    
			    var endTime_plus1 = new Date(endTime);
			    endTime_plus1.setDate(endTime_plus1.getDate() + 2);
 				endTime_plus1 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');
 				//console.log(endTime_plus1);

 				var endTime_plus11 = new Date(endTime);
			    endTime_plus11.setDate(endTime_plus11.getDate() + 1);
 				endTime_plus11 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');
 				//console.log('endTime_plus11 '+endTime_plus11);

			    var now = new Date(startTime);
				var daysOfYear = [];
				for (var d = new Date(startTime); d <= now; d.setDate(d.getDate() + 1)) {
				    daysOfYear.push( $filter('date')(new Date(d), 'yyyy-MM-dd') );
				}
				console.log('daysOfYear '+daysOfYear);

				// $("#datepicker-from-input").val(startTime);
	   //      	$("#datepicker-to-input").val(endTime_plus11);


                $http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/availability?limit=100&offset=0&productCode='+productCode+'&startTime='+startTime+'&endTime='+endTime+'&apiKey='+js_var.apikey}).
                 success(function(data, status, headers, config) {
                    deferred.resolve(data.sessions);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });
				// angular.element('[ng-controller=wqs_search_controller]').scope().start = startTime;
				// angular.element('[ng-controller=wqs_search_controller]').scope().end = endTime;
				angular.element('[ng-controller=wqs_search_controller]').scope().timearray = daysOfYear;
                return deferred.promise;
            }
        }
    });

// dataServiceAjaxmore for infinite
    wqs_xola_check.factory('dataServiceAjaxmore', function($http, $q, $filter){
        return{
            getData: function(productCode,startTime,endTime){
                var deferred = $q.defer();
        	
        	console.log('factory dataServiceAjaxmore');

        	// load category
		        var tour_cat_arr = $(".checkbox_term:checked").map(function() {
		            return $(this).val();         
		        }).get();

			    if (tour_cat_arr && tour_cat_arr != 0) {
			    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = tour_cat_arr;
			    }else {
			    	angular.element('[ng-controller=wqs_search_controller]').scope().search_tour_cat = 'all';
			    }
			// end category

			// load start time
			    var startTime = angular.element('[ng-controller=wqs_search_controller]').scope().timearrayLoadmore[0];
			    console.log(startTime);
			    //startTime = $filter('date')(new Date(startTime), 'yyyy-MM-dd');

			// load endtime
			    var length = angular.element('[ng-controller=wqs_search_controller]').scope().timearrayLoadmore.length;
				var endTime = angular.element('[ng-controller=wqs_search_controller]').scope().timearrayLoadmore[length-1];
				console.log(endTime);
			    
			    var endTime_plus1 = new Date(endTime);
			    endTime_plus1.setDate(endTime_plus1.getDate() + 1);
 				endTime_plus1 = $filter('date')(new Date(endTime_plus1), 'yyyy-MM-dd');

			// get
                $http({method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://api.rezdy.com/v1/availability?limit=100&offset=0&productCode='+productCode+'&startTime='+startTime+'&endTime='+endTime_plus1+'&apiKey='+js_var.apikey}).
                 success(function(data, status, headers, config) {
                    deferred.resolve(data.sessions);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            }
        }
    });

/* filters */

	wqs_xola_check.filter("asDate", function ($filter) {
	    return function (input) {
	        return $filter('date')(new Date(input), 'yyyy-MM-dd', 'UTC');
	    }
	});
 	wqs_xola_check.filter("asTime", function ($filter) {
	    return function (input) {
	        return $filter('date')(new Date(input), 'hh:mm a', 'UTC');
	    }
	});
	wqs_xola_check.filter("asDateTitle", function ($filter) {
	    return function (input) {
	        return $filter('date')(new Date(input), 'dd MMMM', 'UTC');
	    }
	});
	wqs_xola_check.filter("asDateTitleYears", function ($filter) {
	    return function (input) {
	        return $filter('date')(new Date(input), 'dd MMMM yyyy', 'UTC');
	    }
	});
	wqs_xola_check.filter("trust", ['$sce', function($sce) {
	  return function(htmlCode){
	    return $sce.trustAsHtml(htmlCode);
	  }
	}]);
	wqs_xola_check.filter('objLength', function() {
		 return function(object) {
		  var count = 0;

		  for(var i in object){
		   count++;
		  }
		  return count;
		 }
	});


})();

