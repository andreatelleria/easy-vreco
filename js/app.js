let latitude, longitude;
document.getElementById('findMe').addEventListener('click', search);

/* Función que carga Google Maps y nos ubica en Lima por default */
function initMap() {
  let location = {
    lat: -12.0431800,
    lng: -77.0282400
  };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: location
  });
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    draggable: true,
    icon: 'https://cicloslasalud.com/img/bici.png'

  });

  let inputPartida = document.getElementById('startingPoint');
  let inputDestino = document.getElementById('destination');

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer;

  const calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
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
  const directions = () => {
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
function search(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

/* Función si se encontró la ubicación exitosamente */
const success = function getLocationSuccess(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let location = {
    lat: latitude,
    lng: longitude
  };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: location
  });
  let marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    draggable: true,
    icon: 'https://cicloslasalud.com/img/bici.png'
  });
};

/* Función si hubo un error al intentar encontar la ubicación */
const error = (error) => {
  alert('Tenemos problemas para encontrar tu ubicación.');
};