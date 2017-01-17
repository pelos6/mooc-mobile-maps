/**/
var greenIcon = L.icon({
    iconUrl: './img/leaf-green.png',
    shadowUrl: './img/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var app = {
  inicio: function() {
    this.iniciaFastClick();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  dispositivoListo: function(){
    navigator.geolocation
            .getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion)
            /*3) Actualizar posición en el mapa (Pendiente verificar).*/
            .geolocation.watchCurrentPosition(function() { alert("updated position"); });
  },

  pintaCoordenadasEnMapa: function(position){
    var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29vdHlmZXIiLCJhIjoiY2l1MGlrb2M3MDAwMDJ6bXAxY3dlOXdkYiJ9.RBfUsuzHfLrofEyMR8IVlA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(miMapa);

    app.pintaMarcador([position.coords.latitude, position.coords.longitude], true, '¡Estoy aquí!', miMapa);

    miMapa.on('click', function(evento){
      var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
      app.pintaMarcador(evento.latlng, false, texto, miMapa);
    });
  },

  pintaMarcador: function(latlng, customIcon, texto, mapa){
    var marcador = null;
    if(customIcon) {
        /*2) Marcador especial "customIcon".
        marcador = L.marker(latlng, {icon: greenIcon}).addTo(mapa);
        var myRenderer = L.svg({ padding: 0.5 });
        /*1) Círculo de radio 1 km centrado en el usuario.*/
        var circle = L.circle( latlng, { radius: 1000}).addTo(mapa);
    } else {
        /*Marcador estándar*/
        marcador = L.marker(latlng).addTo(mapa);
    }
    marcador.bindPopup(texto).openPopup();
  },

  errorAlSolicitarLocalizacion: function(error){
    console.log(error.code + ': ' + error.message);
  }

};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    app.inicio();
  }, false);
  document.addEventListener('deviceready', function() {
    app.dispositivoListo();
  }, false);
}
