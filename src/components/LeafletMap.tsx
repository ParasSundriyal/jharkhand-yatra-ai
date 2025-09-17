import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface TouristSpot {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  category: string;
}

interface LeafletMapProps {
  height?: string;
  center?: [number, number];
  zoom?: number;
  touristSpots?: TouristSpot[];
  onMapReady?: () => void;
}

// Component to handle map ready state and fit bounds
const MapReadyHandler: React.FC<{ 
  spots: TouristSpot[]; 
  onMapReady?: () => void; 
}> = ({ spots, onMapReady }) => {
  const map = useMap();

  useEffect(() => {
    if (onMapReady) {
      onMapReady();
    }
    
    // Fit bounds to show all markers
    if (spots.length > 0) {
      const bounds = L.latLngBounds(spots.map(spot => [spot.latitude, spot.longitude]));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, spots, onMapReady]);

  return null;
};

const LeafletMap: React.FC<LeafletMapProps> = ({
  height = "400px",
  center = [23.6102, 85.2799], // Jharkhand coordinates
  zoom = 8,
  touristSpots = [],
  onMapReady
}) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // Default tourist spots for Jharkhand
  const defaultSpots: TouristSpot[] = [
    {
      id: '1',
      name: 'Betla National Park',
      description: 'Famous wildlife sanctuary known for tigers, elephants, and diverse flora.',
      latitude: 23.8671,
      longitude: 84.1944,
      category: 'Wildlife'
    },
    {
      id: '2',
      name: 'Hundru Falls',
      description: 'Spectacular waterfall located near Ranchi, perfect for nature lovers.',
      latitude: 23.4232,
      longitude: 85.5847,
      category: 'Waterfall'
    },
    {
      id: '3',
      name: 'Netarhat',
      description: 'Hill station known as the "Queen of Chotanagpur" with beautiful sunrise views.',
      latitude: 23.4675,
      longitude: 84.2631,
      category: 'Hill Station'
    },
    {
      id: '4',
      name: 'Deoghar Temple',
      description: 'Sacred Jyotirlinga temple dedicated to Lord Shiva, major pilgrimage site.',
      latitude: 24.4844,
      longitude: 86.6997,
      category: 'Religious'
    },
    {
      id: '5',
      name: 'Hazaribagh National Park',
      description: 'Wildlife sanctuary famous for its natural beauty and diverse animal species.',
      latitude: 24.0067,
      longitude: 85.3647,
      category: 'Wildlife'
    }
  ];

  const spots = touristSpots.length > 0 ? touristSpots : defaultSpots;

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'wildlife': return '#10b981';
      case 'waterfall': return '#3b82f6';
      case 'hill station': return '#8b5cf6';
      case 'religious': return '#f59e0b';
      default: return '#ef4444';
    }
  };

  const createCustomIcon = (category: string) => {
    const color = getCategoryColor(category);
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };


  if (mapError) {
    return (
      <div className="w-full rounded-lg overflow-hidden shadow-lg border border-border bg-muted/50 flex items-center justify-center" style={{ height }}>
        <div className="text-center p-8">
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">Map Loading Error</h3>
          <p className="text-sm text-muted-foreground">{mapError}</p>
          <button 
            onClick={() => setMapError(null)} 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg border border-border">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapReadyHandler spots={spots} onMapReady={onMapReady} />
        
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.latitude, spot.longitude]}
            icon={createCustomIcon(spot.category)}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-lg text-foreground mb-2">{spot.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{spot.description}</p>
                <span 
                  className="inline-block px-2 py-1 text-xs rounded-full text-white font-medium"
                  style={{ backgroundColor: getCategoryColor(spot.category) }}
                >
                  {spot.category}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;