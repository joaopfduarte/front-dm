import { useState, useEffect, useRef, useCallback } from 'react';
import { Typography, Card, List, Avatar, Spin, Row, Col, Button } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import { animalService } from '../../services';
import type { AnimalLocation } from '../../services';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './AnimalsMap.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { toast } from 'sonner';

const { Title, Text } = Typography;

const defaultIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const sendError = (message: string, toastId: number) => {
  toast.error(`${message}`, {
    style: {
      background: '#8B0000',
      color: '#fff'
    },
    id: toastId,
  });
}

const errorLocation = (err: any) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  sendError("Ocorreu um erro ao obter localização.Verifique as permissões", -1)
}

function AnimalsMap() {
  const [locations, setLocations] = useState<AnimalLocation[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  
  const isFetchingRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  const getUserLocation = () => {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPos: [number, number] = [latitude, longitude];
        setUserPos(newPos);
        if (mapRef.current) {
          mapRef.current.flyTo(newPos, 5, { duration: 0.1 });
        }
      },
      errorLocation,
      options
    );
  };

  const fetchLocations = useCallback(async (currentOffset: number) => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const data = await animalService.getLocations(currentOffset);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setLocations((prev) => {
          const newItems = data.filter((d) => !prev.some((p) => p.id === d.id));
          return [...prev, ...newItems];
        });
        setOffset(currentOffset + 1);
      }
    } catch (err) {
      console.error('Erro ao buscar localizações:', err);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations(0);
  }, [fetchLocations]);

  const handleScroll = () => {
    if (!listRef.current || hasMore === false || loading) return;

    const { scrollTop, clientHeight, scrollHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchLocations(offset);
    }
  };

  const centerLat: number =
    locations.length > 0 ? -Math.abs(locations[0].location.latitude) : -14.235;
  const centerLng: number =
    locations.length > 0 ? locations[0].location.longitude : -51.925;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: 24 }}>
        Localização dos Animais
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <Card title={<Title level={4} style={{ margin: 0, textAlign: 'center' }}>Lista de Animais</Title>}>
            <div
              ref={listRef}
              onScroll={handleScroll}
              style={{ maxHeight: 400, overflowY: 'auto', scrollbarWidth: 'thin' }}
            >
              <List
                dataSource={locations}
                loading={loading && locations.length === 0}
                renderItem={(animal: any) => (
                  <List.Item key={animal.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={animal.imageUrl}
                          size={56}
                          style={{ border: '2px solid #4A5D23' }}
                        />
                      }
                      title={<Text strong>{animal.name}</Text>}
                      description={
                        <Text
                          type="secondary"
                          ellipsis={{ rows: 2 } as any}
                          style={{ fontSize: '0.9rem' }}
                        >
                          {animal.locationDescription}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
              {loading && locations.length > 0 && (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <Spin />
                  <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                    Carregando mais animais...🌿
                  </Text>
                </div>
              )}
            </div>
          </Card>
        </Col>

        {/* Map panel */}
        <Col xs={24} lg={14}>
          <div className="map-view-container">
            <MapContainer
              center={[centerLat, centerLng] as [number, number]}
              zoom={5}
              scrollWheelZoom={false}
              className="leaflet-container"
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {locations.map((animal) => (
                <Marker
                  key={`marker-${animal.id}`}
                  position={
                    [animal.location.latitude, animal.location.longitude] as [number, number]
                  }
                  icon={defaultIcon}
                >
                  <Popup>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src={animal.imageUrl}
                        alt={animal.name}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 8,
                          objectFit: 'cover',
                          marginBottom: 8,
                        }}
                      />
                      <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: 4 }}>
                        {animal.name}
                      </strong>
                      <span style={{ color: '#7A6A5E', fontSize: '0.9rem' }}>
                        {animal.locationDescription}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {userPos && (
                <CircleMarker
                  center={userPos}
                  radius={10}
                  pathOptions={{
                    color: '#fff',
                    fillColor: '#a20d08ff',
                    fillOpacity: 1
                  }}
                >
                  <Popup>Você está aqui!</Popup>
                </CircleMarker>
              )}
            </MapContainer>
          </div>
          <Button
            type="primary"
            icon={<AimOutlined />}
            size="medium"
            onClick={getUserLocation}
            block
            style={{
              marginTop: 16,
              background: '#4A5D23',
              borderColor: '#4A5D23',
              fontWeight: 600,
            }}
          >
            MInha localização
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default AnimalsMap;
