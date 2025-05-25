ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [53.9022, 27.5618],
        zoom: 11,
        controls: []
    });

    var addresses = [
        {coords: [53.952025, 27.693219], address: 'ул. Уручская, д. 15'},
        {coords: [53.891736, 27.560196], address: 'ул. Свердлова, д. 13а'},
        {coords: [53.905912, 27.529474], address: 'ул. Кальварийская, д. 17'},
        {coords: [53.872985, 27.483920], address: 'ул. Алибегова, д. 12'},
        {coords: [53.886477, 27.427829], address: 'ул. Лобанка, д. 94'}
    ];

    addresses.forEach(function(item) {
        var placemark = new ymaps.Placemark(item.coords, {
            balloonContent: item.address
        }, {
            preset: 'islands#blueStretchyIcon'
        });
        myMap.geoObjects.add(placemark);
    });
}); 