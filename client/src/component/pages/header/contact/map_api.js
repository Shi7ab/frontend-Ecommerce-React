import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const ContactMap = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://yourapi.com/contact-location') // Replace with your actual API URL
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch location');
        return res.json();
      })
      .then((data) => {
        setLocation({ lat: data.lat, lng: data.lng });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading map...</p>;
  if (error) return <p>Error loading map: {error}</p>;

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={14}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default ContactMap;
