import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css';

const mapIcon = new Icon({
    iconUrl: "/images/map_marker_icon.png",
    iconSize: [30, 30],
});

function ChangeView({ center, zoom }: any) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

const MapView = () => {
    const [position, setPosition] = useState([53.5344, -113.45326])
    const [activePark, setActivePark] = useState(null);
    // [53.526822, -113.4909855]

    useEffect(() => {
        setPosition([53.5232, -113.5263])
    }, []);

    return (

        <MapContainer center={position} zoom={13} style={{ height: '350px', width: '96%', marginLeft: 20, marginRight: 0 }}>
            <ChangeView center={position} zoom={13} />
            <TileLayer
                attribution="" // Empty attribution to hide the marketing text
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                key={0}
                position={position}
                onClick={() => {
                    // setActivePark(data);
                }}
                icon={mapIcon}
            >
                <Popup>
                    <strong>University Of Alberta</strong><br />
                    Department of Computing Science<br />
                    Address: Athabasca hall<br />
                </Popup>

            </Marker>

        </MapContainer>

    );
};

export default MapView;