/* Author: Matt Hamm Supereight Studio */

// :nth-child
$(function () {
	$("li:last-child").addClass("last");
	//$("li:nth-child(3n+3)").addClass("end");//
});


// FLICKR Feed
$(document).ready(function(){		
	
	if($('body#about').length == 1) {			
						   
		// Our very special jQuery JSON fucntion call to Flickr, gets details of the most recent 20 images			   
		$.getJSON("//api.flickr.com/services/feeds/groups_pool.gne?id=1980535@N22&lang=en-us&format=json&jsoncallback=?", displayImages);
		
		function displayImages(data) {																																   
			// Randomly choose where to start. A random number between 0 and the number of photos we grabbed (20) minus 9 (we are displaying 9 photos).
			var iStart = Math.floor(Math.random()*(6));	
			
			
			// Reset our counter to 0
			var iCount = 0;								
			
			// Start putting together the HTML string
			var htmlString = "<ul>";					
			
			// Now start cycling through our array of Flickr photo details
			$.each(data.items, function(i,item){
										
				// Let's only display 9 photos (a 3x3 grid), starting from a random point in the feed					
				if (iCount > iStart && iCount < (iStart + 60)) {
					
					// I only want the ickle square thumbnails
					var sourceSquare = (item.media.m).replace("_m.jpg", "_q.jpg");	
					
					// Here's where we piece together the HTML
					htmlString += '<li><a href="' + item.link + '" target="_blank">';
					htmlString += '<img src="' + sourceSquare + '" alt="' + item.title + '" title="' + item.title + '"/>';
					htmlString += '</a></li>';
				}
				// Increase our counter by 1
				iCount++;
			});		
			
		// Pop our HTML in the #images DIV	
		$('#images').html(htmlString + "</ul>");
		
		// Close down the JSON function call
		}
		
	}
		
// The end of our jQuery function	
});

// nav fixed to top on scroll down	
$(function() {	
$(document).ready(function () {  
  var top = $('nav').offset().top - parseFloat($('#content').css('marginTop').replace(/auto/, 0));
  $(window).scroll(function (event) {
    // what the y position of the scroll is
    var y = $(this).scrollTop();
  
    // whether that's below the form
    if (y >= top) {
      // if so, ad the fixed class
      $('nav').addClass('fixed');
    } else {
      // otherwise remove it
      $('nav').removeClass('fixed');
    }
  });
});
});

$(function() {	
	  
	// Mobile nav 
	$(".nav_link a").click(function() {
    	$(this).parent().toggleClass('open');
	})
	.pageslide({direction: "left"});
/*
	$('.nav_link').click(function(){
      if ($("nav ul").is(":hidden")) {
        $("nav ul").slideDown();
      } else {
        $('nav ul').slideUp();
      }
    });
*/
    
});


// Google Maps API
function initialize() {
	var latlng = new google.maps.LatLng(51.787851, 2);
	var settings = {
		zoom: 7,
		center: latlng,
		scrollwheel: false,
		navigationControl: false,
		scaleControl: false,
		streetViewControl: false,
		draggable: true, 
		mapTypeControl: true,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		navigationControl: true,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
var pointw = new google.maps.LatLng(51.787851, -1.483615);


var contentString = '<div id="content">'+
      '<p>Witney office</p>';
      
var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  
var image = new google.maps.MarkerImage(
  'img/icon_marker.png',
  new google.maps.Size(42,62),
  new google.maps.Point(0,0),
  new google.maps.Point(21,62)
);


var shadow = new google.maps.MarkerImage(
  'img/icon_marker_shadow.png',
  new google.maps.Size(76,62),
  new google.maps.Point(0,0),
  new google.maps.Point(21,62)
);



var shape = {
  coord: [27,0,29,1,31,2,33,3,34,4,35,5,36,6,37,7,38,8,38,9,39,10,39,11,40,12,40,13,40,14,41,15,41,16,41,17,41,18,41,19,41,20,41,21,41,22,41,23,41,24,41,25,41,26,40,27,40,28,40,29,40,30,39,31,39,32,39,33,38,34,38,35,37,36,37,37,37,38,36,39,36,40,35,41,35,42,34,43,34,44,33,45,33,46,32,47,31,48,31,49,30,50,30,51,29,52,28,53,28,54,27,55,26,56,26,57,25,58,24,59,23,60,22,61,20,61,18,60,17,59,17,58,16,57,15,56,14,55,14,54,13,53,12,52,12,51,11,50,11,49,10,48,9,47,9,46,8,45,8,44,7,43,7,42,6,41,6,40,5,39,5,38,4,37,4,36,4,35,3,34,3,33,2,32,2,31,2,30,2,29,1,28,1,27,1,26,1,25,1,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,1,16,1,15,1,14,1,13,2,12,2,11,3,10,3,9,4,8,5,7,6,6,7,5,8,4,9,3,10,2,12,1,15,0,27,0],
  type: 'poly'
};

var markerw = new google.maps.Marker({
  draggable: false,
  raiseOnDrag: false,
  icon: image,
  shadow: shadow,
  shape: shape,
  map: map,
  position: pointw
});

var red_road_styles = [
//  {
//    featureType: "all",
//    stylers: [
//      { saturation: -100 }
//    ]
//  },
//  {
//    featureType: "road.highway",
//    stylers: [
//      { hue: "#E1704B" },
//      { saturation: 100 }
//    ]
//  }
//];


    {
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.roads",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f5f5f2"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#71c8d4"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#e5e8e7"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#8ba129"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c7c7c7"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#a0d3d3"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#91b65d"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "gamma": 1.51
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road"
    },
    {
        "featureType": "road"
    },
    {},
    {
        "featureType": "road.highway"
    }
];

map.setOptions({styles: red_road_styles});
}

/*
pointw.addListener('click', function() {
    infowindow.open(map, pointw);
  });
 */


// Keypress navigation functions
$(function( $ ) {
    var keymap = {};

    // LEFT
    keymap[ 37 ] = "#prev";
    // UP
    keymap[ 38 ] = "#up";
    // RIGHT
    keymap[ 39 ] = "#next";

    $( document ).on( "keyup", function(event) {
        var href,
            selector = keymap[ event.which ];
        // if the key pressed was in our map, check for the href
        if ( selector ) {
            href = $( selector ).attr( "href" );
            if ( href ) {
                // navigate where the link points
                window.location = href;
            }
        }
    });
});


