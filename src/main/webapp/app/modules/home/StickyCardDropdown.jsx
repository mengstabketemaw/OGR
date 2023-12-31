import React, {useEffect, useRef, useState} from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faMoneyBill, faNewspaper, faPencil} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "app/config/store";
import {hasAnyAuthority} from "app/shared/auth/private-route";
import {AUTHORITIES} from "app/config/constants";
import axios from "axios";

const StickyCardDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
  };
}, []);


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const nav = useNavigate();
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const toggle = () => setDropdownOpen((prevState) => !prevState);



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
      nav("sequence/"+notification.source)
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
    <div className="sticky-card-dropdown"  ref={dropdownRef}>
      <div className="sticky-card-trigger  pulse" onClick={toggleDropdown}>
        <div className="d-flex pulse ">
          <FontAwesomeIcon color={"black"} icon={faBell}/>
          {unseenCount ? <>
            <span className="badge">{unseenCount}</span>
            <span className="pulse-ring"></span>
          </>:""}
        </div>
      </div>
      {isOpen && (
        <div className="sticky-card-dropdown-menu">
          <Card>
            <CardBody>
              <div style={{padding:"1rem"}} >
                {notifications.length === 0 ? <>
                  <div className="d-flex justify-content-center align-items-center w-100 h-100">
                    <p className="h4 text-muted">No new notification</p>
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
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StickyCardDropdown;
