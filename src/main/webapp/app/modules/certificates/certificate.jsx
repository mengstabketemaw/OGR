import React from 'react';
import './cer.css'
import HomeIcon from './header.png'
import BackGround from './background.png'
import QRCode from "react-qr-code";
const Certificate = React.forwardRef((props, ref) => {

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

        <div className="row pm-certificate-body">

          <div className="">
            <div className="col-xs-12">
              <div className="row">
                <div className="underline margin-0 col-xs-8 text-center">
                  <span className="pm-certificate-name">EXPLORATION LICENCE</span>
                </div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"></div>
                <div className="pm-earned col-xs-8 text-center">
                  <span className="pm-earned-text block  sans">This Certificate License Certificate is issued to</span>
                  <span className="pm-credits-text block bold sans">Betselot Aderaw</span>
                  <span className="pm-earned-text block  sans">
                  by <strong>GOVERNO DA PROÍNCIA DE CABINDA</strong> for the exploration of minerals on the land located at [Land Location].
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

                  <span className="pm-earned-text   sans">The License is valid from
                  </span>
                  <span className="pm-earned-text underline sans"> December 08, 2019 to
                  </span>
                  <span className="pm-earned-text underline  sans">December 08, 2020.
                  </span>
                  <span className="pm-earned-text   sans"> The Licensee is entitled to explore for minerals on the Land in accordance with the terms and conditions of this Certificate.
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

                  <span className="pm-earned-text block  sans">The Issuing Authority may revoke this Certificate if the Licensee fails to comply with any of the terms and conditions of this Certificate.
                  </span>
                </div>
                <div className="col-xs-2"></div>
                <div className="col-xs-12"></div>
              </div>
            </div>

            <div className="float-right" style={{ height: "auto", margin: "-50 auto", maxWidth: 64, width: "100%" }}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value="Certificate Licence Betselot Aderaw December 08, 2019 to December 08, 2020."
                viewBox={`0 0 256 256`}

              />
            </div>

          </div>



        </div>

      </div>
    </div>
    </div>
  )

});
export default Certificate;
