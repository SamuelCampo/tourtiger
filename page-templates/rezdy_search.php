<?php
/**
 * Template Name: Search Page Template
 */

//* This file handles single entries, but only exists for the sake of child theme forward compatibility.

remove_action('genesis_loop', 'genesis_do_loop');
add_action('genesis_loop', 'tourtiger_archive');
function tourtiger_archive(){

    $startTime = null;
    $endTime = null;

    if(isset($_GET["search"])){

            // offset
            if(isset($_GET["off"])){
                $offset = $_GET["off"];
            }
            else{
                $offset = 0;
            }

            // limit
            if(isset($_GET["limit"])){
                $limit = $_GET["limit"];
            }
            else{
                $limit = 100;
            }
            //startTime
            $startTime = $_GET["startTime"];

            //endTime
            $endTime = $_GET["endTime"];

            // category
            if(isset($_GET["search_tour_cat"])){
                $search_tour_cat = $_GET["search_tour_cat"];
            }
            else{
                $search_tour_cat = '';
            }

            //product_id 
            if(isset($_GET["product_id"])){
                $product_id = $_GET["product_id"];
            }
            else{
                $product_id = null;
            }

            // response
            //$rezdy = get_check_product( $offset, $limit, $startTime, $endTime);
            //$rezdy_availiability = get_check_availiability( $offset, $limit, $startTime, $endTime, $rezdy, $search_tour_cat, $product_id);
         
    }  //end if search  ?>

    <section class="tour-page-content" ng-app="wqs">
            <div class="container" ng-controller="wqs_search_controller">
            <input type="hidden" id="wqs_api_url" value="<?php echo getWqsApiUrl();?>">
<!--                 <div class="row">
                  <div class="pull-right">
                      <button class="view_type" id="list_view"><i class="fa fa-list"></i> List View</button>
                      <button class="view_type" id="grid_view"><i class="fa fa-th"></i> Grid View</button>
                  </div>
                </div> -->
                <div class="row">
                  <div class="col-md-3 search-sidebar-wrap" id="searchfilter" >
                      <?php get_template_part( 'page-templates/search/search_box_sidebar' ); ?>
                  </div>
                 <!--  <div id="ajax_preLoading" class="preLoading2"></div> -->

                <div class="col-md-9 search-content-wrap" id="mainContentAng">

                    <div id="ajax_preLoading" class="preLoading2" ng-show="loading"></div>

                    <div ng-repeat = "timearrays in timearray track by $index | unique:'timearray'" class="timearray">

                        <p class="cDate2" >{{timearrays | asDateTitle }}</p>

                        <div ng-repeat = "products in api_availability track by $index">
                                <span ng-repeat="productss in products" class="productss">
                                    <span ng-if="(productss.startTime | asDate) == (timearrays | asDate) " class="productss-startTime">
                                        
                                        <div ng-repeat = "cptproducts in cpt_product track by $index" ng-if="cptproducts.productcode ==productss.productCode && cptproducts.productcode != null && productss.seatsAvailable != 0" ng-class="{'cpt-avail' :  cptproducts.productcode ==productss.productCode && cptproducts.productcode != null && productss.seatsAvailable != 0}" class="cptproducts">
                                            
                                            <div class="anrow2" ng-if="search_tour_cat == 'all' "> 
                                                <div class="col-md-4 search-tumb-wrap">
                                                    <img src="{{cptproducts.image2}}">
                                                    <span class="most_popular" ng-if="cptproducts.integration_flag.length >0">Most Popular</span>
                                                </div>

                                                <div class="col-md-8 search-descript-wrap">
                                                    <h3 ng-bind-html="cptproducts.title | trust" class=""></h3>
                                                    <span  ng-if="cptproducts.integration_price" class="search-tumb-price">
                                                        $ {{cptproducts.integration_price}}
                                                    </span>
                                                    <span  ng-repeat = "price in productss.priceOptions track by $index" ng-if="price.label=='Adult' && !cptproducts.integration_price" class="search-tumb-price">
                                                        $ {{price.price}}
                                                    </span>
                                                        <div class="search-descript-available" ng-if="cptproducts.integration_availability =='Show Full Availability'">Only {{productss.seatsAvailable}} <span ng-if="productss.seatsAvailable!=1">Spots</span><span ng-if="productss.seatsAvailable==1">Spot</span> available for this date</div>
                                                        <div class="search-descript-available" ng-if="cptproducts.integration_availability =='Show Available'">Available on this date</div>
                                                        <div class="search-descript-descript">{{cptproducts.descript}}</div>
   
                                                        <div class="search-descript-departure" ng-if="!cptproducts.details.length >0">
                                                             <span class="search-descript-departure-label">Departure</span>  <span class="search-descript-departure-text">{{productss.startTime  | asTime }}</span>
                                                             <span class="search-descript-departure-label">Duration</span> <span class="search-descript-departure-text">{{duration(productss.startTime,productss.endTime)}} hours</span>
                                                        </div>
                                                        <div class="search-descript-departure">
                                                            <span ng-repeat="details in cptproducts.details track by $index" ng-if="cptproducts.details.length >0">
                                                                <span class="search-descript-departure-label">{{details.label }}</span> <span class="search-descript-departure-text">{{details.text}}</span>
                                                            </span>
                                                        </div>
                                                        <div class="search-descript-button">
                                                            <a href="{{cptproducts.link}}?check_date={{timearrays | asDate}}" class="viewtour button-viewtour">View Tour</a>
                                                            <a href="{{cptproducts.custom_button_link}}" class="viewtour button-viewtour button-book">Book now</a>
                                                        </div>
                                                </div>
                                                
                                            </div>

                                            <div class="anrow2" ng-if="search_tour_cat != 'all' && cptproducts.term.slug == search_tour_cat"> 
                                                <div class="col-md-4 search-tumb-wrap">
                                                    <img src="{{cptproducts.image2}}">
                                                    <span class="most_popular" ng-if="cptproducts.integration_flag.length >0">Most Popular</span>
                                                </div>

                                                <div class="col-md-8 search-descript-wrap">
                                                    <h3 ng-bind-html="cptproducts.title | trust" class=""></h3>
                                                    <span  ng-if="cptproducts.integration_price" class="search-tumb-price">
                                                        $ {{cptproducts.integration_price}}
                                                    </span>                                                    
                                                    <span  ng-repeat = "price in productss.priceOptions track by $index" ng-if="price.label=='Adult' && !cptproducts.integration_price" class="search-tumb-price">
                                                        $ {{price.price}}
                                                    </span>
                                                        <div class="search-descript-available" ng-if="cptproducts.integration_availability =='Show Full Availability'">Only {{productss.seatsAvailable}} <span ng-if="productss.seatsAvailable!=1">Spots</span><span ng-if="productss.seatsAvailable==1">Spot</span> available for this date</div>
                                                        <div class="search-descript-available" ng-if="cptproducts.integration_availability =='Show Available'">Available on this date</div>
                                                        <div class="search-descript-descript">{{cptproducts.descript}}</div>
   
                                                        <div class="search-descript-departure" ng-if="!cptproducts.details.length >0">
                                                             <span class="search-descript-departure-label">Departure</span>  <span class="search-descript-departure-text">{{productss.startTime  | asTime }}</span>
                                                             <span class="search-descript-departure-label">Duration</span> <span class="search-descript-departure-text">{{duration(productss.startTime,productss.endTime)}} hours</span>
                                                        </div>
                                                        <div class="search-descript-departure">
                                                            <span ng-repeat="details in cptproducts.details track by $index" ng-if="cptproducts.details.length >0">
                                                                <span class="search-descript-departure-label">{{details.label }}</span> <span class="search-descript-departure-text">{{details.text}}</span>
                                                            </span>
                                                        </div>
                                                        <div class="search-descript-button">
                                                            <a href="{{cptproducts.link}}?check_date={{timearrays | asDate}}" class="viewtour button-viewtour">View Tour</a>
                                                            <a href="{{cptproducts.custom_button_link}}" class="viewtour button-viewtour button-book">Book now</a>
                                                        </div>
                                                </div>
                                                
                                            </div>                                                
                                                
                                        

                  

                                        </div>
                                    </span>
                                </span>
                        </div>  
                    </div> 
                <!-- </div> -->

                <!-- loadmore -->
                    <button 
                        id="ang_moreloading" 
                        ng-click="addTemplate(0)"
                        class="ng-hide"
                        data-starttime={{timearrayLoadmore[0]}}
                        data-endtime={{timearrayLoadmore[1]}}
                    >loadmore</button>
<!--                         <div ng-repeat="template in displayedtemplate track by $index">
                            <ng-include src="template"></ng-include>
                        </div> -->
    
    <div ng-repeat = "timearrays in timearrayLoadmore track by $index | unique:'timearrayLoadmore'"  ng-hide="scrollindex == 1" class="timearrayLoadmore">

                        <p class="cDate2" >{{timearrays | asDateTitle }}</p>

                        <div ng-repeat = "products in api_availability_more track by $index">
                                <span ng-repeat="productss in products" class="productss">
                                    <span ng-if="(productss.startTime | asDate) == (timearrays | asDate) " class="productss-startTime">
                                        
                                        <div ng-repeat = "cptproducts in cpt_product track by $index" ng-if="cptproducts.productcode ==productss.productCode && cptproducts.productcode != null && productss.seatsAvailable != 0" ng-class="{'cpt-avail' :  cptproducts.productcode ==productss.productCode && cptproducts.productcode != null && productss.seatsAvailable != 0}" class="cptproducts">
                                            
                                            <div class="anrow2" ng-if="search_tour_cat == 'all' "> 
                                                <div class="col-md-4 search-tumb-wrap">
                                                    <img src="{{cptproducts.image2}}">
                                                    <span class="most_popular" ng-if="cptproducts.integration_flag.length >0">Most Popular</span>
                                                </div>

                                                <div class="col-md-8 search-descript-wrap">
                                                    <h3 ng-bind-html="cptproducts.title | trust" class=""></h3>
                                                    <span  ng-if="cptproducts.integration_price" class="search-tumb-price">
                                                        $ {{cptproducts.integration_price}}
                                                    </span>
                                                    <span  ng-repeat = "price in productss.priceOptions track by $index" ng-if="price.label=='Adult' && !cptproducts.integration_price" class="search-tumb-price">
                                                        $ {{price.price}}
                                                    </span>
                                                        <div class="search-descript-available" ng-if="cptproducts.integration_availability =='Show Full Availability'">Only {{productss.seatsAvailable}} <span ng-if="productss.seatsAvailable!=1">Spots</span><span ng-if="productss.seatsAvailable==1">Spot</span> available for this date</div>
                                                        <div class="search-descript-available" ng-if="cptproducts.integration_availability =='Show Available'">Available on this date</div>
                                                        <div class="search-descript-descript">{{cptproducts.descript}}</div>
   
                                                        <div class="search-descript-departure" ng-if="!cptproducts.details.length >0">
                                                             <span class="search-descript-departure-label">Departure</span>  <span class="search-descript-departure-text">{{productss.startTime  | asTime }}</span>
                                                             <span class="search-descript-departure-label">Duration</span> <span class="search-descript-departure-text">{{duration(productss.startTime,productss.endTime)}} hours</span>
                                                        </div>
                                                        <div class="search-descript-departure">
                                                            <span ng-repeat="details in cptproducts.details track by $index" ng-if="cptproducts.details.length >0">
                                                                <span class="search-descript-departure-label">{{details.label }}</span> <span class="search-descript-departure-text">{{details.text}}</span>
                                                            </span>
                                                        </div>
                                                        <div class="search-descript-button">
                                                            <a href="{{cptproducts.link}}?check_date={{timearrays | asDate}}" class="viewtour button-viewtour">View Tour</a>
                                                            <a href="{{cptproducts.custom_button_link}}" class="viewtour button-viewtour button-book">Book now</a>
                                                        </div>
                                                </div>
                                                
                                            </div>

                                            <div class="anrow2" ng-if="search_tour_cat != 'all' && cptproducts.term.slug == search_tour_cat"> 
                                                <div class="col-md-4 search-tumb-wrap">
                                                    <img src="{{cptproducts.image2}}">
                                                    <span class="most_popular" ng-if="cptproducts.integration_flag.length >0">Most Popular</span>
                                                </div>

                                                <div class="col-md-8 search-descript-wrap">
                                                    <h3 ng-bind-html="cptproducts.title | trust" class=""></h3>
                                                    <span  ng-if="cptproducts.integration_price" class="search-tumb-price">
                                                        $ {{cptproducts.integration_price}}
                                                    </span>                                                    
                                                    <span  ng-repeat = "price in productss.priceOptions track by $index" ng-if="price.label=='Adult' && !cptproducts.integration_price" class="search-tumb-price">
                                                        $ {{price.price}}
                                                    </span>
                                                        <div class="search-descript-available" ng-if="cptproducts.integration_availability =='Show Full Availability'">Only {{productss.seatsAvailable}} <span ng-if="productss.seatsAvailable!=1">Spots</span><span ng-if="productss.seatsAvailable==1">Spot</span> available for this date</div>
                                                        <div class="search-descript-available" ng-if="cptproducts.integration_availability =='Show Available'">Available on this date</div>
                                                        <div class="search-descript-descript">{{cptproducts.descript}}</div>
   
                                                        <div class="search-descript-departure" ng-if="!cptproducts.details.length >0">
                                                             <span class="search-descript-departure-label">Departure</span>  <span class="search-descript-departure-text">{{productss.startTime  | asTime }}</span>
                                                             <span class="search-descript-departure-label">Duration</span> <span class="search-descript-departure-text">{{duration(productss.startTime,productss.endTime)}} hours</span>
                                                        </div>
                                                        <div class="search-descript-departure">
                                                            <span ng-repeat="details in cptproducts.details track by $index" ng-if="cptproducts.details.length >0">
                                                                <span class="search-descript-departure-label">{{details.label }}</span> <span class="search-descript-departure-text">{{details.text}}</span>
                                                            </span>
                                                        </div>
                                                        <div class="search-descript-button">
                                                            <a href="{{cptproducts.link}}?check_date={{timearrays | asDate}}" class="viewtour button-viewtour">View Tour</a>
                                                            <a href="{{cptproducts.custom_button_link}}" class="viewtour button-viewtour button-book">Book now</a>
                                                        </div>
                                                </div>
                                                
                                            </div>                                                
                                                
                                        

                  

                                        </div>
                                    </span>
                                </span>
                        </div> 

    </div>
    <!-- end loadmore -->

                </div> <!-- end col-md-10 -->

                  <div class="col-md-9" id="mainContent">
                      <?php //echo $rezdy_availiability; ?>
                  </div>
                  <div 
                    id="ajax_moreLoading" 
                    class="moreLoading" 
                    data-offset=<?php echo $offset; ?> 
                    data-limit=<?php echo $limit; ?> 
                    data-starttime=<?php echo $startTime; ?> 
                    data-endtime=<?php echo $endTime; ?> 
                  >
                  </div>

                </div>
<!-- template -->
<script type="text/ng-template" id="search_result_list.php.html">

    <div ng-repeat = "timearrays in timearrayLoadmore track by $index | unique:'timearrayLoadmore'"  class="timearray">

        <p class="cDate" >{{timearrays | asDateTitle }}</p>

        <div ng-repeat = "products in api_availability_more track by $index">
                <span ng-repeat="productss in products" class="productss">
                    <span ng-if="(productss.startTime | asDate) == (timearrays | asDate) " class="productss-startTime">

                        <div ng-repeat = "cptproducts in cpt_product track by $index" ng-if="cptproducts.productcode ==productss.productCode && cptproducts.productcode != null && productss.seatsAvailable != 0" ng-class="{'cpt-avail' :  cptproducts.productcode ==productss.productCode && cptproducts.productcode != null && productss.seatsAvailable != 0}" class="cptproducts">
                            
                            <div class="anrow" ng-if="search_tour_cat == 'all' "> 
                                <div class="col-md-4">
                                    <div class="rezdImg" style="background-image:url('{{cptproducts.image}}');"></div>
                                </div>
                                <div class="col-md-8">
                                    <h3 ng-bind-html="cptproducts.title | trust"></h3>
                                    <p class="rezdDesc">
                                        {{cptproducts.descript}}
                                        <br>seatsAvailable: {{productss.seatsAvailable}}
                                        <br>date: {{productss.startTime  | asDate }} - {{productss.endTime | asDate}}
                                        <br>time: {{productss.startTime  | asTime }} - {{productss.endTime | asTime}}
                                    </p>
                                </div>
                                <a href="{{cptproducts.link}}" class="btn btn-default pull-right viewtour">View Tour</a>
                            </div>

                            <div class="anrow" ng-if="search_tour_cat != 'all' && cptproducts.term.slug == search_tour_cat">
                                <div class="col-md-4">
                                    <div class="rezdImg" style="background-image:url('{{cptproducts.image}}');"></div>
                                </div>
                                <div class="col-md-8">
                                    <h3 ng-bind-html="cptproducts.title | trust"></h3>
                                    <p class="rezdDesc">
                                        {{cptproducts.descript}}
                                        <br>cat: {{search_tour_cat}} 
                                        <br>seatsAvailable: {{productss.seatsAvailable}}
                                        <br>date: {{productss.startTime  | asDate }} - {{productss.endTime | asDate}}
                                        <br>time: {{productss.startTime  | asTime }} - {{productss.endTime | asTime}}
                                    </p>
                                </div>
                                <a href="{{cptproducts.link}}" class="btn btn-default pull-right viewtour">View Tour</a>
                            </div>

                        </div>

                    </span>
                </span>
    </div>
</script>
<!-- end template -->
 
            </div> <!-- end controller -->
    </section> <!-- end app -->

<?php } // end tourtiger_archive()

