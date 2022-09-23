const map = L.map('map').setView([52.119, 23.83], 13.5);

    const CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">saldatkin</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    });
    CartoDB_Voyager.addTo(map);

    id = 0;


    const _grn_icon = L.icon({
      iconUrl: 'assets/custom-marker.svg',
      iconSize: [40,40],
    })



    const GRN_CIRCLE =
      createMarker([52.12822, 23.834], _grn_icon,  'green', 50, true);
    const YLW_CIRCLE =
      createMarker([52.1175, 23.830], _grn_icon, 'yellow', 50, true);
    const RED_CIRCLE =
      createMarker([52.1189, 23.81], _grn_icon, 'red', 50, true);
    const DEF_CIRCLE =
      createMarker([52.1196, 23.826], _grn_icon, '', 50, true);

    const markers = {
      "green": GRN_CIRCLE,
      "yellow": YLW_CIRCLE,
      "red": RED_CIRCLE,
      "blue": DEF_CIRCLE,
    }

    let controlLayers = L.control.layers({map}, markers, {collapsed: false});
    controlLayers.addTo(map)

    map.on('dblclick', (e) => {
      marker = createMarker(e.latlng);
      marker.bindPopup(`${e.latlng.lat.toFixed(5)}<br> ${e.latlng.lng.toFixed(5)}`);
      controlLayers.remove();
      markers[id] = marker;
      controlLayers = L.control.layers({map}, markers, {collapsed: false});
      controlLayers.addTo(map);
      id++;
    });








    function createMarker(coordinates, icon = _grn_icon, color = 'yellow', radius = 50, draggable = true) {
      const marker = L.marker(coordinates, {
        icon: icon,
        color: color,
        radius: radius,
        draggable: draggable,
      });
      marker.addTo(map).on('click', (e) => {
        coordinates = e.latlng;
      })
      marker.bindPopup(`${Number(coordinates[0]).toFixed(5)}<br> ${Number(coordinates[1]).toFixed(5)}`);
      return marker;
    };
