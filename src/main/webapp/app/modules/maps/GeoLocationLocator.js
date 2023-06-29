import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardTitle, Container, Spinner } from 'reactstrap';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import MapTiles from 'app/modules/maps/MapTiles';
import { airIcon, drillIcon, explorationIcon, pipelineIcon, point } from 'app/modules/maps/icons';
import { Translate } from 'react-jhipster';
const GeoLocationLocator = () => {
  const [data, setData] = useState({ loading: true, data: [] });
  const [me, setMe] = useState([-11.2027, 17.8739]);
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(e => {
      setMe([e.coords.latitude, e.coords.longitude]);
    });
  }, []);

  console.log(me);

  useEffect(() => {
    axios
      .get('/api/licence/location')
      .then(({ data }) => setData({ loading: false, data }))
      .catch(console.log);
  }, []);

  const getMarker = title => {
    switch (title) {
      case 'Exploration licence':
        return explorationIcon;
      case 'Air Permit':
        return airIcon;
      case 'Drilling Permit':
        return drillIcon;
      case 'Pipeline Licence':
        return pipelineIcon;
      default:
        return point;
    }
  };

  return (
    <>
      {data.loading ? (
        <div className="d-flex justify-content-center">
          <Spinner className="align-self-center" color="primary" style={{ height: '3rem', width: '3rem' }} type="grow">
            Loading...
          </Spinner>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="border p-3">
              <h3>
                <Translate contentKey={'map.report'} />
              </h3>
              <div>
                <MapContainer style={{ height: '75vh' }} center={me} zoom={6}>
                  <MapTiles />
                  {data.data.map(e => {
                    return (
                      <Marker key={e.id} position={e.location.split(',')} icon={getMarker(e.title)}>
                        <Popup>
                          <div className="card">
                            <div className="card-header text-center align-items-center mb-0 pt-0 pb-0">
                              <Link to={`/admin/user-management/${e.login}`}>
                                <h5 className="card-title pb-0 mb-0">{e.fullName}</h5>
                              </Link>
                            </div>
                            <div className="card-body">
                              <div className="row">{e.title}</div>
                              {/*<div className="row">{e.type}</div>*/}
                              <Link to={`/compliance`}>
                                <Translate contentKey={'compliance.compliance'} />
                              </Link>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeoLocationLocator;