remove_action('genesis_sidebar', 'genesis_do_sidebar');

genesis();

?>

<!-- include custom style -->
<?php get_template_part( 'page-templates/search/result-page-style' ); ?>

<script>
jQuery(document).ready(function($){

    var scrollLoad = true;

    //$(window).scroll(function () { 
    $('').scroll(function () { 


      if (scrollLoad && $(window).scrollTop() >=  $('#mainContent').height() -400 ) {
        scrollLoad = false;

        var datepicker_from = $("#datepicker-from-input").val();
        var datepicker_to = $("#datepicker-to-input").val();
        var tour_cat_arr = $(".checkbox_term:checked").map(function() {
            return $(this).val();         
        }).get();
        var product_id = $('#product_id:checked').val();
        var ajax_more_datepicker_to = $('#ajax_moreLoading').data('endtime');
        console.log(ajax_more_datepicker_to);
        var currentDate = new Date(ajax_more_datepicker_to);
        currentDate.addDays(1);
        //console.log(currentDate);
        //console.log($.date(currentDate));
        var nextday = $.date(currentDate);
        console.log(nextday);

        $('#mainContent').animate({opacity: 0.5}, 500);
        $('#ajax_preLoading').animate({opacity: 0.5}, 500);

        jQuery.ajax({
            url     : localize_var.ajaxurl,
            type    : "POST",
            dataType: 'json',
            data    : {
                'action'            : 'check_availability',
                'datepicker_from'   : nextday,
                'datepicker_to'     : nextday,
                'tour_cat_arr'      : tour_cat_arr,
                'product_id'        : product_id
            },
            success : function (response) {
                console.log(response);
                $('#ajax_preLoading').animate({opacity: 0}, 500);
                $('#mainContent').append(response.get_check_availiability).animate({opacity: 1}, 500);
                scrollLoad = true;
                $('#ajax_moreLoading').data('endtime', nextday);
            }
        });


      }
    });

    Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    $.date = function(dateObject) {
        var d = new Date(dateObject);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = year + "-" + month + "-" + day;

        return date;
    };



}) //end document.ready 
</script>


