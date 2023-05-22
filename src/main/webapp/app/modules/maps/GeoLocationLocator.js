import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardTitle, Container, Spinner } from 'reactstrap';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import MapTiles from 'app/modules/maps/MapTiles';
import { airIcon, drillIcon, explorationIcon, pipelineIcon, point } from 'app/modules/maps/icons';
const GeoLocationLocator = () => {
  const [data, setData] = useState({ loading: true, data: [] });
  const [me, setMe] = useState([9.0079232, 38.7678208]);
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
        <Spinner className="align-self-center" color="primary" style={{ height: '3rem', width: '3rem' }} type="grow">
          Loading...
        </Spinner>
      ) : (
        <div className="row p-4">
          {/*          <div className="col-12 col-md-2 pb-4">
            <div className="container border p-3 overflow-y-scroll">
              <h3>Users</h3>
              {
                data.data.map(user=>(
                  <Card className="p-3 m-2">
                    <CardTitle className="text-uppercase text-muted mb-0">
                      {user.fullName}
                    </CardTitle>
                    <span className="h6 font-weight-bold mb-0">{user.title}</span>
                  </Card>
                ))
              }

            </div>
          </div>*/}
          <div className="col-12 col-md-12">
            <div className="border p-3">
              <h3>Map</h3>
              <div>
                <MapContainer style={{ height: '75vh' }} center={me} zoom={13}>
                  <MapTiles />
                  {data.data.map(e => {
                    return (
                      <Marker key={e.id} position={e.location.split(',')} icon={getMarker(e.title)}>
                        <Popup>
                          <div className="card">
                            <div className="card-header text-center align-items-center mb-0 pt-0 pb-0">
                              <h5 className="card-title pb-0 mb-0">{e.fullName}</h5>
                            </div>
                            <div className="card-body">
                              <div className="row">{e.title}</div>
                              <div className="row">{e.type}</div>
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
/*
import React from "react"
import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup } from "react-leaflet"
import RoutingMachine from "./createRoutineMachineLayer"
import DoctorsIcon, { point } from "./icons"
import MapTiles from "./MapTiles"

const WhereIsThisPatient = ({ userInfo }) => {
  const [me, setMe] = useState(null)
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((e) => {
      setMe([e.coords.latitude, e.coords.longitude])
    })
  }, [])
  return (
    <div
      style={{
        height: "70vh",
        width: "100%",
        margin: "10px",
        border: "2px solid black",
      }}
    >
      {me && (
        <MapContainer style={{ height: "100%" }} center={me} zoom={20}>
          <MapTiles />
          <Marker
            position={[userInfo.lat, userInfo.lng]}
            icon={DoctorsIcon(userInfo.username)}
          >
            <Popup>{userInfo.name}</Popup>
          </Marker>
          <Marker position={me} icon={point}>
            <Popup>Your are here!</Popup>
          </Marker>
          <RoutingMachine me={me} patient={[userInfo.lat, userInfo.lng]} />
        </MapContainer>
      )}
    </div>
  )
}

export default WhereIsThisPatient
*/
