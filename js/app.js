var latitude, longitude;
document.getElementById('findMe').addEventListener('click', search);

/* Función que carga Google Maps y nos ubica en Lima por default */
function initMap() {
  var location = {
    lat: -12.0431800,
    lng: -77.0282400
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: location
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    draggable: true,
    icon: 'https://cicloslasalud.com/img/bici.png'

  });

  var inputPartida = document.getElementById('startingPoint');
  var inputDestino = document.getElementById('destination');

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('No encontramos una ruta');
      }
    });
  };

  /* Función para trazar ruta según direcciones ingresadas */
  directionsDisplay.setMap(map);
  var directions = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('goTo').addEventListener('click', directions);
  /* Creando función que limpia los inputs y permite realizar más búsquedas */
  document.getElementById('goTo').addEventListener('click', function () {
    if (directions) {
      inputPartida.value = '';
      inputDestino.value = '';
    }
  });
};

/* Función para iniciar búsqueda */
function search() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

/* Función si se encontró la ubicación exitosamente */
var success = function getLocationSuccess(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  var location = {
    lat: latitude,
    lng: longitude
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: location
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    draggable: true,
    icon: 'https://cicloslasalud.com/img/bici.png'
  });
};

/* Función si hubo un error al intentar encontar la ubicación */
var error = function (error) {
  alert('Tenemos problemas para encontrar tu ubicación.');
};