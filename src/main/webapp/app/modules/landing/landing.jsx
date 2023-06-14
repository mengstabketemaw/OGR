import React, {useEffect, useState} from 'react';
import Header from 'app/shared/layout/header/header';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import refineryImage from './assets/refinery2.jpg';
import individualIcon from './assets/individual.png';
import businessIcon from './assets/businessIcon.png';
import {MDBCarousel, MDBCarouselItem} from "mdb-react-ui-kit";
import {Col} from "reactstrap";
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
import './landing.css'



const Landing = () => {
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
        <style
          dangerouslySetInnerHTML={{
            __html:
              ''
          }}
        />
        <link
          rel="shortcut icon"
          href="data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8B////Af///wH///8B////Af///wFdZxYLYGwaNWFuG0ldZxcR////Af///wH///8B////Af///wH///8B////Af///wFfahgHYGoYLWFtGj9fahlJYWwbPWh7IyVqgSZRYnAda15nFx1faRgtX2oYJf///wH///8B////Af///wH///8BXmcWG2NyHTtqgiZFaYAjbWqCJHVqgCNJbIUiF2uEI21meCJjaHwjLWR0Hk1eaBcd////Af///wH///8B////AV1mFidmeCNHaoElNW6IITFwlCRfcJYmg2+UJFlwkyNXbYcjaWuEJhlofiNnXmcXOf///wH///8BXmkXBV9qGDtldh9va4QkZ22LIl9xnCh3drQwT3e8MzV2uzFPdbMxWXGZJnVuiSAza4QkZ2JuHFVdZhYZX2kYBV9qGDVneyNRbIUmPW6LIDlynidndLkyS16IFhVcgRID////AWKSGxd2uDJZcZolZ2yJI2VofSQ3ZHQePWBqGClfahgpZ3khK2qBI0FvjyRvdbYxZf///wFEQwAVRkkAhUVHAHn///8BaJ4gD3WxMHlujCJha4MlE2h+JFNfahk5XWYWBWJvHU9shiR/cp0nbXS3MDX///8BR0oACU1aAENOWwA7RUQAC////wF2uzBZcZUkS22II1Fjch5xXWYWC15nFxlldiB9boojPXGYJVV1ujFT////AUZHAA1NWgBzTVkAZf///wH///8BdbcxRXCXJW9rgiR5YWwbQf///wFgbBpFaoEmR2qCIxtvkCNndLIwaf///wFLVQEFREMA70NBAM3///8BcrktE3KpLHNuiyNhaoAkMWV3IDFfaRglYGsZL2V1HzVofSVFbYsiY3GcJV91uDFdZ54hC////wH///8BaqclD3S2Ml9xmCRjbYkhN2uFJ0FmeCFVX2kYKV9pFwVdZhYbY3EeX2yGJF1uiiA5cJond3WxL1l2uzFHd7szM3StLV9vliVvbYoiX2qCJG1kdB5pXmkYLf///wH///8B////AV9qGEdqgCVdaoIlH22JI2twlCNNcJMlZXCWJn9wkiNbbYYhLWqBJjFldSBHXGQVHf///wH///8B////Af///wFeaBcnZXYgTWd7Iy9meSJrbIUkaWuDIhVqgCNPaoEjd2mAJGlqgCVBYm8cPV5nFhH///8B////Af///wH///8BX2oYBV9pGClfaRgnXmcXIWRzHm1qgidDZnkiK2BrGjlfaxlDYW0aO19qGCX///8B////Af///wH///8B////Af///wH///8B////Af///wFeaBYXYm4bT19rGTFeZxYF////Af///wH///8B////Af///wH///8BAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w=="
        />
        <style
          dangerouslySetInnerHTML={{ __html: ".sf-hidden{display:none!important}" }}
        />
        <link
          rel="canonical"
          href="#"
        />
        <meta
          httpEquiv="content-security-policy"
          content="default-src 'none'; font-src 'self' data:; img-src 'self' data:; style-src 'unsafe-inline'; media-src 'self' data:; script-src 'unsafe-inline' data:; object-src 'self' data:; frame-src 'self' data:;"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: 'img[src="data:,"],source[src="data:,"]{display:none!important}'
          }}
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
                        Empowering Angola's Oil and Gas Industry
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

                            Empowering Angola's Oil and Gas Industry
                          </h1>
                          <h1
                            style={{
                              fontSize: "1.2vw",
                              fontWeight: "bold",
                              marginBottom: "1rem",
                              color: "white",
                            }}
                          >
                            Elevating the Energy Sector to New Heights
                          </h1>
                          <h2
                            style={{
                              fontSize: "1vw",
                              fontWeight: "bold",
                              marginBottom: "1.5rem",
                              color: "white",
                            }}
                          >
                            Regulatory Excellence
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
                    <img src={individualIcon} alt="Individuals Services" /> Individuals Services
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
                        More ...
                      </a>
                    </div>
                  </li>
                  <li>
          <span className={"pb-3"} >
            <img src={businessIcon} alt="Business Services" /> Business Services
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
                        More ...
                      </a>
                    </div>
                  </li>
                  <li>
          <span className={"pb-3"} >
            <img src={govServices} alt="Government Services" /> Government Services
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
                        More ...
                      </a>
                    </div>
                  </li>
                  <li>
          <span className={"pb-3"}>
            <img src={newService} alt="New Services" /> New Services
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
                        More ...
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
                  <div className="title">
                    <a
                      className="fixedTip"
                      href="#"
                      title="View news archive"
                    >
                      News
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
                        <h5 className={"text-white h-100 w-100"}>APPO Secretary General to Deliver Keynote Address at MSGBC Oil, Gas & Power 2023</h5>
                        <p className={"text-responsive h-100 w-100"}>Dr. Omar Farouk Ibrahim, with his extensive experience in African governance...</p>
                      </MDBCarouselItem>
                      <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={2}
                        src={news2}
                        alt='...'
                      >
                        <h5 className={"text-white h-100 w-100"}>Government Not Looking at Raising Oil and Gas Stakes, Clarifies Angolan Minister</h5>
                        <p className={"text-responsive h-100 w-100"}>Angola’s Minister of Mines and Energy reiterated that the government is not looking at...</p>
                      </MDBCarouselItem>
                      <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={news3}
                        alt='...'
                      >
                        <h5 className={"text-white h-100 w-100"}>Angola, Technip Energies Ink Cooperation Agreement During Invest in African Energy Forum in Paris</h5>
                        <p className={"text-responsive h-100 w-100"}>Ministry of Hydrocarbons signed a cooperation agreement with Technip Energies...</p>
                      </MDBCarouselItem>
                    </MDBCarousel>
                  </Col>
                </div>

                <div className="nb_left animated fadeInUp go">
                  <div className="informatic hblock">
                    <div className="title">
                      <a className="fixedTip" title="View All">
                        Information Platforms
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
                    <div className="title">
                      <a
                        className="fixedTip"
                        href="#"
                        title="Review all announcements and circulars"
                      >
                        Ministry Circulars
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
                              title="View The MOF Announces Offering Lease of Lands in the Eastern Province for Auction "
                              tabIndex={-1}
                            >
                              {" "}
                              <span className="elanTitle">
                          The MOF Announces Offering Lease of Lands in the
                          Eastern Province for Auction{" "}
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
                              title="View The MOF Announces its Desire to Rent Shop for Buffet Activity and Document Photocopying in Taif"
                              tabIndex={-1}
                            >
                              {" "}
                              <span className="elanTitle">
                          The MOF Announces its Desire to Rent Shop for Buffet
                          Activity and Document Photocopying in Taif
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
                      <a
                        href="#"
                        title="View Budget Statement  Fiscal Year 2023"
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
                      </a>
                      <a
                        href="#"
                        title="View Debt Management Office"
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
                      </a>
                      <a
                        href="#"
                        title="View  GFS"
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
                      </a>
                      <a
                        href="#"
                        title="View اعتماد etimad"
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
                      </a>
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
                      Budget 2023
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
                        Document Library
                        <span />
                      </a>
                      <span className="clr" />
                    </div>
                    <span className="clr" />
                    <div className="grid-container" id="docsCategories">
                      <a
                        title="View Regulations and Instructions"
                        href="#"
                      >
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA7CAYAAAFd4KkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MkIxMDZFMENBMDMxMUU4OUFBQUMzQkE0NkI5MEUxRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3MkIxMDZFMUNBMDMxMUU4OUFBQUMzQkE0NkI5MEUxRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyQjEwNkRFQ0EwMzExRTg5QUFBQzNCQTQ2QjkwRTFEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjcyQjEwNkRGQ0EwMzExRTg5QUFBQzNCQTQ2QjkwRTFEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++bj7TwAAB9VJREFUeNpi/P//PwM+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"
                          alt="homedoc0"
                        />
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA7CAYAAAFd4KkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyM0Q1QjYyMkNBMDMxMUU4QUQ3QTgzN0EyNTVGNzZGMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyM0Q1QjYyM0NBMDMxMUU4QUQ3QTgzN0EyNTVGNzZGMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzRDVCNjIwQ0EwMzExRThBRDdBODM3QTI1NUY3NkYwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIzRDVCNjIxQ0EwMzExRThBRDdBODM3QTI1NUY3NkYwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+uVdqiwAABlBJREFUeNpi/P//PwM+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"
                          alt="homedoc_hover0"
                        />
                        <span>Regulations and Instructions</span>
                      </a>
                      <a
                        title="View Contracts and Projects"
                        href="#"
                      >
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA7CAYAAAFd4KkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNDlGRDZBM0NBMDIxMUU4QkRBQkE0NTgxNEIwMzgxOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNDlGRDZBNENBMDIxMUU4QkRBQkE0NTgxNEIwMzgxOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY0OUZENkExQ0EwMjExRThCREFCQTQ1ODE0QjAzODE4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY0OUZENkEyQ0EwMjExRThCREFCQTQ1ODE0QjAzODE4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hLuLsQAAB4BJREFUeNpiZAACpx3N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"
                          alt="homedoc1"
                        />
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA7CAYAAAFd4KkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMzZEMEIwMkNBMDMxMUU4QTJCQjkyQkIzMkY3MTA0MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMzZEMEIwM0NBMDMxMUU4QTJCQjkyQkIzMkY3MTA0MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzNkQwQjAwQ0EwMzExRThBMkJCOTJCQjMyRjcxMDQwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAzNkQwQjAxQ0EwMzExRThBMkJCOTJCQjMyRjcxMDQwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+nWSnJwAABtNJREFUeNpi/P//PwMQ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"
                          alt="homedoc_hover1"
                        />
                        <span>Contracts and Projects</span>
                      </a>
                      <a
                        title="View Ministry Models"
                        href="#"
                      >
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA7CAYAAAFd4KkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNTVERTQ4OENBMDIxMUU4QjQxRjlERDE4QkMwNTc1NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNTVERTQ4OUNBMDIxMUU4QjQxRjlERDE4QkMwNTc1NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1NURFNDg2Q0EwMjExRThCNDFGOUREMThCQzA1NzU0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM1NURFNDg3Q0EwMjExRThCNDFGOUREMThCQzA1NzU0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+nDFQjgAABG1JREFUeNpi/P//PwM+wAIinHe2PABSG5DEN+3zqN0H1gwinHY0P0DXCRTzw6sABEByLGi6HGBsoBUH4G5AAg1IbAdsCuzRrWEE2cPIyIjVHXvdaxQAAogRXzjAwgCkYiJUjB3ouExk7/1H8oEAzGsYklj9DVQAcjEjlHsYiP8ie6kRiV0BxCdYcPjVDiTJhCTwEAlngQQAAghsMb4IwRVJIMyEFlFYQwzmfSDthBGIxACYwUCaARYqRGkGxsgHpGAEursGTDExUACoplmeVM0AAcRIKGsSjC9SQhtbRpyAQ08+MKQZsToVlMXw2PQAFg4gAzBSFIG4JcvG/2gZnZGkwIEa8oEkp2ItPbCY6oDDnwfIikdkp+Ky8QAOGx1oZuN/gnGJVB79J8tGkGlEFmZ8IAIggDCyFbRgpxqAeQ/ZHmzh8xCoUAHo8gQy7LgM1HuWUDjjKzTno2coAmEOKtIvAGlQ7nUGVf0kpXZqBCe+BEJy3YIGYoGWLCHCcn9Qwwcj6aJXqcQmZVKSOwxT6lN8oBjo2z6KgpeUREVWsYnDpxtINLsB6NALlPo0YCB8qo/SwCEMLgId+p9Sn16klk+ZGAYAMGHxkQKtLSW/8UYBAAigAbGUhZZ1KRAkAqNrAcH6lFolDzCLLSC1IacCpGzIqNYWUFI4gCzMB+KDJNiZD3TsNKDFXJSUSAeBBhSQEJwgR04C0t8IWUzVwgFoWQXMYrqWSDCLgTiersUg1OJOIJ5FdoEPDK69IIqU7AWyGNRXB+JfQDYbyZYCNTlT0qQBWQyk2KjeBMXna3THDEjVRmycHia1hMLnc2Lj1JamlfhgCl5BIKVPgrk/gaFznNLWYDAQ+5Bg6V+oHoridA6QmjMi4rQQ2t0jOnjxlWLExulMIN5PSkKi2KdAV4PqxwsjIk5Bec6C3sWgJU2LQWg1NJ9uHShQkECDJXGg4jQJ6OsAWlg6IB0ogAAbEEsHXTaF9hxBtdSTQeZuESDmRu6JwgCuiCOmaHhCj1EIMnq+8VQveJEsSKB1UYUEvoPaR/hGqmnmUSQwkZTOMomBCRqSfw/EnEC8F8inioeZBnH58RBa70yCevgb+hTzcPEovFuN5mFQc89y2HkUi4f7gVgNKixK6zyKK3+BBqtUGQgPt38HOvomBSM2oMGTDiDdBaRbgXQIUHwT3TwKBOlEdnV+Ax0ImiO6hEcNF4Gm2QkgDmSADF1uBKr9DfIwA/KsGq08CnR4PzRpUQJAI00LoWxi2qAPoeqjQB7GlZpYBmFeBHULE8jINqBA4adXHk0hcRCEVABqjjbjmiykZx5dC8R3aOhRULK+TM+WEa5kB2rRHBiM1dOQqUcHqq2LK4+SPPhMBsC5dIGeSdd2sMboiEm6o3mUzDyKddKPyiAXmEWmDHQedR5NusMs6UoBKTMat4z2AlPOz4FuAoLqUC8at3XvAvFNWnhUCGk5uRaBPLoKSK0aikkXfUKEZ1jmUfRRcOg+jeSRVBjlQxc2DRkAAK1bL306pXtjAAAAAElFTkSuQmCC"
                          alt="homedoc2"
                        />
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA7CAYAAAFd4KkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMkEzNjYyMENBMDIxMUU4OTI4OUQ3MDk4MTMzN0ZERSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMkEzNjYyMUNBMDIxMUU4OTI4OUQ3MDk4MTMzN0ZERSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUyQTM2NjFFQ0EwMjExRTg5Mjg5RDcwOTgxMzM3RkRFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUyQTM2NjFGQ0EwMjExRTg5Mjg5RDcwOTgxMzM3RkRFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+h2wojgAAA99JREFUeNpi/P//PwM+wAKlHwDxBiTxTUC8D8wCmQDED6A0MvYDm45HARizoFnpgMQ+gOwGGGjAUIxmBTIAyzEiefMBFl8qAAQQI75wgNkPUjERymYH4kxku/8jeUkA3V4QwYjLWBCwR1JwGIj/Ius8iKSwAohPMGDxJwiUodv5EN2fAAGEHhAKDCQAJjQ+rhATgNJOuHxLCCAbzEiK5g/YwpmJgQJAkWbk0P6P7B9iAEAAMRLKmtRy8n9cUTQBh4Z8dG8Q61RQipNHDgdSnEqWjeiKGFnIsO0DRQkBl40OOMQPUJIAQE4VYCFkMi6XUN3G/4RClwVNMSOxuYQFzbQHRDiVD0QABBA2P/5noC5gJCYNPIQWvwlkWHAZiM8S9ACWyvYBltqKGCwA1QsCTvjMYGGgPmAkFE1MJJZ26DiGgOWMUHV+5FZojERkIgUc+j4g1agU+xQfLiK1BCPHpxQXm9jABhLNBjUgL1BqacBA+FSfxCC+iCvbsJBoCFUAE8MAAGyWKtDaUrIbb5QAgAAaEEuZKCx1COEEYlMvtUqeBaTmUxUgtqGmRcRYagNthx8kwUKQ+mlAzEVJiQSysIBESycB8TdCFlO75VABpUEWr6KXpcgWl+NqcrPQKCvCLJ6FLXERa+le9I47EdkLZvEvIGYjx1JnMgYGkAGKxdQMXkZiHTNoqjZs4DAZ5S7F+dR2IHxKVUCsTwWhDTNiwU8gPk6ppcFA7EOCpX+heiiydA4UD/84LQRifxKD15lSS2cC8X4SExLFPv2GqzM0pFv42MDxgSgGLWntU5Ar59MzeGEjIokDlU+TqNn7HvAOFECADYilg7Ho/Q8tRp8MMneLADE3NL0voIZHGaCeVBhkHgV5Lp6WpX0CDcYHcOFvOPoxdK3WJiIVl9TGglA7OKGdNqp4mGkQlx8PoR6fRA0PD2aPInerkT38k5zmxFDwKLqH+4FYDSomSu2WPbEANFilykB4XPE7EN+kwMMg3AHEXUDcCsQhDJDVNXTzaDqRXZ3fQFwMxJcIBBq+ptkJIA5kgIwKboSaidPDhFpGsBUuCkjVy3xoqVtAoyQK8uA0MvRFATErrtTEMgjz4jcG8qamQbHPT6+km0LiIAipANQcbSanf0xtj64F4js09ChoAPUyLcdTiAXvGXCvUxlQMJTq0UHlUXIGn6m2dIGeSdd2pMQow6hHh5lH99Ihj+YMhjzqPJp0BxhQO0algNiMxi0jWOd7QD0KWvHhReO27l1y+rLEeFSIAbGcXIuA2lUMeBZsDOakiz4hwjNc8+gCLGLJI6kezWeg30A2sZgfn4MBcrFLMVPXnooAAAAASUVORK5CYII="
                          alt="homedoc_hover2"
                        />
                        <span>Ministry Models</span>
                      </a>
                      <a
                        title="View Statistical Data"
                        href="#"
                      >
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA7CAYAAAFd4KkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozM0M1RURDRkNBMDIxMUU4OUIxN0Y1NzJGRDNEOUU2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozM0M1RUREMENBMDIxMUU4OUIxN0Y1NzJGRDNEOUU2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMzQzVFRENEQ0EwMjExRTg5QjE3RjU3MkZEM0Q5RTY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMzQzVFRENFQ0EwMjExRTg5QjE3RjU3MkZEM0Q5RTY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3cxFDgAABxhJREFUeNpiYMABnHY0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"
                          alt="homedoc3"
                        />
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA7CAYAAAFd4KkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3REVGNTdBNUNBMDIxMUU4QjA5M0RGQ0FCRDIzOTU0NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3REVGNTdBNkNBMDIxMUU4QjA5M0RGQ0FCRDIzOTU0NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdERUY1N0EzQ0EwMjExRThCMDkzREZDQUJEMjM5NTQ3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdERUY1N0E0Q0EwMjExRThCMDkzREZDQUJEMjM5NTQ3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iLVsjAAABn1JREFUeNpi+P//PwMO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"
                          alt="homedoc_hover3"
                        />
                        <span>Statistical Data</span>
                      </a>
                      <a
                        title="View Budget Data"
                        href="#"
                      >
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA7CAYAAAFd4KkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBQjIwQTkxQkNBMDIxMUU4ODhGRDhDMjI5NDU3QkM0MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBQjIwQTkxQ0NBMDIxMUU4ODhGRDhDMjI5NDU3QkM0MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFCMjBBOTE5Q0EwMjExRTg4OEZEOEMyMjk0NTdCQzQwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFCMjBBOTFBQ0EwMjExRTg4OEZEOEMyMjk0NTdCQzQwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Jb4G5gAACqtJREFUeNpi/P//PwNe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"
                          alt="homedoc4"
                        />
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA7CAYAAAFd4KkbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNERCNDBERUNBMDIxMUU4OEE0MUExN0Y0QUI3QjNGRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNERCNDBERkNBMDIxMUU4OEE0MUExN0Y0QUI3QjNGRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI0REI0MERDQ0EwMjExRTg4QTQxQTE3RjRBQjdCM0ZGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI0REI0MEREQ0EwMjExRTg4QTQxQTE3RjRBQjdCM0ZGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FGwVJwAACVpJREFUeNpi/P//PwM+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"
                          alt="homedoc_hover4"
                        />
                        <span>Budget Data</span>
                      </a>
                      <a
                        title="View MOF Contracts"
                        href="#"
                      >
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAAHfgQuIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0QkMwMjNFRkNBMDQxMUU4QjA1QTlDQUU0NEFGNEVBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0QkMwMjNGMENBMDQxMUU4QjA1QTlDQUU0NEFGNEVBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRCQzAyM0VEQ0EwNDExRThCMDVBOUNBRTQ0QUY0RUE4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRCQzAyM0VFQ0EwNDExRThCMDVBOUNBRTQ0QUY0RUE4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mYkedgAACCRJREFUeNpidNrRXMbA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"
                          alt="homedoc5"
                        />
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAAHfgQuIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1N0IzRTc4M0NBMDQxMUU4QTBBODkyQkU5REI1QjAyRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1N0IzRTc4NENBMDQxMUU4QTBBODkyQkU5REI1QjAyRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU3QjNFNzgxQ0EwNDExRThBMEE4OTJCRTlEQjVCMDJEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU3QjNFNzgyQ0EwNDExRThBMEE4OTJCRTlEQjVCMDJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+oKoT6QAAByRJREFUeNpi+P//f9l/VMAAw4xgHgIwIrEZWJAEg6FsByjdAtMJ0/EfSfECFgZUgGzsByYG3OADzNiJaBIFQHwYIIDQXYtiNBOUY4rFUYIwO62A+CgQawGxI8g+IHZnQAoRPaRQ+gALIawuBWIBfF6BB98ELHK5AAGEHnzo4D+2CIF5EwbYofQ+IK7GEiYfofRxiJGIuJ8JxHfQ0wIaBvl+AYiNHJnpDMSBD8gBgOwfXIARWSOhwMFmGz964BALQJZ8AgggbCkLGXAD8TdsErBUhwv/BGI5rNZCLUyGKmAD4gosfgZluANQtiQQP4fFDwj8BuIiaHxii8NMIOaGsu+xoKXNMqiNDGhZGwSuA7EoEIeC/Q01QRQpb0zCk3IUoPQBmI2v0fyFHtJvoLZhZB0GPOUIA67oIAUIoGv8DnUeLvwW3QCYUzlJTXcsJKp/Cgs4WMppBmJePBqeA3EnlA0KXXdG/GkcZznECBBApOZHbAWZGDQdEAVwReNeIP4FxDVAXEggT7+BWq5LnDMRhSETEP8BYlsg9oOK70XKdJloyR1bIfoLiAPRxL5BzTkDxC+QY78eiK8AMSsQW6DVXjJA/ASIp6O5dwEafxkQ+wPxOmjoLAXiVUCcAJU/gO7SGUC8AohBcesGxJxQGgQ48GRuXFUFKNMfAeIEIC4AVS+4gkYMiBugFouQaBG6hQuQxA7gylCvgLgBqaShBPwgt7AxIlCuYC1b0C0kpcg4R2Z+RXEAEwPtwQd8PjwDxCIUGP4QiO3x1v4UFG3E+EwAVoZCxX6j+1Ae1DylwBJQ6n6GJiYNaiwDsTUokbLASwDagWfQ0ssLxAEIIFCQgqpRDjIM2gHEnqRqAqXSmwTaYdiwIhC7AfFpciwkFywG4ltAfIdSC2dBG/2g+nArAf3RQLwGmljIshCUhFOBWBuII6A9C5CYGR4zQG3LJqReCDagj1wBX0CqmmA1xyUg/gvEBtBW7jMsbc0FaGLB0AoYWcwAauZkKC2LbOF6IDYG4jdA7A2tmv7jqN2xWQjC9mhq/yGxQS2Kj8gZPwCIi4BYGCnudkK7GV+AOAWI5yCpt8FS44PACaTSBbkE+wfEfMgWnodmznZoU2M5uN/LwPAViHnQLHsAdQAugKw2AVd/zwralvYA4h5owgElqrlA3IHFUHyl0xc0PjMQK6AnGhCuReqgPIHSG4FYgMTmxQUccQ9pZ6AJikATTD0QC5HZnsFpIbYaH9aGacTR0iamm40L/CaliUGNOvMbPZoYZPe7qBGkDPQOUga6BymyhZJENHQJYTZCDSsWtG4uIz19SPdUCmpDXqDQPGUg/kushR/gBSz1wD+07LSP1kEKGjGOg6YN0ABpKKiQPgAd5wI1VrupYAEDNGoMYOUn1GxwpYwcpL9x1OCUAmbo8OFqbCXNBRpYmA9tIXDCmvofaGCRCbRZgjIKBWIABOjW7EGjCKI4vl6MIYhRbAwBQUREwUoxIUVaCSiSQvwkiYiFYhCxsLSxkNgabSzUCFqInaJgYQJaWIhRggqCJxGSQjEJ4tfpGefhb2Q4Zmb3br8u9+BP9oa52X03b96+//9Fc4sy3DBtEw7TxbX0DXaG1LOJnHu56YsKQTYtk2NepCBcztGfpDicrpdM2klIxLESApnc/zFyqghrG7J0sBk5os9IiIJxWKj+/EVhE6JpLYLrcc7LZYW3KEtdiXlIoTphKWR1o/GBwjljXNTFZVyvUbig8Iq5fSHF8TrmXfPMGYQmisbaG6Hg3qrwxGALwtbu6daFzcFWOKVMPI8zh4wFXitMcf0NvimO3vT8WNU4qNHL+mXub5szxnr9FeNnGb9hc3AHDs7zQN3MuWW5wXN+iBaFAebN4nRcBzU6FT7yvTOWtUZ9zhccvQPh2G3Q2ze8lbeR+bSt5+xJC0y6d+2MPyQruxiqnOfBKorcp4a0OWyRpv/UcgaLRkieUGgiXEvG+Cwqvcw/YIxP1kheoxLcuYod9Jori4pmN8T1iMJvdvKgQgf9kiPs3AJ9EbHdClsyruGvO3THcbNW+2n54iVQwLkrCi8JVbFnODNFuJaDOjTt4PcQUrCxynLsVI3SsmnvFEazFBKi2g808FUx13mfwLPML00pMiYyjMK5rHdwCU2F1pjrFD2vm8h1dBoONpFpVyYQ6j4H2/JyUF4pV+sggRbCHGxJIMxiabfQqjD75dthl4PimLS4VuTo4AxUKsy+RtUqTZP3Yn/QAFYIGtxcO7iaWi7vEO0hafnssENPEvnjk8vBz0HUf5/Kz6SYeKTQzbOWjKR4FLnltKZLYylSnLTokqADwn3fGGtHBbgrn11ncC3sYCFHyIs+rKMzjbIs7eJjjN1mN/f7zuAHKpLFYBcV9qLKbQ7+dfX3oB40TBbdx9+TEOA7/wtjFaczhp6yGExaDNst47tQHAbMzPsXUfFVv8lBKTMAAAAASUVORK5CYII="
                          alt="homedoc_hover5"
                        />
                        <span>MOF Contracts</span>
                      </a>
                      <a
                        title="View Governmental Agreements"
                        href="#"
                      >
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAAyCAYAAAFws1aBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNTkzNkY5MENBMDQxMUU4QTU5RkRCMjU0RDdGMEE0NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNTkzNkY5MUNBMDQxMUU4QTU5RkRCMjU0RDdGMEE0NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA1OTM2RjhFQ0EwNDExRThBNTlGREIyNTREN0YwQTQ1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA1OTM2RjhGQ0EwNDExRThBNTlGREIyNTREN0YwQTQ1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GPvsgAAAC4hJREFUeNpicNrRfIQB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"
                          alt="homedoc6"
                        />
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAAyCAYAAAFws1aBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRUNDRTg3MUNBMDQxMUU4QkM4RUREMkRBRjFGOTUyOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRUNDRTg3MkNBMDQxMUU4QkM4RUREMkRBRjFGOTUyOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBFQ0NFODZGQ0EwNDExRThCQzhFREQyREFGMUY5NTI5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBFQ0NFODcwQ0EwNDExRThCQzhFREQyREFGMUY5NTI5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+I05m7AAACSBJREFUeNpi+P///xEgZsCDvZkYGBisoRgb+A/EXxn/g5QzMDBCBQOA2BWIWYHYEYhVgdgBZBwMwIxfhsRnAWIHmAQIlAGxMZSfCaUNQDQjxDa4/Yxo7gHzmZAEGdEcDecDBBCySVgBzJTlhBQIAPENqNdhRn6CuAjiclssoQsCAsice0iSS6Firug6QGAWckCyYPEaSrgABBAsfn4CMSeSA4kFf4HYGeZTDiQDCBmkDMTHoWxm9FgBgQI0/lcshkgBsSWKZdCEexoaADcIJOI1QNwCZd8G4r//ccTFfyS2M5QdAMSLkcRXIuvDZSMMfAHiUiQxTWzqAQIInM8IeIEQPsICDby/sJAmAYDSyXcgZmdCiipS0sgKaAyBkgZGagTFfwwQ38VjAHouxkgn2kC8A5q9ApCyGcyV26EGbEc1FliiIIU+ejbcjCPmCpD5yBmcFWrjYSQ7zgFxGhBfBeIEJG+fRQ5DWAb8B8T3oAUiAxHhcR+IFYH4NDjzQp3kCsTn/6MCbN4A0T1ALIOsBlmRDhBPBeJINE3I7F5sFqDbxgNN6qC88h2qQQ0qtwqHCxlwlb0wvyPT2ApxrOkEvRgE0ZOAOAqXASAAEEDIOXY/hRmRHHwAveyBJdp1UL4ZDS03g9qxDsoH2f2fBS2AgpAKBlAJ8wOIuRmoA75CCw42bFHEhKdGAjmGC4hnQBNJNBmWx0H1zoCaBfMgzjTigBZ8ElBxRmjZQgiIQ/XJA/FTLPK2ULP+Q81Gtgtr1IDAUiAOhgbfbTzZ5SG0eD4ILVpAbYE7QCyNRS2yOaDoXosewkxY8u1tpPZBPJ5yTh5qaRQ02BmhapWher8h1WIg8SSoOAfUjv/oDgEZcBGIf0PFPiMVIM+hOI+EdLEN6kCQ43iQ6ho1JM9+hrJ/Q+1mxJXFVKHxyQmNdxA4AcR+uIpGIJZCin9mIP4NVcuFlD5wZmt8+b0BiD8A8RU0x+2Ftq6xGcyC5gBcmYEkhyAbDip8riGFzlEkS8ygIfAH2nIDqQ+DyvkTW9CRUzLCwCkgFoayfwBxOJTNTk6JCxCAOKt5hSiK4oNolCifU5gURcpOSUmhZoOFhaWFhY2VrEgWY2fno5SsrCxkYyGbyT9gBjM2ykKipjSYGhrJjHvqd+vXdR9vPnDqNO/e9+45595zz7m/e0Z896A2S4Pn/yguEVOPXez7Y+U+6G3S+WMG4bnwRwYsQt8MAzPJEzWKnxXfAHT9FknmbQOiTMpqcCZNwhgNNauKrFwns3LoSX530rYoDiLTTRXJgCnIC0K+9ZS1hY6GsZECAU8Eclqcwr70G+vH6WKbzXMFshgvNOZ4JzNKKqYAv+IE0NOEg4x9uo3J/a5PcYxkCIKrU3zrqMfBHY8ElDM/AJ5VGrdseZ/BuxPI/eIOmxGT1LdGQsxzhRGXydX0nIEcrWvSjRFCXTgR+WRk1kf1AcN8RcOWb1lOl02fuTHvcc2UulNK8TqQk22/dCPsooo7FA8oDmEPse9fIScFuWHosYZowHDDR54hGYKceaPfdEvAdMcbfntp+bwF5AaN5t9JTiW5pZf1emjmQufkaw8qRZfYA26Ut9ItTHgb8rawsmlDz5oN2FwovqGNJlDvCNdzoVMXhrzo0iTaXrSv0ZYqZdhtGUzXzsJo9ytOYHa2MbP0vIQxm2if0X5wDfGEdrGZUtR/iHdJy5hXywpwoivJ1YgKxTEjpqNoN+J3yDJOZ8wNtGt/gv5uwO4dzUTPfpr6jtEXoyzpNdL2XjEQ9wiElaGYK9SsuJ1mGcRzkNw5SvWlosD+HZpZJ0H8NIyTbwbpm3gueSXXJDRHivz0R8AKwvcp33tHodBNsMIV0HNPPgI+BejeakKbCKJwNmpUVMS2WvBQiIgFi5F6kig0FTF6Kamo9Q8shUohXhQEPSmICnpR8NJSRPQiCKWIvdSLIqj1omItxRwEq6BYPVT8QcF1Br6Bj5fZTTabxKYD3yGzszPvzc7Pe997iYhFdIGmd65jHvTNCzS4tPjN2mqbo5PQBv3y9GbT5iRMklaYtw9gwtxTqIvUdqmDHi70+g49Heidt01SFoPyBNEx2hLJ1tgqyJLl9gf6ODauU24TP75ppcIotdVBwZZZOgEtkM+UUcjv1T5l2yZ+RTNMO7Cs0ji5x7HsBkyg7j+WRZDDhVz1kNOB3J+D3iapALPvwNt0hZncWeVV0IlxXRF+cgL0EXhlcGkC/5MC4e3AN9T+3pDCsxL6XKGwS6FP4ZjCAYSGl/m88xTjfcD4DuRJQb6mMHZGMSujm9r3Wjy7sEUb2e8oNsrlocIR2LePTXICe3hAL9V3B1kZQSZjGO20BxgnWiKH+pwHzWELMpgyo3C4iBiA5vQf4Z0phesK+2EC28aPk6c6XM7JaNAUPQUiopQ68NfyZfywisZrt/iEeyH82YDExRViz0xKQxTyupC/IexkdNDzUwUGLxYZuvtt5ZXwtG/4MHgMr49zmvrqKHUyBslYSYTYFqUiBi7kB8l4n7ZoxINNtMm3kYzHwWImY0RhDZI83qJunMJfPPOXq3yF6quyBy4x+xSJANtmIfRxod9S6DviiuTELJgrV3wFcz5cRZ0+wTfPAiszI1IMJsV2PeRx20ShF5cv0H++baBmni1LuaSw22LsGFrHQTSmsQxKtwuh93l4oW8ssmh+c60wzXkXNJfC7NQTjZyjDl9iMP0s6TN5M9SuVOgY/xPq8z2yyGQ7c3tcE/VRES4JTXNlSJgY6nYiAOQS5Rmjd87TV+oCFVponFt4Z1phj+V5q8JrGjOHm+4u1ZWUmhn0hTuWL/8bAspT/Sa1+Yl25s5fXGAcvYTH6P0pynRlMB2sOcc+OucqPhmMgxBCZ39sR10XTGobjbhVTOBtheVFjLMJGSh8WG5RWKBwkepXhz2jwh5wG8Q54mLbrKPrbICefUKC5zmqi4swqkk9T4qx1nucSUPlsnfKed2lxUn+jX7340sapSbI7V8i+kmKCMkEtucvkZtUdpSDopdlG9xo/VeEM0j/eIEcFJM28BU5bI34PYZM5kn8TiC/LQI3XQv5XKFfYbpiFFEVDKQ0/oGi7/bj4rYxt9RHjy1wtJrGXCVWRs2Wf+5lyEKS3EXqAAAAAElFTkSuQmCC"
                          alt="homedoc_hover6"
                        />
                        <span>Governmental Agreements</span>
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
                        <li className="current">Photo Gallery</li>

                      </ul>

                      <div className="box photo visible">
                        <MDBCarousel showControls showIndicators className={"h-100 w-100"}>
                          <MDBCarouselItem
                            className='w-100 h-100 d-block'
                            itemId={1}
                            src={news1}
                            alt='...'
                          >
                            <h5 className={"text-white h-100 w-100"}>APPO Secretary General to Deliver Keynote Address at MSGBC Oil, Gas & Power 2023</h5>
                            <p className={"text-responsive h-100 w-100"}>Dr. Omar Farouk Ibrahim, with his extensive experience in African governance...</p>
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={2}
                            src={news2}
                            alt='...'
                          >
                            <h5 className={"text-white h-100 w-100"}>Government Not Looking at Raising Oil and Gas Stakes, Clarifies Angolan Minister</h5>
                            <p className={"text-responsive h-100 w-100"}>Angola’s Minister of Mines and Energy reiterated that the government is not looking at...</p>
                          </MDBCarouselItem>
                          <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={3}
                            src={news3}
                            alt='...'
                          >
                            <h5 className={"text-white h-100 w-100"}>Angola, Technip Energies Ink Cooperation Agreement During Invest in African Energy Forum in Paris</h5>
                            <p className={"text-responsive h-100 w-100"}>Ministry of Hydrocarbons signed a cooperation agreement with Technip Energies...</p>
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
                      A leading ministry that enables Saudi Arabia to be among the
                      world's 15 largest economies by 2030 through a distinct
                      financial system.
                    </h1>
                    <span className="clr" />
                    <a
                      className="visionbtn"
                      href="#"
                      title="Ministry of Finance's strategy"
                    >
                      Learn about the Ministry of Finance's strategy
                      <span />
                    </a>
                    <span className="clr" />
                  </div>
                  <div className="sec2 s21 srclose">
                    <span title="View more">Transparency</span>
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
                    <span title="View more">Commitment</span>
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
                    <span title="View more">Partnership</span>
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
                    <span title="View more">Accomplishment</span>
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
                  <div className="title">
                    <a
                      className="fixedTip"
                      href="#"
                      title="View all events"
                    >
                      Ministry Events
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
                        <strong>16</strong>February
                      </span>{" "}
                            <div className="event_info">
                        <span className="eventTitle">
                          Webinar: Investing in Research to Enable the Knowledge
                          Economy
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
                            title="View Webinar: Investing in Research to Enable the Knowledge Economy"
                            href="#"
                            tabIndex={0}
                          >
                            {" "}
                            <span className="date">
                        <strong>16</strong>February
                      </span>{" "}
                            <div className="event_info">
                        <span className="eventTitle">
                          Webinar: Investing in Research to Enable the Knowledge
                          Economy
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
                            title="View  Future Investment Initiative"
                            href="#"
                            tabIndex={0}
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
                  <div className="title">
                    <a
                      className="fixedTip"
                      href="#"
                      title="View all ministry projects"
                    >
                      Ministry Projects
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
                            title="Details of King Salman International Convention Center"
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
                            title="Details of King Salman International Convention Center"
                            tabIndex={0}
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
                  <div className="title">Most Popular Content</div>
                  <span className="clr" />
                  <div className="browsinglinks" id="tagged_words">
                    <a
                      title="Search Citizen version"
                      className="big"
                      href="#"
                    >
                      Citizen version
                    </a>{" "}
                    |{" "}
                    <a
                      title="Search Budget 2023"
                      className="big"
                      href="#"
                    >
                      Budget 2023
                    </a>{" "}
                    |{" "}
                    <a
                      title="Search Events"
                      className="small"
                      href="#"
                    >
                      Events
                    </a>{" "}
                    |{" "}
                    <a
                      title="Search E-Services"
                      className="medium"
                      href="#"
                    >
                      E-Services
                    </a>{" "}
                    |{" "}
                    <a
                      title="Search News"
                      className="small"
                      href="#"
                    >
                      News
                    </a>{" "}
                    |{" "}
                    <a
                      title="Search  Sukuk Issuance Programme"
                      className="small"
                      href="#"
                    >
                      {" "}
                      Sukuk Issuance Programme
                    </a>{" "}
                    |{" "}
                    <a
                      title="Search Project Support fund"
                      className="small"
                      href="#"
                    >
                      Project Support fund
                    </a>{" "}
                    |{" "}
                    <a
                      title="Search Debt management office"
                      className="medium"
                      href="#"
                    >
                      Debt management office
                    </a>
                  </div>
                </div>
                <div className="voting hblock animated fadeInUp go">
                  <div className="title">Voting</div>
                  <div className="t_conts vote">
                    <div className="ques">
                <span
                  id="ctl00_PlaceHolderMain_ctl00_lblQuestionText"
                  className="ques"
                >
                  How satisfied are you with the e-services provided by the
                  Ministry?
                </span>
                    </div>
                    <div className="options">
                      <input
                        name="RadioGroup1"
                        type="radio"
                        id="RadioGroup1"
                        defaultValue="3b7454c7-8160-463a-9785-7fd0ea69a260"
                      />
                      Very satisfied
                      <div className="clr" />
                      <input
                        name="RadioGroup1"
                        type="radio"
                        id="RadioGroup1"
                        defaultValue="2df7a05a-5a40-4c85-ade6-30c254d01a3a"
                      />
                      Satisfied
                      <div className="clr" />
                      <input
                        name="RadioGroup1"
                        type="radio"
                        id="RadioGroup1"
                        defaultValue="8386f10a-a7ab-4f73-8d8b-c6af069567e4"
                      />
                      Partly satisfied
                      <div className="clr" />
                      <input
                        name="RadioGroup1"
                        type="radio"
                        id="RadioGroup1"
                        defaultValue="3a0e0251-7213-4f4c-9d8a-5eb345383acb"
                      />
                      Not at all satisfied
                      <div className="clr" />
                    </div>
                    <div className="vote_links" id="vote_links">
                      <a style={{ cursor: "pointer" }} title="Vote">
                        Vote
                      </a>{" "}
                      |{" "}
                      <a style={{ cursor: "pointer" }} title="Results">
                        Results
                      </a>{" "}
                      |{" "}
                      <a
                        title="Recent Polls"
                        href="#"
                      >
                        Recent Polls
                      </a>
                    </div>
                  </div>
                </div>
                <div className="implinks hblock animated fadeInUp go">
                  <div className="title">
                    <a
                      className="fixedTip"
                      href="#"
                      title="View all links"
                    >
                      Useful Links
                      <span />
                    </a>
                    <span className="clr" />
                  </div>
                  <span className="clr" />
                  <div className="ilinks">
                    <label style={{ display: "none" }} htmlFor="linksCategory">
                      select
                    </label>
                    <select name="linksCategory" id="linksCategory">
                      <option selected="">Interests and development funds</option>
                      <option>Ministries</option>
                      <option>Banks</option>
                      <option>Finance</option>
                      <option>Government universities</option>
                      <option>Contacts and financial institutions</option>
                      <option>Bodies</option>
                      <option>Related To The Government Entity</option>
                    </select>
                    <div
                      id="linksContent"
                      className="ilinks_slider slick-initialized slick-slider"
                    >
                      <img
                        data-role="none"
                        className="slick-next slick-arrow"
                        aria-label="next"
                        title="Previous"
                        alt=""
                        src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="44" height="137"><rect fill-opacity="0"/></svg>'
                        style={{
                          backgroundBlendMode: "normal!important",
                          backgroundClip: "content-box!important",
                          backgroundPosition: "50% 50%!important",
                          backgroundColor: "rgba(0,0,0,0)!important",
                          backgroundImage: "var(--sf-img-25)!important",
                          backgroundSize: "100% 100%!important",
                          backgroundOrigin: "content-box!important",
                          backgroundRepeat: "no-repeat!important"
                        }}
                      />
                      <div aria-live="polite" className="slick-list draggable">
                        <div
                          className="slick-track"
                          style={{
                            opacity: 1,
                            width: 1280,
                            transform: "translate3d(-320px,0px,0px)"
                          }}
                          role="listbox"
                        >
                          <div
                            className="slick-slide slick-cloned"
                            data-slick-index={-1}
                            aria-hidden="true"
                            style={{ width: 320 }}
                            tabIndex={-1}
                          >
                            <a
                              title="View Saudi Vision 2030"
                              target="_blank"
                              href="https://vision2030.gov.sa/en/node"
                              tabIndex={-1}
                            >
                              <img
                                src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="210" height="175"><rect fill-opacity="0"/></svg>'
                                alt="impLink1"
                                style={{
                                  backgroundBlendMode: "normal!important",
                                  backgroundClip: "content-box!important",
                                  backgroundPosition: "50% 50%!important",
                                  backgroundColor: "rgba(0,0,0,0)!important",
                                  backgroundImage: "var(--sf-img-67)!important",
                                  backgroundSize: "100% 100%!important",
                                  backgroundOrigin: "content-box!important",
                                  backgroundRepeat: "no-repeat!important"
                                }}
                              />
                              <br />
                              Saudi Vision 2030
                            </a>
                          </div>
                          <div
                            className="slick-slide slick-current slick-active"
                            data-slick-index={0}
                            aria-hidden="false"
                            style={{ width: 320 }}
                            tabIndex={-1}
                            role="option"
                          >
                            <a
                              title="View The Embassy of the Kingdom of Saudia Arabia in Washington"
                              target="_blank"
                              href="https://www.saudiembassy.net/"
                              tabIndex={0}
                            >
                              <img
                                src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="210" height="175"><rect fill-opacity="0"/></svg>'
                                alt="impLink0"
                                style={{
                                  backgroundBlendMode: "normal!important",
                                  backgroundClip: "content-box!important",
                                  backgroundPosition: "50% 50%!important",
                                  backgroundColor: "rgba(0,0,0,0)!important",
                                  backgroundImage: "var(--sf-img-68)!important",
                                  backgroundSize: "100% 100%!important",
                                  backgroundOrigin: "content-box!important",
                                  backgroundRepeat: "no-repeat!important"
                                }}
                              />
                              <br />
                              The Embassy of the Kingdom of Saudia Arabia in
                              Washington
                            </a>
                          </div>
                          <div
                            className="slick-slide"
                            data-slick-index={1}
                            aria-hidden="true"
                            style={{ width: 320 }}
                            tabIndex={-1}
                            role="option"
                          >
                            <a
                              title="View Saudi Vision 2030"
                              target="_blank"
                              href="https://vision2030.gov.sa/en/node"
                              tabIndex={-1}
                            >
                              <img
                                src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="210" height="175"><rect fill-opacity="0"/></svg>'
                                alt="impLink1"
                                style={{
                                  backgroundBlendMode: "normal!important",
                                  backgroundClip: "content-box!important",
                                  backgroundPosition: "50% 50%!important",
                                  backgroundColor: "rgba(0,0,0,0)!important",
                                  backgroundImage: "var(--sf-img-67)!important",
                                  backgroundSize: "100% 100%!important",
                                  backgroundOrigin: "content-box!important",
                                  backgroundRepeat: "no-repeat!important"
                                }}
                              />
                              <br />
                              Saudi Vision 2030
                            </a>
                          </div>
                          <div
                            className="slick-slide slick-cloned"
                            data-slick-index={2}
                            aria-hidden="true"
                            style={{ width: 320 }}
                            tabIndex={-1}
                          >
                            <a
                              title="View The Embassy of the Kingdom of Saudia Arabia in Washington"
                              target="_blank"
                              href="https://www.saudiembassy.net/"
                              tabIndex={-1}
                            >
                              <img
                                src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="210" height="175"><rect fill-opacity="0"/></svg>'
                                alt="impLink0"
                                style={{
                                  backgroundBlendMode: "normal!important",
                                  backgroundClip: "content-box!important",
                                  backgroundPosition: "50% 50%!important",
                                  backgroundColor: "rgba(0,0,0,0)!important",
                                  backgroundImage: "var(--sf-img-68)!important",
                                  backgroundSize: "100% 100%!important",
                                  backgroundOrigin: "content-box!important",
                                  backgroundRepeat: "no-repeat!important"
                                }}
                              />
                              <br />
                              The Embassy of the Kingdom of Saudia Arabia in
                              Washington
                            </a>
                          </div>
                        </div>
                      </div>
                      <img
                        data-role="none"
                        className="slick-prev slick-arrow"
                        aria-label="previous"
                        title="Next"
                        alt=""
                        src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="44" height="137"><rect fill-opacity="0"/></svg>'
                        style={{
                          backgroundBlendMode: "normal!important",
                          backgroundClip: "content-box!important",
                          backgroundPosition: "50% 50%!important",
                          backgroundColor: "rgba(0,0,0,0)!important",
                          backgroundImage: "var(--sf-img-27)!important",
                          backgroundSize: "100% 100%!important",
                          backgroundOrigin: "content-box!important",
                          backgroundRepeat: "no-repeat!important"
                        }}
                      />
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
                <li>General Services</li>
                <li>
                  <a href="#">
                    SiteMap
                  </a>
                </li>
                <li>
                  <a href="#">
                    Subscribe to the mailing list
                  </a>
                </li>
                <li>
                  <a href="#">
                    Open Data
                  </a>
                </li>
                <li>
                  <a href="#">
                    Portal Statistics
                  </a>
                </li>
                <li>
                  <a href="#">
                    Unified National Platform
                  </a>
                </li>
                <li>
                  <a href="#">
                    Bureau Of Experts At The Council Of Ministers
                  </a>
                </li>
              </ul>
              <ul className="ful">
                <li>Communicate with visitors</li>
                <li>
                  <a href="#">
                    Social Media
                  </a>
                </li>
                <li>
                  <a href="#">
                    Sustainable Development
                  </a>
                </li>
                <li>
                  <a href="#">
                    Add your Comments
                  </a>
                </li>
                <li>
                  <a href="#">
                    E-Participation
                  </a>
                </li>
                <li>
                  <a href="#">
                    The Visitor and Resident
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    Supporting Society Groups
                  </a>
                </li>
              </ul>
              <ul className="ful">
                <li>Policy</li>
                <li>
                  <a href="#">
                    User Charter
                  </a>
                </li>
                <li>
                  <a href="#">
                    Data Sharing Interim Regulations
                  </a>
                </li>
                <li>
                  <a href="#">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#">
                    Terms of use
                  </a>
                </li>
                <li>
                  <a href="#">
                    The Open Data Policy
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    Service level Agreement{" "}
                  </a>
                </li>
              </ul>
              <ul className="ful">
                <li>Help Center</li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">
                    complaint and Inquiry Service
                  </a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">
                    Secretary Phones
                  </a>
                </li>
                <li>
                  <a href="#">
                    Branches Phones Numbers
                  </a>
                </li>
                <li>
                  <a href="#">
                    Portal Search
                  </a>
                </li>
                <li>
                  <a href="#">
                    Personalization
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
                This site can be browsed through a design that matches the dimensions
                of different screens.
                <br />
                This site supports browsers :{" "}
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
                All rights reserved - Ministry of Finance - KSA © 20232023
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
