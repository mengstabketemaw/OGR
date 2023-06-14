import './landing.css';
import React, {useEffect, useState} from 'react';
import Header from 'app/shared/layout/header/header';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import refineryImage from './assets/refinery2.jpg';
import individualIcon from './assets/individual.png';
import businessIcon from './assets/businessIcon.png';
import {MDBCarousel, MDBCarouselItem} from "mdb-react-ui-kit";
import {Button, Col} from "reactstrap";
import news1 from './assets/news1.jpg'
import news2 from './assets/news2.jpg'
import news3 from './assets/news3.jpg'
import scheduleImage from './assets/schedule.jpg';
import cisp from "./assets/cisp.jpg";
import budget from "./assets/budget.png";
import calendar from "./assets/calendar.svg"
import gfs from  "./assets/gfs.png"
import chamber from "./assets/chamber.jpg"
import canida from "./assets/canida.jpg"
import ambiente from "./assets/ambiente.png"
import govServices from "./assets/govServices.png"
import newService from "./assets/newService.png"
import {Translate} from "react-jhipster";
import {toast} from "react-toastify";



const Landing = (props) => {
  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);
  const business = "Business Services";
  const [activeDropdown, setActiveDropdown] = useState('');
  const [showServices,setShowServices]= useState(false);

  const toggleDropdown = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? '' : dropdownId);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check initial window width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        currentLocale={currentLocale}
        ribbonEnv={ribbonEnv}
        isInProduction={isInProduction}
        isOpenAPIEnabled={isOpenAPIEnabled}
      />
      <>
        {/*
 Page saved with SingleFile
 url: http://127.0.0.1:5500/Ministry%20of%20Finance%20-%20Home%20Page.html
 saved date: Tue May 09 2023 15:24:34 GMT+0300 (East Africa Time)
*/}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta
          property="og:image"
          content="/_layouts/15/MOFInternet/images/ar/heder_logoshare.png"
        />
        <title>Oil &amp; Gas Regulation and Licensing - Home Page</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.7, maximum-scale=1.0, user-scalable=yes"
        />
        <meta
          name="description"
          content="Oil and Gas Regulation and Licencing body of Angola"
        />
        <link
          rel="shortcut icon"
          href="data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8B////Af///wH///8B////Af///wFdZxYLYGwaNWFuG0ldZxcR////Af///wH///8B////Af///wH///8B////Af///wFfahgHYGoYLWFtGj9fahlJYWwbPWh7IyVqgSZRYnAda15nFx1faRgtX2oYJf///wH///8B////Af///wH///8BXmcWG2NyHTtqgiZFaYAjbWqCJHVqgCNJbIUiF2uEI21meCJjaHwjLWR0Hk1eaBcd////Af///wH///8B////AV1mFidmeCNHaoElNW6IITFwlCRfcJYmg2+UJFlwkyNXbYcjaWuEJhlofiNnXmcXOf///wH///8BXmkXBV9qGDtldh9va4QkZ22LIl9xnCh3drQwT3e8MzV2uzFPdbMxWXGZJnVuiSAza4QkZ2JuHFVdZhYZX2kYBV9qGDVneyNRbIUmPW6LIDlynidndLkyS16IFhVcgRID////AWKSGxd2uDJZcZolZ2yJI2VofSQ3ZHQePWBqGClfahgpZ3khK2qBI0FvjyRvdbYxZf///wFEQwAVRkkAhUVHAHn///8BaJ4gD3WxMHlujCJha4MlE2h+JFNfahk5XWYWBWJvHU9shiR/cp0nbXS3MDX///8BR0oACU1aAENOWwA7RUQAC////wF2uzBZcZUkS22II1Fjch5xXWYWC15nFxlldiB9boojPXGYJVV1ujFT////AUZHAA1NWgBzTVkAZf///wH///8BdbcxRXCXJW9rgiR5YWwbQf///wFgbBpFaoEmR2qCIxtvkCNndLIwaf///wFLVQEFREMA70NBAM3///8BcrktE3KpLHNuiyNhaoAkMWV3IDFfaRglYGsZL2V1HzVofSVFbYsiY3GcJV91uDFdZ54hC////wH///8BaqclD3S2Ml9xmCRjbYkhN2uFJ0FmeCFVX2kYKV9pFwVdZhYbY3EeX2yGJF1uiiA5cJond3WxL1l2uzFHd7szM3StLV9vliVvbYoiX2qCJG1kdB5pXmkYLf///wH///8B////AV9qGEdqgCVdaoIlH22JI2twlCNNcJMlZXCWJn9wkiNbbYYhLWqBJjFldSBHXGQVHf///wH///8B////Af///wFeaBcnZXYgTWd7Iy9meSJrbIUkaWuDIhVqgCNPaoEjd2mAJGlqgCVBYm8cPV5nFhH///8B////Af///wH///8BX2oYBV9pGClfaRgnXmcXIWRzHm1qgidDZnkiK2BrGjlfaxlDYW0aO19qGCX///8B////Af///wH///8B////Af///wH///8B////Af///wFeaBYXYm4bT19rGTFeZxYF////Af///wH///8B////Af///wH///8BAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w=="
        />
        <link
          rel="canonical"
          href="#"
        />
        <meta
          httpEquiv="content-security-policy"
          content="default-src 'none'; font-src 'self' data:; img-src 'self' data:; style-src 'unsafe-inline'; media-src 'self' data:; script-src 'unsafe-inline' data:; object-src 'self' data:; frame-src 'self' data:;"
        />
        <form method=""  id="aspnetForm">
          <div className="aspNetHidden"></div>
          <div className="aspNetHidden"></div>
          <div id="DeltaPageStatusBar">
            <div id="ctl00_MSO_ContentDiv">
              <a name="mainContent" />
              <div
                id="my-slide"
                style={{
                  position: "relative",
                  visibility: "visible",
                  width: "auto",
                  height: "auto"
                }}
              >
                <div
                  className="inner devrama-slider "
                  style={{
                    position: "relative",
                    margin: "0px auto",
                    height: "65vh",
                    zIndex: 1
                  }}
                >

                  <div
                    className="projector"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      display: "inline-block",
                      zIndex: 10,
                      backgroundImage: `url(${refineryImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'repeat',
                      width: '100%',
                      height: '121%',
                      animation: 'growShrink 15s ease-in-out infinite',
                    }}
                  >
                      <div
                      className="background-overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(45, 206, 170, 0.3)",
                        content: "",
                        opacity: 1
                      }}
                    ></div>
                    <div
                      className="text-overlay"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: isMobile ? "center" : "left",
                        color: "white",
                        width: "60%"
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "2.5vw",
                          fontWeight: "bold",
                          marginBottom: "1rem",
                          display: isMobile ? "block" : "none",
                          color: "white",
                        }}
                      >
                        <Translate contentKey={'landing.empower'}/>
                      </h1>
                      {!isMobile && (
                        <>
                          <h1
                            style={{
                              fontSize: "2.2vw",
                              fontWeight: "bold",
                              marginBottom: "1rem",
                              display: "block",
                              color: "white",
                            }}
                          >

                            <Translate contentKey={'landing.empower'}/>
                          </h1>
                          <h1
                            style={{
                              fontSize: "1.2vw",
                              fontWeight: "bold",
                              marginBottom: "1rem",
                              color: "white",
                            }}
                          >
                            <Translate contentKey={'landing.elevate'}/>
                          </h1>
                          <h2
                            style={{
                              fontSize: "1vw",
                              fontWeight: "bold",
                              marginBottom: "1.5rem",
                              color: "white",
                            }}
                          >
                            <Translate contentKey={'landing.regulatory'}/>
                          </h2>
                        </>
                      )}
                    </div>


                  </div>
                </div>
              </div>
              <span className="clr"  />
              <div className="services mt-0 mt-md-8 w-150" style={{ zIndex: 15 }} >
                <ul className="srv_ul" id="servicesSection" onMouseEnter={()=>{setShowServices(true)}}  onMouseLeave={()=>{setShowServices(false)}}>
                  <li>
                  <span className={"pb-3"}  >
                    <img src={individualIcon} alt="License Services" /> <Translate contentKey={'landing.licences'}/>
                  </span>
                    <div id="services21" className={showServices  ? 'active d-flex justify-content-center  form-group flex-column ' : 'd-none'}>
                      <a href={(props.isAdmin ? '/formData' : '/permit') + '?name=Exploration Licence&pageKey=1'}  className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey="licence.types.exploration" />
                      </a>
                      <a href={(props.isAdmin ? '/formData' : '/permit') + '?name=PipeLine Licence&pageKey=2'}  className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey="licence.types.pipeline" />
                      </a>
                      <a href="#" title="Recruitment" className=" form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey="licence.types.storage" />
                      </a>
                      <a href="#"  className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey="licence.types.transportation" />
                      </a>
                      <a href="#" title="More ..." className="sf-hiden   form-control bg-transparent text-white border-0 border-none text-left pl-5 ">
                        <Translate contentKey={'landing.more'}/>
                      </a>
                    </div>
                  </li>
                  <li>
          <span className={"pb-3"} >
            <img src={individualIcon} alt="Permit Services" />  <Translate contentKey={'landing.permits'}/>
          </span>
                    <div id="services21" className={showServices  ? 'active d-flex justify-content-center  form-group flex-column ' : 'd-none'}>
                      <a href={(props.isAdmin ? '/formData' : '/permit') + '?name=Drilling Permit &pageKey=4'}  className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey="permit.types.drilling" />
                      </a>
                      <a href={(props.isAdmin ? '/formData' : '/permit') + '?name=Air Emission Permit &pageKey=3'} className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey="permit.types.air" />
                      </a>
                      <a href="#"  className=" form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey="permit.types.production" />
                      </a>
                      <a href="#"  className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey="permit.types.transport" />
                      </a>
                      <a href="#" title="More ..." className="sf-hiden   form-control bg-transparent text-white border-0 border-none text-left pl-5 ">
                        <Translate contentKey={'landing.more'}/>
                      </a>
                    </div>
                  </li>
                  <li>
          <span className={"pb-3"} >
            <img src={govServices} alt="Government Services" />  <Translate contentKey={'landing.government'}/>
          </span>
                    <div id="services21" className={showServices  ? 'active d-flex justify-content-center  form-group flex-column ' : 'd-none'}>
                      <a href="https://www.cisp.gov.ao:10443/" target="_blank"  className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey={'landing.commision'}/>
                      </a>
                      <a href="https://www.sme.gov.ao/" target="_blank"  className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey={'landing.foreign'}/>
                      </a>
                      <a href="https://mirex.gov.ao/PortalMIREX/#!/rede-diplomatica/mapa-da-rede-diplomatica/embaixadas" target="_blank" className=" form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey={'landing.diplomatic'}/>
                      </a>
                      <a href="#" target="_blank" className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        <Translate contentKey={'landing.followUp'}/>
                      </a>
                      <a href="#" target="_blank" title="More ..." className="sf-hiden   form-control bg-transparent text-white border-0 border-none text-left pl-5 ">
                        <Translate contentKey={'landing.more'}/>
                      </a>
                    </div>
                  </li>
                  <li>
          <span className={"pb-3"}>
            <img src={newService} alt="New Services" />  <Translate contentKey={'landing.announce'}/>
          </span>
                    <div id="services21" className={showServices  ? 'active d-flex justify-content-center  form-group flex-column ' : 'd-none'}>
                      <a href="#" title="Individuals Portal" className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        Individuals Portal
                      </a>
                      <a href="#" title="Payment Orders Inquiry" className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        Payment Orders Inquiry
                      </a>
                      <a href="#" title="Recruitment" className=" form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        Recruitment
                      </a>
                      <a href="#" title="Follow-up transactions" className="sf-hiden  form-control bg-transparent text-white border-0 border-none text-left pl-5">
                        Follow-up transactions
                      </a>
                      <a href="#" title="More ..." className="sf-hiden   form-control bg-transparent text-white border-0 border-none text-left pl-5 ">
                        <Translate contentKey={'landing.more'}/>
                      </a>
                    </div>
                  </li>
                </ul>
                <span className="clr" />
              </div>
              <span className="clr" style={{backgroundColor: "#007467"}} />
              <div style={{ display: "none" }} className="container"></div>
              <span className="clr" style={{ marginTop : "50px",marginBottom : "50px" }} />
              <div className="newsbar block animatedParent animateOnce h-200">
                <div className="news hblock animated fadeInUp go h-100">
                  <div className="titl h1 font-weight-light">
                    <a
                      className="fixedTip text-success"
                      href="#"
                      title="View news archive"
                    >

                      <Translate contentKey={'landing.news'}/>
                      <span />
                    </a>
                    <span className="clr" />
                  </div>
                  <span className="clr" />
                  <Col md={"12"} className={"w-200 h-200 mb-2"}>
                    <MDBCarousel showControls showIndicators className={"h-100 w-100"}>
                      <MDBCarouselItem
                        className='w-100 h-100 d-block'
                        itemId={1}
                        src={news1}
                        alt='...'
                      >
                        <h5 className={"text-white h-100 w-100"}> <Translate contentKey={'landing.news1.h5'}/> </h5>
                        <p className={"text-responsive h-100 w-100"}>  <Translate contentKey={'landing.news1.p'}/> </p>
                      </MDBCarouselItem>
                      <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={2}
                        src={news2}
                        alt='...'
                      >
                        <h5 className={"text-white h-100 w-100"}> <Translate contentKey={'landing.news2.h5'}/> </h5>
                        <p className={"text-responsive h-100 w-100"}>  <Translate contentKey={'landing.news2.p'}/> </p>
                      </MDBCarouselItem>
                      <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={news3}
                        alt='...'
                      >
                        <h5 className={"text-white h-100 w-100"}> <Translate contentKey={'landing.news3.h5'}/> </h5>
                        <p className={"text-responsive h-100 w-100"}>  <Translate contentKey={'landing.news3.p'}/> </p>
                      </MDBCarouselItem>
                    </MDBCarousel>
                  </Col>
                </div>

                <div className="nb_left animated fadeInUp go">
                  <div className="informatic hblock">
                    <div className="titl h1 font-weight-light">
                      <a className="fixedTip text-success"  title="View All">
                        <Translate contentKey={'landing.info'}/>
                        <span />
                      </a>
                      <span className="clr" />
                    </div>
                    <span className="clr" />
                    <div className="info_slider slick-initialized slick-slider">
                      <div aria-live="polite" className="slick-list draggable">
                        <div
                          className="slick-track"
                          style={{ opacity: 1, width: 589 }}
                          role="listbox"
                        >
                          <div
                            className="slick-slide slick-current slick-active"
                            data-slick-index={0}
                            aria-hidden="false"
                            style={{
                              width: 589,
                              position: "relative",
                              left: 0,
                              top: 0,
                              zIndex: 999,
                              opacity: 1
                            }}
                            tabIndex={-1}
                            role="option"
                            aria-describedby="slick-slide10"
                          >
                            <a
                              title="View Budget Statement Fiscal Year 2022"
                              href="#"
                              tabIndex={0}
                            >
                              <img
                                src={cisp}
                                alt="statImage of Budget Statement Fiscal Year 2022"
                              />
                              <span style={{ display: "none" }}>linktext</span>
                            </a>
                            <a
                              title="View 2020 Monthly Payroll Schedule"
                              href="#"
                              tabIndex={0}
                            >
                              <img
                                src={scheduleImage}
                                alt="statImage of 2020 Monthly Payroll Schedule"
                              />
                              <span style={{ display: "none" }}>linktext</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="clr" />
                  <div className="elan hblock">
                    <div className="titl h2 font-weight-light">
                      <a
                        className="fixedTip text-success"
                        href="#"
                        title="Review all announcements and circulars"
                      >
                        <Translate contentKey={'landing.circulars'}/>
                        <span />
                      </a>
                      <span className="clr" />
                    </div>
                    <span className="clr" />
                    <div
                      className="elan_slider slick-initialized slick-slider slick-dotted slick-vertical"
                      role="toolbar"
                    >
                      <div
                        aria-live="polite"
                        className="slick-list draggable"
                        style={{ height: "145.594px" }}
                      >
                        <div
                          className="slick-track"
                          style={{
                            opacity: 1,
                            height: 801,
                            transform: "translate3d(0px,-291px,0px)"
                          }}
                          role="listbox"
                        >


                          <div
                            className="slick-slide slick-current slick-active"
                            data-slick-index={3}
                            aria-hidden="false"
                            style={{ width: 589 }}
                            tabIndex={-1}
                            role="option"
                            aria-describedby="slick-slide41"
                          >
                            <a
                              href="#"
                              title="View The State Properties General Authority Holds an Auction for Selling (84) Residential and Commercial Plots of Land in the Northern Neighborhoods of Riyadh"
                              tabIndex={0}
                            >
                              {" "}
                              <span className="elanTitle">
                          The State Properties General Authority Holds an
                          Auction for Selling (84) Residential and Commercial
                          Plots of Land in the Northern Neighborhoods of Riyadh
                        </span>{" "}
                              <span>
                          <img
                            src=""
                            alt=""
                          />{" "}
                                31 March 2015{" "}
                        </span>{" "}
                            </a>
                          </div>
                          <div
                            className="slick-slide slick-current "
                            data-slick-index={4}
                            aria-hidden="true"
                            style={{ width: 589 }}
                            tabIndex={-1}
                            role="option"
                            aria-describedby="slick-slide42"
                          >
                            <a
                              href="#"
                              title="View The Ministry of Finance announces selling various types and models of returned used vehicles"
                              tabIndex={-1}
                            >
                              {" "}
                              <span className="elanTitle">
                          The Ministry of Finance announces selling various
                          types and models of returned used vehicles
                        </span>{" "}
                              <span>
                          <img
                            src=""
                            alt=""
                          />{" "}
                                09 May 2011{" "}
                        </span>{" "}
                            </a>
                          </div>
                          <div
                            className="slick-slide slick-active"
                            data-slick-index={5}
                            aria-hidden="true"
                            style={{ width: 589 }}
                            tabIndex={-1}
                            role="option"
                            aria-describedby="slick-slide42"
                          >
                            <a
                              href="#"
                              title="View Pre-qualification for the Unified Government Resource Planning Project "
                              tabIndex={-1}
                            >
                              {" "}
                              <span className="elanTitle">
                          Pre-qualification for the Unified Government Resource
                          Planning Project{" "}
                        </span>{" "}
                              <span>
                          <img
                            src=""
                            alt=""
                          />{" "}
                        </span>{" "}
                            </a>
                          </div>
                          <div
                            className="slick-slide"
                            data-slick-index={6}
                            aria-hidden="true"
                            style={{ width: 589 }}
                            tabIndex={-1}
                            role="option"
                            aria-describedby="slick-slide43"
                          >
                            <a
                              href="#"
                              title="View Request for information for pre-qualification of Managed Services Project for IT Unified Operation "
                              tabIndex={-1}
                            >
                              {" "}
                              <span className="elanTitle">
                          Request for information for pre-qualification of
                          Managed Services Project for IT Unified Operation{" "}
                        </span>{" "}
                              <span>
                          <img
                            src=""
                            alt=""
                          />{" "}
                        </span>{" "}
                            </a>
                          </div>
                          <div
                            className="slick-slide slick-cloned"
                            data-slick-index={7}
                            aria-hidden="true"
                            style={{ width: 589 }}
                            tabIndex={-1}
                          >
                            <a
                              href="#"
                              tabIndex={-1}
                            >
                              {" "}
                              <span className="elanTitle">
                         <Translate contentKey={'landing.lease'}/>
                                {" "}
                        </span>{" "}
                              <span>
                          <img
                            src="./assets/gfs.png"
                            alt=""
                          />{" "}
                                08 May 2011{" "}
                        </span>{" "}
                            </a>
                          </div>
                          <div
                            className="slick-slide slick-cloned"
                            data-slick-index={8}
                            aria-hidden="true"
                            style={{ width: 589 }}
                            tabIndex={-1}
                          >
                            <a
                              href="#"
                              tabIndex={-1}
                            >
                              {" "}
                              <span className="elanTitle">
                         <Translate contentKey={'landing.request'}/>
                        </span>{" "}
                              <span>
                          <img
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE3IiB2aWV3Qm94PSIwIDAgMTUgMTciPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICM5ODk4OTk7CiAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkOwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8cGF0aCBkPSJNMTQuNzM3LDE2Ljk5NyBMMC4yNjksMTYuOTk3IEMwLjEyMSwxNi45OTcgMC4wMDEsMTYuODcwIDAuMDAxLDE2LjcxMyBMMC4wMDEsNC41MzQgTDAuMDAxLDEuNDE4IEMwLjAwMSwxLjI2MSAwLjEyMSwxLjEzNSAwLjI2OSwxLjEzNSBMMi4xNDQsMS4xMzUgTDIuMTQ0LDAuMjg1IEMyLjE0NCwwLjEyOCAyLjI2NCwwLjAwMiAyLjQxMiwwLjAwMiBMNC4yODgsMC4wMDIgQzQuNDM2LDAuMDAyIDQuNTU2LDAuMTI4IDQuNTU2LDAuMjg1IEw0LjU1NiwxLjEzNSBMMTAuNDUwLDEuMTM1IEwxMC40NTAsMC4yODUgQzEwLjQ1MCwwLjEyOCAxMC41NzAsMC4wMDIgMTAuNzE4LDAuMDAyIEwxMi41OTQsMC4wMDIgQzEyLjc0MiwwLjAwMiAxMi44NjEsMC4xMjggMTIuODYxLDAuMjg1IEwxMi44NjEsMS4xMzUgTDE0LjczNywxLjEzNSBDMTQuODg1LDEuMTM1IDE1LjAwNSwxLjI2MSAxNS4wMDUsMS40MTggTDE1LjAwNSw0LjUzNCBMMTUuMDA1LDE2LjcxMyBDMTUuMDA1LDE2Ljg3MCAxNC44ODUsMTYuOTk3IDE0LjczNywxNi45OTcgWk00LjAyMCwxLjQxOCBMNC4wMjAsMC41NjggTDIuNjgwLDAuNTY4IEwyLjY4MCwxLjQxOCBMMi42ODAsMi4yNjggTDQuMDIwLDIuMjY4IEw0LjAyMCwxLjQxOCBaTTEyLjMyNiwxLjQxOCBMMTIuMzI2LDAuNTY4IEwxMC45ODYsMC41NjggTDEwLjk4NiwxLjQxOCBMMTAuOTg2LDIuMjY4IEwxMi4zMjYsMi4yNjggTDEyLjMyNiwxLjQxOCBaTTE0LjQ2OSwxLjcwMSBMMTIuODYxLDEuNzAxIEwxMi44NjEsMi41NTEgQzEyLjg2MSwyLjcwOCAxMi43NDIsMi44MzQgMTIuNTk0LDIuODM0IEwxMC43MTgsMi44MzQgQzEwLjU3MCwyLjgzNCAxMC40NTAsMi43MDggMTAuNDUwLDIuNTUxIEwxMC40NTAsMS43MDEgTDQuNTU2LDEuNzAxIEw0LjU1NiwyLjU1MSBDNC41NTYsMi43MDggNC40MzYsMi44MzQgNC4yODgsMi44MzQgTDIuNDEyLDIuODM0IEMyLjI2NCwyLjgzNCAyLjE0NCwyLjcwOCAyLjE0NCwyLjU1MSBMMi4xNDQsMS43MDEgTDAuNTM3LDEuNzAxIEwwLjUzNyw0LjI1MSBMMTQuNDY5LDQuMjUxIEwxNC40NjksMS43MDEgWk0xNC40NjksNC44MTcgTDAuNTM3LDQuODE3IEwwLjUzNywxNi40MzAgTDE0LjQ2OSwxNi40MzAgTDE0LjQ2OSw0LjgxNyBaTTUuMzYwLDguMDYxIEw3LjIzNSw4LjA2MSBMNy43NzEsOC4wNjEgTDkuNjQ2LDguMDYxIEwxMC4xODIsOC4wNjEgTDEyLjU5NCw4LjA2MSBMMTIuNTk0LDEwLjYxMSBMMTIuNTk0LDExLjE3NyBMMTIuNTk0LDEzLjE2MCBMMTIuNTk0LDEzLjcyNiBMMTIuMDU4LDEzLjcyNiBMMTAuMTgyLDEzLjcyNiBMOS42NDYsMTMuNzI2IEw3Ljc3MSwxMy43MjYgTDcuMjM1LDEzLjcyNiBMNS4zNjAsMTMuNzI2IEw0LjgyNCwxMy43MjYgTDIuOTQ4LDEzLjcyNiBMMi40MTIsMTMuNzI2IEwyLjQxMiwxMy4xNjAgTDIuNDEyLDExLjE3NyBMMi40MTIsMTAuNjExIEwyLjQxMiw4LjA2MSBMNC44MjQsOC4wNjEgTDUuMzYwLDguMDYxIFpNMTAuMTgyLDEzLjE2MCBMMTIuMDU4LDEzLjE2MCBMMTIuMDU4LDExLjE3NyBMMTAuMTgyLDExLjE3NyBMMTAuMTgyLDEzLjE2MCBaTTEwLjE4MiwxMC42MTEgTDEyLjA1OCwxMC42MTEgTDEyLjA1OCw4LjYyOCBMMTAuMTgyLDguNjI4IEwxMC4xODIsMTAuNjExIFpNNy43NzEsMTMuMTYwIEw5LjY0NiwxMy4xNjAgTDkuNjQ2LDExLjE3NyBMNy43NzEsMTEuMTc3IEw3Ljc3MSwxMy4xNjAgWk03Ljc3MSwxMC42MTEgTDkuNjQ2LDEwLjYxMSBMOS42NDYsOC42MjggTDcuNzcxLDguNjI4IEw3Ljc3MSwxMC42MTEgWk01LjM2MCwxMy4xNjAgTDcuMjM1LDEzLjE2MCBMNy4yMzUsMTEuMTc3IEw1LjM2MCwxMS4xNzcgTDUuMzYwLDEzLjE2MCBaTTUuMzYwLDEwLjYxMSBMNy4yMzUsMTAuNjExIEw3LjIzNSw4LjYyOCBMNS4zNjAsOC42MjggTDUuMzYwLDEwLjYxMSBaTTIuOTQ4LDEzLjE2MCBMNC44MjQsMTMuMTYwIEw0LjgyNCwxMS4xNzcgTDIuOTQ4LDExLjE3NyBMMi45NDgsMTMuMTYwIFpNMi45NDgsMTAuNjExIEw0LjgyNCwxMC42MTEgTDQuODI0LDguNjI4IEwyLjk0OCw4LjYyOCBMMi45NDgsMTAuNjExIFoiIGNsYXNzPSJjbHMtMSIvPgo8IS0tIENvZGUgaW5qZWN0ZWQgYnkgbGl2ZS1zZXJ2ZXIgLS0+CjxzY3JpcHQ+CgkvLyA8IVtDREFUQVsgIDwtLSBGb3IgU1ZHIHN1cHBvcnQKCWlmICgnV2ViU29ja2V0JyBpbiB3aW5kb3cpIHsKCQkoZnVuY3Rpb24gKCkgewoJCQlmdW5jdGlvbiByZWZyZXNoQ1NTKCkgewoJCQkJdmFyIHNoZWV0cyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoImxpbmsiKSk7CgkJCQl2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCJoZWFkIilbMF07CgkJCQlmb3IgKHZhciBpID0gMDsgaSA8IHNoZWV0cy5sZW5ndGg7ICsraSkgewoJCQkJCXZhciBlbGVtID0gc2hlZXRzW2ldOwoJCQkJCXZhciBwYXJlbnQgPSBlbGVtLnBhcmVudEVsZW1lbnQgfHwgaGVhZDsKCQkJCQlwYXJlbnQucmVtb3ZlQ2hpbGQoZWxlbSk7CgkJCQkJdmFyIHJlbCA9IGVsZW0ucmVsOwoJCQkJCWlmIChlbGVtLmhyZWYgJiYgdHlwZW9mIHJlbCAhPSAic3RyaW5nIiB8fCByZWwubGVuZ3RoID09IDAgfHwgcmVsLnRvTG93ZXJDYXNlKCkgPT0gInN0eWxlc2hlZXQiKSB7CgkJCQkJCXZhciB1cmwgPSBlbGVtLmhyZWYucmVwbGFjZSgvKCZ8XD8pX2NhY2hlT3ZlcnJpZGU9XGQrLywgJycpOwoJCQkJCQllbGVtLmhyZWYgPSB1cmwgKyAodXJsLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nKSArICdfY2FjaGVPdmVycmlkZT0nICsgKG5ldyBEYXRlKCkudmFsdWVPZigpKTsKCQkJCQl9CgkJCQkJcGFyZW50LmFwcGVuZENoaWxkKGVsZW0pOwoJCQkJfQoJCQl9CgkJCXZhciBwcm90b2NvbCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHA6JyA/ICd3czovLycgOiAnd3NzOi8vJzsKCQkJdmFyIGFkZHJlc3MgPSBwcm90b2NvbCArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgJy93cyc7CgkJCXZhciBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KGFkZHJlc3MpOwoJCQlzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKG1zZykgewoJCQkJaWYgKG1zZy5kYXRhID09ICdyZWxvYWQnKSB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7CgkJCQllbHNlIGlmIChtc2cuZGF0YSA9PSAncmVmcmVzaGNzcycpIHJlZnJlc2hDU1MoKTsKCQkJfTsKCQkJaWYgKHNlc3Npb25TdG9yYWdlICYmICFzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdJc1RoaXNGaXJzdFRpbWVfTG9nX0Zyb21fTGl2ZVNlcnZlcicpKSB7CgkJCQljb25zb2xlLmxvZygnTGl2ZSByZWxvYWQgZW5hYmxlZC4nKTsKCQkJCXNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ0lzVGhpc0ZpcnN0VGltZV9Mb2dfRnJvbV9MaXZlU2VydmVyJywgdHJ1ZSk7CgkJCX0KCQl9KSgpOwoJfQoJZWxzZSB7CgkJY29uc29sZS5lcnJvcignVXBncmFkZSB5b3VyIGJyb3dzZXIuIFRoaXMgQnJvd3NlciBpcyBOT1Qgc3VwcG9ydGVkIFdlYlNvY2tldCBmb3IgTGl2ZS1SZWxvYWRpbmcuJyk7Cgl9CgkvLyBdXT4KPC9zY3JpcHQ+Cjwvc3ZnPgo="
                            alt=""
                          />{" "}
                                05 May 2011{" "}
                        </span>{" "}
                            </a>
                          </div>


                        </div>
                      </div>
                      <ul className="slick-dots" role="tablist">
                        <li
                          aria-hidden="true"
                          role="presentation"
                          aria-selected="true"
                          aria-controls="navigation40"
                          id="slick-slide40"
                        >
                          <button
                            type="button"
                            data-role="none"
                            role="button"
                            tabIndex={0}
                          />
                        </li>
                        <li
                          aria-hidden="false"
                          role="presentation"
                          aria-selected="false"
                          aria-controls="navigation41"
                          id="slick-slide41"
                          className="slick-active"
                        >
                          <button
                            type="button"
                            data-role="none"
                            role="button"
                            tabIndex={0}
                          />
                        </li>
                        <li
                          aria-hidden="true"
                          role="presentation"
                          aria-selected="false"
                          aria-controls="navigation42"
                          id="slick-slide42"
                        >
                          <button
                            type="button"
                            data-role="none"
                            role="button"
                            tabIndex={0}
                          />
                        </li>
                        <li
                          aria-hidden="true"
                          role="presentation"
                          aria-selected="false"
                          aria-controls="navigation43"
                          id="slick-slide43"
                        >
                          <button
                            type="button"
                            data-role="none"
                            role="button"
                            tabIndex={0}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <span className="clr" />
              </div>
              <div className="links animatedParent animateOnce">
                <div className="links_slider animated fadeInUp go slick-initialized slick-slider">
                  <div aria-live="polite" className="slick-list draggable">
                    <div
                      className="slick-track"
                      style={{
                        opacity: 1,
                        width: 1212,
                        transform: "translate3d(0px,0px,0px)"
                      }}
                      role="listbox"
                    >
                      <p
                        className="slick-slide slick-current slick-active"
                        style={{ width: 200 }}
                        data-slick-index={0}
                        aria-hidden="false"
                        tabIndex={-1}
                        role="option"
                      >
                        <img
                          src={canida}
                          alt="Image of Budget Statement  Fiscal Year 2023"
                        />
                      </p>
                      <p
                        className="slick-slide slick-active"
                        style={{ width: 303 }}
                        data-slick-index={1}
                        aria-hidden="false"
                        tabIndex={-1}
                        role="option"
                      >
                        <img
                          src={chamber}
                          alt="Image of Debt Management Office"
                        />
                      </p>
                      <p
                        className="slick-slide slick-active"
                        style={{ width: 303 }}
                        data-slick-index={2}
                        aria-hidden="false"
                        tabIndex={-1}
                        role="option"
                      >
                        <img
                          src={gfs}
                          alt="Image of إ GFS"
                        />
                      </p>
                      <p
                        target="_blank"
                        className="slick-slide slick-active"
                        style={{ width: 303 }}
                        data-slick-index={3}
                        aria-hidden="false"
                        tabIndex={-1}
                        role="option"
                      >
                        <img
                          src={ambiente}
                          alt="Image of اعتماد etimad"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <span className="clr" />
              <div className="infograph block animatedParent animateOnce">
                <div className="animated fadeInUp go">
                  <div className="title">
                    <a
                      className="fixedTip"
                      href="#"
                      title="View all the infographics"
                    >
                      <Translate contentKey={'landing.budget'}/>
                      <span className="sf-hidden" />
                    </a>
                    <span className="clr" />
                  </div>
                  <span className="clr" />
                  <div
                    className="infog_slider slick-initialized slick-slider slick-dotted"
                    role="toolbar"
                  >
                    <div aria-live="polite" className="slick-list draggable">
                      <div
                        className="slick-track"
                        style={{
                          opacity: 1,
                          width: 10890,
                          transform: "translate3d(-6050px,0px,0px)"
                        }}
                        role="listbox"
                      >
                        <p
                          href="#"
                          title="View Sectors Allocations"
                          className="slick-slide slick-cloned"
                          data-slick-index={-1}
                          aria-hidden="true"
                          style={{ width: 1210 }}
                          tabIndex={-1}
                        >
                          {" "}
                          <img
                            src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="561"><rect fill-opacity="0"/></svg>'
                            alt="Image of Sectors Allocations"
                            style={{
                              backgroundBlendMode: "normal!important",
                              backgroundClip: "content-box!important",
                              backgroundPosition: "50% 50%!important",
                              backgroundColor: "rgba(0,0,0,0)!important",
                              backgroundImage: "var(--sf-img-35)!important",
                              backgroundSize: "100% 100%!important",
                              backgroundOrigin: "content-box!important",
                              backgroundRepeat: "no-repeat!important"
                            }}
                          />{" "}
                        </p>
                        <a
                          href="#"
                          title="View The Public Finance Projections"
                          className="slick-slide"
                          data-slick-index={0}
                          aria-hidden="true"
                          style={{ width: 1210 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide30"
                        >
                          {" "}
                          <img
                            src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="561"><rect fill-opacity="0"/></svg>'
                            alt="Image of The Public Finance Projections"
                            style={{
                              backgroundBlendMode: "normal!important",
                              backgroundClip: "content-box!important",
                              backgroundPosition: "50% 50%!important",
                              backgroundColor: "rgba(0,0,0,0)!important",
                              backgroundImage: "var(--sf-img-36)!important",
                              backgroundSize: "100% 100%!important",
                              backgroundOrigin: "content-box!important",
                              backgroundRepeat: "no-repeat!important"
                            }}
                          />{" "}
                        </a>

                        <p
                          href="#"
                          title="View The Public Finance Projections"
                          className="slick-slide"
                          data-slick-index={2}
                          aria-hidden="true"
                          style={{ width: 1210 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide32"
                        >
                          {" "}
                          <img
                            src=""
                            alt="Image of The Public Finance Projections"
                          />{" "}
                        </p>
                        <a
                          href="#"
                          title="View Estimates of Real GDP Growth"
                          className="slick-slide"
                          data-slick-index={3}
                          aria-hidden="true"
                          style={{ width: 1210 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide33"
                        >
                          {" "}
                          <img
                            src=""
                            alt="Image of Estimates of Real GDP Growth"
                          />{" "}
                        </a>
                        <a
                          href="#"
                          title="View Sectors Allocations"
                          className="slick-slide slick-current slick-active"
                          data-slick-index={4}
                          aria-hidden="false"
                          style={{ width: 1210 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide34"
                        >
                          {" "}
                          <img
                            src=""
                            alt="Image of Sectors Allocations"
                          />{" "}
                        </a>
                        <a
                          href="#"
                          title="View Sectors Allocations"
                          className="slick-slide"
                          data-slick-index={5}
                          aria-hidden="true"
                          style={{ width: 1210 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide35"
                        >
                          {" "}
                          <img
                            src={budget}
                            alt="Image of Sectors Allocations"
                          />{" "}
                        </a>
                        <a
                          href="#"
                          title="View Sectors Allocations"
                          className="slick-slide"
                          data-slick-index={6}
                          aria-hidden="true"
                          style={{ width: 1210 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide36"
                        >
                          {" "}
                          <img
                            src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="561"><rect fill-opacity="0"/></svg>'
                            alt="Image of Sectors Allocations"
                            style={{
                              backgroundBlendMode: "normal!important",
                              backgroundClip: "content-box!important",
                              backgroundPosition: "50% 50%!important",
                              backgroundColor: "rgba(0,0,0,0)!important",
                              backgroundImage: "var(--sf-img-35)!important",
                              backgroundSize: "100% 100%!important",
                              backgroundOrigin: "content-box!important",
                              backgroundRepeat: "no-repeat!important"
                            }}
                          />{" "}
                        </a>
                        <a
                          href="#"
                          title="View The Public Finance Projections"
                          className="slick-slide slick-cloned"
                          data-slick-index={7}
                          aria-hidden="true"
                          style={{ width: 1210 }}
                          tabIndex={-1}
                        >
                          {" "}
                          <img
                            src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="561"><rect fill-opacity="0"/></svg>'
                            alt="Image of The Public Finance Projections"
                            style={{
                              backgroundBlendMode: "normal!important",
                              backgroundClip: "content-box!important",
                              backgroundPosition: "50% 50%!important",
                              backgroundColor: "rgba(0,0,0,0)!important",
                              backgroundImage: "var(--sf-img-36)!important",
                              backgroundSize: "100% 100%!important",
                              backgroundOrigin: "content-box!important",
                              backgroundRepeat: "no-repeat!important"
                            }}
                          />{" "}
                        </a>
                      </div>
                    </div>
                    <ul className="slick-dots" role="tablist">
                      <li
                        aria-hidden="true"
                        role="presentation"
                        aria-selected="true"
                        aria-controls="navigation30"
                        id="slick-slide30"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                      <li
                        aria-hidden="true"
                        role="presentation"
                        aria-selected="false"
                        aria-controls="navigation31"
                        id="slick-slide31"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                      <li
                        aria-hidden="true"
                        role="presentation"
                        aria-selected="false"
                        aria-controls="navigation32"
                        id="slick-slide32"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                      <li
                        aria-hidden="true"
                        role="presentation"
                        aria-selected="false"
                        aria-controls="navigation33"
                        id="slick-slide33"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                      <li
                        aria-hidden="false"
                        role="presentation"
                        aria-selected="false"
                        aria-controls="navigation34"
                        id="slick-slide34"
                        className="slick-active"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                      <li
                        aria-hidden="true"
                        role="presentation"
                        aria-selected="false"
                        aria-controls="navigation35"
                        id="slick-slide35"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                      <li
                        aria-hidden="true"
                        role="presentation"
                        aria-selected="false"
                        aria-controls="navigation36"
                        id="slick-slide36"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                    </ul>
                  </div>
                  <span className="clr" />
                </div>
              </div>
              <span className="clr" />
              <div className="doc_bar block">
                <div className="animatedParent animateOnce">
                  <div className="doc hblock animated fadeInUp go">
                    <div className="title">
                      <a
                        className="fixedTip"
                        href="#"
                        title="View all documents"
                      >
                        <Translate contentKey={'landing.document'}/>
                        <span />
                      </a>
                      <span className="clr" />
                    </div>
                    <span className="clr" />
                    <div className="grid-container" id="docsCategories">
                      <a
                        title="View Regulations and Instructions"
                        href={require('./documents/Regulations and Instructions.pdf').default}
                        target="_blank"
                      >
                        <img
                          src={require('./assets/regulationGreen.png').default}
                          alt="homedoc0"
                        />
                        <img
                          src={require('./assets/regulation.png').default}
                          alt="homedoc_hover0"
                        />
                        <span><Translate contentKey={'landing.regulations'}/></span>
                      </a>
                      <a
                        title="View Contracts and Projects"
                        href={require('./documents/Contracts and Projects.pdf').default}
                        target="_blank"
                      >
                        <img
                          src={require('./assets/contractGreen.png').default}
                          alt="homedoc1"
                        />
                        <img
                          src={require('./assets/contract.png').default}
                          alt="homedoc_hover1"
                        />
                        <span><Translate contentKey={'landing.contract'}/></span>
                      </a>
                      <a
                        title="View Ministry Models"
                        href={require('./documents/Angola\'s Ministry Models.pdf').default}
                        target="_blank"
                      >
                        <img
                          src={require('./assets/ministryGreen.png').default}
                          alt="homedoc2"
                        />
                        <img
                          src={require('./assets/ministry.png').default}
                          alt="homedoc_hover2"
                        />
                        <span><Translate contentKey={'landing.ministry'}/></span>
                      </a>
                      <a
                        title="View Statistical Data"
                        href={require('./documents/2022 Statistical Data - Angola.pdf').default}
                        target="_blank"
                      >
                        <img
                          src={require('./assets/statisticalGreen.png').default}
                          alt="homedoc3"
                        />
                        <img
                          src={require('./assets/statistical.png').default}
                          alt="homedoc_hover3"
                        />
                        <span><Translate contentKey={'landing.statistical'}/></span>
                      </a>
                      <a
                        title="View Budget Data"
                        href={require('./documents/Angola Budget Data.pdf').default}
                        target="_blank"
                      >
                        <img
                          src={require('./assets/budgetGreen.png').default}
                          alt="homedoc4"
                        />
                        <img
                          src={require('./assets/budget2.png').default}
                          alt="homedoc_hover4"
                        />
                        <span><Translate contentKey={'landing.budgetData'}/></span>
                      </a>
                      <a
                        title="View MOF Contracts"
                        href={require('./documents/MOF Contract.pdf').default}
                        target="_blank"
                      >
                        <img
                          src={require('./assets/mofGreen.png').default}
                          alt="homedoc5"
                        />
                        <img
                          src={require('./assets/mof.png').default}
                          alt="homedoc_hover5"
                        />
                        <span><Translate contentKey={'landing.mofCons'}/></span>
                      </a>
                      <a
                        title="View Governmental Agreements"
                        href={require('./documents/Laws & Government Agreements Angola.pdf').default}
                        target="_blank"
                      >
                        <img
                          src={require('./assets/govGreen.png').default}
                          alt="homedoc6"
                        />
                        <img
                          src={require('./assets/gov.png').default}
                          alt="homedoc_hover6"
                        />
                        <span><Translate contentKey={'landing.govAgree'}/></span>
                      </a>
                    </div>
                  </div>
                  <div className="gallery_block animated fadeInUp go">
                    <div style={{ display: "none" }}></div>
                    <div className="section">
                      <a
                        href="#"
                        title="View photos library"
                        id="more_imgs_vids"
                        className="more_imgs_vids"
                      />
                      <ul className="tabs">
                        <li className="current"><Translate contentKey={'landing.photo'}/></li>

                      </ul>

                      <div className="box photo visible">
                        <MDBCarousel showControls showIndicators className={"h-100 w-100"}>
                          <MDBCarouselItem
                            className='w-100 h-100 d-block'
                            itemId={1}
                            src={require("./images/1.png").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 h-100 d-block'
                            itemId={2}
                            src={require("./images/2.jpg").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 h-100 d-block'
                            itemId={3}
                            src={require("./images/3.jpg").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 h-100 d-block'
                            itemId={4}
                            src={require("./images/4.jpg").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 h-100 d-block'
                            itemId={5}
                            src={require("./images/5.jpg").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={6}
                            src={require("./images/6.jpg").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={7}
                            src={require("./images/7.jpg").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={8}
                            src={require("./images/8.jpg").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={9}
                            src={require("./images/9.jpg").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={11}
                            src={require("./images/11.png").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={12}
                            src={require("./images/12.jpg").default}
                            alt='...'
                          >
                          </MDBCarouselItem>
                        </MDBCarousel>
                      </div>
                      <div className="box video sf-hidden"></div>
                    </div>
                  </div>
                  <span className="clr" />
                </div>
              </div>
              <div className="vision_bar block animatedParent animateOnce">
                <div className="animated fadeInUp go">
                  <div className="sec1">
                    <h1>
                      <Translate contentKey={'landing.infoStrategy'}/>
                    </h1>
                    <span className="clr" />
                    <a
                      className="visionbtn"
                      href="#"
                      title="Ministry of Finance's strategy"
                    >
                      <Translate contentKey={'landing.learn'}/>
                      <span />
                    </a>
                    <span className="clr" />
                  </div>
                  <div className="sec2 s21 srclose">
                    <span title="View more"> <Translate contentKey={'landing.transparency'}/> </span>
                    <div>
                      <a className="m_close" title="close">
                        <img
                          alt=""
                          src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="49" height="49"><rect fill-opacity="0"/></svg>'
                          style={{
                            backgroundBlendMode: "normal!important",
                            backgroundClip: "content-box!important",
                            backgroundPosition: "50% 50%!important",
                            backgroundColor: "rgba(0,0,0,0)!important",
                            backgroundImage: "var(--sf-img-66)!important",
                            backgroundSize: "100% 100%!important",
                            backgroundOrigin: "content-box!important",
                            backgroundRepeat: "no-repeat!important"
                          }}
                        />
                      </a>
                      <span className="clr" />
                      <strong>Transparency</strong>
                      <p>
                        Our transparency in dealing, communicating and exchanging
                        knowledge is an integral value for establishing our
                        credibility.
                      </p>
                    </div>
                  </div>
                  <div className="sec2 s22 srclose">
                    <span title="View more"><Translate contentKey={'landing.commitment'}/></span>
                    <div>
                      <a className="m_close" title="close">
                        <img
                          alt=""
                          src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="49" height="49"><rect fill-opacity="0"/></svg>'
                          style={{
                            backgroundBlendMode: "normal!important",
                            backgroundClip: "content-box!important",
                            backgroundPosition: "50% 50%!important",
                            backgroundColor: "rgba(0,0,0,0)!important",
                            backgroundImage: "var(--sf-img-66)!important",
                            backgroundSize: "100% 100%!important",
                            backgroundOrigin: "content-box!important",
                            backgroundRepeat: "no-repeat!important"
                          }}
                        />
                      </a>
                      <strong>Commitment</strong>
                      <p>
                        We are committed to our responsibility to enable the national
                        vision and achieve its renaissance through planning and
                        wisdom.
                      </p>
                    </div>
                  </div>
                  <div className="sec2 s23 srclose">
                    <span title="View more"><Translate contentKey={'landing.partnership'}/></span>
                    <div>
                      <a className="m_close" title="close">
                        <img
                          alt=""
                          src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="49" height="49"><rect fill-opacity="0"/></svg>'
                          style={{
                            backgroundBlendMode: "normal!important",
                            backgroundClip: "content-box!important",
                            backgroundPosition: "50% 50%!important",
                            backgroundColor: "rgba(0,0,0,0)!important",
                            backgroundImage: "var(--sf-img-66)!important",
                            backgroundSize: "100% 100%!important",
                            backgroundOrigin: "content-box!important",
                            backgroundRepeat: "no-repeat!important"
                          }}
                        />
                      </a>
                      <strong>Partnership</strong>
                      <p>
                        We recognize the importance of our role in serving our
                        partners to meet their needs and achieve their goals.
                      </p>
                    </div>
                  </div>
                  <div className="sec2 s24 srclose">
                    <span title="View more"><Translate contentKey={'landing.accomplishment'}/></span>
                    <div>
                      <a className="m_close" title="close">
                        <img
                          alt=""
                          src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="49" height="49"><rect fill-opacity="0"/></svg>'
                          style={{
                            backgroundBlendMode: "normal!important",
                            backgroundClip: "content-box!important",
                            backgroundPosition: "50% 50%!important",
                            backgroundColor: "rgba(0,0,0,0)!important",
                            backgroundImage: "var(--sf-img-66)!important",
                            backgroundSize: "100% 100%!important",
                            backgroundOrigin: "content-box!important",
                            backgroundRepeat: "no-repeat!important"
                          }}
                        />
                      </a>
                      <strong>Accomplishment</strong>
                      <p>
                        Accomplishment is embedded in our performance culture to help
                        us achieve our goals with excellence.
                      </p>
                    </div>
                  </div>
                  <span className="clr" />
                </div>
              </div>
              <span className="clr" />
              <div className="events_bar block animatedParent animateOnce">
                <div className="events hblock animated fadeInUp go">
                  <div className="titl h1 font-weight-light ">
                    <a
                      className="fixedTip text-success"
                      href="#"
                      title="View all events"
                    >
                      <Translate contentKey={'landing.events'}/>
                      <span />
                    </a>
                    <span className="clr" />
                  </div>
                  <span className="clr" />
                  <div
                    className="events_slider slick-initialized slick-slider slick-dotted slick-vertical"
                    role="toolbar"
                  >
                    <div
                      aria-live="polite"
                      className="slick-list draggable"
                      style={{ height: 350 }}
                    >
                      <div
                        className="slick-track"
                        style={{
                          opacity: 1,
                          height: 1750,
                          transform: "translate3d(0px,-1050px,0px)"
                        }}
                        role="listbox"
                      >
                        <div
                          className="slick-slide slick-cloned"
                          data-slick-index={-2}
                          aria-hidden="true"
                          style={{ width: 416 }}
                          tabIndex={-1}
                        >
                          {" "}
                          <a
                            title="View Webinar: Investing in Research to Enable the Knowledge Economy"
                            href="#"
                            tabIndex={-1}
                          >
                            {" "}
                            <span className="date">
                        <strong>16</strong><Translate contentKey={'landing.february'}/>
                      </span>{" "}
                            <div className="event_info">
                        <span className="eventTitle">
                          <Translate contentKey={'landing.webinar'}/>
                        </span>{" "}
                              <span className="location">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={23}
                                  height={23}
                                  viewBox="0 0 23 23"
                                >
                            <path
                              d="M11.500,23.000 C3.950,23.000 0.000,21.361 0.000,19.742 C0.000,18.300 2.819,16.961 6.855,16.486 C7.066,16.460 7.256,16.611 7.281,16.822 C7.305,17.032 7.155,17.223 6.945,17.247 C2.914,17.722 0.767,19.001 0.767,19.742 C0.767,20.782 4.850,22.233 11.500,22.233 C18.150,22.233 22.233,20.782 22.233,19.742 C22.233,19.001 20.086,17.722 16.055,17.247 C15.845,17.223 15.695,17.032 15.719,16.822 C15.744,16.611 15.934,16.461 16.145,16.486 C20.181,16.961 23.000,18.300 23.000,19.742 C23.000,21.361 19.050,23.000 11.500,23.000 ZM11.432,20.990 L5.543,12.485 C3.346,9.556 3.665,4.723 6.234,2.153 C7.623,0.764 9.469,0.000 11.432,0.000 C13.396,0.000 15.242,0.764 16.630,2.153 C19.200,4.723 19.519,9.556 17.313,12.497 L11.432,20.990 ZM16.088,2.696 C14.844,1.452 13.191,0.767 11.432,0.767 C9.673,0.767 8.020,1.452 6.776,2.696 C4.457,5.014 4.171,9.379 6.165,12.037 L11.432,19.643 L16.691,12.048 C18.693,9.379 18.407,5.014 16.088,2.696 ZM11.500,9.967 C10.020,9.967 8.817,8.762 8.817,7.283 C8.817,5.804 10.020,4.600 11.500,4.600 C12.980,4.600 14.183,5.804 14.183,7.283 C14.183,8.762 12.980,9.967 11.500,9.967 ZM11.500,5.367 C10.443,5.367 9.583,6.227 9.583,7.283 C9.583,8.340 10.443,9.200 11.500,9.200 C12.557,9.200 13.417,8.340 13.417,7.283 C13.417,6.227 12.557,5.367 11.500,5.367 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                <Translate contentKey={'landing.virtual'}/>{" "}
                        </span>{" "}
                              <span className="times">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={21}
                                  height={21}
                                  viewBox="0 0 21 21"
                                >
                            <path
                              d="M10.500,21.000 C4.710,21.000 0.000,16.290 0.000,10.500 C0.000,4.711 4.710,0.000 10.500,0.000 C16.290,0.000 21.000,4.711 21.000,10.500 C21.000,16.290 16.290,21.000 10.500,21.000 ZM10.500,0.700 C5.096,0.700 0.700,5.097 0.700,10.500 C0.700,15.903 5.096,20.300 10.500,20.300 C15.904,20.300 20.300,15.903 20.300,10.500 C20.300,5.097 15.904,0.700 10.500,0.700 ZM10.500,11.200 L4.900,11.200 C4.707,11.200 4.550,11.043 4.550,10.850 C4.550,10.656 4.707,10.500 4.900,10.500 L10.150,10.500 L10.150,2.450 C10.150,2.256 10.307,2.100 10.500,2.100 C10.693,2.100 10.850,2.256 10.850,2.450 L10.850,10.850 C10.850,11.043 10.693,11.200 10.500,11.200 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                10:00 am - 03:00 pm{" "}
                        </span>
                            </div>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide slick-cloned"
                          data-slick-index={-1}
                          aria-hidden="true"
                          style={{ width: 416 }}
                          tabIndex={-1}
                        >
                          {" "}
                          <a
                            title="View  Future Investment Initiative"
                            href="#"
                            tabIndex={-1}
                          >
                            {" "}
                            <span className="date">
                        <strong>27</strong>January
                      </span>{" "}
                            <div className="event_info">
                        <span className="eventTitle">
                          {" "}
                          Future Investment Initiative
                        </span>{" "}
                              <span className="location">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={23}
                                  height={23}
                                  viewBox="0 0 23 23"
                                >
                            <path
                              d="M11.500,23.000 C3.950,23.000 0.000,21.361 0.000,19.742 C0.000,18.300 2.819,16.961 6.855,16.486 C7.066,16.460 7.256,16.611 7.281,16.822 C7.305,17.032 7.155,17.223 6.945,17.247 C2.914,17.722 0.767,19.001 0.767,19.742 C0.767,20.782 4.850,22.233 11.500,22.233 C18.150,22.233 22.233,20.782 22.233,19.742 C22.233,19.001 20.086,17.722 16.055,17.247 C15.845,17.223 15.695,17.032 15.719,16.822 C15.744,16.611 15.934,16.461 16.145,16.486 C20.181,16.961 23.000,18.300 23.000,19.742 C23.000,21.361 19.050,23.000 11.500,23.000 ZM11.432,20.990 L5.543,12.485 C3.346,9.556 3.665,4.723 6.234,2.153 C7.623,0.764 9.469,0.000 11.432,0.000 C13.396,0.000 15.242,0.764 16.630,2.153 C19.200,4.723 19.519,9.556 17.313,12.497 L11.432,20.990 ZM16.088,2.696 C14.844,1.452 13.191,0.767 11.432,0.767 C9.673,0.767 8.020,1.452 6.776,2.696 C4.457,5.014 4.171,9.379 6.165,12.037 L11.432,19.643 L16.691,12.048 C18.693,9.379 18.407,5.014 16.088,2.696 ZM11.500,9.967 C10.020,9.967 8.817,8.762 8.817,7.283 C8.817,5.804 10.020,4.600 11.500,4.600 C12.980,4.600 14.183,5.804 14.183,7.283 C14.183,8.762 12.980,9.967 11.500,9.967 ZM11.500,5.367 C10.443,5.367 9.583,6.227 9.583,7.283 C9.583,8.340 10.443,9.200 11.500,9.200 C12.557,9.200 13.417,8.340 13.417,7.283 C13.417,6.227 12.557,5.367 11.500,5.367 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                Virtual{" "}
                        </span>{" "}
                              <span className="times">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={21}
                                  height={21}
                                  viewBox="0 0 21 21"
                                >
                            <path
                              d="M10.500,21.000 C4.710,21.000 0.000,16.290 0.000,10.500 C0.000,4.711 4.710,0.000 10.500,0.000 C16.290,0.000 21.000,4.711 21.000,10.500 C21.000,16.290 16.290,21.000 10.500,21.000 ZM10.500,0.700 C5.096,0.700 0.700,5.097 0.700,10.500 C0.700,15.903 5.096,20.300 10.500,20.300 C15.904,20.300 20.300,15.903 20.300,10.500 C20.300,5.097 15.904,0.700 10.500,0.700 ZM10.500,11.200 L4.900,11.200 C4.707,11.200 4.550,11.043 4.550,10.850 C4.550,10.656 4.707,10.500 4.900,10.500 L10.150,10.500 L10.150,2.450 C10.150,2.256 10.307,2.100 10.500,2.100 C10.693,2.100 10.850,2.256 10.850,2.450 L10.850,10.850 C10.850,11.043 10.693,11.200 10.500,11.200 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                11:00 am - 03:00 pm{" "}
                        </span>
                            </div>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide"
                          data-slick-index={0}
                          aria-hidden="true"
                          style={{ width: 416 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide60"
                        >
                          {" "}
                          <a
                            title="View The World Economic Forum (Davos)"
                            href="#"
                            tabIndex={-1}
                          >
                            {" "}
                            <span className="date">
                        <strong>04</strong>January
                      </span>{" "}
                            <div className="event_info">
                        <span className="eventTitle">
                          The World Economic Forum (Davos)
                        </span>{" "}
                              <span className="times">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={21}
                                  height={21}
                                  viewBox="0 0 21 21"
                                >
                            <path
                              d="M10.500,21.000 C4.710,21.000 0.000,16.290 0.000,10.500 C0.000,4.711 4.710,0.000 10.500,0.000 C16.290,0.000 21.000,4.711 21.000,10.500 C21.000,16.290 16.290,21.000 10.500,21.000 ZM10.500,0.700 C5.096,0.700 0.700,5.097 0.700,10.500 C0.700,15.903 5.096,20.300 10.500,20.300 C15.904,20.300 20.300,15.903 20.300,10.500 C20.300,5.097 15.904,0.700 10.500,0.700 ZM10.500,11.200 L4.900,11.200 C4.707,11.200 4.550,11.043 4.550,10.850 C4.550,10.656 4.707,10.500 4.900,10.500 L10.150,10.500 L10.150,2.450 C10.150,2.256 10.307,2.100 10.500,2.100 C10.693,2.100 10.850,2.256 10.850,2.450 L10.850,10.850 C10.850,11.043 10.693,11.200 10.500,11.200 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                10:00 am - 11:00 am{" "}
                        </span>
                            </div>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide"
                          data-slick-index={1}
                          aria-hidden="true"
                          style={{ width: 416 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide60"
                        >
                          {" "}
                          <a
                            title="View  Budget Forum 2022"
                            href="#"
                            tabIndex={-1}
                          >
                            {" "}
                            <span className="date">
                        <strong>13</strong>December
                      </span>{" "}
                            <div className="event_info">
                              <span className="eventTitle"> Budget Forum 2022</span>{" "}
                              <span className="location">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={23}
                                  height={23}
                                  viewBox="0 0 23 23"
                                >
                            <path
                              d="M11.500,23.000 C3.950,23.000 0.000,21.361 0.000,19.742 C0.000,18.300 2.819,16.961 6.855,16.486 C7.066,16.460 7.256,16.611 7.281,16.822 C7.305,17.032 7.155,17.223 6.945,17.247 C2.914,17.722 0.767,19.001 0.767,19.742 C0.767,20.782 4.850,22.233 11.500,22.233 C18.150,22.233 22.233,20.782 22.233,19.742 C22.233,19.001 20.086,17.722 16.055,17.247 C15.845,17.223 15.695,17.032 15.719,16.822 C15.744,16.611 15.934,16.461 16.145,16.486 C20.181,16.961 23.000,18.300 23.000,19.742 C23.000,21.361 19.050,23.000 11.500,23.000 ZM11.432,20.990 L5.543,12.485 C3.346,9.556 3.665,4.723 6.234,2.153 C7.623,0.764 9.469,0.000 11.432,0.000 C13.396,0.000 15.242,0.764 16.630,2.153 C19.200,4.723 19.519,9.556 17.313,12.497 L11.432,20.990 ZM16.088,2.696 C14.844,1.452 13.191,0.767 11.432,0.767 C9.673,0.767 8.020,1.452 6.776,2.696 C4.457,5.014 4.171,9.379 6.165,12.037 L11.432,19.643 L16.691,12.048 C18.693,9.379 18.407,5.014 16.088,2.696 ZM11.500,9.967 C10.020,9.967 8.817,8.762 8.817,7.283 C8.817,5.804 10.020,4.600 11.500,4.600 C12.980,4.600 14.183,5.804 14.183,7.283 C14.183,8.762 12.980,9.967 11.500,9.967 ZM11.500,5.367 C10.443,5.367 9.583,6.227 9.583,7.283 C9.583,8.340 10.443,9.200 11.500,9.200 C12.557,9.200 13.417,8.340 13.417,7.283 C13.417,6.227 12.557,5.367 11.500,5.367 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                Riyadh{" "}
                        </span>{" "}
                              <span className="times">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={21}
                                  height={21}
                                  viewBox="0 0 21 21"
                                >
                            <path
                              d="M10.500,21.000 C4.710,21.000 0.000,16.290 0.000,10.500 C0.000,4.711 4.710,0.000 10.500,0.000 C16.290,0.000 21.000,4.711 21.000,10.500 C21.000,16.290 16.290,21.000 10.500,21.000 ZM10.500,0.700 C5.096,0.700 0.700,5.097 0.700,10.500 C0.700,15.903 5.096,20.300 10.500,20.300 C15.904,20.300 20.300,15.903 20.300,10.500 C20.300,5.097 15.904,0.700 10.500,0.700 ZM10.500,11.200 L4.900,11.200 C4.707,11.200 4.550,11.043 4.550,10.850 C4.550,10.656 4.707,10.500 4.900,10.500 L10.150,10.500 L10.150,2.450 C10.150,2.256 10.307,2.100 10.500,2.100 C10.693,2.100 10.850,2.256 10.850,2.450 L10.850,10.850 C10.850,11.043 10.693,11.200 10.500,11.200 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                12:00 am - 01:00 am{" "}
                        </span>
                            </div>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide"
                          data-slick-index={2}
                          aria-hidden="true"
                          style={{ width: 416 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide61"
                        >
                          {" "}
                          <a
                            title="View Press Conference of HE Mimister of Finance on the Announcement of Budget 2022"
                            href="#"
                            tabIndex={-1}
                          >
                            {" "}
                            <span className="date">
                        <strong>12</strong>December
                      </span>{" "}
                            <div className="event_info">
                        <span className="eventTitle">
                          Press Conference of HE Mimister of Finance on the
                          Announcement of Budget 2022
                        </span>{" "}
                              <span className="location">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={23}
                                  height={23}
                                  viewBox="0 0 23 23"
                                >
                            <path
                              d="M11.500,23.000 C3.950,23.000 0.000,21.361 0.000,19.742 C0.000,18.300 2.819,16.961 6.855,16.486 C7.066,16.460 7.256,16.611 7.281,16.822 C7.305,17.032 7.155,17.223 6.945,17.247 C2.914,17.722 0.767,19.001 0.767,19.742 C0.767,20.782 4.850,22.233 11.500,22.233 C18.150,22.233 22.233,20.782 22.233,19.742 C22.233,19.001 20.086,17.722 16.055,17.247 C15.845,17.223 15.695,17.032 15.719,16.822 C15.744,16.611 15.934,16.461 16.145,16.486 C20.181,16.961 23.000,18.300 23.000,19.742 C23.000,21.361 19.050,23.000 11.500,23.000 ZM11.432,20.990 L5.543,12.485 C3.346,9.556 3.665,4.723 6.234,2.153 C7.623,0.764 9.469,0.000 11.432,0.000 C13.396,0.000 15.242,0.764 16.630,2.153 C19.200,4.723 19.519,9.556 17.313,12.497 L11.432,20.990 ZM16.088,2.696 C14.844,1.452 13.191,0.767 11.432,0.767 C9.673,0.767 8.020,1.452 6.776,2.696 C4.457,5.014 4.171,9.379 6.165,12.037 L11.432,19.643 L16.691,12.048 C18.693,9.379 18.407,5.014 16.088,2.696 ZM11.500,9.967 C10.020,9.967 8.817,8.762 8.817,7.283 C8.817,5.804 10.020,4.600 11.500,4.600 C12.980,4.600 14.183,5.804 14.183,7.283 C14.183,8.762 12.980,9.967 11.500,9.967 ZM11.500,5.367 C10.443,5.367 9.583,6.227 9.583,7.283 C9.583,8.340 10.443,9.200 11.500,9.200 C12.557,9.200 13.417,8.340 13.417,7.283 C13.417,6.227 12.557,5.367 11.500,5.367 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                Riyadh{" "}
                        </span>{" "}
                              <span className="times">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={21}
                                  height={21}
                                  viewBox="0 0 21 21"
                                >
                            <path
                              d="M10.500,21.000 C4.710,21.000 0.000,16.290 0.000,10.500 C0.000,4.711 4.710,0.000 10.500,0.000 C16.290,0.000 21.000,4.711 21.000,10.500 C21.000,16.290 16.290,21.000 10.500,21.000 ZM10.500,0.700 C5.096,0.700 0.700,5.097 0.700,10.500 C0.700,15.903 5.096,20.300 10.500,20.300 C15.904,20.300 20.300,15.903 20.300,10.500 C20.300,5.097 15.904,0.700 10.500,0.700 ZM10.500,11.200 L4.900,11.200 C4.707,11.200 4.550,11.043 4.550,10.850 C4.550,10.656 4.707,10.500 4.900,10.500 L10.150,10.500 L10.150,2.450 C10.150,2.256 10.307,2.100 10.500,2.100 C10.693,2.100 10.850,2.256 10.850,2.450 L10.850,10.850 C10.850,11.043 10.693,11.200 10.500,11.200 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                12:00 am - 01:00 am{" "}
                        </span>
                            </div>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide"
                          data-slick-index={3}
                          aria-hidden="true"
                          style={{ width: 416 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide61"
                        >
                          {" "}
                          <a
                            title="View Knowledge Gathering: Supply Chain Management: Future Opportunities Following Covid-19 Pandemic"
                            href="#"
                            tabIndex={-1}
                          >
                            {" "}
                            <span className="date">
                        <strong>03</strong>March
                      </span>{" "}
                            <div className="event_info">
                        <span className="eventTitle">
                          Knowledge Gathering: Supply Chain Management: Future
                          Opportunities Following Covid-19 Pandemic
                        </span>{" "}
                              <span className="location">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={23}
                                  height={23}
                                  viewBox="0 0 23 23"
                                >
                            <path
                              d="M11.500,23.000 C3.950,23.000 0.000,21.361 0.000,19.742 C0.000,18.300 2.819,16.961 6.855,16.486 C7.066,16.460 7.256,16.611 7.281,16.822 C7.305,17.032 7.155,17.223 6.945,17.247 C2.914,17.722 0.767,19.001 0.767,19.742 C0.767,20.782 4.850,22.233 11.500,22.233 C18.150,22.233 22.233,20.782 22.233,19.742 C22.233,19.001 20.086,17.722 16.055,17.247 C15.845,17.223 15.695,17.032 15.719,16.822 C15.744,16.611 15.934,16.461 16.145,16.486 C20.181,16.961 23.000,18.300 23.000,19.742 C23.000,21.361 19.050,23.000 11.500,23.000 ZM11.432,20.990 L5.543,12.485 C3.346,9.556 3.665,4.723 6.234,2.153 C7.623,0.764 9.469,0.000 11.432,0.000 C13.396,0.000 15.242,0.764 16.630,2.153 C19.200,4.723 19.519,9.556 17.313,12.497 L11.432,20.990 ZM16.088,2.696 C14.844,1.452 13.191,0.767 11.432,0.767 C9.673,0.767 8.020,1.452 6.776,2.696 C4.457,5.014 4.171,9.379 6.165,12.037 L11.432,19.643 L16.691,12.048 C18.693,9.379 18.407,5.014 16.088,2.696 ZM11.500,9.967 C10.020,9.967 8.817,8.762 8.817,7.283 C8.817,5.804 10.020,4.600 11.500,4.600 C12.980,4.600 14.183,5.804 14.183,7.283 C14.183,8.762 12.980,9.967 11.500,9.967 ZM11.500,5.367 C10.443,5.367 9.583,6.227 9.583,7.283 C9.583,8.340 10.443,9.200 11.500,9.200 C12.557,9.200 13.417,8.340 13.417,7.283 C13.417,6.227 12.557,5.367 11.500,5.367 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                Virtual{" "}
                        </span>{" "}
                              <span className="times">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={21}
                                  height={21}
                                  viewBox="0 0 21 21"
                                >
                            <path
                              d="M10.500,21.000 C4.710,21.000 0.000,16.290 0.000,10.500 C0.000,4.711 4.710,0.000 10.500,0.000 C16.290,0.000 21.000,4.711 21.000,10.500 C21.000,16.290 16.290,21.000 10.500,21.000 ZM10.500,0.700 C5.096,0.700 0.700,5.097 0.700,10.500 C0.700,15.903 5.096,20.300 10.500,20.300 C15.904,20.300 20.300,15.903 20.300,10.500 C20.300,5.097 15.904,0.700 10.500,0.700 ZM10.500,11.200 L4.900,11.200 C4.707,11.200 4.550,11.043 4.550,10.850 C4.550,10.656 4.707,10.500 4.900,10.500 L10.150,10.500 L10.150,2.450 C10.150,2.256 10.307,2.100 10.500,2.100 C10.693,2.100 10.850,2.256 10.850,2.450 L10.850,10.850 C10.850,11.043 10.693,11.200 10.500,11.200 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                10:00 am - 03:00 pm{" "}
                        </span>
                            </div>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide slick-current slick-active"
                          data-slick-index={4}
                          aria-hidden="false"
                          style={{ width: 416 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide62"
                        >
                          {" "}
                          <a
                            href="#"
                            tabIndex={0}
                          >
                            {" "}
                            <span className="date">
                        <strong>16</strong><Translate contentKey={'landing.february'}/>
                      </span>{" "}
                            <div className="event_info">
                        <span className="eventTitle">
                          <Translate contentKey={'landing.webinar'}/>
                        </span>{" "}
                              <span className="location">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={23}
                                  height={23}
                                  viewBox="0 0 23 23"
                                >
                            <path
                              d="M11.500,23.000 C3.950,23.000 0.000,21.361 0.000,19.742 C0.000,18.300 2.819,16.961 6.855,16.486 C7.066,16.460 7.256,16.611 7.281,16.822 C7.305,17.032 7.155,17.223 6.945,17.247 C2.914,17.722 0.767,19.001 0.767,19.742 C0.767,20.782 4.850,22.233 11.500,22.233 C18.150,22.233 22.233,20.782 22.233,19.742 C22.233,19.001 20.086,17.722 16.055,17.247 C15.845,17.223 15.695,17.032 15.719,16.822 C15.744,16.611 15.934,16.461 16.145,16.486 C20.181,16.961 23.000,18.300 23.000,19.742 C23.000,21.361 19.050,23.000 11.500,23.000 ZM11.432,20.990 L5.543,12.485 C3.346,9.556 3.665,4.723 6.234,2.153 C7.623,0.764 9.469,0.000 11.432,0.000 C13.396,0.000 15.242,0.764 16.630,2.153 C19.200,4.723 19.519,9.556 17.313,12.497 L11.432,20.990 ZM16.088,2.696 C14.844,1.452 13.191,0.767 11.432,0.767 C9.673,0.767 8.020,1.452 6.776,2.696 C4.457,5.014 4.171,9.379 6.165,12.037 L11.432,19.643 L16.691,12.048 C18.693,9.379 18.407,5.014 16.088,2.696 ZM11.500,9.967 C10.020,9.967 8.817,8.762 8.817,7.283 C8.817,5.804 10.020,4.600 11.500,4.600 C12.980,4.600 14.183,5.804 14.183,7.283 C14.183,8.762 12.980,9.967 11.500,9.967 ZM11.500,5.367 C10.443,5.367 9.583,6.227 9.583,7.283 C9.583,8.340 10.443,9.200 11.500,9.200 C12.557,9.200 13.417,8.340 13.417,7.283 C13.417,6.227 12.557,5.367 11.500,5.367 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                <Translate contentKey={'landing.virtual'}/>{" "}
                        </span>{" "}
                              <span className="times">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={21}
                                  height={21}
                                  viewBox="0 0 21 21"
                                >
                            <path
                              d="M10.500,21.000 C4.710,21.000 0.000,16.290 0.000,10.500 C0.000,4.711 4.710,0.000 10.500,0.000 C16.290,0.000 21.000,4.711 21.000,10.500 C21.000,16.290 16.290,21.000 10.500,21.000 ZM10.500,0.700 C5.096,0.700 0.700,5.097 0.700,10.500 C0.700,15.903 5.096,20.300 10.500,20.300 C15.904,20.300 20.300,15.903 20.300,10.500 C20.300,5.097 15.904,0.700 10.500,0.700 ZM10.500,11.200 L4.900,11.200 C4.707,11.200 4.550,11.043 4.550,10.850 C4.550,10.656 4.707,10.500 4.900,10.500 L10.150,10.500 L10.150,2.450 C10.150,2.256 10.307,2.100 10.500,2.100 C10.693,2.100 10.850,2.256 10.850,2.450 L10.850,10.850 C10.850,11.043 10.693,11.200 10.500,11.200 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                10:00 am - 03:00 pm{" "}
                        </span>
                            </div>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide slick-active"
                          data-slick-index={5}
                          aria-hidden="false"
                          style={{ width: 416 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide62"
                        >
                          {" "}
                          <a
                            href="#"
                            tabIndex={0}
                          >
                            {" "}
                            <span className="date">
                        <strong>27</strong><Translate contentKey={'landing.january'}/>
                      </span>{" "}
                            <div className="event_info">
                        <span className="eventTitle">
                          {" "}
                          <Translate contentKey={'landing.future'}/>
                        </span>{" "}
                              <span className="location">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={23}
                                  height={23}
                                  viewBox="0 0 23 23"
                                >
                            <path
                              d="M11.500,23.000 C3.950,23.000 0.000,21.361 0.000,19.742 C0.000,18.300 2.819,16.961 6.855,16.486 C7.066,16.460 7.256,16.611 7.281,16.822 C7.305,17.032 7.155,17.223 6.945,17.247 C2.914,17.722 0.767,19.001 0.767,19.742 C0.767,20.782 4.850,22.233 11.500,22.233 C18.150,22.233 22.233,20.782 22.233,19.742 C22.233,19.001 20.086,17.722 16.055,17.247 C15.845,17.223 15.695,17.032 15.719,16.822 C15.744,16.611 15.934,16.461 16.145,16.486 C20.181,16.961 23.000,18.300 23.000,19.742 C23.000,21.361 19.050,23.000 11.500,23.000 ZM11.432,20.990 L5.543,12.485 C3.346,9.556 3.665,4.723 6.234,2.153 C7.623,0.764 9.469,0.000 11.432,0.000 C13.396,0.000 15.242,0.764 16.630,2.153 C19.200,4.723 19.519,9.556 17.313,12.497 L11.432,20.990 ZM16.088,2.696 C14.844,1.452 13.191,0.767 11.432,0.767 C9.673,0.767 8.020,1.452 6.776,2.696 C4.457,5.014 4.171,9.379 6.165,12.037 L11.432,19.643 L16.691,12.048 C18.693,9.379 18.407,5.014 16.088,2.696 ZM11.500,9.967 C10.020,9.967 8.817,8.762 8.817,7.283 C8.817,5.804 10.020,4.600 11.500,4.600 C12.980,4.600 14.183,5.804 14.183,7.283 C14.183,8.762 12.980,9.967 11.500,9.967 ZM11.500,5.367 C10.443,5.367 9.583,6.227 9.583,7.283 C9.583,8.340 10.443,9.200 11.500,9.200 C12.557,9.200 13.417,8.340 13.417,7.283 C13.417,6.227 12.557,5.367 11.500,5.367 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                <Translate contentKey={'landing.virtual'}/>{" "}
                        </span>{" "}
                              <span className="times">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={21}
                                  height={21}
                                  viewBox="0 0 21 21"
                                >
                            <path
                              d="M10.500,21.000 C4.710,21.000 0.000,16.290 0.000,10.500 C0.000,4.711 4.710,0.000 10.500,0.000 C16.290,0.000 21.000,4.711 21.000,10.500 C21.000,16.290 16.290,21.000 10.500,21.000 ZM10.500,0.700 C5.096,0.700 0.700,5.097 0.700,10.500 C0.700,15.903 5.096,20.300 10.500,20.300 C15.904,20.300 20.300,15.903 20.300,10.500 C20.300,5.097 15.904,0.700 10.500,0.700 ZM10.500,11.200 L4.900,11.200 C4.707,11.200 4.550,11.043 4.550,10.850 C4.550,10.656 4.707,10.500 4.900,10.500 L10.150,10.500 L10.150,2.450 C10.150,2.256 10.307,2.100 10.500,2.100 C10.693,2.100 10.850,2.256 10.850,2.450 L10.850,10.850 C10.850,11.043 10.693,11.200 10.500,11.200 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                11:00 am - 03:00 pm{" "}
                        </span>
                            </div>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide slick-cloned"
                          data-slick-index={6}
                          aria-hidden="true"
                          style={{ width: 416 }}
                          tabIndex={-1}
                        >
                          {" "}
                          <a
                            title="View The World Economic Forum (Davos)"
                            href="#"
                            tabIndex={-1}
                          >
                            {" "}
                            <span className="date">
                        <strong>04</strong>January
                      </span>{" "}
                            <div className="event_info">
                        <span className="eventTitle">
                          The World Economic Forum (Davos)
                        </span>{" "}
                              <span className="times">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={21}
                                  height={21}
                                  viewBox="0 0 21 21"
                                >
                            <path
                              d="M10.500,21.000 C4.710,21.000 0.000,16.290 0.000,10.500 C0.000,4.711 4.710,0.000 10.500,0.000 C16.290,0.000 21.000,4.711 21.000,10.500 C21.000,16.290 16.290,21.000 10.500,21.000 ZM10.500,0.700 C5.096,0.700 0.700,5.097 0.700,10.500 C0.700,15.903 5.096,20.300 10.500,20.300 C15.904,20.300 20.300,15.903 20.300,10.500 C20.300,5.097 15.904,0.700 10.500,0.700 ZM10.500,11.200 L4.900,11.200 C4.707,11.200 4.550,11.043 4.550,10.850 C4.550,10.656 4.707,10.500 4.900,10.500 L10.150,10.500 L10.150,2.450 C10.150,2.256 10.307,2.100 10.500,2.100 C10.693,2.100 10.850,2.256 10.850,2.450 L10.850,10.850 C10.850,11.043 10.693,11.200 10.500,11.200 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                10:00 am - 11:00 am{" "}
                        </span>
                            </div>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide slick-cloned"
                          data-slick-index={7}
                          aria-hidden="true"
                          style={{ width: 416 }}
                          tabIndex={-1}
                        >
                          {" "}
                          <a
                            title="View  Budget Forum 2022"
                            href="#"
                            tabIndex={-1}
                          >
                            {" "}
                            <span className="date">
                        <strong>13</strong>December
                      </span>{" "}
                            <div className="event_info">
                              <span className="eventTitle"> Budget Forum 2022</span>{" "}
                              <span className="location">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={23}
                                  height={23}
                                  viewBox="0 0 23 23"
                                >
                            <path
                              d="M11.500,23.000 C3.950,23.000 0.000,21.361 0.000,19.742 C0.000,18.300 2.819,16.961 6.855,16.486 C7.066,16.460 7.256,16.611 7.281,16.822 C7.305,17.032 7.155,17.223 6.945,17.247 C2.914,17.722 0.767,19.001 0.767,19.742 C0.767,20.782 4.850,22.233 11.500,22.233 C18.150,22.233 22.233,20.782 22.233,19.742 C22.233,19.001 20.086,17.722 16.055,17.247 C15.845,17.223 15.695,17.032 15.719,16.822 C15.744,16.611 15.934,16.461 16.145,16.486 C20.181,16.961 23.000,18.300 23.000,19.742 C23.000,21.361 19.050,23.000 11.500,23.000 ZM11.432,20.990 L5.543,12.485 C3.346,9.556 3.665,4.723 6.234,2.153 C7.623,0.764 9.469,0.000 11.432,0.000 C13.396,0.000 15.242,0.764 16.630,2.153 C19.200,4.723 19.519,9.556 17.313,12.497 L11.432,20.990 ZM16.088,2.696 C14.844,1.452 13.191,0.767 11.432,0.767 C9.673,0.767 8.020,1.452 6.776,2.696 C4.457,5.014 4.171,9.379 6.165,12.037 L11.432,19.643 L16.691,12.048 C18.693,9.379 18.407,5.014 16.088,2.696 ZM11.500,9.967 C10.020,9.967 8.817,8.762 8.817,7.283 C8.817,5.804 10.020,4.600 11.500,4.600 C12.980,4.600 14.183,5.804 14.183,7.283 C14.183,8.762 12.980,9.967 11.500,9.967 ZM11.500,5.367 C10.443,5.367 9.583,6.227 9.583,7.283 C9.583,8.340 10.443,9.200 11.500,9.200 C12.557,9.200 13.417,8.340 13.417,7.283 C13.417,6.227 12.557,5.367 11.500,5.367 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                Riyadh{" "}
                        </span>{" "}
                              <span className="times">
                          {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  preserveAspectRatio="xMidYMid"
                                  width={21}
                                  height={21}
                                  viewBox="0 0 21 21"
                                >
                            <path
                              d="M10.500,21.000 C4.710,21.000 0.000,16.290 0.000,10.500 C0.000,4.711 4.710,0.000 10.500,0.000 C16.290,0.000 21.000,4.711 21.000,10.500 C21.000,16.290 16.290,21.000 10.500,21.000 ZM10.500,0.700 C5.096,0.700 0.700,5.097 0.700,10.500 C0.700,15.903 5.096,20.300 10.500,20.300 C15.904,20.300 20.300,15.903 20.300,10.500 C20.300,5.097 15.904,0.700 10.500,0.700 ZM10.500,11.200 L4.900,11.200 C4.707,11.200 4.550,11.043 4.550,10.850 C4.550,10.656 4.707,10.500 4.900,10.500 L10.150,10.500 L10.150,2.450 C10.150,2.256 10.307,2.100 10.500,2.100 C10.693,2.100 10.850,2.256 10.850,2.450 L10.850,10.850 C10.850,11.043 10.693,11.200 10.500,11.200 Z"
                              className="cls-1"
                            />
                          </svg>{" "}
                                12:00 am - 01:00 am{" "}
                        </span>
                            </div>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                      </div>
                    </div>
                    <ul className="slick-dots" role="tablist">
                      <li
                        aria-hidden="true"
                        role="presentation"
                        aria-selected="true"
                        aria-controls="navigation60"
                        id="slick-slide60"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                      <li
                        aria-hidden="true"
                        role="presentation"
                        aria-selected="false"
                        aria-controls="navigation61"
                        id="slick-slide61"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                      <li
                        aria-hidden="false"
                        role="presentation"
                        aria-selected="false"
                        aria-controls="navigation62"
                        id="slick-slide62"
                        className="slick-active"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="project hblock animated fadeInUp go">
                  <div className="titl h1 font-weight-light">
                    <a
                      className="fixedTip text-success"
                      href="#"
                    >
                      <Translate contentKey={'landing.strategy'}/>
                      <span />
                    </a>
                    <span className="clr" />
                  </div>
                  <span className="clr" />
                  <div
                    className="project_slider slick-initialized slick-slider slick-dotted"
                    role="toolbar"
                  >
                    <div aria-live="polite" className="slick-list draggable">
                      <div
                        className="slick-track"
                        style={{
                          opacity: 1,
                          width: 3570,
                          transform: "translate3d(-2142px,0px,0px)"
                        }}
                        role="listbox"
                      >
                        <div
                          className="slick-slide slick-cloned"
                          data-slick-index={-1}
                          aria-hidden="true"
                          style={{ width: 714 }}
                          tabIndex={-1}
                        >
                          {" "}
                          <a
                            href="#"
                            tabIndex={-1}
                          >
                            {" "}
                            <div
                              className="projects_slider_img"
                              style={{ backgroundImage: "var(--sf-img-16)" }}
                            />{" "}
                            <span className="pdes">
                        <strong>
                          King Salman International Convention Center
                        </strong>
                        ​King Salman International Convention Center is in Al
                        Faisaliah district in the north-west of Madinah. It is
                        located about six kilometers away from the Prophet's
                        Mosque ... <span>More</span>{" "}
                      </span>{" "}
                            <span className="pdate">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          preserveAspectRatio="xMidYMid"
                          width={15}
                          height={17}
                          viewBox="0 0 15 17"
                        >
                          <path
                            d="M14.737,16.997 L0.269,16.997 C0.121,16.997 0.001,16.870 0.001,16.713 L0.001,4.534 L0.001,1.418 C0.001,1.261 0.121,1.135 0.269,1.135 L2.144,1.135 L2.144,0.285 C2.144,0.128 2.264,0.002 2.412,0.002 L4.288,0.002 C4.436,0.002 4.556,0.128 4.556,0.285 L4.556,1.135 L10.450,1.135 L10.450,0.285 C10.450,0.128 10.570,0.002 10.718,0.002 L12.594,0.002 C12.742,0.002 12.861,0.128 12.861,0.285 L12.861,1.135 L14.737,1.135 C14.885,1.135 15.005,1.261 15.005,1.418 L15.005,4.534 L15.005,16.713 C15.005,16.870 14.885,16.997 14.737,16.997 ZM4.020,1.418 L4.020,0.568 L2.680,0.568 L2.680,1.418 L2.680,2.268 L4.020,2.268 L4.020,1.418 ZM12.326,1.418 L12.326,0.568 L10.986,0.568 L10.986,1.418 L10.986,2.268 L12.326,2.268 L12.326,1.418 ZM14.469,1.701 L12.861,1.701 L12.861,2.551 C12.861,2.708 12.742,2.834 12.594,2.834 L10.718,2.834 C10.570,2.834 10.450,2.708 10.450,2.551 L10.450,1.701 L4.556,1.701 L4.556,2.551 C4.556,2.708 4.436,2.834 4.288,2.834 L2.412,2.834 C2.264,2.834 2.144,2.708 2.144,2.551 L2.144,1.701 L0.537,1.701 L0.537,4.251 L14.469,4.251 L14.469,1.701 ZM14.469,4.817 L0.537,4.817 L0.537,16.430 L14.469,16.430 L14.469,4.817 ZM5.360,8.061 L7.235,8.061 L7.771,8.061 L9.646,8.061 L10.182,8.061 L12.594,8.061 L12.594,10.611 L12.594,11.177 L12.594,13.160 L12.594,13.726 L12.058,13.726 L10.182,13.726 L9.646,13.726 L7.771,13.726 L7.235,13.726 L5.360,13.726 L4.824,13.726 L2.948,13.726 L2.412,13.726 L2.412,13.160 L2.412,11.177 L2.412,10.611 L2.412,8.061 L4.824,8.061 L5.360,8.061 ZM10.182,13.160 L12.058,13.160 L12.058,11.177 L10.182,11.177 L10.182,13.160 ZM10.182,10.611 L12.058,10.611 L12.058,8.628 L10.182,8.628 L10.182,10.611 ZM7.771,13.160 L9.646,13.160 L9.646,11.177 L7.771,11.177 L7.771,13.160 ZM7.771,10.611 L9.646,10.611 L9.646,8.628 L7.771,8.628 L7.771,10.611 ZM5.360,13.160 L7.235,13.160 L7.235,11.177 L5.360,11.177 L5.360,13.160 ZM5.360,10.611 L7.235,10.611 L7.235,8.628 L5.360,8.628 L5.360,10.611 ZM2.948,13.160 L4.824,13.160 L4.824,11.177 L2.948,11.177 L2.948,13.160 ZM2.948,10.611 L4.824,10.611 L4.824,8.628 L2.948,8.628 L2.948,10.611 Z"
                            className="cls-1"
                          />
                        </svg>{" "}
                              01/10/2018
                      </span>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide"
                          data-slick-index={0}
                          aria-hidden="true"
                          style={{ width: 714 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide70"
                        >

                            <span className="des">
                        <strong>Zamzam Well Renovation</strong>Following the
                        directions of the Custodian of the Two Holy Mosques,
                        King Salman bin Abdulaziz Al Saud, to develop the Two
                        Holy Mosques and serve their visitors and ensure their
                        comfort ... <span>More</span>{" "}
                          {" "}
                          </span>{" "}
                          <span className="pdate">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          preserveAspectRatio="xMidYMid"
                          width={15}
                          height={17}
                          viewBox="0 0 15 17"
                        >
                          <path
                            d="M14.737,16.997 L0.269,16.997 C0.121,16.997 0.001,16.870 0.001,16.713 L0.001,4.534 L0.001,1.418 C0.001,1.261 0.121,1.135 0.269,1.135 L2.144,1.135 L2.144,0.285 C2.144,0.128 2.264,0.002 2.412,0.002 L4.288,0.002 C4.436,0.002 4.556,0.128 4.556,0.285 L4.556,1.135 L10.450,1.135 L10.450,0.285 C10.450,0.128 10.570,0.002 10.718,0.002 L12.594,0.002 C12.742,0.002 12.861,0.128 12.861,0.285 L12.861,1.135 L14.737,1.135 C14.885,1.135 15.005,1.261 15.005,1.418 L15.005,4.534 L15.005,16.713 C15.005,16.870 14.885,16.997 14.737,16.997 ZM4.020,1.418 L4.020,0.568 L2.680,0.568 L2.680,1.418 L2.680,2.268 L4.020,2.268 L4.020,1.418 ZM12.326,1.418 L12.326,0.568 L10.986,0.568 L10.986,1.418 L10.986,2.268 L12.326,2.268 L12.326,1.418 ZM14.469,1.701 L12.861,1.701 L12.861,2.551 C12.861,2.708 12.742,2.834 12.594,2.834 L10.718,2.834 C10.570,2.834 10.450,2.708 10.450,2.551 L10.450,1.701 L4.556,1.701 L4.556,2.551 C4.556,2.708 4.436,2.834 4.288,2.834 L2.412,2.834 C2.264,2.834 2.144,2.708 2.144,2.551 L2.144,1.701 L0.537,1.701 L0.537,4.251 L14.469,4.251 L14.469,1.701 ZM14.469,4.817 L0.537,4.817 L0.537,16.430 L14.469,16.430 L14.469,4.817 ZM5.360,8.061 L7.235,8.061 L7.771,8.061 L9.646,8.061 L10.182,8.061 L12.594,8.061 L12.594,10.611 L12.594,11.177 L12.594,13.160 L12.594,13.726 L12.058,13.726 L10.182,13.726 L9.646,13.726 L7.771,13.726 L7.235,13.726 L5.360,13.726 L4.824,13.726 L2.948,13.726 L2.412,13.726 L2.412,13.160 L2.412,11.177 L2.412,10.611 L2.412,8.061 L4.824,8.061 L5.360,8.061 ZM10.182,13.160 L12.058,13.160 L12.058,11.177 L10.182,11.177 L10.182,13.160 ZM10.182,10.611 L12.058,10.611 L12.058,8.628 L10.182,8.628 L10.182,10.611 ZM7.771,13.160 L9.646,13.160 L9.646,11.177 L7.771,11.177 L7.771,13.160 ZM7.771,10.611 L9.646,10.611 L9.646,8.628 L7.771,8.628 L7.771,10.611 ZM5.360,13.160 L7.235,13.160 L7.235,11.177 L5.360,11.177 L5.360,13.160 ZM5.360,10.611 L7.235,10.611 L7.235,8.628 L5.360,8.628 L5.360,10.611 ZM2.948,13.160 L4.824,13.160 L4.824,11.177 L2.948,11.177 L2.948,13.160 ZM2.948,10.611 L4.824,10.611 L4.824,8.628 L2.948,8.628 L2.948,10.611 Z"
                            className="cls-1"
                          />
                        </svg>{" "}
                            03/10/2018
                      </span>{" "}
                          <span className="clr" />{" "}
                        </div>
                        <div
                          className="slick-slide"
                          data-slick-index={1}
                          aria-hidden="true"
                          style={{ width: 714 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide71"
                        >
                          {" "}
                          <a
                            href="#"
                            title="Details of Prophet's Mosque Expansion Project"
                            tabIndex={-1}
                          >
                            {" "}
                            <div
                              className="projects_slider_img"
                              style={{ backgroundImage: "url(data:,)" }}
                            />{" "}
                            <span className="pdes">
                        <strong>Prophet's Mosque Expansion Project</strong>​In
                        accordance with Royal Decree No. (3497) dated 24th April
                        2017, regarding the paving of the western squares till
                        the completion of the eastern section ...{" "}
                              <span>More</span>{" "}
                      </span>{" "}
                            <span className="pdate">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          preserveAspectRatio="xMidYMid"
                          width={15}
                          height={17}
                          viewBox="0 0 15 17"
                        >
                          <path
                            d="M14.737,16.997 L0.269,16.997 C0.121,16.997 0.001,16.870 0.001,16.713 L0.001,4.534 L0.001,1.418 C0.001,1.261 0.121,1.135 0.269,1.135 L2.144,1.135 L2.144,0.285 C2.144,0.128 2.264,0.002 2.412,0.002 L4.288,0.002 C4.436,0.002 4.556,0.128 4.556,0.285 L4.556,1.135 L10.450,1.135 L10.450,0.285 C10.450,0.128 10.570,0.002 10.718,0.002 L12.594,0.002 C12.742,0.002 12.861,0.128 12.861,0.285 L12.861,1.135 L14.737,1.135 C14.885,1.135 15.005,1.261 15.005,1.418 L15.005,4.534 L15.005,16.713 C15.005,16.870 14.885,16.997 14.737,16.997 ZM4.020,1.418 L4.020,0.568 L2.680,0.568 L2.680,1.418 L2.680,2.268 L4.020,2.268 L4.020,1.418 ZM12.326,1.418 L12.326,0.568 L10.986,0.568 L10.986,1.418 L10.986,2.268 L12.326,2.268 L12.326,1.418 ZM14.469,1.701 L12.861,1.701 L12.861,2.551 C12.861,2.708 12.742,2.834 12.594,2.834 L10.718,2.834 C10.570,2.834 10.450,2.708 10.450,2.551 L10.450,1.701 L4.556,1.701 L4.556,2.551 C4.556,2.708 4.436,2.834 4.288,2.834 L2.412,2.834 C2.264,2.834 2.144,2.708 2.144,2.551 L2.144,1.701 L0.537,1.701 L0.537,4.251 L14.469,4.251 L14.469,1.701 ZM14.469,4.817 L0.537,4.817 L0.537,16.430 L14.469,16.430 L14.469,4.817 ZM5.360,8.061 L7.235,8.061 L7.771,8.061 L9.646,8.061 L10.182,8.061 L12.594,8.061 L12.594,10.611 L12.594,11.177 L12.594,13.160 L12.594,13.726 L12.058,13.726 L10.182,13.726 L9.646,13.726 L7.771,13.726 L7.235,13.726 L5.360,13.726 L4.824,13.726 L2.948,13.726 L2.412,13.726 L2.412,13.160 L2.412,11.177 L2.412,10.611 L2.412,8.061 L4.824,8.061 L5.360,8.061 ZM10.182,13.160 L12.058,13.160 L12.058,11.177 L10.182,11.177 L10.182,13.160 ZM10.182,10.611 L12.058,10.611 L12.058,8.628 L10.182,8.628 L10.182,10.611 ZM7.771,13.160 L9.646,13.160 L9.646,11.177 L7.771,11.177 L7.771,13.160 ZM7.771,10.611 L9.646,10.611 L9.646,8.628 L7.771,8.628 L7.771,10.611 ZM5.360,13.160 L7.235,13.160 L7.235,11.177 L5.360,11.177 L5.360,13.160 ZM5.360,10.611 L7.235,10.611 L7.235,8.628 L5.360,8.628 L5.360,10.611 ZM2.948,13.160 L4.824,13.160 L4.824,11.177 L2.948,11.177 L2.948,13.160 ZM2.948,10.611 L4.824,10.611 L4.824,8.628 L2.948,8.628 L2.948,10.611 Z"
                            className="cls-1"
                          />
                        </svg>{" "}
                              02/10/2018
                      </span>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide slick-current slick-active"
                          data-slick-index={2}
                          aria-hidden="false"
                          style={{ width: 714 }}
                          tabIndex={-1}
                          role="option"
                          aria-describedby="slick-slide72"
                        >
                          {" "}
                          <a
                            href="#"
                            tabIndex={0}
                            className={"p-3"}
                          >

                            <span className="p-3 pdes text-dark">
                            <strong>
                              <Translate contentKey={'landing.theStrategy'}/>
                            </strong>
                              <Translate contentKey={'landing.theStrategyDetail'}/>
                             </span>{" "}

                            <span className="pdate p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          preserveAspectRatio="xMidYMid"
                          width={15}
                          height={17}
                          viewBox="0 0 15 17"
                        >
                          <path
                            d="M14.737,16.997 L0.269,16.997 C0.121,16.997 0.001,16.870 0.001,16.713 L0.001,4.534 L0.001,1.418 C0.001,1.261 0.121,1.135 0.269,1.135 L2.144,1.135 L2.144,0.285 C2.144,0.128 2.264,0.002 2.412,0.002 L4.288,0.002 C4.436,0.002 4.556,0.128 4.556,0.285 L4.556,1.135 L10.450,1.135 L10.450,0.285 C10.450,0.128 10.570,0.002 10.718,0.002 L12.594,0.002 C12.742,0.002 12.861,0.128 12.861,0.285 L12.861,1.135 L14.737,1.135 C14.885,1.135 15.005,1.261 15.005,1.418 L15.005,4.534 L15.005,16.713 C15.005,16.870 14.885,16.997 14.737,16.997 ZM4.020,1.418 L4.020,0.568 L2.680,0.568 L2.680,1.418 L2.680,2.268 L4.020,2.268 L4.020,1.418 ZM12.326,1.418 L12.326,0.568 L10.986,0.568 L10.986,1.418 L10.986,2.268 L12.326,2.268 L12.326,1.418 ZM14.469,1.701 L12.861,1.701 L12.861,2.551 C12.861,2.708 12.742,2.834 12.594,2.834 L10.718,2.834 C10.570,2.834 10.450,2.708 10.450,2.551 L10.450,1.701 L4.556,1.701 L4.556,2.551 C4.556,2.708 4.436,2.834 4.288,2.834 L2.412,2.834 C2.264,2.834 2.144,2.708 2.144,2.551 L2.144,1.701 L0.537,1.701 L0.537,4.251 L14.469,4.251 L14.469,1.701 ZM14.469,4.817 L0.537,4.817 L0.537,16.430 L14.469,16.430 L14.469,4.817 ZM5.360,8.061 L7.235,8.061 L7.771,8.061 L9.646,8.061 L10.182,8.061 L12.594,8.061 L12.594,10.611 L12.594,11.177 L12.594,13.160 L12.594,13.726 L12.058,13.726 L10.182,13.726 L9.646,13.726 L7.771,13.726 L7.235,13.726 L5.360,13.726 L4.824,13.726 L2.948,13.726 L2.412,13.726 L2.412,13.160 L2.412,11.177 L2.412,10.611 L2.412,8.061 L4.824,8.061 L5.360,8.061 ZM10.182,13.160 L12.058,13.160 L12.058,11.177 L10.182,11.177 L10.182,13.160 ZM10.182,10.611 L12.058,10.611 L12.058,8.628 L10.182,8.628 L10.182,10.611 ZM7.771,13.160 L9.646,13.160 L9.646,11.177 L7.771,11.177 L7.771,13.160 ZM7.771,10.611 L9.646,10.611 L9.646,8.628 L7.771,8.628 L7.771,10.611 ZM5.360,13.160 L7.235,13.160 L7.235,11.177 L5.360,11.177 L5.360,13.160 ZM5.360,10.611 L7.235,10.611 L7.235,8.628 L5.360,8.628 L5.360,10.611 ZM2.948,13.160 L4.824,13.160 L4.824,11.177 L2.948,11.177 L2.948,13.160 ZM2.948,10.611 L4.824,10.611 L4.824,8.628 L2.948,8.628 L2.948,10.611 Z"
                            className="cls-1"
                          />
                        </svg>{" "}
                              01/10/2018
                      </span>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                        <div
                          className="slick-slide slick-cloned"
                          data-slick-index={3}
                          aria-hidden="true"
                          style={{ width: 714 }}
                          tabIndex={-1}
                        >
                          {" "}
                          <a
                            href="#"
                            title="Details of Zamzam Well Renovation"
                            tabIndex={-1}
                          >
                            {" "}
                            <div
                              className="projects_slider_img"
                              style={{ backgroundImage: "var(--sf-img-17)" }}
                            />{" "}
                            <span className="pdes">
                        <strong>Zamzam Well Renovation</strong>Following the
                        directions of the Custodian of the Two Holy Mosques,
                        King Salman bin Abdulaziz Al Saud, to develop the Two
                        Holy Mosques and serve their visitors and ensure their
                        comfort ... <span>More</span>{" "}
                      </span>{" "}
                            <span className="pdate">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          preserveAspectRatio="xMidYMid"
                          width={15}
                          height={17}
                          viewBox="0 0 15 17"
                        >
                          <path
                            d="M14.737,16.997 L0.269,16.997 C0.121,16.997 0.001,16.870 0.001,16.713 L0.001,4.534 L0.001,1.418 C0.001,1.261 0.121,1.135 0.269,1.135 L2.144,1.135 L2.144,0.285 C2.144,0.128 2.264,0.002 2.412,0.002 L4.288,0.002 C4.436,0.002 4.556,0.128 4.556,0.285 L4.556,1.135 L10.450,1.135 L10.450,0.285 C10.450,0.128 10.570,0.002 10.718,0.002 L12.594,0.002 C12.742,0.002 12.861,0.128 12.861,0.285 L12.861,1.135 L14.737,1.135 C14.885,1.135 15.005,1.261 15.005,1.418 L15.005,4.534 L15.005,16.713 C15.005,16.870 14.885,16.997 14.737,16.997 ZM4.020,1.418 L4.020,0.568 L2.680,0.568 L2.680,1.418 L2.680,2.268 L4.020,2.268 L4.020,1.418 ZM12.326,1.418 L12.326,0.568 L10.986,0.568 L10.986,1.418 L10.986,2.268 L12.326,2.268 L12.326,1.418 ZM14.469,1.701 L12.861,1.701 L12.861,2.551 C12.861,2.708 12.742,2.834 12.594,2.834 L10.718,2.834 C10.570,2.834 10.450,2.708 10.450,2.551 L10.450,1.701 L4.556,1.701 L4.556,2.551 C4.556,2.708 4.436,2.834 4.288,2.834 L2.412,2.834 C2.264,2.834 2.144,2.708 2.144,2.551 L2.144,1.701 L0.537,1.701 L0.537,4.251 L14.469,4.251 L14.469,1.701 ZM14.469,4.817 L0.537,4.817 L0.537,16.430 L14.469,16.430 L14.469,4.817 ZM5.360,8.061 L7.235,8.061 L7.771,8.061 L9.646,8.061 L10.182,8.061 L12.594,8.061 L12.594,10.611 L12.594,11.177 L12.594,13.160 L12.594,13.726 L12.058,13.726 L10.182,13.726 L9.646,13.726 L7.771,13.726 L7.235,13.726 L5.360,13.726 L4.824,13.726 L2.948,13.726 L2.412,13.726 L2.412,13.160 L2.412,11.177 L2.412,10.611 L2.412,8.061 L4.824,8.061 L5.360,8.061 ZM10.182,13.160 L12.058,13.160 L12.058,11.177 L10.182,11.177 L10.182,13.160 ZM10.182,10.611 L12.058,10.611 L12.058,8.628 L10.182,8.628 L10.182,10.611 ZM7.771,13.160 L9.646,13.160 L9.646,11.177 L7.771,11.177 L7.771,13.160 ZM7.771,10.611 L9.646,10.611 L9.646,8.628 L7.771,8.628 L7.771,10.611 ZM5.360,13.160 L7.235,13.160 L7.235,11.177 L5.360,11.177 L5.360,13.160 ZM5.360,10.611 L7.235,10.611 L7.235,8.628 L5.360,8.628 L5.360,10.611 ZM2.948,13.160 L4.824,13.160 L4.824,11.177 L2.948,11.177 L2.948,13.160 ZM2.948,10.611 L4.824,10.611 L4.824,8.628 L2.948,8.628 L2.948,10.611 Z"
                            className="cls-1"
                          />
                        </svg>{" "}
                              03/10/2018
                      </span>{" "}
                            <span className="clr" />{" "}
                          </a>{" "}
                        </div>
                      </div>
                    </div>
                    <ul className="slick-dots" role="tablist">
                      <li
                        aria-hidden="true"
                        role="presentation"
                        aria-selected="true"
                        aria-controls="navigation70"
                        id="slick-slide70"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                      <li
                        aria-hidden="true"
                        role="presentation"
                        aria-selected="false"
                        aria-controls="navigation71"
                        id="slick-slide71"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                      <li
                        aria-hidden="false"
                        role="presentation"
                        aria-selected="false"
                        aria-controls="navigation72"
                        id="slick-slide72"
                        className="slick-active"
                      >
                        <button
                          type="button"
                          data-role="none"
                          role="button"
                          tabIndex={0}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <span className="clr" />
              </div>
              <div className="votingbar block animatedParent animateOnce">
                <div className="browsing hblock animated fadeInUp go">
                  <div className="title"> <Translate contentKey={'landing.popular'}/></div>
                  <span className="clr" />
                  <div className="browsinglinks text-success" id="tagged_words">
                    <a
                      className="big text-success"
                      href="#"
                    >
                      <Translate contentKey={'landing.citizen'}/>
                    </a>{" "}
                    |{" "}
                    <a
                      className="big text-success"
                      href="#"
                    >
                      <Translate contentKey={'landing.budget'}/>
                    </a>{" "}
                    |{" "}
                    <a
                      className="small text-success"
                      href="#"
                    >
                      <Translate contentKey={'landing.events2'}/>

                    </a>{" "}
                    |{" "}
                    <a
                      className="medium text-success"
                      href="#"
                    >
                      <Translate contentKey={'landing.eservices'}/>
                    </a>{" "}
                    |{" "}
                    <a
                      className="small text-success"
                      href="#"
                    >
                      <Translate contentKey={'landing.news'}/>
                    </a>{" "}
                    |{" "}
                    <a
                      className="small text-success"
                      href="#"
                    >
                      <Translate contentKey={'landing.fund'}/>
                    </a>{" "}
                    |{" "}
                    <a
                      className="medium text-success"
                      href="#"
                    >
                      <Translate contentKey={'landing.debt'}/>
                    </a>
                  </div>
                </div>
                <div className="voting hblock animated fadeInUp go">
                  <div className="title"><Translate contentKey={'landing.voting'}/></div>
                  <div className="t_conts vote">
                    <div className="ques">
                <span
                  id="ctl00_PlaceHolderMain_ctl00_lblQuestionText"
                  className="ques"
                >
                 <Translate contentKey={'landing.satisfied'}/>
                </span>
                    </div>
                    <div className="options">
                      <input
                        name="RadioGroup1"
                        type="radio"
                        id="RadioGroup1"
                        defaultValue="3b7454c7-8160-463a-9785-7fd0ea69a260"
                        className={"mr-1"}
                      />
                      <Translate contentKey={'landing.verySat'}/>
                      <div className="clr" />
                      <input
                        name="RadioGroup1"
                        type="radio"
                        id="RadioGroup1"
                        defaultValue="2df7a05a-5a40-4c85-ade6-30c254d01a3a"
                        className={"mr-1"}
                      />
                      <Translate contentKey={'landing.sat'}/>
                      <div className="clr" />
                      <input
                        name="RadioGroup1"
                        type="radio"
                        id="RadioGroup1"
                        defaultValue="8386f10a-a7ab-4f73-8d8b-c6af069567e4"
                        className={"mr-1"}
                      />
                      <Translate contentKey={'landing.partly'}/>
                      <div className="clr" />
                      <input
                        name="RadioGroup1"
                        type="radio"
                        id="RadioGroup1"
                        defaultValue="3a0e0251-7213-4f4c-9d8a-5eb345383acb"
                        className={"mr-1"}
                      />
                      <Translate contentKey={'landing.notSat'}/>
                      <div className="clr" />
                    </div>
                    <div className="vote_links" id="vote_links">
                      <a style={{ cursor: "pointer" }} onClick={()=>{toast.success("Thank you for your feedback")}} title="Vote">
                        <Translate contentKey={'landing.vote'}/>
                      </a>{" "}
                    </div>
                  </div>
                </div>
                <div className="implinks hblock animated fadeInUp go">
                  <div className="titl h1 font-weight-light">
                    <a
                      className="fixedTip text-success"
                      href="#"
                      title="View all links"
                    >
                      <Translate contentKey={'landing.links'}/>
                      <span />
                    </a>
                    <span className="clr" />
                  </div>
                  <span className="clr" />
                  <div className="ilinks">

                    <div
                      id="linksContent"
                      className="ilinks_slider slick-initialized slick-slider"
                    >
                      <ul className="text-decoration-none form-group" >
                        <li className="form-control border-0">
                          <a className={"text-decoration-none text-success h4 font-weight-light"} href={"https://www.governo.gov.ao/"}>
                            <Translate contentKey={'landing.govAngola'}/>
                          </a>
                        </li>
                        <li className="form-control border-0">
                          <a className={"text-decoration-none text-success h4 font-weight-light"} href={"https://www.minfin.gov.ao/PortalMinfin/#!/"}>
                            <Translate contentKey={'landing.finance'}/>
                          </a>
                        </li>
                        <li className="form-control border-0">
                          <a className={"text-decoration-none text-success h4 font-weight-light"} href={"https://www.bna.ao/#/pt"}>
                            <Translate contentKey={'landing.bank'}/>
                          </a>
                        </li>
                        <li className="form-control border-0">
                          <a className={"text-decoration-none text-success h4 font-weight-light"} href={"http://amchamangola.org/aipex/"}>
                            <Translate contentKey={'landing.agency'}/>
                          </a>
                        </li>
                        <li className="form-control border-0">
                          <a className={"text-decoration-none text-success h4 font-weight-light"} href={"https://www.sonangol.co.ao/English/Pages/Home.aspx/"}>
                            <Translate contentKey={'landing.sonangol'}/>
                          </a>
                        </li>
                        <li className="form-control border-0">
                          <a className={"text-decoration-none text-success h4 font-weight-light"} href={"https://parlamento.ao/#http://www.parlamento.ao/glue/AN_Navigation_home.jsp?/"}>
                            <Translate contentKey={'landing.assembly'}/>
                          </a>
                        </li>
                      </ul>


                    </div>
                  </div>
                </div>
                <span className="clr" />
              </div>
            </div>
          </div>
          <span className="clr" />
          <div className="topfooter">
            <div id="footermenu" className="noindex">
              <ul className="ful">
                <li><Translate contentKey={'landing.genServices'}/></li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.sitemap'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.mailing'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.openData'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.portalStats'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.natPlatform'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.experts'}/>
                  </a>
                </li>
              </ul>
              <ul className="ful">
                <li><Translate contentKey={'landing.communicate'}/></li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.social'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.sustain'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.comments'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.epart'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.visitor'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <Translate contentKey={'landing.society'}/>
                  </a>
                </li>
              </ul>
              <ul className="ful">
                <li><Translate contentKey={'landing.policy'}/></li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.charter'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.interim'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.privacy'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.terms'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.openDataPol'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <Translate contentKey={'landing.serviceLevel'}/>{" "}
                  </a>
                </li>
              </ul>
              <ul className="ful">
                <li><Translate contentKey={'landing.help'}/></li>
                <li>
                  <a href="#"><Translate contentKey={'landing.contact'}/></a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.compliant'}/>
                  </a>
                </li>
                <li>
                  <a href="#"><Translate contentKey={'landing.faq'}/></a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.secretary'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.branches'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.portalSer'}/>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Translate contentKey={'landing.personal'}/>
                  </a>
                </li>
              </ul>
              <span className="clr" />
            </div>
          </div>
          <span className="clr" />
          <div className="midfooter">
            <div>
              <span className="clr" />
            </div>
          </div>
          <span className="clr" />
          <footer>
            <div>
              <div className="fright">
                <Translate contentKey={'landing.browsed'}/>
                <br />
                <Translate contentKey={'landing.browsers'}/>{" "}
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  title="Google Chrome"
                />{" "}
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  title="Firefox"
                />{" "}
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAEbElEQVRIx53XaahVVRTA8d8571rv6Ysmsm48h7JuZckhqg9BmSUNljTYYJ0mLam0hIiSJgiaIIgG+mA0W3ZLaEYqoolspukaVhyaXk97aRQ2aOobbh/Ofnq0rvc9F1zYe+2z13/vtfdea91IE6lUa9vjAByFw7EfdsMwrEEXluJdfJilSWczm1ET4MmYgeMxvJkxfIdnsSBLk6+GBK1Ua6NwC6ajtTD0DzrxCzZgB4zGnlvY6sQdWZrMHxS0Uq0djocwPqh68CGexhtYjl7UEQcPHIRTMA1jC+YewpVZmqxpCK1Ua0egilFBtRS345ksTfqa+bZSrXXUmYvZUe4Fwd0zszT56z/QSrU2Dq8XVvoMrsrSpGsQZ7mZjF20bEpLvT6/pb9vTFDNz9JkzsB4HIAx7i0An8K52wKEH6cf+Moea39Pe+LSiqCaXanWzt8MKr+hU0L7Y8zN0mTDtgBXnnH8OatPm3zqexdNfL83brlCfvnghkq11gFxpVrbFZeEBfyBG7M0+W2osJ+mT933p+lTF6xvGXZ9pD+DrrP2f6HO4+GT/XA2lOSP/rAw8LL8XIcCG4FZuBZ74OIdn39r4xuNuANnYWfMqFRrj8SYHHbZg6eyNKkPAXgcXsE9Afgqnix+k6XJD3gpdA/EoSUcEhRdeHtQsKmTxmvf4Wr1eortg/pv3DR60eL1/zNlMS4M7YkxxoXOV8W31Ei6HnvgMn19r+vvn1kAwv2jFy3+uMG0ZWFRMKGEnQY20Ay4fNWqg/VsuMsv3W31d95kxAjiGL7FnVuZ+jdWoh17xvLLRJ4xGgO7u1v19d2sta0tmnEpE4/hn7XU6724ffSixSu3Mr0X60K7LQ4KaGuy0WmYYv16hg0Tz5wtOmISvT1vyEPn1qSlcBTrBt4mjGk0Y3l39+6YhxZRxIYcHJ0364NozN7XNbg8RWnH7qH9c4zvQ2d8pVprbzBpDpJN3ahTb888cXzCqLvv/1xzGW9TAlhWwqfy4DAKR8rfXXGXE3B16PbjYdzVMXLkN4OADchJhfaSGG/Kc+N2OGcLYCy/lcPxgTw+X9pRLg8aGAqCU0L3a3wUywPCZwMrGruwNmmjEyOXy+uja3BsR7n8Wke5POiIFWQedg3tJ7I0+S3O0uRXeYavY5eWyM0HPb10xHPLOtt33i4ulSKnd5TLd3aUy2uGCFOp1k7ERaH7rXDLozDYIj/LY0MN8ujI1njOkmkT1g0VVAAeIi8ExgbVrCxNHibk01CKzMWKCP3MXLG278G9Fn4xchuBR8trqgHgI+Fn404LH0/GQnnG0M8nMbdmafLiIGG74fKwgV2C+mV5FbL6f6GFVT6AfYJqHd6RlzBvYZXNq8FWVHAyzsT+BXML5VXI6iKjUd27D26Th75SYehPeUHdbVPdOya4sfjdz/Kndl+WJr1b2m9Y4VeqtUie8S/AcVsYbSQr8BwezdKkYaSKmlmpVGvDMQHHyP/LjJOnw1Jw/Up8iSVYkqXJd81s/gszcWHLMTOfHAAAAABJRU5ErkJggg=="
                  alt=""
                  title="Safari"
                />{" "}
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAdCAYAAAC5UQwxAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACxklEQVRIx5XWT6gWVRgG8N89N8X+3qt20xaNqYsQAitbFEYUwS1joE04lRJELVtEkEVtokWLNkH7rKCsCYqyaRO10BbRRUEpKiIMp0uKEVf7gxXabTHnxsd3Z86Mz+6b5znvM+ed873nmdCDusjXYRtux03IMB3pMziOIziIQ1lZnUzVm0gYrcVj2BmNhuAI3sbrWVmdGmxYF/lteAm3ttALsfAitmJti+YwnszK6uA4EVrM7sf+DrO9uBk7cG9s9Wstum14vy7ynckd1kWeYx8ubynyDnZnZXV+bM1FeCu2fhx/4KGsrD5aZlgX+SZ8hmtbFv6Me7Ky+qrjE2yKbZxuoY9jNiur78db+nSHGXzSZQZZWR3DBx30BjxXF3n437Au8q14uGPBeRzQj48T3H3imQh1kV+CR7CqQ7yAowMMv43aNkxFUwFbcHei0GkcG2D4K35M8DvqIp8O2I6rE8JTWVmdGWD4G04k+C24LuAGXJYQ/jLADM7GbnRhEtcHbIw/uvD7ELesrBajaQobA1b3iP4euMMh2jUBK3pEixdg2KddEQa0YdJwhB7+bMDJHtHFF2C4soc/ETR/2FTvrxjiVBf5xICX+y7gC+njPLM0B3uwSjNRurCAowFfSo+uK/Wf5KVOrE/wn2N+6Ru+mRBOYfMAwzWam6ELH2Zl9U+IF+p+fNMhnNZMoz5sxkwH9zUq4jGOs/LFDnHAHQMMZxPcK0uhavQwvKdJXG24qy7yG7uq1UW+XnvEoLmY946+vbjLv7AHcy2LrsKzMb+04Xmsa3l+GI+P5qBlMbEu8g2aULS9pcAbeAHzmjG2Gs/giZZac9iVldUPow+7cukMXsaDlo+rBRzCOc1hGr9L/8W7eCorq/nx2qnkPYkH8CjuNAwH8Cr2jcfJXsMR4ylN+J3FLbgGl0b6T/ykGR6fYi4rq9Opev8Bguy7TSBD90QAAAAASUVORK5CYII="
                  alt=""
                  title="Opera"
                />{" "}
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAbCAYAAACJISRoAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACoElEQVRIx63WW4hVVRzH8c/MnNSiIvLBLhJpuKEiVhfTLJgkoR6GICIMVkLahaCHAgnqMQgheoqeMrIIYpWkSDefKyyUhGkTEi2JoILUJ7MxdWhGH9YeqePeZ9SZ39s5/7X+37X/l/VfQwaoSvVVuBMPYBWW4UpM4zAO4Bt8lWP4ucvPUIfzHh7HM1hrdh3GJ3g7x3BgVkiV6qV4E492HWKAfsOrOYb3OyFVqpfjoyY0F6vTeCXH8MY5kCrV12IXVndsnsIERnD5LKApbMwxfHgWUqV6BB/gib7FR/GFktxfcLyBLMa92IQlHaBDGM0xHOw1fzzSB/gdW7ENJzGdYzjW5+TzKtWpCe+tLZBr8BKeG65SvQjPNoZJvIv7cwxbcAPews1tR80x/IjNONXxNWNVqm/p4S6sw5/YnGP4uAnhhgaQcgz7BsT/W+zDaIvteqwbxsP4C+v/A3gS72EB3hmU4RzDcewfsOTuHm7DUzmGPQ1gJV7HJfgVS6pU3667Z07jigGQFT1szTF81gAW4eUmabAc25VrpAsybXBJL+tvxvvwtVKm86bhvt9j8w1og6y+KC+zaKYZValeiKV99hP4AX+3HOjCIUo1LeyzT+BFjLvwG7kVMol/+uyLcWOO4fu5hOtsCHIMk/ijxf50U9pzhzT6rmXNQ3itydl5qUr11VWq76lSPcS5Q2uVcq23Odyh3GX7cwwnWhyPoMIaPI+JHMNa/p8TSoI/xfoWyGN4EONVqn/CEWUMLFBmyk1YoTw2YPfMxrYZf4cyqK6bSx6wO8cw1pYTOYZxvKD0yLyotcFyDDuV0XpoDr4vHQhpQNuVytqpe/K16RT2Ks8qnGcXV6keVR57a5QkX6ZcpFNKEx9rvnovvsSeHMO/M/vPAPuiu69GqSEgAAAAAElFTkSuQmCC"
                  alt=""
                  title="Internet Explorer"
                />
              </div>
              <div className="fleft">
                <Translate contentKey={'landing.rights'}/>
                <br />
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAB7klEQVRIx7WWP2sUURTFf/e5JBAtQoibpBAEsRGLgCAWtkK0yQdIxO9hYafgJxAEJWDlJzD4rxAUBItArCVddnfWRCIBE9wci30jb+9OJrPZzIVhZ+5775x7zr53Z0zSLjBNPfErAAc1gQMcBKBTI0G7boJO7QQNoO2SL4AnpwR8BDzwBF7Bnpn9OA26pL0qFjXHsGTePbcbQOaSc0lFl4HngFUkWPQKGkCrRMEkcGcMRZ1QoCAlyEYAK4rMJE0B+0nyLzBhZoo2rQDnK4DNAo9dbooIsq/BuDhqqZIWHMZvgBDHt938kQlINkeMFkAjPnSBK8ngQ0mbFUC/mdmHY4r6mRL4nbRSseqXQE7gz8B2alHXDT4FZuL1qoQgbTNeQbdMwaGZ7QKcYFXaBXwHGFDg9/tCcv8G+Ar0klwP+AK8LSEoVTCb35jZd+CWpBn6p7oHfDSzHbfmxF2UxlVJwcyOEqId4HWRT5ICcKlIQT7huoZjS9IzSffiafegFyQtxzlbBeuvQeySkpoMv3jS+AN8Ataj6iXgNjBRsqZpZllOEIBD4BxnE//7WYj+HjF+50wjy5tlSJKrwBrjfQS0Isb9PDH0pop23aDv813gZol1PeAz/f9mHdjIKz+WoIAw3/9L8VfA+wj4ruA8DMQ/SXLyIdFyu1oAAAAASUVORK5CYII="
                  alt=""
                />{" "}
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAXCAYAAABAtbxOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAD70lEQVRYw62YWWxVVRSG17YoUDCFMoVgLMhgBIJFiS+IkpYHJlOGB5AXQSzxQU00mIBBNCEqjX0xECBU0dA0FUIIQ4gGAmGSVEFIDIggRhyoTEIhIN7a8vFw9g2ry33OubftSu7DWf+3pnv2GfZxwAIRWSwizRLZy865E2IM6CkiR0Sk1bt2OueWS4oB1SJSnsYZKxCRcufcFZOrWESmichYEbklIntEpME595/X+/m4LwUYCWS4b+sTmvxWcRngoZShCmmf3QF6mVyjgMMB9lOg0DNfAE1Al2xQvQKbgO4xjZabpC+kDDbP8L8Cp8zvO6DVcHNNnn4+Ns42AqXquHc2cJIBZ8U02gX4U3HbUgbbq9hG4HHgMfUrAaabwTYF8mxS+u/AR0AlsAQ4qvwAO4AHs4EOuKyCdyU0W624FuDhGK4/cFexHweYAuAPxVwEuhlmuNK/BvoavQioUkyxLbJKic1AUUzD+8zZnR/DvW64UQFmp2GeDzDveu2HlNWxBagKCaWmSGWAGRpY34diCh1XzKmAvsjkWRmT56DXn5D2GnBWFWoI6CsCg90FHjHcMMO8ZnR7J96W0FMGON/uoXySd0xDJUb/jbAtM9xKM3ix0U8rvRWYkNATwIcdHWywaXip0p5R/jO0vSbPKs4BF5S229RYHTjjTf4aGRvo6QYws0OD+UT6IXxa+dcpfw3RHU3fpks996xpfI7Jfwb42zdsLYN51PhrbGpnDPZKaDkC15RvhvfpO+Qn3rdB+W4CPUz+0UAZMAVY6M+UthbUjQJYTsxzNd/BCoF/VKGXgEHq+Cr+VQp4Ufl/8rGNylebQ72uvnlt+5Q+EhjX4cF8ss2qyDfAVnW8VnHd1J/QDNSZBifmUfO4iX1UaQWdNdhk4m2cYetjuEt51nzbxM/uyAwPxPj3isi1gP+8c+6Y8dXE5KjLs5e/zHGfTh/M72/qA9LnAd9+EbkY8H+WZy89zXEvwOU7EDAA875pgacCy6skhv3AcD8afQTRm/iYhHrbTY4xQIW+1nIYagRwEhiQBv6iCjUkcMNNU28p7X3gtvd/j7n9e+ZJ2u4EGr3/OaCBaGec1utA4JyPH50Gv6eKVaawJzzXAvRX/jIz9FfA00Tbmr5EbzT2VW2Biq8G/gXGk91nta1bBMzi/vZnN9FnjMRmh6hivVPY7DZlT0B7wzR+CzhAtBHNGG1HIL7Wa3VED/UKYAawGNilYg9jPikkNXwH+DkHro9P/mqMXglcJ9nW479fBOKXKq6F/39OWKNXSi6DrQDezJGtSVrffgVUEX3nuABcIvruUQtMDS01Ez+MaOdwhOhN56j/M8owD/F7tu05DtdwJp0AAAAASUVORK5CYII="
                  alt=""
                />{" "}
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />{" "}
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />{" "}
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
              </div>
              <span className="clr" />
            </div>
          </footer>
        </form>
        <div className="remodal-bg remodal-is-closed" />
      </>

    </>
  );
}

export default Landing;
