function initMap() {
    // Specify the map ID
    const mapId = 'aa475dd92fc02784'; // Replace with your actual map ID

    // Create a new map instance
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -6.2088, lng: 106.8456},
        zoom: 11,
        mapId: mapId
    });

    // Name
    // Latitude, Longitude
    // Image URL
    // scaledSize width, height

    const markers = [
        [
            "Ancol Beach",
            -6.118654159779881,
            106.8506897323242,
            "1646656079PixelArt-Heart-1.svg",
            38,
            31
        ],
        [
            //-6.144981019037236, 106.84582758484692
            "UV safe",
            -6.144981019037236,
            106.84582758484692,
            "1646656079PixelArt-Heart-1.svg",
            40,
            40


        ],
        [
            //-6.149265303083421, 106.8502983009159
            "UV safe",
            -6.149265303083421,
            106.8502983009159,
            "1646656079PixelArt-Heart-1.svg",
            40,
            40


        ],
        [
            //-6.181953111839851, 106.83460014413029
            "UV safe",
            -6.181953111839851,
            106.83460014413029,
            "1646656079PixelArt-Heart-1.svg",
            40,
            40
        ],
        [
            //-6.27238606970959, 106.81614106827918
            "UV safe",
            -6.27238606970959,
            106.81614106827918,
            "1646656079PixelArt-Heart-1.svg",
            40,
            40
        ],
        [
            //-6.201328949741279, 106.7823215344597
            "UV safe",
            -6.201328949741279,
            106.7823215344597,
            "1646656079PixelArt-Heart-1.svg",
            40,
            40

        ],
        [
        //-6.302311171523757, 106.65218904146248
            "UV safe",
            -6.302311171523757,
            106.65218904146248,
            "kasteeltje.svg",
            50,
            50
        ]

    ];

    for(let i = 0; i < markers.length; i++){
        const currMarker = markers[i];

        // Add a marker to the map
        //-6.118654159779881, 106.8506897323242

        const marker = new google.maps.Marker({
            position: {lat: currMarker[1], lng:currMarker[2]},
            map,
            title: currMarker[0],
            icon: {
                url:currMarker[3],
                scaledSize: new google.maps.Size(currMarker[4], currMarker[5])
            },
            animation: google.maps.Animation.DROP
        });

        const infowindow = new google.maps.InfoWindow({
            content: currMarker[0],
        });

        marker.addListener("click", () => {
            infowindow.open(map,marker)
        });

    };

    const redUV = {
        loc1: {
            // -6.180700244468633, 106.82850450703134
            center: {lat:-6.180700244468633, lng:106.82850450703134},
            UV_index: 13,
        },

        loc2: {
            // -6.180700244468633, 106.82850450703134
            center: {lat:-6.118654159779881, lng:106.8506897323242},
            UV_index: 13,
        },
        loc3: {
            // -6.187011356493002, 106.81538384982944
            center: {lat:-6.187011356493002, lng:106.81538384982944},
            UV_index: 13,
        },
        loc4: {
            //-6.201328949741279, 106.7823215344597
            center: {lat:-6.201328949741279, lng:106.7823215344597},
            UV_index: 13,
        },

    };

    const blueUV = {

        loc1: {
            // -6.40387773548347, 106.79479057667056
            center: {lat:-6.40387773548347, lng:106.79479057667056},
            UV_index: 13,
        },

        loc2: {
            // -6.286156960264311, 106.71204979458764
            center: {lat:-6.286156960264311, lng:106.71204979458764},
            UV_index: 13,
        },


    };

    for (const city in redUV) {
    const circle = new google.maps.Circle({
        center: redUV[city].center,
        map,
        radius: 2000,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2
    });
    };

    const ORANGEcircle = new google.maps.Circle({
        //-6.137525720806574, 106.83120418117025
        center: {lat:-6.137525720806574, lng:106.83120418117025},
        map,
        radius: 5000,
        fillColor: '#FFA500',
        fillOpacity: 0.35,
        strokeColor: '#FFA500',
        strokeOpacity: 0.8,
        strokeWeight: 2
    });

    for (const city in blueUV) {
        const circle = new google.maps.Circle({
            center: blueUV[city].center,
            map,
            radius: 7000,
            fillColor: '#0000FF',
            fillOpacity: 0.55,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2
        });
        };
};
