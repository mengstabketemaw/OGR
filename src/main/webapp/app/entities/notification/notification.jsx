import React, {useEffect, useState} from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,

} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faMoneyBill, faNewspaper, faPencil} from "@fortawesome/free-solid-svg-icons";
import "./notification.css"
import axios from "axios";
import moment from "moment";
import {useAppSelector} from "app/config/store";
import {hasAnyAuthority} from "app/shared/auth/private-route";
import {AUTHORITIES} from "app/config/constants";
import {useNavigate} from "react-router-dom";
import { Translate } from "react-jhipster";
import { ShowAmendmentModal } from "app/modules/home/showAmendmentModal";
function NotificationComponent({menuOpen}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const nav = useNavigate();
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const [amendmentModal, setAmendmentModal] = useState({ id: -1, show: false, remark: '' });

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const showRemarkModal = (value, id) => {
    setAmendmentModal({ show: true, id, remark: value });
  };

  useEffect(()=>{
    axios.get("/api/notification/count")
      .then(({data})=>setUnseenCount(data))
      .catch(console.log)
  },[isAdmin])

  useEffect(()=>{
    axios.get("/api/notification")
      .then(({data})=>setNotifications(data))
      .catch(console.log)
  },[isAdmin])

  const getNotificationIcon = (type) => {
    switch (type){
      case "NEW_APPLICATION":return <FontAwesomeIcon icon={faNewspaper} color={"#1D65B7"}/>
      case "PAYMENT_IS_MADE":return <FontAwesomeIcon icon={faMoneyBill} color={"#469C4A"}/>
      case "AMENDMENT":return <FontAwesomeIcon icon={faPencil} color={"#A63C1B"}/>
      case "APPLICATION_UPDATE":return <FontAwesomeIcon icon={faNewspaper} color={"#EB6B09"}/>
    }
  }

  const getNotificationHandler = ({id, notification}) => {
    return e => {
      e.preventDefault();
      if(notification.type === "AMENDMENT"){
        showRemarkModal(notification.arg,notification.source)
      }
      else{
        nav("sequence/"+notification.source)
      }
      toggle();
      axios.put(`/api/notification/seen/${id}`)
        .then(()=>{
          setUnseenCount(prev=>prev - 1);
          setNotifications(prev=>prev.filter(detail => detail.id !== id));
        })
        .catch(console.log)
    }
  }

  if(!isAdmin)
    return <></>
  return (
    <div className="">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="start">
        <DropdownToggle tag="div" >
          <div role={"button"} className="position-relative">
            <span className="pulse">
              {unseenCount ? <>
                <span className="pulse-ring" style={{right:"-8px"}}></span>
              </>:""}
              <FontAwesomeIcon color={menuOpen ? 'black' : 'white'} className="pulse" icon={faBell} style={{marginTop:"5px", marginRight:"5px"}}/>
            </span>
            {unseenCount ? <>
              <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle" style={{fontSize:"50%", fontWeight:"lighter", lineHeight:"0.5"}}>{unseenCount}</span>
            </>:""}
          </div>
        </DropdownToggle>
        <DropdownMenu style={{width:"300px", marginTop:"50px"}}>
          <div style={{padding:"1rem"}} >
            {notifications.length === 0 ? <>
              <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <p className="h4 text-muted"><Translate contentKey={"error.noNotification"}>There is no new Notification</Translate></p>
              </div>
            </> : <>
              <div className="navi navi-hover" style={{height: "300px", overflowY: unseenCount > 4 ? "scroll" : "hidden"}}>
                {notifications.map(detail =>(
                  <a href="#" className="navi-item" onClick={getNotificationHandler(detail)}>
                    <div className="navi-link">
                      <div className="mr-3">
                        {getNotificationIcon(detail?.notification.type)}
                      </div>
                      <div className="navi-text">
                        <div className="font-weight-bold">{detail?.notification.message}</div>
                        <div className="text-muted">{moment(detail?.notification.dateTimeStamp).fromNow()}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>}
          </div>
        </DropdownMenu>
      </Dropdown>
      <ShowAmendmentModal
        id={amendmentModal.id}
        showModal={amendmentModal.show}
        content={amendmentModal.remark}
        handleClose={() => {
          setAmendmentModal({ id: -1, remark: '', show: false });
        }}
      />
    </div>
  );
}

export default NotificationComponent;
