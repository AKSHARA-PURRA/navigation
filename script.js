
let map, directionsService, directionsRenderer;

function initMap() {
    // Initialize the map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 0, lng: 0 },  // Default center
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Use HTML5 geolocation to get current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);

            // Set the current location marker
            new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Your Location'
            });
        }, function () {
            handleLocationError(true, map.getCenter());
        });
    }
    //  else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, map.getCenter());
    // }
    var destinationMarker = new google.maps.Marker({
        position: destination,
        map: map,
        title: 'Destination'
    });
}

function calculateRoute() {
    const destinationAddress = document.getElementById('destination-input').value;
    let la1, lo1;
    var img_s;
    var name;
    let complaint;
    if (destinationAddress == "9-50/g") {
        la1 = 17.409906;
        lo1 = 78.586270;
        img_s = 'electricity.jpeg';
        name='mohammed yaqub ahmed';
        complaint='Electric wire problem';
    }
    else if (destinationAddress == "5-37/1") {

        la1 = 17.406321;
        lo1 = 78.5897899;
        img_s = 'water.jpeg';
        name='harsh vardhan';
        complaint='Water Leakage';
    }
    else if (destinationAddress == "1092/64") {

        la1 = 17.5083939;
        lo1 = 78.4882205;
        img_s = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmGCLg8VnALrmcAQj45yMmzx5T042F2QpOag&s';
        name='M.varshith';
        complaint='Sewage';
    }
    else if (destinationAddress == "101-gh") {

        la1 = 17.417746;
        lo1 = 78.579778;
        img_s = 'waste.jpeg';
        name='sreeshanth';
        complaint='Waste disposal';
    }

    // if (!destinationAddress) {
    //     alert("Please enter a destination address.");
    //     return;
    // }

    // Use HTML5 geolocation to get current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Geocode the destination address
            // const geocoder = new google.maps.Geocoder();
            // geocoder.geocode({ 'address': destinationAddress }, function(results, status) {
            // if (status === 'OK') {
            // var destination = {lat: 17.546781, lng:  79.356757};
            var destination = { lat: la1, lng: lo1 };

            // Define the request object
            const request = {
                origin: pos,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            };

            // Pass the request to the route method
            directionsService.route(request, function (result, status) {
                if (status === 'OK') {

                    directionsRenderer.setDirections(result);
                    const i = document.querySelector('.item1');
                    i.innerHTML = " Complaint Details ";
                    const c=document.querySelector('.com');
                    c.innerHTML="Complaint:  "+complaint;
                    var img = document.createElement('img');
                    if (!document.getElementById('unique-image')) {
                        
                        img.id = 'unique-image'; // Assign an ID to the image
                        img.src = img_s; // Set the source of the image
                        img.alt = 'A description of the image'; // Set the alt text of the image
                        img.height = "200";
                        img.width = "200";
                        // Append the image to the container
                        // document.getElementById('image-container').appendChild(img);

                    }
                    else{
                        img=document.getElementById('unique-image');
                       img.src=img_s;
                       
                    }
                    document.getElementById('image-container').appendChild(img);
                    const output = document.querySelector('.info');

                    output.innerHTML = "Complaint Registered By:  "+name+".<br /> <div class='alert-info'>From:  " + "Current-location" + ".<br />To:  " + destinationAddress + ".<br /> Driving distance <i class='fas fa-road'></i> :   " + result.routes[0].legs[0].distance.text + ".<br/>Duration <i class='fas fa-hourglass-start'></i> :   " + result.routes[0].legs[0].duration.text + ".</div>";
                    directionsRenderer.setDirections(result);


                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });

            //             else {
            // //                 alert('Geocode was not successful for the following reason: ' + status);
            // //             }
        });
    }
    // ,
    //  function() {
    //         handleLocationError(true, map.getCenter());
    //     });
}
// else {
//     handleLocationError(false, map.getCenter());
// }


function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new google.maps.InfoWindow({
        map: map
    });
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    map.setCenter(pos);
}

// Load the map when the page has finished loading
window.onload = initMap;
