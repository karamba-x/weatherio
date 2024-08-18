import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import { useSelector } from 'react-redux';

const iconHtml = ReactDOMServer.renderToString(
  <FaMapMarkerAlt style={{ color: 'teal', fontSize: '32px' }} />
);

const customIcon = L.divIcon({
  className: 'custom-icon',
  html: iconHtml,
  iconSize: [24, 24]
});

const MapComponent = () => {
  const { lat, lon, name, country } = useSelector(
    (state) => state.weather.data.location
  );

  return (
    <div style={{ height: '110%', width: '100%' }}>
      <MapContainer
        center={[lat, lon]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Marker position={[lat, lon]} icon={customIcon}>
          <Popup>
            {name}, {country}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
