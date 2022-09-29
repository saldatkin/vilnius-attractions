const map = L.map('map').setView([54.68717, 25.16475], 10);

    const CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">saldatkin</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    });
    CartoDB_Voyager.addTo(map);


    let currentRoute = '';
    let marker = '';
    let isCoordsCorrect = false;


    const _custom_icon = L.icon({
      iconUrl: 'assets/custom-marker.svg',
      iconSize: [30,30],
    });
    const _gedimin_icon = L.icon({
      iconUrl: 'assets/gediminas_tower.png',
      iconSize: [30,30],
    });
    const _tvtower_icon = L.icon({
      iconUrl: 'assets/tv_tower.jpeg',
      iconSize: [10,50],
    });
    const _uzupis_icon = L.icon({
      iconUrl: 'assets/uzupis.png',
      iconSize: [30,30],
    });
    const _trakai_icon = L.icon({
      iconUrl: 'assets/trakai.jpg',
      iconSize: [40,25],
    });



    const GEDIMINAS_TOWER_MARKER =
      createMarker([54.68676, 25.29070], _gedimin_icon,  'green', 50).bindPopup('Gediminas Tower');
    const TV_TOWER_MARKER =
      createMarker([54.68717, 25.21475], _tvtower_icon, 'yellow', 50).bindPopup('TV Tower');
    const UZUPIS_MARKER =
      createMarker([54.68176, 25.30070], _uzupis_icon, 'red', 50).bindPopup('Republic of Užupis');
    const TRAKAI_CASTLE =
      createMarker([54.6522007,24.9331594], _trakai_icon, '', 50).bindPopup('Trakai Castle');



    const sight_markers = {
      "Gediminas Tower": GEDIMINAS_TOWER_MARKER,
      "TV Tower": TV_TOWER_MARKER,
      "Republic of Užupis": UZUPIS_MARKER,
      "Trakai Castle": TRAKAI_CASTLE,
    }


    let controlLayers = L.control.layers({}, sight_markers, {collapsed: false});
    controlLayers.addTo(map)


    function createMarker(coordinates, icon = _custom_icon, color = 'yellow', radius = 50, draggable = false) {
      const marker = L.marker(coordinates, {
        icon: icon,
        color: color,
        radius: radius,
        draggable: draggable,
        riseOnHover: true,
      });

      marker.addTo(map).on('click', (e) => {
        coordinates = e.latlng;
      });

      marker.bindPopup(`${Number(coordinates[0]).toFixed(5)}<br> ${Number(coordinates[1]).toFixed(5)}`);
      return marker;
    };




    function createRoute(coords, destination){
      if(currentRoute !== ''){
        currentRoute.remove();
      }

      currentRoute = L.Routing.control({
        waypoints: [
          L.latLng(coords),
          L.latLng(destination.lat, destination.lng)
        ],
        fitSelectedRoutes: true,
        createMarker: function() { return null; },
        color: 'yellow'
      });
      currentRoute.addTo(map);
    }



    function onSubmit(){
      const coords = document.getElementById('coordInput').value.split(',');
      const destination = sight_markers[document.getElementById('coordinates-input').value]._latlng;

      isCoordsCorrect = checkCoords(coords);
      console.log(isCoordsCorrect);

      if(isCoordsCorrect){
        const marker = createMarker(coords);
        createRoute(coords, destination);
      } else {
        return;
      }
    }

    function checkCoords(coordinates){
      console.log(typeof coordinates[0]);
      const len = coordinates.length;
      return (len === 2 
        && coordinates[0] >= 0
        && coordinates[0] <= 90
        && coordinates[1] >= 0
        && coordinates[1] <= 90);
    };


    map.on('contextmenu', (e) => {
      e.preventDefault();
    });

    document.getElementById('coordForm').addEventListener('submit', (e) => {
      e.preventDefault();
    })

