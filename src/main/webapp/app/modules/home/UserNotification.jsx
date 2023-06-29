import React, {useEffect, useState} from 'react'
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import {Translate} from "react-jhipster";
import Stages from "app/modules/home/stages";
import "../../entities/notification/notification.css"
import axios from "axios";
import moment from "moment/moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCircleCheck, faCircleInfo,
  faCircleRight, faCircleXmark, faExchangeAlt,
  faHeartCircleXmark, faInfo,
  faMoneyBill,
  faNewspaper,
  faPencil
} from "@fortawesome/free-solid-svg-icons";

const UserNotification = ({showModal = a=>a, showRemark = a=>a }) => {
  const [tab, setTab] = useState('activities')
  const [unseenCount, setUnseenCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(()=>{
    axios.get("/api/notification/count")
      .then(({data})=>setUnseenCount(data))
      .catch(console.log)
  },[])

  useEffect(()=>{
    axios.get("/api/notification")
      .then(({data})=>setNotifications(data))
      .catch(console.log)
  },[])
  const getNotificationIcon = (type) => {
    switch (type) {
      case "LICENCE_APPROVED":return <FontAwesomeIcon icon={faCircleCheck} size={"1x"} color={"#23c91b"}/>
      case "LICENCE_DECLINED":return <FontAwesomeIcon icon={faCircleXmark} size={"1x"} color={"#c92323"}/>
      case "APPLICATION_STATUS_CHANGE":return <FontAwesomeIcon icon={faExchangeAlt} size={"1x"} color={"#ff9900"}/>
      case "MORE_INFO":return <FontAwesomeIcon icon={faCircleInfo} size={"1x"} color={"#32567F"}/>
    }
  }

  const getNotificationHandler = ({id, notification}) => {
    return e => {
      e.preventDefault();
      axios.put(`/api/notification/seen/${id}`)
        .then(()=>{
          setUnseenCount(prev=>prev - 1);
          setNotifications(prev=>prev.filter(detail => detail.id !== id));
          if(notification.type === "MORE_INFO")
            showRemark(notification.arg)
          else
            showModal({show: true, id:notification.source})
        })
        .catch(console.log)
    }
  }

  const getNotificationMessage = (notification) => {
    switch (notification.type) {
      case "PAYMENT_REQUEST":
      case "LICENCE_DECLINED":
      case "LICENCE_APPROVED":
      case "MORE_INFO":
      case "APPLICATION_STATUS_CHANGE":
        return notification.message

    }
  }
  return (
    <Col className="order-xl-1 mb-5 mb-xl-0 mt-xl--6  col-sm-6 col-12" xl="3">
      <Card className="card-profile shadow">
        <CardHeader className="text-left border-0 pt-8 pt-md-4 pb-0">
          <div className="d-flex">
            <p className={`${tab==='activities' ? 'bg-success text-white' : 'text-muted'} rounded p-2 mr-3`} style={{cursor: 'pointer'}} onClick={()=>setTab('activities')}> <Translate contentKey={'userDashboard.myactivities'} /> </p>
            <p className={`${tab==='notification' ? 'bg-success text-white' : 'text-muted'} rounded p-2`} style={{cursor: 'pointer'}} onClick={()=>setTab('notification')}>
              <Translate contentKey={'error.notification'} />
              {unseenCount ? <>
                <span className="badge text-danger">{unseenCount}</span>
              </>:""}
            </p>
          </div>

        </CardHeader>
        <CardBody className="pt-0 pt-md-4">
          {tab === 'activities' ? <Stages/> :
          <>
            {notifications.length === 0 ? <>
              <div className="d-flex justify-content-center align-items-center" style={{overflowY: "hidden", height:"600px"}}>
                <p className="text-muted" style={{fontSize: "14px"}}> <Translate contentKey={"error.noNotification"}>There is no new Notification</Translate></p>
              </div>
            </> : <>
              <div className="navi navi-hover pl-0 pr-0" style={{height: "600px", overflowY: unseenCount > 8 ? "scroll" : "hidden"}}>
                {notifications.map(detail =>(
                  <a href="#" className="navi-item" onClick={getNotificationHandler(detail)}>
                    <div className="navi-link pl-3" style={{fontSize: "14px"}}>
                      <div className="mr-3">
                        {getNotificationIcon(detail?.notification.type)}
                      </div>
                      <div className="navi-text">
                        <div className="" style={{fontSize: "14px"}}>{getNotificationMessage(detail?.notification)}</div>
                        <div className="text-muted" style={{fontSize: "12px"}}  >{moment(detail?.notification.dateTimeStamp).fromNow()}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>}
          </>
          }
        </CardBody>
      </Card>
    </Col>
  )
}

export default  UserNotification;
