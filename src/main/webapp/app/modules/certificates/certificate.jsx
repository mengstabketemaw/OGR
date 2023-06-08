import React from 'react';
import './cer.css'
import HomeIcon from './header.png'
import BackGround from './background.png'
import QRCode from "react-qr-code";
import {Translate} from "react-jhipster";
import moment from "moment";
const Certificate = React.forwardRef((props, ref) => {

  const {title, companyName, location, fromDate, link, type} = props?.data
  return(
    <div style={{display:"none"}} >
    <div className=" pm-certificate-container" ref={ref} style={{ backgroundImage: `url(${BackGround})`, backgroundSize: "cover" }}>
       <div className="pm-certificate-border col-xs-12">
        <div className="row pm-certificate-header">
          <div className="pm-certificate-title  col-xs-12 text-center">
              <img src={HomeIcon} alt="Certificate Header" style={{ width: "100px", height: "auto" }} />
              <h5>GOVERNO DA PROÍNCIA DE CABINDA</h5>
            </div>
        </div>

        <div className="row pm-certificate-body" >

          <div className="">
            <div className="col-xs-12">
              <div className="row">
                <div className="underline margin-0 col-xs-8 text-center">
                  <span className="pm-certificate-name text-uppercase">{title}</span>
                </div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"></div>
                <div className="pm-earned col-xs-8 text-center">
                  <span className="pm-earned-text block  sans">
                    {type === 1 || type === 2?
                    <Translate contentKey={"cert.licence"}/>
                    :<Translate contentKey={"cert.permit"}/>
                    }
                    </span>
                  <span className="pm-credits-text block bold sans">{companyName}</span>
                  <span className="pm-earned-text block  sans">
                  <Translate contentKey={"cert.by"}/> <strong>GOVERNO DA PROÍNCIA DE CABINDA </strong>
                    {type === 1 ?
                      <Translate contentKey={"cert.exploration"}/>
                      : type === 2 ?
                      <Translate contentKey={"cert.pipeline"}/>
                        : type === 3 ?
                          <Translate contentKey={"cert.air"}/>
                          :
                            <Translate contentKey={"cert.drilling"}/>
                    }

                    {location}.
                  </span>

                 </div>
                <div className="col-xs-2"></div>
                <div className="col-xs-12"></div>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"></div>
                <div className="pm-earned col-xs-8 text-center">

                  <span className="pm-earned-text   sans"><Translate contentKey={"cert.valid"}/>
                  </span>
                  <span className="pm-earned-text underline sans"> {moment(fromDate).format('MMMM Do YYYY')} <Translate contentKey={"cert.to"}/>
                  </span>
                  <span className="pm-earned-text underline  sans">{moment(fromDate).add(3,'years').format('MMMM Do YYYY')}.
                  </span>
                  <span className="pm-earned-text   sans">
                    {type === 1 ?
                      <Translate contentKey={"cert.exploreEnt"}/>
                      : type === 2 ?
                        <Translate contentKey={"cert.pipelineEnt"}/>
                        : type === 3 ?
                          <Translate contentKey={"cert.airEnt"}/>
                          :
                          <Translate contentKey={"cert.drillingEnt"}/>
                    }
                    <Translate contentKey={"cert.land"}/>
                     </span>


                </div>
                <div className="col-xs-2"></div>
                <div className="col-xs-12"></div>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"></div>
                <div className="pm-earned col-xs-8 text-center">

                  <span className="pm-earned-text block  sans">
                    <Translate contentKey={"cert.issueAut"}/>

                  </span>
                </div>
                <div className="col-xs-2"></div>
                <div className="col-xs-12"></div>
              </div>
            </div>
            {link &&
            <div className="float-right" style={{ height: "auto", margin: "-50 auto", maxWidth: 64, width: "100%" }}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={link}
                viewBox={`0 0 256 256`}

              />
            </div>}

          </div>



        </div>

      </div>
    </div>
    </div>
  )

});
export default Certificate;
